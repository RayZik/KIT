
import { Tools } from '../common/tools';

import Resolvers from './resolvers';

export const typeDefs = Tools.getDirFiles(`${__dirname}/gql`, '.gql').join();
export const resolvers = Resolvers;