import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Path from './pages/Path.jsx';
import MyPath from './pages/MyPath.jsx';
import AppBar from 'material-ui/AppBar';

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
                        <Route exact path='/' component={Path} />
                        <Route exact path='/mypath' component={MyPath} />
                    </Switch>
                </div>
            </div>
        );
    }

}
