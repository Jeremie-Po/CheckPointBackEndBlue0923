import { buildSchema } from "type-graphql";
import CountriesResolver from "./resolvers/CountriesResolver";

export default buildSchema({
  resolvers: [CountriesResolver],
});
