import React from 'react';
import { Switch, Link, Route } from 'react-router-dom';

import Path from './pages/Path.jsx';

require('../style/main.scss');

export default class App extends React.Component {

    render() {
        return (
            <div>
                <header className="bar bar-nav">
                    <h1 className="title">Vitraux Visiteurs <span id="courses-num" className="badge">0</span></h1>
                </header>
                <div className="app-container">
                    <Switch>
                        <Route exact path='/' component={Path}/>
                    </Switch>
                </div>
            </div>
        );
    }

}
