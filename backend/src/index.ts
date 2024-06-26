import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import schemaPromise from "./schema";
import db from "./db";
import http from "http";
// import cors from "cors";
// import env from "./env";

// const { SERVER_PORT: port, CORS_ALLOWED_ORIGINS: allowedOrigins } = env;

schemaPromise.then(async (schema) => {
  await db.initialize();
  const app = express();
  const httpServer = http.createServer(app);
  const plugins = [ApolloServerPluginDrainHttpServer({ httpServer })];
  const server = new ApolloServer({ schema, plugins });
  await server.start();
  // const corsConfig = { origin: allowedOrigins.split(","), credentials: true };
  // app.use(cors<cors.CorsRequest>(corsConfig));
  const context = async ({ req, res }: any) => ({ req, res });
  const expressMW = expressMiddleware(server, { context });
  app.use(express.json(), expressMW);
  await new Promise<void>((resolve) => httpServer.listen(4001, resolve));
  console.log(`🚀 Server ready at http://localhost:4001/graphql`);
});
