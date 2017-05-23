import React from 'react';
import { Link } from 'react-router-dom';

export default class Badge extends React.Component {

    render() {
        return (
            <div>
                Badge page <br />
                <Link to='/'>Dashboard</Link>
            </div>
        )
    }

}
