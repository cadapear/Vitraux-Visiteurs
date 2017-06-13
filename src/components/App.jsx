import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import AppBar from 'material-ui/AppBar';
import Path from './pages/Path.jsx';
import MyPath from './pages/MyPath.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Badge from './pages/Badge.jsx';
import History from './pages/History.jsx';
import StainedGlassDetails from './pages/StainedGlassDetails.jsx';

require('../style/main.scss');

export default class App extends React.Component {

    render() {
        return (
            <div>
                <AppBar
                    title={<Link className="appbar-title" to='/'>Vitraux visiteurs</Link>}
                    iconElementLeft={<span></span>}
                />
                <div className="app-container">
                    <Switch>
                        <Route exact path='/' component={Dashboard}/>
                        <Route path='/stained-glass/:id' component={StainedGlassDetails}/>
                        <Route path='/stained-glass' component={Path}/>
                        <Route path='/my-path' component={MyPath} />
                        <Route path='/badge' component={Badge}/>
                        <Route path='/history' component={History}/>
                    </Switch>
                </div>
            </div>
        );
    }

}
