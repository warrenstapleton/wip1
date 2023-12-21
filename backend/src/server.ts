import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema/typeDefs.generated.js';
import { resolvers } from './schema/resolvers.generated.js';

interface MyContext {
  token?: String;
}

const server = new ApolloServer<MyContext>({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  context: async ({ req })=> ({ token: req.headers.token }),
  listen: { port: 4000 }
});

console.log(`Server ready at ${url}`);

