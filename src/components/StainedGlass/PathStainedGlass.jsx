import React from 'react';

import { Link } from 'react-router-dom'

export default class PathStainedGlass extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: props.name,
            id: props.id
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
          name: nextProps.name,
          id: nextProps.id
        })
    }

    render() {
      return (
        <div>
          <div>
            {this.state.name}
          </div>
          <div onClick={this.props.addToMyPath}>
            +
          </div>
          <Link to={`/stained-glass/${this.state.id}`}>Voir</Link>
        </div>
      );
    }

}
