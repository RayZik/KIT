import * as React from "react";
// import "./../assets/css/App.css";

import gql from 'graphql-tag';
import { graphql } from 'react-apollo';


export interface AppProps {
  // data?: {
  //   document?: {
  //     get?: {
  //       id: string;
  //       name: string;
  //       description: string;
  //     }
  //   }
  //   loading: boolean;
  // }
}

class App extends React.Component<any, undefined> {
  render() {
    return (
      <div className="app">
        {
          (() => {
            const data = this.props.data;
            if (data.loading) {
              return <div>loading</div>
            }

            return <div>{data.document.get.id}</div>
          })()
        }
      </div>
    );
  }
}


const documentQuery = gql`
  query ($id: ID!){
  document {
    get(id: $id) {
      id
      name
      description
    }
  }
}

`

const AppWithData = graphql(
  documentQuery,
  {
    options: {
      variables: {
        id: "1"
      }
    }
  }
)(App)

export default AppWithData;