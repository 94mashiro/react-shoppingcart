import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Row, Col } from 'antd'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import appReducer from './reducers/app'
import 'antd/dist/antd.css';


const store = createStore(appReducer)

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);
