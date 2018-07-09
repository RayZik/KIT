import { Tools } from "common/tools";



const filesContent = Tools.getDirFiles('./dist/gql', '.gql');

// all schemas
export const typeDefs = filesContent.join('\n');