import React from 'react';
import { Link } from 'react-router-dom';

export default class StainedGlass extends React.Component {

  render() {
    return (
      <div>
        <h1>Rechercher un vitrail</h1>
        <Link to='/'>Dashboard</Link>
      </div>
    )
  }

}
