import React from 'react';
import { Link } from 'react-router-dom';

export default class StainedGlass extends React.Component {

  render() {
    return (
      <div>
        StainedGlass page <br />
        <Link to='/'>Dashboard</Link>
      </div>
    )
  }

}
