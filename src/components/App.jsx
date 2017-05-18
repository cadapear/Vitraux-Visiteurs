import React from 'react';
import { Switch, Link, Route } from 'react-router-dom';

import Home from './pages/Home.jsx';
import Path from './pages/Path.jsx';

require('../style/main.scss');

export default class App extends React.Component {

  render() {
        return (
            <div>
                { false &&
                <nav>
                    <ul>
                        <li><Link to='/'>Dashboard</Link></li>
                        <li><Link to='/path'>Parcours</Link></li>
                    </ul>
                </nav>
                }
                <header className="bar bar-nav">
                    <h1 className="title">Vitraux Visiteurs <span id="courses-num" className="badge">0</span></h1>
                </header>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/path' component={Path}/>
                </Switch>
      </div>
    );
  }

}
