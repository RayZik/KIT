import { Tools } from "../../common/tools";



const filesContent = Tools.getDirFiles(`${__dirname}/gql`, '.gql');

// all schemas
export const typeDefs = filesContent.join('\n');