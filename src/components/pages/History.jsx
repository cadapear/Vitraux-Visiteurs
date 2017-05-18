import React from 'react';
import { Link } from 'react-router-dom';

export default class History extends React.Component {

  render() {
    return (
      <div>
        History page <br />
        <Link to='/'>Dashboard</Link>
      </div>
    )
  }

}
