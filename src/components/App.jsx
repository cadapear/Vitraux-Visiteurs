import React from 'react';
import { Switch, Route } from 'react-router-dom';

import AppBar from 'material-ui/AppBar';

import Path from './pages/Path.jsx';
import MyPath from './pages/MyPath.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Badge from './pages/Badge.jsx';
import History from './pages/History.jsx';
import StainedGlass from './pages/StainedGlass.jsx';

require('../style/main.scss');

export default class App extends React.Component {

    render() {
        return (
            <div>
                <AppBar
                    title="Vitraux Visiteurs"
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                />
                <div className="app-container">
                    <Switch>
                        <Route exact path='/' component={Dashboard}/>
                        <Route path='/path' component={Path}/>
                        <Route path='/mypath' component={MyPath} />
                        <Route path='/badge' component={Badge}/>
                        <Route path='/history' component={History}/>
                        <Route path='/stained-glass' component={StainedGlass}/>
                    </Switch>
                </div>
            </div>
        );
    }

}
