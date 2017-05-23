import React from 'react';
import { Link } from 'react-router-dom';

export default class Dashboard extends React.Component {

    render() {
        return (
            <div>
                Dashboard
                <ul>
                    <li><Link to='/path'>Parcours</Link></li>
                    <li><Link to='/badge'>Mes Badges</Link></li>
                    <li><Link to='/history'>Mon Historique</Link></li>
                    <li><Link to='/stained-glass'>Vitrail</Link></li>
                </ul>
            </div>
        )
    }

}
