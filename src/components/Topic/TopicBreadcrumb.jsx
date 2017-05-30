import React from 'react';

export default class TopicBreadcrumb extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      topics: props.topics
    }

    this._buildBreadcrumb = this._buildBreadcrumb.bind(this);
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

  /**
   * Build the topic breadcrumb
   * Seperate each topic name by ' > '
   * On click on an item, call the _upTheTree method
   */
  _buildBreadcrumb() {
    let items = [<span key={-1} onClick={_ => this._upTheTree(null)}>/</span>];

    for (let i = 0; i < this.state.topics.length; i++) {
      items.push(<span key={i} onClick={_ => this._upTheTree(this.state.topics[i].id)}>{" > " + this.state.topics[i].name}</span>)
    }

    return items;
  }

  render() {
    return (
        <div>
          {this._buildBreadcrumb()}
        </div>
    );
  }

}
