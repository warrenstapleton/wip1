import dotenv from 'dotenv';

dotenv.config();

import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import schemaWithResolvers from './graphql/schema.js';
import { MongoHelper } from './helpers/mongoHelpers.js';

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
const { url } = await startStandaloneServer(server, {
  context: async ({ req }) => {
    return await mHelper.validateUser(req)
  },
  listen: { port: +process.env.PORT},
});
console.log(`🚀  Server ready at ${url}`);

