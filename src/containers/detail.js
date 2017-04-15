import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react'
import { connect } from 'react-redux'
import { fetchAppPrice, parseAppInfo  } from '../utils/api'
import { Table } from 'antd';

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
        lists.forEach((item,index,input) => {
          input[index]['key'] = index+1
        })
        console.log(lists)
        this.setState({
          ...this.state,
          priceObj: {
            date,
            price
          },
          lists
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
    const columns = [{
      title: "Date",
      dataIndex: 'date'
    },{
      title: "Price",
      dataIndex: 'price'
    }]
    return (
      <div>
        <ReactEcharts 
          option={this.getOption()}/>
        <Table columns={columns} dataSource={this.state.lists} size="small" />
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