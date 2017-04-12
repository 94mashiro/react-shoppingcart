import React, { Component } from 'react';
import InputBar from './inputbar'
import AppList from './applist'


class App extends Component {
  render() {
    return (
      <div style={{}}>
        <InputBar />
        <AppList />
      </div>
    );
  }
}

export default App;