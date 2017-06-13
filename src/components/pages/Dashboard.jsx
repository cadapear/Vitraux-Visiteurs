import React from 'react';

import SearchIcon from 'material-ui/svg-icons/action/search';
import MapIcon from 'material-ui/svg-icons/maps/map';
import BadgesIcon from 'material-ui/svg-icons/social/poll';
import HistoryIcon from 'material-ui/svg-icons/action/history';

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
                            <SearchIcon className="dashboard-icon" />
                        </div>
                        <div className="dashboard-label">
                            Vitraux
                        </div>
                    </div>
                </div>
                <div className="dashboard-item fade border-left" onClick={_ => this._redirect('/my-path')}>
                    <div className="dashboard-item-link">
                        <MapIcon className="dashboard-icon" />
                        <div className="dashboard-label">
                            Mon parcours
                        </div>
                    </div>
                </div>
                <div className="dashboard-item fade border-top" onClick={_ => this._redirect('/badge')}>
                    <div className="dashboard-item-link">
                        <BadgesIcon className="dashboard-icon" />
                        <div className="dashboard-label">
                            Mes badges
                        </div>
                    </div>
                </div>
                <div className="dashboard-item fade border-top border-left" onClick={_ => this._redirect('/history')}>
                    <div className="dashboard-item-link">
                        <HistoryIcon className="dashboard-icon" />
                        <div className="dashboard-label">
                            Mon historique
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
