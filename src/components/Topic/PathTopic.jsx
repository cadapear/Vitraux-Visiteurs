import React from 'react';

export default class PathTopic extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            narrowers: props.narrowers,
            topic: props.topic
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            topic: nextProps.topic,
            narrowers: nextProps.narrowers
        })
    }

    render() {
        return (
            <div>
                <div onClick={this.props.navigate}>
                    {`${this.state.topic} [${this.state.narrowers}]`}
                </div>
                <div onClick={this.props.addToMyPath}>
                    +
                </div>
            </div>
        );
    }

}