import React from 'react'

import FlatButton from 'material-ui/FlatButton';
import ArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import ArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import Clear from 'material-ui/svg-icons/content/clear';
import { List, ListItem } from 'material-ui/List';
import { Link } from 'react-router-dom';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';

import PathHelper from '../../helpers/PathHelper';
import MapWithPath from "../map/MapWithPath.jsx";

export default class MyPath extends React.Component {

    constructor() {
        super()

        this.state = {
            myPath: [],
            pathDuration: "0",
            pathDistance: "0",
            showPathDetails: false
        }

        this._redirectToPathHome = this._redirectToPathHome.bind(this);
        this._setPathInformation = this._setPathInformation.bind(this);
        this._toggleFooter = this._toggleFooter.bind(this);
        this._clearPath = this._clearPath.bind(this);
        this._removeStainedGlass = this._removeStainedGlass.bind(this);
    }

    componentDidMount() {
        this.setState({ myPath: PathHelper.read() })
    }

    _setPathInformation(pathDuration, pathDistance) {
        this.setState({ pathDuration, pathDistance });
    }

    _toggleFooter() {
        this.setState({ showPathDetails: !this.state.showPathDetails });
    }

    /**
     * Call the PathHelper method to clear the path
     */
    _clearPath() {
        PathHelper.clean().then(_ => this.setState({
            myPath: [],
            showPathDetails: false
        }));
    }

    /**
     - Remove a stained glass from my path and update it in the state
     */
    _removeStainedGlass(id) {
        PathHelper.remove(id).then(updatedPath => this.setState({
            myPath: updatedPath
        }));
    }

    /**
     * Redirect the user to the path building page
     */
    _redirectToPathHome() {
        this.props.history.push('/');
    }

    render() {
        return (
            <div className="fullheight">
                <MapWithPath path={this.state.myPath} setPathInformation={this._setPathInformation} />
                {
                    this.state.showPathDetails
                    ?
                        <div className="footer-container opened">
                            <div className="toggle-icon">
                                <ArrowDown onClick={this._toggleFooter} />
                            </div>
                            <RaisedButton secondary={true} label="Vider mon parcours" onClick={this._clearPath} />
                            <List>
                                {
                                    this.state.myPath.map(element =>
                                        <ListItem
                                            primaryText={<Link to={`/stained-glass/${element.id}`}>{element.name}</Link>}
                                            leftAvatar={<Avatar src={element.thumbnail[0]}/>}
                                            rightIcon={<Clear onClick={_ => this._removeStainedGlass(element.id)}/>} />
                                    )
                                }
                            </List>
                        </div>
                    :
                        <div className="footer-container closed">
                            {
                          `     ${this.state.pathDistance} Km - ${this.state.pathDuration}`
                            }
                            <div className="toggle-icon">
                                <ArrowUp onClick={this._toggleFooter} />
                            </div>
                        </div>
              }
          </div>
        )
    }

}
