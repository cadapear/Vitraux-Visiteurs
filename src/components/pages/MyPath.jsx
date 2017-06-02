import React from 'react';

import RaisedButton from 'material-ui/RaisedButton';

export default class MyPath extends React.Component {

    constructor() {
        super();

        this._redirectToPathHome = this._redirectToPathHome.bind(this);
    }

    /**
     * Redirect the user to the path building page
     */
    _redirectToPathHome() {
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                my path
                <RaisedButton label="Retour" secondary={true} onClick={this._redirectToPathHome} />
            </div>
        );
    }

}
