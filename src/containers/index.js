import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router'
import App from './app'
import Detail from './detail'

class Index extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={App} />
        <Route path="/hook" component={App}/>
        <Route path="/detail/:id" component={Detail} /> 
      </Router>
    );
  }
}


export default Index;