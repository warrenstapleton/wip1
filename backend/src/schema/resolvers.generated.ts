/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
    import type   { Resolvers } from './types.generated.js';
    import    { Joint } from './joint/resolvers/Joint.js';
import    { joint as Query_joint } from './joint/resolvers/Query/joint.js';
    export const resolvers: Resolvers = {
      Query: { joint: Query_joint },
      
      
      Joint: Joint
    }