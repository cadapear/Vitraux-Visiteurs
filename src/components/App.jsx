import React from 'react';
import { Switch, Link, Route } from 'react-router-dom';

import Home from './pages/Home.jsx';
import Path from './pages/Path.jsx';

export default class App extends React.Component {

  render() {
    return (
      <div>
        <nav>
          <ul>
            <li><Link to='/'>Dashboard</Link></li>
            <li><Link to='/path'>Parcours</Link></li>
          </ul>
        </nav>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/path' component={Path}/>
        </Switch>
      </div>
    );
  }

}
