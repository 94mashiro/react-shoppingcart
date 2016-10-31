import React, { Component } from 'react'
import request from 'superagent'
import nprogress from 'nprogress'
import notie from 'notie'
import Item from './item'


class Index extends Component {
  constructor(props) {
    super(props)
    nprogress.start()
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
        nprogress.done()
        const oldState = this.state
        console.log('res.body', res.body);
        oldState.apps.push(res.body)
        this.setState(
          Object.assign({}, oldState)
        )
        console.log('after state',this.state);
        notie.alert(1,"添加成功",1)
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
        notie.alert(1,"设置成功",1)
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
        <div className="form-horizontal">
          <div className="form-group">
            <div className="row">
              <div className="col-sm-8 col-sm-offset-2">
                <div className="col-sm-9">
                  <input type="text" className="form-control" placeholder="" onChange={this.handleUrlChange.bind(this)}/>
                </div>
                <div className="col-sm-3">
                  <button className="btn btn-default form-control" onClick={this.add.bind(this)}>添加应用</button>
                </div>
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col-sm-8 col-sm-offset-2">
                <div className="col-sm-9">
                  <input type="text" className="form-control" placeholder="" onChange={this.handleHookUrlChange.bind(this)}/>
                </div>
                <div className="col-sm-3">
                  <button className="btn btn-default form-control" onClick={this.addHook.bind(this)}>设置钩子</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-8 col-sm-offset-2">
            <div className="list-group">
              {appItems}
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default Index
