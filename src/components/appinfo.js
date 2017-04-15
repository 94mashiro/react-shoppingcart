import React, { Component, PropTypes } from 'react';
import { Link, browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { setCurrentApp } from '../reducers/app'
import { fetchAppPrice } from '../utils/api'

class AppInfo extends Component {
  static propTypes = {
    info: PropTypes.object
  }

  handleClick(e) {
    let date = []
    let price = []
    fetchAppPrice(this.props.info.id)
      .then(lists => {
        console.log(lists)
        for (var i in lists) {
          date.push(lists[i].date)
          price.push(lists[i].price)
        }
        let priceObj = {date,price}
        this.props.setCurrentApp({...this.props.info, priceObj})
        browserHistory.push(`/detail/${this.props.info.id}`)
      })
    
  }

  render() {
    const status = this.props.info.status
    let colorStyle = {}
    if (status === 1) {
      colorStyle = {color: '#7BA23F'}
    } else if (status === 2) {
      colorStyle = {color: '#D0104C'}
    }
    return (
      <div style={{flex:'1', flexGrow:0, margin:'10px 25px', flexBasis: '100px'}}>
        <span onClick={this.handleClick.bind(this)}>
          <img 
            alt=""
            src={this.props.info.icon} 
            style={{
              marginBottom:'10px', width:'100px', height:'100px', borderRadius:'20px', boxShadow:'0 4px 3px -2px rgba(0, 0, 0, 0.8)'
            }}/>
        </span>
        <br/>
        {this.props.info.name.split('-')[0].substr(0,10)}
        <br/>
        <b style={colorStyle}>{this.props.info.price} RMB</b>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentApp: (app) => {
      dispatch(setCurrentApp(app))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(AppInfo)