import React from 'react';
import { Link } from 'react-router-dom';

import { Row, Col } from 'react-flexbox-grid';
import RaisedButton from 'material-ui/RaisedButton';
import ActionAndroid from 'material-ui/svg-icons/action/android';
import FontIcon from 'material-ui/FontIcon';

export default class Dashboard extends React.Component {

    constructor(props) {
        super(props);

        this._redirect = this._redirect.bind(this);
    }

    _redirect(route) {
        this.props.history.push(route);
    }

    render() {
        return (
            <div className="fullheight dashboard">
                <div className="dashboard-item fade" onClick={_ => this._redirect('/stained-glass')}>
                    <div className="dashboard-item-link">
                        <div>
                            <img className="dashboard-icon" src="/assets/img/search.ico" />
                        </div>
                        Vitraux
                    </div>
                </div>
                <div className="dashboard-item fade" onClick={_ => this._redirect('/my-path')}>
                    <div className="dashboard-item-link">
                        <div>
                            <img className="dashboard-icon" src="/assets/img/map.png" />
                        </div>
                        Mon parcours
                    </div>
                </div>
                <div className="dashboard-item fade" onClick={_ => this._redirect('/badge')}>
                    <div className="dashboard-item-link">
                        <div>
                            <img className="dashboard-icon" src="/assets/img/badge.png" />
                        </div>
                        Mes badges
                    </div>
                </div>
                <div className="dashboard-item fade" onClick={_ => this._redirect('/history')}>
                    <div className="dashboard-item-link">
                        <div>
                            <img className="dashboard-icon" src="/assets/img/history.png" />
                        </div>
                        Mon historique
                    </div>
                </div>
            </div>
        )
    }

}
