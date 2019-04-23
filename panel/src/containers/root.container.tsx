import * as React from "react";

import Test from "../components/Test";

import { Route, Router } from "react-router";
import { createBrowserHistory } from "history";
import { TopBlock } from "../components/top-block";
import { TopMenu } from "../components/top-menu";

import '../assets/css/root.css'
const Hostory = createBrowserHistory();


export default class RootContainer extends React.Component<any, any> {
  render() {

    return (
      <div className="app">
        <TopBlock />
        <TopMenu />

        <Router history={Hostory}>
          <div>
            <Route path='/topics' component={Test} />
          </div>
        </Router>
      </div>
    );
  }
}
