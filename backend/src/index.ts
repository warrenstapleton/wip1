import {ApolloServer} from "@apollo/server";
import {startStandaloneServer} from "@apollo/server/standalone";
import {connect} from 'mongoose';
import {JointMyType, Joint, Resolvers} from './generated/graphql.js'
import {readFileSync} from 'fs';
const MONGODB = 'mongodb://localhost:27018/test'
import { DIRECTIVES } from '@graphql-codegen/typescript-mongodb'

// const typeDefs = readFileSync('./schema.graphql', 'utf8')

const resolvers : Resolvers = {
  Query: {
    async getJoint(_, {id}) {
      return await JointMyType.findById(id);
    },
    async getJoints(_, { }) {
      return await JointMyType.find();
    }
  },

  Mutation: {
    async createJoint(_, {jointInput}) {
      const res = await new JointMyType(jointInput).save();
      return res._id;
    },
    async updateJoint(_, {id, jointInput}) {
      await JointMyType.updateOne({id: id}, {$set: jointInput});
      return id;
    },
    async deleteJoint(_, {id}) {
      await JointMyType.findByIdAndDelete(id);
      return id;
    }
  },

  Joint: {
    id: (joint: Joint) => joint._id,
    source: (joint: Joint) => joint.source
  }
}

await connect(MONGODB);

const server = new ApolloServer({
  typeDefs: {
    DIRECTIVES
  },
  resolvers})

const {url} = await startStandaloneServer(server, {
  listen: {port: 4000}
});

console.log(`Server is ready at ${url}`)

