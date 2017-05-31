import React from 'react';
import { Link } from 'react-router-dom';

import TextField from 'material-ui/TextField';

import CorpusStore from '../../stores/CorpusStore';

export default class StainedGlass extends React.Component {

  constructor() {
    super();

    this.state = {
      filteredItems: []
    }

    this._handleNameInputChange = this._handleNameInputChange.bind(this);
  }

  /**
   * Handle changes on the name filter TextField
   */
  _handleNameInputChange(e, v) {
    this.setState({
      filteredItems: v.length > 1 ? CorpusStore.filterByName(v) : []
    });
  }

  render() {
    return (
      <div>
        <h1>Rechercher un vitrail</h1>
        <Link to='/'>Dashboard</Link>
        <TextField
          floatingLabelText="Rechercher par nom"
          onChange={(e, v) => this._handleNameInputChange(e, v)}
        />
        <div>
          {
            this.state.filteredItems.map(item => <div>{item.name}</div>)
          }
        </div>
      </div>
    )
  }

}
