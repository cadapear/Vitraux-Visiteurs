import React from 'react';
import { Col } from 'react-flexbox-grid';

import FlatButton from 'material-ui/FlatButton';

export default class PathTopic extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            narrowers: props.narrowers,
            items: props.items,
            topic: props.topic
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            items: nextProps.items,
            topic: nextProps.topic,
            narrowers: nextProps.narrowers,
        })
    }

    render() {
        return (
            <Col xs={12} sm={6} md={3}>
                <div className="topic-container">
                    <div>
                        <FlatButton
                            label={`${this.state.topic} ${this.state.narrowers > 0 ? `(${this.state.narrowers})` : ''}`}
                            onClick={this.props.navigate}
                            />
                    </div>
                    <div>
                        <FlatButton
                            label="Ajouter à mon parcours"
                            secondary={true}
                            onClick={this.props.addToMyPath}
                            />
                    </div>
                </div>
            </Col>
        );
    }

}
