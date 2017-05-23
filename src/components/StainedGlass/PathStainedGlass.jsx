import React from 'react';

export default class PathStainedGlass extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            stainedGlassName: props.stainedGlassName
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ stainedGlassName: nextProps.stainedGlassName })
    }

    render() {
        return (
            <div onClick={this.props.onClick}>
                {this.state.stainedGlassName}
            </div>
        );
    }

}