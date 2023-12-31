import { join, dirname } from 'node:path';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchemaSync } from '@graphql-tools/load';
import { addResolversToSchema } from '@graphql-tools/schema';
import resolvers from './resolvers/resolvers.js';

const schema = loadSchemaSync(join(dirname(import.meta.url), './schemas/schema.graphql'), {
  loaders: [new GraphQLFileLoader()]
});

const schemaWithResolvers = addResolversToSchema({ schema, resolvers });

export default schemaWithResolvers;
