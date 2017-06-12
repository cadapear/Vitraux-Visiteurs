import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { Link } from 'react-router-dom';

import Map from '../map/Map.jsx';

import Chip from 'material-ui/Chip';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';

import ArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import PlaceIcon from 'material-ui/svg-icons/maps/place';
import MapIcon from 'material-ui/svg-icons/maps/map';

import CorpusStore from '../../stores/CorpusStore';
import ViewpointStore from '../../stores/ViewpointStore';

export default class stainedGlassDetails extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      stainedGlass: null,
      chuchPlan: null
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

      this.setState({
          stainedGlass,
          chuchPlan: CorpusStore.getChurchPlan(stainedGlass.name[0])
      });
    }
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
                <Row className="fullheight-row">
                    <Col xs={12} sm={6} className="details-col">
                        <h1 className="subtitle" id="top">{this.state.stainedGlass.name[0]}</h1>
                        <div className="go-back-link">
                            <Link to="/stained-glass">Retour aux vitraux</Link>
                        </div>
                        <div className="details-block">
                            <h2>Localisation</h2>
                            {
                                this.state.stainedGlass.spatial[0]
                            }
                            <div className="actions-container">
                                <RaisedButton
                                    label="Voir sur la carte"
                                    labelPosition="before"
                                    secondary={true}
                                    icon={<PlaceIcon />}
                                    onClick={_ => document.getElementById("map").scrollIntoView()}
                                />
                                {
                                    this.state.chuchPlan &&
                                    <RaisedButton
                                        label="Voir le plan du lieu"
                                        labelPosition="before"
                                        primary={true}
                                        icon={<MapIcon />}
                                        onClick={_ => document.getElementById("plan").scrollIntoView()}
                                    />
                                }
                            </div>
                        </div>
                        <div className="details-block">
                            <h2>Thèmes</h2>
                            <div>
                                {
                                    this.state.stainedGlass.topic.map(topic => <Chip className="path-chip" key={topic}>{topic}</Chip>)
                                }
                            </div>
                        </div>
                    </Col>
                    <Col className="fullheight-image-container stainedGlass-col" xs={12} sm={6}>
                        <img className="fullheight-image" src={this.state.stainedGlass.resource[0]} />
                    </Col>
                </Row>
                {
                    this.state.chuchPlan &&
                    <Row className="fullheight-row">
                        <Col xs={12} className="fullheight-image-container" id="plan">
                            <img className="fullheight-image" src={this.state.chuchPlan.resource[0]} />
                        </Col>
                    </Row>

                }
                <Row className="fullheight">
                    <Map location={this.state.stainedGlass.spatial[0]} />
                </Row>
                <FloatingActionButton
                    className="arrow-up-button"
                    secondary={true}
                    onClick={_ => document.getElementById("top").scrollIntoView()}
                >
                    <ArrowUp />
                </FloatingActionButton>
            </div>
        )
    }

}
