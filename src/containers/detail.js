import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react'
import { connect } from 'react-redux'
import { fetchAppPrice, parseAppInfo  } from '../utils/api'

class Detail extends Component {

  constructor() {
    super()
    this.state = {
      name:'',
      priceObj: {
        price: [],
        date: []
      }
    }
  }
  
  componentWillMount() {
    const id = this.props.params.id
    this.parseAppInfo(id)
    this.parseAppPrice(id)
  }

  componentDidMount() {
  }

  parseAppPrice(id) {
    let price = []
    let date = []
    fetchAppPrice(id)
      .then(lists => {
        for (var i in lists) {
          date.push(lists[i].date)
          price.push(lists[i].price)
        }
        this.setState({
          ...this.state,
          priceObj: {
            date,
            price
          }
        })
        this.forceUpdate()
      })
  }

  parseAppInfo(id) {
    parseAppInfo(id)
      .then(info => {
        this.setState({
          ...this.state,
          name: info.name
        })
        this.forceUpdate()
      })
      .catch(err => console.log(err))
  }

  getOption() {
    const option = {
    title: {
        text: this.state.name
    },
    tooltip: {
        trigger: 'axis'
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        data: this.state.priceObj.date
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name:'价格',
            type:'line',
            step: 'end',
            data: this.state.priceObj.price
        }
    ]
  }
  return option
  }

  render() {
    return (
      <div>
        <ReactEcharts 
          option={this.getOption()}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    info: state.currentApp
  }
}

export default connect(mapStateToProps)(Detail);