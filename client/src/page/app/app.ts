

import { AbstractHyperElement, Define } from 'abstract-element';

import template from './template'

import { execute } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import gql from 'graphql-tag';


@Define('zk-app')
export class AppComponent extends AbstractHyperElement {

  constructor() {
    super('', true);

    const uri = 'http://localhost:3000/graphql';
    // const uri = 'https://shelter-app-server.herokuapp.com/graphql';
    const link = new HttpLink({ uri });

    const operation = {
      query: gql`query {
        getUser(id:"1"){
          name
        }
      }`,
      variables: {}, //optional
      context: {}, //optional
      extensions: {} //optional
    };

    // execute returns an Observable so it can be subscribed to
    execute(link, operation).subscribe(
      d => {
        console.log(d);

      }
    )
  }


  render() {
    return template(this.html, this.state);
  }
}