import { buildSchema } from "type-graphql";
import CountriesResolver from "./resolvers/CountriesResolver";
import ContinentsResolver from "./resolvers/ContinentsResolver";

export default buildSchema({
  resolvers: [CountriesResolver, ContinentsResolver],
});
