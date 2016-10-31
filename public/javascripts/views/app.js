import React, { Component } from 'react'

class App extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-10 col-md-offset-1">
          <header className="header">
            <h1>Shoping Cart</h1>
          </header>
          {this.props.children}
          <footer className="header">
            <a href="">Github Repo</a>
          </footer>
        </div>
      </div>
    );
  }
}

export default App
