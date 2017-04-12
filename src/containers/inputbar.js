import React, { Component } from 'react';
import { Input, Button, Row, Col } from 'antd'
import { fetchAppInfo } from '../utils/api'
import { connect } from 'react-redux'
import { addApp } from '../reducers/app'

class InputBar extends Component {

  constructor() {
    super()
    this.state = {
      url: ''
    }
  }

  handleSubmit(){
    if (!this.state.url) return
    fetchAppInfo(this.state.url)
      .then(info => {
        const status = info.status
        if (status) {
          this.props.addApp(info)
        } else {
          console.log(info.message)
        }
        this.setState({url:''})
      })
      .catch(err => console.error(err))
  }

  handleChange(e){
    this.setState({
      url: e.target.value
    })
  }

  render() {
    return (
      <div>
        <Row>
          <Col span={22} offset={2}>
            <Col span={18}>
              <Input onChange={this.handleChange.bind(this)} value={this.state.url} />
            </Col>
            <Col span={4} offset={1}>
              <Button type="primary" icon="plus" onClick={this.handleSubmit.bind(this)}>
                Add It
              </Button>
            </Col>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    addApp: (app) => {
      dispatch(addApp(app))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(InputBar)