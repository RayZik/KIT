import * as React from "react";
import { render } from "react-dom";
import { AppContainer } from "react-hot-loader";
import App from "./components/App";

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const rootEl = document.getElementById("root");

const httpLink = {
  uri: 'http://localhost:3001/api'
};

const client = new ApolloClient({
  link: new HttpLink(httpLink),
  cache: new InMemoryCache()
});


const renderWithWrap = (content) => {
  render(
    <ApolloProvider client={client}>
      <AppContainer>
        {content}
      </AppContainer>
    </ApolloProvider>,
    rootEl
  )
}

renderWithWrap(<App />)

// Hot Module Replacement API
declare let module: { hot: any };

if (module.hot) {
  module.hot.accept("./components/App", () => {
    const NewApp = require("./components/App").default;

    renderWithWrap(<NewApp />);
  });
}
