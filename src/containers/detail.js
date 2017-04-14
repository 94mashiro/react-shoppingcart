import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react'
import { connect } from 'react-redux'

class Detail extends Component {

  constructor() {
    super()
  }
  
  componentWillMount() {
    console.log(this.props.info.priceObj)
  }

  componentDidMount() {
  }

  getOption() {
    const option = {
    title: {
        text: this.props.info.name
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
        data: this.props.info.priceObj.date
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name:'价格',
            type:'line',
            step: 'end',
            data: this.props.info.priceObj.price
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