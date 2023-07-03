import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { typeDefs } from "./schema/typeDefs.js";
import { resolvers } from "./schema/resolvers.js";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  status400ForVariableCoercionErrors: true,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => ({
    // The context function should be asynchronous and
    // return an object. This object is then accessible
    // to your server's resolvers and plugins using the
    // name contextValue.
  }),
});

console.log(`🚀  Server ready at: ${url}`);
