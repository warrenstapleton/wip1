import dotenv from 'dotenv';
dotenv.config();

import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { MongoHelper } from './helpers/mongoHelpers.js';
import schemaWithResolvers from './graphql/schema.js';

const mHelper = new MongoHelper();
mHelper.initiateMongoConnection();

interface MyContext {
  token?: String;
}

const server = new ApolloServer<MyContext>(
  {
    schema: schemaWithResolvers
  },
);

// start apollo/express server
const { url } = await startStandaloneServer(server, {
  context: async ({ req }) => {
    return await mHelper.validateUser(req) // becomes context passed to controllers
  },
  listen: { port: +process.env.PORT},
});
console.log(`🚀  Server ready at ${url}`);

