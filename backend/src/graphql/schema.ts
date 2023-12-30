import { join } from 'node:path';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchemaSync } from '@graphql-tools/load';
import { addResolversToSchema } from '@graphql-tools/schema';
import resolvers from './resolvers/resolvers.js';

const schema = loadSchemaSync(join(__dirname, 'schemas/schema.graphql'), {
  loaders: [new GraphQLFileLoader()]
});

const schemaWithResolvers = addResolversToSchema({ schema, resolvers });

export default schemaWithResolvers;

// // import 'graphql-import-node';
// import {importSchema} from 'graphql-import';
// // import * as rootDefs from './schemas/schema.graphql';
// import { makeExecutableSchema } from '@graphql-tools/schema';
// import resolvers from './resolvers/resolvers.js';
//
// const typeDefs = importSchema("./schemas/schema.graphql")
// const schema = makeExecutableSchema({
//   // typeDefs: [rootDefs],
//   typeDefs,
//   resolvers,
// });

// export default schema;
