import {ApolloServer} from "@apollo/server";
import {startStandaloneServer} from "@apollo/server/standalone";
import {connect} from 'mongoose';
import {Joint} from '../models/joint.js'

const MONGODB = 'mongodb://localhost:27018/test'

const typeDefs = `#graphql
type Joint {
    _id: String
    source: String
    destination: String
    type: String
}

input JointInput {
    source: String
    destination: String
    type: String
}

type Query {
    getJoint(ID: ID!): Joint!
    getJoints(limit: Int): [Joint]
}

type Mutation {
    createJoint(jointInput: JointInput): String!
    updateJoint(ID: ID!, jointInput: JointInput): String!
    deleteJoint(ID: ID!): String!
}
`;

const resolvers = {
    Query: {
        async getJoint(_, {ID}) {
            return await Joint.findById(ID);
        },
        async getJoints(_, {limit}) {
            return await Joint.find().limit(limit);
        }
    },
    Mutation: {
        async createJoint(_, {jointInput: {source, destination, type}}) {
            const res = await new Joint({source, destination, type}).save();
            return res._id;
        },
        async updateJoint(_, {ID, jointInput: {source, destination, type}}) {
            await Joint.updateOne({_id: ID}, {$set: {source, destination, type}});
            return ID;
        },
        async deleteJoint(_, {ID}) {
            await Joint.findByIdAndDelete(ID);
        }
    }
}

await connect(MONGODB);

const server = new ApolloServer({
        typeDefs,
        resolvers
    }
)

const {url} = await startStandaloneServer(server, {
    listen: {port: 4000}
});

console.log(`Server is ready at ${url}`)

