import type   { QueryResolvers } from './../../../types.generated.js';
        export const joint: NonNullable<QueryResolvers['joint']> = async (_parent, _arg, _ctx) => {
          /* Implement Query.joint resolver logic here */
          return {id: '123', source: 's1', destination: 'd1'}
        };
