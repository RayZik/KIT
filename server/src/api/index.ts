

import Resolvers from './resolvers';
import { Tools } from '../DB/tools';

export const typeDefs = Tools.getDirFiles(`${__dirname}/gql`, '.gql').join();
export const resolvers = Resolvers;