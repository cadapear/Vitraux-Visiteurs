import React from 'react'
import { Row, Col } from 'react-flexbox-grid';

import PathHelper from '../../helpers/PathHelper';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';

import PathTopic from '../Topic/PathTopic.jsx';
import PathStainedGlass from '../StainedGlass/PathStainedGlass.jsx';
import TopicBreadcrumb from '../Topic/TopicBreadcrumb.jsx';

import ViewpointStore from '../../stores/ViewpointStore';
import CorpusStore from '../../stores/CorpusStore';

export default class Path extends React.Component {

    constructor() {
        super();

        this.state = {
            viewpoints: [],
            corpora: [],
            topics: [],
            upperTopics: [],
            filteredItems: [],
            currentTopicStack: [],
            snackbar: "",
            pathItemsCount: 0
        };

        // binding
        this._showMyPath = this._showMyPath.bind(this);
        this._navigateBack = this._navigateBack.bind(this);
        this._navigateThoughTopic = this._navigateThoughTopic.bind(this);
        this._addTopicToMyPath = this._addTopicToMyPath.bind(this);
        this._addStainedGlassToMyPath = this._addStainedGlassToMyPath.bind(this);
        this._getStainedGlasses = this._getStainedGlasses.bind(this);
        this._findItemInCorpus = this._findItemInCorpus.bind(this);
        this._upTheTree = this._upTheTree.bind(this);
        this._hideSnackbar = this._hideSnackbar.bind(this);

        this._setViewpoints = this._setViewpoints.bind(this);
        this._setCorpora = this._setCorpora.bind(this);

        this._handleNameInputChange = this._handleNameInputChange.bind(this);
    }

    componentDidMount() {
        this.setState({
            pathItemsCount: PathHelper.count()
        });

        // listen the stores changes
        ViewpointStore.addChangeListener(this._setViewpoints);
        CorpusStore.addChangeListener(this._setCorpora);

        // init component data
        this._setViewpoints();
        this._setCorpora();
    }

    componentWillUnmount() {
      // remove stores listeners
      ViewpointStore.removeChangeListener(this._setViewpoints);
      CorpusStore.removeChangeListener(this._setCorpora);
    }

    /**
     * Set the state with topics and upperTopics from the ViewpointStore
     */
    _setViewpoints() {
      this.setState({
        topics: ViewpointStore.topics,
        upperTopics: ViewpointStore.upperTopics
      })
    }

    /**
     * Set the state with corpora from the CorpusStore
     */
    _setCorpora() {
      this.setState({
        corpora: CorpusStore.corpora
      })
    }

    /**
     * Push a new topic in the stack
     * @param {string} topic
     */
    _navigateThoughTopic(topic) {
        if (topic) {
            const state = this.state;
            state.currentTopicStack.push(topic);
            this.setState(state);
        }
    }

    /**
     * Pop the last topic of the stack
     */
    _navigateBack() {
        const state = this.state;
        state.currentTopicStack.pop();
        this.setState(state);
    }

    /**
     * Redirect the user to the page where he can see the details of his path
     */
    _showMyPath() {
        this.props.history.push('/my-path');
    }

    /**
     * Search all the stained glasses of a topic and add it to my path
     * @param {string} topicId : the id of a topic
     */
    _addTopicToMyPath(topicId) {
        PathHelper.add(this._getStainedGlasses(topicId))
            .then(added => this.setState({
                snackbar: `${added} ${added > 1 ? " vitraux ajoutés" : " vitrail ajouté"} à votre parcours !`,
                pathItemsCount: this.state.pathItemsCount + added
            }))
            .catch(_ => console.log("Erreur lors de l'ajout des vitraux"));
    }

    /**
     * Search the given item in the corpus to have all the information about it, and add it to my path
     * @param {object} item : the item to add to my path
     */
    _addStainedGlassToMyPath(item) {
        PathHelper.add([this._findItemInCorpus(item)])
        .then(added => this.setState({
            snackbar: "Vitrail ajouté à votre parcours !",
            pathItemsCount: this.state.pathItemsCount + added
        }));
    }

    /**
     * Get all the stained glasses of a given topic
     * @param {string} topic
     * @returns {Array}
     */
    _getStainedGlasses(topicId) {
        let stainedGlasses = this.state.topics[topicId].items.map(item => this._findItemInCorpus(item));
        let topicsQueue = this.state.topics[topicId].narrowers.slice();

        // continue while there is a topic in the queue
        let currentTopicId = topicsQueue.shift();
        while (currentTopicId) {
            const currentTopic = this.state.topics[currentTopicId];

            if (currentTopic) {
              // add the items of this topic to the stainedGlasses array
              currentTopic.items.map(item => !stainedGlasses.includes(item) && stainedGlasses.push(this._findItemInCorpus(item)));

              // add the narrowers of this topic to the queue because we have to go through them
              currentTopic.narrowers.map(narrower => !topicsQueue.includes(narrower) && topicsQueue.push(narrower));
            }

            currentTopicId = topicsQueue.shift();
        }

        return stainedGlasses;
    }

