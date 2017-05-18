import React from 'react';
import { Switch, Link, Route } from 'react-router-dom';

import Dashboard from './pages/Dashboard.jsx';
import Path from './pages/Path.jsx';
import Badge from './pages/Badge.jsx';
import History from './pages/History.jsx';
import StainedGlass from './pages/StainedGlass.jsx';

export default class App extends React.Component {

  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={Dashboard}/>
          <Route path='/path' component={Path}/>
          <Route path='/badge' component={Badge}/>
          <Route path='/history' component={History}/>
          <Route path='/stained-glass' component={StainedGlass}/>
        </Switch>
      </div>
    );
  }

}
