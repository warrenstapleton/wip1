import dotenv from 'dotenv';

dotenv.config();

import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import depthLimit from 'graphql-depth-limit';
import { createServer } from 'http';
import compression from 'compression';
import cors from 'cors';
import schema from './graphql/schema.graphql';
import { MongoHelper } from './helpers/mongoHelpers.js';

const app = express();
const mHelper = new MongoHelper();
mHelper.initiateMongoConnection();

const server = new ApolloServer({
  schema,
  validationRules: [depthLimit(7)],
  introspection: true,
  context: async ({ req }) => {
    return await mHelper.validateUser(req);
  },
});

app.use('*', cors());
app.use(compression());

await server.start()
server.applyMiddleware({ app, path: '/graphql' });

const httpServer = createServer(app);

httpServer.listen({ port: process.env.PORT }, (): void =>
  console.log(`\n🚀 GraphQL is now running on http://localhost:${process.env.PORT}/graphql`)
);
