import React from 'react';
import { Row, Col } from 'react-flexbox-grid';

import Map from '../map/Map.jsx';

import Chip from 'material-ui/Chip';
import CircularProgress from 'material-ui/CircularProgress';

import CorpusStore from '../../stores/CorpusStore';
import ViewpointStore from '../../stores/ViewpointStore';

export default class stainedGlassDetails extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      stainedGlass: null
    }

    this._updateStainedGlass = this._updateStainedGlass.bind(this);
  }

  componentDidMount() {
    // listen the stores changes
    CorpusStore.addChangeListener(this._updateStainedGlass);
    // init component data
    this._updateStainedGlass();
  }

  componentWillUnmount() {
    // remove stores listeners
    CorpusStore.removeChangeListener(this._updateStainedGlass);
  }

  _updateStainedGlass() {
    const stainedGlass = CorpusStore.findById(this.props.match.params.id);

    if (stainedGlass) {
      // get the topics name of this stainedGlass
      stainedGlass.topic = stainedGlass.topic.map(topic => ViewpointStore.topics[topic.id]);
    }

    this.setState({stainedGlass});
    console.log(this.state.stainedGlass);
  }

  render() {
    if (!this.state.stainedGlass) {
      return (
        <div>
          <CircularProgress size={80} thickness={5} />
        </div>
      )
    }

    return (
      <div className="fullheight">
        <Row className="fullheight">
          <Col xs={12} sm={6}>
            <h1>{this.state.stainedGlass.name[0]}</h1>
            <div>
              <h2>Topics</h2>
              <div className="inline-chip-container">
                {
                  this.state.stainedGlass.topic.map(topic => <Chip key={topic.name} className="inline-chip">{topic.name}</Chip>)
                }
              </div>
            </div>
          </Col>
          <Col className="stainedGlass-image-container" xs={12} sm={6}>
            <img className="stainedGlass-image" src={this.state.stainedGlass.resource[0]} />
          </Col>
        </Row>
        <Row className="fullheight">
          <Map location={this.state.stainedGlass.spatial[0]} />
        </Row>
      </div>
    )
  }

}
