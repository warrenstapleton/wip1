import dotenv from 'dotenv';

dotenv.config();


// npm install @apollo/server graphql
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import schemaWithResolvers from './graphql/schema.js';
import schema from './graphql/schema.js';

interface MyContext {
  token?: String;
}

const server = new ApolloServer<MyContext>(
  {
    schema: schemaWithResolvers
  },
);
const { url } = await startStandaloneServer(server, {
  context: async ({ req }) => ({ token: req.headers.token }),
  listen: { port: +process.env.PORT},
});
console.log(`🚀  Server ready at ${url}`);


// import express from 'express';
// import { ApolloServer } from '@apollo/server';
// import { createServer } from 'http';
// import compression from 'compression';
// import cors from 'cors';
// import schema from './graphql/schema.js';
// import { MongoHelper } from './helpers/mongoHelpers.js';
//
// const app = express();
// const mHelper = new MongoHelper();
// mHelper.initiateMongoConnection();
//
// const server = new ApolloServer({
//   schema,
//   introspection: true,
//   context: async ({ req }) => {
//     return await mHelper.validateUser(req);
//   },
// });
//
// app.use('*', cors());
// app.use(compression());
//
// await server.start()
// server.applyMiddleware({ app, path: '/graphql' });
//
// const httpServer = createServer(app);
//
// httpServer.listen({ port: process.env.PORT }, (): void =>
//   console.log(`\n🚀 GraphQL is now running on http://localhost:${process.env.PORT}/graphql`)
// );
