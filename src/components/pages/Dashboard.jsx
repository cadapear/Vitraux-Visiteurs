import React from 'react';
import { Link } from 'react-router-dom';

import { Row, Col } from 'react-flexbox-grid';
import RaisedButton from 'material-ui/RaisedButton';
import ActionAndroid from 'material-ui/svg-icons/action/android';
import FontIcon from 'material-ui/FontIcon';

const styles = {
    button: {
        margin: 12,
    },
    exampleImageInput: {
        cursor: 'pointer',
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        width: '100%',
        opacity: 0,
    },
};

export default class Dashboard extends React.Component {

    render() {
        return (
            <div>
                <Row className="dashboard-row" center="xs">
                    <Col xs={6}>
                        <Link to='/stained-glass'>
                            <div>
                                <img className="dashboard-icon" src="/assets/img/search.ico" />
                            </div>
                            Vitraux
                        </Link>
                    </Col>
                    <Col xs={6}>
                        <Link to='/my-path'>
                            <div>
                                <img className="dashboard-icon" src="/assets/img/map.png" />
                            </div>
                            Mon parcours
                        </Link>
                    </Col>
                </Row>
                <Row className="dashboard-row" center="xs">
                    <Col xs={6}>
                        <Link to='/badge'>
                            <div>
                                <img className="dashboard-icon" src="/assets/img/badge.png" />
                            </div>
                            Mes badges
                        </Link>
                    </Col>
                    <Col xs={6}>
                        <Link to='/history'>
                            <div>
                                <img className="dashboard-icon" src="/assets/img/history.png" />
                            </div>
                            Mon historique
                        </Link>
                    </Col>
                </Row>
            </div>
        )
    }

}
