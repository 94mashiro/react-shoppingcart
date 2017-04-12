import React, { Component } from 'react'
import { fetchAppList } from '../utils/api'
import AppInfo from '../components/appinfo'
import { connect } from 'react-redux'
import { initApps } from '../reducers/app'

class AppList extends Component {

  constructor() {
    super()
    this.state = {}
  }

  componentWillMount() {
    fetchAppList()
      .then(lists => {
        this.props.initApps(lists)
      })
      .catch(err => console.log(err))
  }

  
  handleClickButton() {
    console.log(this.state.apps)
  }
  

  render() {
    return (
      <div style={{marginTop:'40px', display:'flex', flexWrap:'wrap', justifyContent: 'flex-start'}}>
        {this.props.apps.map((info, index)=>{
          return (
            <AppInfo info={info} key={index} />
          )
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    apps: state.apps
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    initApps: (apps) => {
      dispatch(initApps(apps))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppList)