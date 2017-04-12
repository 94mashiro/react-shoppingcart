import React, { Component } from 'react';
import {fetchAppInfo} from './utils/api'
import { Row, Col, Layout, Menu, Icon, Breadcrumb  } from 'antd'
import Index from './containers/index'
const { SubMenu } = Menu
const { Header, Content, Footer, Sider } = Layout

class App extends Component {

  constructor(){
    super()
    this.state = {
      url: ''
    }
  }

  handleChangeUrl(e){
    this.setState({
      url: e.target.value
    })
  }

  handleClick(){
    const url = this.state.url
    fetchAppInfo(url).then((info) => console.log(info))
    this.setState({url:''})
  }

  handleClickMenu(e){
    console.log(e.key)
  }

  render() {
    return (
      <div>
        <Row>
          <Col span={22} offset={1}>
          <Layout style={{background: '#fff'}}>
            <Content style={{ padding: '0 50px' }}>
      <Layout style={{ padding: '24px 0', background: '#fff' }}>
        <Sider width={100} style={{ background: '#fff' }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            style={{ height: '100%' }}
            onClick={this.handleClickMenu}
          >
            <Menu.Item key="1">App List</Menu.Item>
            <Menu.Item key="2">Hook URL</Menu.Item>
          </Menu>
        </Sider>
        <Content style={{ padding: '0 24px', minHeight: 280 }}>
          <Index />
        </Content>
      </Layout>
    </Content>
    <Footer style={{ textAlign: 'center' }}>
      <a href="https://github.com/MashiroWang/react-shoppingcart">Github Repo</a>
    </Footer>
          </Layout>
          </Col>
        </Row>
      </div>
    )
  }
}

export default App;
