import { makeExecutableSchema } from 'graphql-tools';

import resolvers from './resolvers';
import { Tools } from '../common/tools';

const typeDefs = Tools.getDirFiles(`${__dirname}/gql`, '.gql').join();


export default makeExecutableSchema({ typeDefs, resolvers });;