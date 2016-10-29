import React, { Component } from 'react'
import request from 'superagent'
import Item from './item'

class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      apps: [],
      adding: false,
      appUrl: ''
    }
    request
      .get('/api/app')
      .end((err, res) => {
        if (err) {
          console.log(err);
        } else {
          this.setState({
            apps: res.body
          })
        }
      })
  }

  add() {
    console.log('before state', this.state);
    request
      .post('/api/app')
      .send({
        url: this.state.appUrl
      })
      .end((err,res) => {
        const oldState = this.state
        console.log('res.body', res.body);
        oldState.apps.push(res.body)
        this.setState(
          Object.assign({}, oldState)
        )
        console.log('after state',this.state);
      })
  }

  handleUrlChange(e) {
    this.state.appUrl = e.target.value
  }

  render() {
    let appItems = []
    console.log(this.state);
    if (this.state.apps.length != 0) {
      appItems = this.state.apps.map(function(app) {
        return (
          <Item app={app} key={app.id}></Item>
        )
      })
    }
    return (
      <div>
        <input type="text" onChange={this.handleUrlChange.bind(this)}/>
        <button onClick={this.add.bind(this)}>addit</button>
        {appItems}
      </div>
    );
  }
}

export default Index
