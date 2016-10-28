import React from 'react'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'

import App from './views/app'
import Index from './views/index'

const RouteConfig = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Index}/>
    </Route>
  </Router>
)

export default RouteConfig