    /**
     * Look for the given item in the corpus and get his name
     * @param {object} item: the item to look at
     * @return {object} the item found
     */
    _findItemInCorpus(item) {
      for (let corpus of this.state.corpora) {
        if (corpus[item.corpus] && corpus[item.corpus][item.id]) {
          const itemFound = corpus[item.corpus][item.id]
          itemFound.id = item.id
          return itemFound;
        }
      }
      return {}
    }

    /**
     * Up the tree until reaching the given topic
     * @param {string} topic
     */
    _upTheTree(topic) {
      const state = this.state;

      if (!topic) {
        state.currentTopicStack = [];
      } else {
        let newStack = [];
        let i = 0;
        while(state.currentTopicStack[i] !== topic && i < state.currentTopicStack.length) {
          newStack.push(state.currentTopicStack[i]);
          i++;
        }
        newStack.push(topic);
        state.currentTopicStack = newStack;
      }

      this.setState(state);
    }

    /**
     * Handle changes on the name TextField
     */
    _handleNameInputChange(e, v) {
      this.setState({
        filteredItems: v.length > 1 ? CorpusStore.filterByName(v) : []
      });
    }

    _hideSnackbar() {
        this.setState({
            snackbar: ""
        });
    }

    render() {
        const topics = this.state.topics;
        const upperTopics = this.state.upperTopics;
        const filteredItems = this.state.filteredItems;

        // get the topic at the top of the stack, or null if the stack is empty
        const currentTopic = this.state.currentTopicStack.length ? this.state.currentTopicStack[this.state.currentTopicStack.length - 1]: null;

        // prepare topics for the breadcrumb
        const breadcrumb = this.state.currentTopicStack.map(topicId => {
          return {
            id: topicId,
            name: topics[topicId].name
          }
        });

        // prepare the topics and stained glasses to display
        let topicElements = [];
        let stainedGlassElements = [];

        // if filteredItems is not empty, just display the stainedGlasses in filteredItems
        // else, display the topics tree
        if (filteredItems.length) {
          stainedGlassElements = filteredItems.map(item => <PathStainedGlass addToMyPath={_ => this._addStainedGlassToMyPath(item)} key={item.id} id={item.id} name={item.name} />);
        } else {
          // if there is a currentTopic, display his narrowers topics, and his items
          if (currentTopic) {
            topics[currentTopic].narrowers.map((topicId, i) => {
              const topic = topics[topicId];
              // the topic might not exists
              if (topic) {
                topicElements.push(<PathTopic navigate={_ => this._navigateThoughTopic(topicId)} addToMyPath={_ => this._addTopicToMyPath(topicId)} key={i} topic={topic.name} narrowers={topic.narrowers.length} items={topic.items.length} />)
              }
            })
            topics[currentTopic].items.map((item, i) => {
              stainedGlassElements.push(<PathStainedGlass addToMyPath={_ => this._addStainedGlassToMyPath(item)} key={i} id={item.id} stainedGlass={this._findItemInCorpus(item)} />)
            })

            // add the "return" button as a topic
            topicElements.push(<Col xs={12} sm={6} md={3}><div onClick={this._navigateBack} className="goBack-topic">Retour</div></Col>)
          } else {
            // if there is no currentTopic, just display the upper topics
            upperTopics.map((topic, i) => {
              topicElements.push(<PathTopic navigate={_ => this._navigateThoughTopic(topic.id)} addToMyPath={_ => this._addTopicToMyPath(topic.id)} key={i} topic={topic.name} narrowers={topics[topic.id].narrowers.length} items={topics[topic.id].items.length} />)
            })
          }
        }

        return (
            <div className="build-path-container">
                <div className="build-path-header build-path-subcontainer">
                    <Row center="md">
                        <Col xs={12} sm={6} md={3}>
                            <RaisedButton label={`Voir mon parcours (${this.state.pathItemsCount})`} secondary={true} onClick={this._showMyPath} fullWidth={true} />
                        </Col>
                        <Col xs={12} sm={6} md={3}>
                            <TextField
                                hintText="Rechercher par nom"
                                onChange={this._handleNameInputChange}
                                fullWidth={true}
                                />
                        </Col>
                    </Row>
                </div>
                {
                    !filteredItems.length &&
                    <div className="shadow-box build-path-subcontainer">
                        <TopicBreadcrumb topics={breadcrumb} upTheTree={this._upTheTree} />
                    </div>
                }
                <div className="build-path-subcontainer">
                    <div className="topics-container">
                        <Row>
                            {topicElements}
                        </Row>
                    </div>
                    <div className="stainedGlasses-container">
                        {stainedGlassElements}
                    </div>
                </div>
                <Snackbar
                    open={this.state.snackbar !== ""}
                    message={this.state.snackbar}
                    autoHideDuration={4000}
                    onRequestClose={this._hideSnackbar}
                    />
            </div>
        )
    }
}
