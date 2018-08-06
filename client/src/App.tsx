import * as React from 'react';
import './App.css';
import logo from './logo.svg';
import './wc/switcher/main';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Shelter pelter</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <insum-switcher data-model="1">
          <insum-switcher-option />
        </insum-switcher>
      </div>
    );
  }
}

export default App;
