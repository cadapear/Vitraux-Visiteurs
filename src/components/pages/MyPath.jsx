import React from 'react'

import PathHelper from '../../helpers/PathHelper'
import MapWithPath from "../map/MapWithPath.jsx"

export default class MyPath extends React.Component {

    constructor() {
        super()

        this.state = {
            myPath: null
        }

        this._redirectToPathHome = this._redirectToPathHome.bind(this)
    }

    componentDidMount() {
        this.setState({ myPath: PathHelper.read() })
    }

    /**
     * Redirect the user to the path building page
     */
    _redirectToPathHome() {
        this.props.history.push('/')
    }

    render() {
        return (
          <div className="fullheight">
              <MapWithPath path={this.state.myPath}/>
          </div>
        )
    }

}
