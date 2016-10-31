import React, { Component } from 'react'

class Item extends Component {
  render() {
    return (
        <div className="list-group-item media">
            <div className="media-left">
              <img className="img-circle" src={this.props.app.icon} alt="" width="75" height="75"/>
            </div>
            <div className="media-body">
              <a href={this.props.app.url} className="title">{this.props.app.name}</a>
              <br/>
              {this.props.app.price}
            </div>
        </div>
    );
  }
}

export default Item
