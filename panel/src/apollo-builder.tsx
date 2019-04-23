import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const httpLink = {
  uri: 'http://localhost:3001/api'
};

export const APOLLO_CLIENT = new ApolloClient({
  link: new HttpLink(httpLink),
  cache: new InMemoryCache()
});