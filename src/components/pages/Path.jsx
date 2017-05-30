import React from 'react'
import { Link } from 'react-router-dom'

import PathHelper from '../../helpers/PathHelper';

import RaisedButton from 'material-ui/RaisedButton';

import PathTopic from '../Topic/PathTopic.jsx';
import PathStainedGlass from '../StainedGlass/PathStainedGlass.jsx';
import TopicBreadcrumb from '../Topic/TopicBreadcrumb.jsx';

import {viewpoints, corpusArgos, APIs} from '../../config/constants';

// hypertopic
const hypertopic = require('hypertopic');
const db = hypertopic(APIs);

export default class Path extends React.Component {

    constructor() {
        super();

        this.state = {
            viewpoints: [],
            corpus: [],
            topics: [],
            upperTopics: [],
            currentTopicStack: []
        };

        // binding
        this._showMyPath = this._showMyPath.bind(this);
        this._parseViewpoints = this._parseViewpoints.bind(this);
        this._navigateBack = this._navigateBack.bind(this);
        this._navigateThoughTopic = this._navigateThoughTopic.bind(this);
        this._addTopicToMyPath = this._addTopicToMyPath.bind(this);
        this._addStainedGlassToMyPath = this._addStainedGlassToMyPath.bind(this);
        this._getStainedGlasses = this._getStainedGlasses.bind(this);
        this._findItemInCorpus = this._findItemInCorpus.bind(this);
        this._upTheTree = this._upTheTree.bind(this);
    }

    componentDidMount() {

        // request all the required data
        Promise.all([

            // get the viewpoints
            new Promise((resolve, reject) => {
                Promise.all(
                    viewpoints.map(viewpoint => {
                        return new Promise((resolve, reject) => {
                            db.getView("/viewpoint/" + viewpoint, x => resolve(x))
                        })
                    })
                ).then(data => resolve(data))
            }),

            // get the corpus
            new Promise((resolve, reject) => {
                Promise.all(
                    corpusArgos.map(corpus => {
                        return new Promise((resolve, reject) => {
                            db.getView("/corpus/" + corpus, x => resolve(x))
                        })
                    })
                ).then(data => resolve(data))
            })

        ]).then(data => {
            const state = this.state;
            state.viewpoints = data[0];
            state.corpus = data[1];
            const parsedViewpoint = this._parseViewpoints(state.viewpoints);
            state.topics = parsedViewpoint.topics;
            state.upperTopics = parsedViewpoint.uppers;

            // save the data in the component state
            this.setState(state)
        });
    }

    /**
     * Sort items by topic (and save narrowers, so we can use the generated object as a tree if we need)
     *
     * @param {array} viewpoints
     * @returns {object}
     */
    _parseViewpoints(viewpoints) {
        const topics = {};
        let uppers = [];

        // loop through viewpoints
        viewpoints.map(viewpoint => {
            // a viewpoint is an object, so get his first attribute (which is his id)
            const viewpointId = Object.keys(viewpoint)[0];

            // get upper topics of this viewpoint
            uppers = uppers.concat(viewpoint[viewpointId].upper);

            // loop through the viewpoint's attributes (which are 'items')
            Object.keys(viewpoint[viewpointId]).map(topicId => {

                const topic = viewpoint[viewpointId][topicId];

                // continue only if the item has a name (else we can do nothing with it)
                if (topic.name) {

                    const topicName = topic.name[0];
                    const topicItems = topic.item ? topic.item : [];
                    const topicNarrower = topic.narrower ? topic.narrower : [];

                    // if the topic is no in the topics array, add it
                    // else, it means that it has been added as a broader, so update it because it is incompleted
                    if (!topics[topicId]) {
                      topics[topicId] = {
                        name: topicName,
                        items: topicItems,
                        narrowers: topicNarrower
                      }
                    } else {
                      topics[topicId].name = topicName;
                      topics[topicId].items = topicItems;
                    }

                    // if this item has a parent topic (broader), add it has a children
                    if (topic.broader) {

                        const broaderId = topic.broader[0].id;

                        if (topics[broaderId]) {
                            topics[broaderId].narrowers.push(topicId);
                        } else {
                            topics[broaderId] = {
                                narrowers: [topicId]
                            };
                        }

                    }
                }
            });
        });

        console.log(topics);

        return {topics, uppers};
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
        this.props.history.push('/mypath');
    }

    /**
     * Search all the stained glasses of a topic and add it to my path
     * @param {string} topicId : the id of a topic
     */
    _addTopicToMyPath(topicId) {
        PathHelper.add(this._getStainedGlasses(topicId));
    }

    /**
     * Search the given item in the corpus to have all the information about it, and add it to my path
     * @param {object} item : the item to add to my path
     */
    _addStainedGlassToMyPath(item) {
        PathHelper.add([this._findItemInCorpus(item)]);
    }

    /**
     * Get all the stained glasses of a given topic
     * @param {string} topic
     * @returns {Array}
     */
    _getStainedGlasses(topicId) {
        let stainedGlasses = this.state.topics[topicId].items;
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
      for (let corpus of this.state.corpus) {
        if (corpus[item.corpus] && corpus[item.corpus][item.id]) {
          return corpus[item.corpus][item.id];
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

    render() {
        const topics = this.state.topics;
        const upperTopics = this.state.upperTopics;

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
        let listItems = [];
        // if there is a currentTopic, display his narrowers topics, and his items
        if (currentTopic) {
          topics[currentTopic].narrowers.map((topicId, i) => {
            const topic = topics[topicId];
            // the topic might not exists
            if (topic) {
              listItems.push(<PathTopic navigate={_ => this._navigateThoughTopic(topicId)} addToMyPath={_ => this._addTopicToMyPath(topicId)} key={i} topic={topic.name} narrowers={topic.narrowers.length} items={topic.items.length} />)
            }
          })
          topics[currentTopic].items.map((item, i) => {
            listItems.push(<PathStainedGlass addToMyPath={_ => this._addStainedGlassToMyPath(item)} key={i} stainedGlassName={this._findItemInCorpus(item).name} />)
          })
        } else {
          // if there is no currentTopic, just display the upper topics
          upperTopics.map((topic, i) => {
            listItems.push(<PathTopic navigate={_ => this._navigateThoughTopic(topic.id)} addToMyPath={_ => this._addTopicToMyPath(topic.id)} key={i} topic={topic.name} narrowers={topics[topic.id].narrowers.length} items={topics[topic.id].items.length} />)
          })
        }

        return (
            <div>
                <h1>Création de votre parcours</h1>
                <Link to='/'>Dashboard</Link>
                <RaisedButton label="Voir mon parcours" secondary={true} onClick={this._showMyPath} />
                <RaisedButton label="Retour" primary={true} onClick={this._navigateBack} />
                <TopicBreadcrumb topics={breadcrumb} upTheTree={this._upTheTree} />
                {listItems}
            </div>
        )
    }
}
