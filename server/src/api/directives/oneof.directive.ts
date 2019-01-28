import { SchemaDirectiveVisitor } from 'apollo-server-express';
import _ from 'lodash';
import { GraphQLInputObjectType, GraphQLID } from 'graphql';



export class OneofDirective extends SchemaDirectiveVisitor {
  visitInputObject(object: GraphQLInputObjectType) {
    let a = object.getFields()
    console.log(a);


  }
}
