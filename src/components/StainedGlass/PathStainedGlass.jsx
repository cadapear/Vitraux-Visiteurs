import React from 'react';
import { Link } from 'react-router-dom'

import RaisedButton from 'material-ui/RaisedButton';

export default class PathStainedGlass extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            stainedGlass: props.stainedGlass,
            id: props.id
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            stainedGlass: nextProps.stainedGlass,
            id: nextProps.id
        });
    }

    render() {
        if (!this.state.stainedGlass) {
            return <div></div>
        }

        return (
            <div className="stained-glass">
                <div className="stained-glass-image-container">
                    <img className="stained-glass-image" src={this.state.stainedGlass.thumbnail} alt={this.state.stainedGlass.name} />
                </div>
                <div>
                    <div className="stained-glass-name">
                        <Link to={`/stained-glass/${this.state.id}`}>{this.state.stainedGlass.name}</Link>
                    </div>
                    <div className="stained-glass-action">
                        <RaisedButton
                            label="Ajouter au parcours"
                            secondary={true}
                            onClick={this.props.addToMyPath}
                        />
                    </div>
                </div>
            </div>
        );
    }

}
