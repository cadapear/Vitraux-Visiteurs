import React from 'react';

import FlatButton from 'material-ui/FlatButton';

export default class TopicBreadcrumb extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      topics: props.topics
    }

    this._upTheTree = this._upTheTree.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({topics: nextProps.topics})
  }

  /**
   * Call the parent component method to up the tree
   */
  _upTheTree(topic) {
    this.props.upTheTree(topic);
  }

  render() {
    return (
        <div>
            <FlatButton key={-1} secondary={true} onClick={_ => this._upTheTree(null)} label="/" />
            {
                this.state.topics.map((topic, i) => {
                    return <FlatButton key={i} secondary={true} onClick={_ => this._upTheTree(topic.id)} label={topic.name} />
                })
            }
        </div>
    );
  }

}
