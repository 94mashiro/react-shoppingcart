import React, { Component } from 'react'
import request from 'superagent'
import Item from './item'

class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      apps: [],
      adding: false,
      appUrl: '',
      hookUrl: ''
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

  addHook() {
    console.log(this.state.hookUrl);
    request
      .post('./api/sethook')
      .send({
        url: this.state.hookUrl
      })
      .end((err, res) => {
        console.log('ok');
      })
  }

  handleUrlChange(e) {
    this.state.appUrl = e.target.value
  }

  handleHookUrlChange(e) {
    this.state.hookUrl = e.target.value
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
        <button onClick={this.add.bind(this)}>addit1</button>
        <input type="text" placeholder="webhook" onChange={this.handleHookUrlChange.bind(this)}/>
        <button onClick={this.addHook.bind(this)}>addHook1</button>
        {appItems}
      </div>
    );
  }
}

export default Index
