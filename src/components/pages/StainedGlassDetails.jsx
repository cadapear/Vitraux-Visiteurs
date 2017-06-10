import React from 'react';
import { Row, Col } from 'react-flexbox-grid';

import Map from '../map/Map.jsx';

import Chip from 'material-ui/Chip';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';

import ArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import PlaceIcon from 'material-ui/svg-icons/maps/place';

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
      // get all the possible topic paths for this stained glass
      stainedGlass.topic = stainedGlass.topic.map(topic => ViewpointStore.getTopicPath(topic.id));
    }

    this.setState({stainedGlass});
  }

  render() {
    if (!this.state.stainedGlass) {
      return (
        <div className="fullheight progress-container">
            <div className="progress">
                <CircularProgress size={80} thickness={5} />
                <div>
                    Chargement du vitrail...
                </div>
            </div>
        </div>
      )
    }

    return (
      <div className="fullheight">
        <Row className="fullheight">
          <Col xs={12} sm={6} className="details-col">
              <div className="details-col-data">
                  <h1 className="details-title" id="top">{this.state.stainedGlass.name[0]}</h1>
                  <div className="details-block">
                      <h2>Localisation</h2>
                      {
                          this.state.stainedGlass.spatial[0]
                      }
                      <div>
                          <RaisedButton
                            label="Voir sur la carte"
                            labelPosition="before"
                            secondary={true}
                            icon={<PlaceIcon />}
                            onClick={_ => document.getElementById("map").scrollIntoView()}
                          />
                      </div>
                  </div>
                  <div className="details-block">
                    <h2>Topics</h2>
                    <div>
                      {
                        this.state.stainedGlass.topic.map(topic => <Chip className="path-chip" key={topic}>{topic}</Chip>)
                      }
                    </div>
                  </div>
              </div>
          </Col>
          <Col className="stainedGlass-image-container" xs={12} sm={6}>
            <img className="stainedGlass-image" src={this.state.stainedGlass.resource[0]} />
          </Col>
        </Row>
        <Row className="fullheight">
          <Map location={this.state.stainedGlass.spatial[0]} />
          <FloatingActionButton
              className="arrow-up-button"
              secondary={true}
              onClick={_ => document.getElementById("top").scrollIntoView()}
          >
              <ArrowUp />
          </FloatingActionButton>
        </Row>
      </div>
    )
  }

}
