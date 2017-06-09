import React from 'react';
import ReactDOM from 'react-dom';

// material ui
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import themeConfiguration from './config/theme';
const muiTheme = getMuiTheme(themeConfiguration);

import { BrowserRouter } from 'react-router-dom'

import App from './components/App.jsx';

// inject material-ui plugin (to handle touch events)
injectTapEventPlugin();

ReactDOM.render (
    <MuiThemeProvider muiTheme={muiTheme}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </MuiThemeProvider>,
    document.getElementById('app')
);
