import React, { Component } from 'react'

class Item extends Component {
  render() {
    return (
        <div>
          <h1>{this.props.app.name}</h1>
          <h2>{this.props.app.price}</h2>
        </div>
    );
  }
}

export default Item
