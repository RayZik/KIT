import * as React from 'react';

import { render } from 'react-dom';
import { AppContainer as ReactHotLoader } from 'react-hot-loader';
import RootContainer from './containers/root.container';

import { ApolloProvider } from 'react-apollo';
import { APOLLO_CLIENT } from './apollo-builder';


const rootEl = document.getElementById('root');


render(
  <ApolloProvider client={APOLLO_CLIENT}>
    <ReactHotLoader>
      <RootContainer />
    </ReactHotLoader>
  </ApolloProvider>,
  rootEl
)
