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
              
                <Row>
                    <Col xs={12} sm={3}>

                    </Col>
                    <Col xs={12} sm={3}>
                        <Link to='/my-path'>
                        <img src="http://localhost:8080/assets/img/map.png" width="75px" height="75px" /> <br/>
                        Mon parcours
                    </Link>
                    </Col>
                    <Col xs={12} sm={3}>
                        <Link to='/stained-glass'>
                    <img src="http://localhost:8080/assets/img/search.ico" width="75px" height="75px" /> <br/>
                    Vitraux
                    </Link>
                    </Col>
                    <Col  xs={12} sm={3}>

                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={3}>

                    </Col>
                    <Col  xs={12} sm={3}>
                    <Link to='/badge'>
                    <img src="http://localhost:8080/assets/img/badge.png" width="75px" height="75px" /> <br/>
                    Mes badges
                    </Link>
                    </Col>
                    <Col xs={12} sm={3}>
                    <Link to='/history'>
                    <img src="http://localhost:8080/assets/img/history.png" width="75px" height="75px" /> <br/>
                    Mon historique
                    </Link>
                    </Col>
                    <Col  xs={12} sm={3}>

                    </Col>
                </Row>


            </div>
        )
    }

}
