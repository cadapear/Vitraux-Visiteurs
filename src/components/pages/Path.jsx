import React from 'react'
import { Link } from 'react-router-dom'

import PathService from '../../services/PathService';

import RaisedButton from 'material-ui/RaisedButton';

import PathTopic from '../Topic/PathTopic.jsx';
import PathStainedGlass from '../StainedGlass/PathStainedGlass.jsx';

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
            currentTopicStack: []
        };

        // binding
        this._showMyPath = this._showMyPath.bind(this);
        this._navigateBack = this._navigateBack.bind(this);
        this._navigateThoughTopic = this._navigateThoughTopic.bind(this);
        this._addToMyPath = this._addToMyPath.bind(this);
        this._getStainedGlasses = this._getStainedGlasses.bind(this);
        this._getSubTopics = this._getSubTopics.bind(this);
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
            state.topics = this._getTopics(state.viewpoints);

            // save the data in the component state
            this.setState(state)
        });
    }

    /**
     * Sort items by topic (and save narrowers, so we can use the generated object as a tree if we need)
     *
     * @param viewpoints
     * @returns {{}}
     */
    _getTopics(viewpoints) {
        const topics = {};
        let topicTree = null;

        // loop through viewpoints
        viewpoints.map(viewpoint => {
            // a viewpoint is an object, so get his first attribute (which is his id)
            const viewpointId = Object.keys(viewpoint)[0];
            // loop through the viewpoint's attributes (which are 'items')
            Object.keys(viewpoint[viewpointId]).map(itemId => {

                const item = viewpoint[viewpointId][itemId];

                // continue only if the item has a name (else we can do nothing with it)
                if (item.name) {

                    const itemName = item.name[0];

                    // if this item has a parent topic (broader), add it has a children
                    if (item.broader) {

                        const broader = item.broader[0].name;
                        if (topics[broader]) {
                            topics[broader].narrowers.push(itemName);
                        } else {
                            topics[broader] = {
                                narrowers: [itemName]
                            };
                        }
                    }

                    // if the item has a children topic (narrower), add it has a parent
                    if (item.narrower) {

                        const narrower = item.narrower[0].name;
                        if (topics[itemName]) {
                            topics[itemName].narrowers.push(narrower);
                        } else {
                            topics[itemName] = {
                                narrowers: [narrower]
                            }
                        }
                    }

                }
            });
        });

        return topics;
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
     *
     * @param {string} topic
     */
    _addToMyPath(topic) {
        PathService.add(topic, this._getSubTopics(topic), this._getStainedGlasses(topic));
    }

    /**
     * Get all the stained glasses of the given topic
     * @param {string} topic
     * @returns {Array}
     */
    _getStainedGlasses(topic) {
        let stainedGlasses = [];
        let queue = this.state.topics[topic] && this.state.topics[topic].narrowers ? this.state.topics[topic].narrowers.slice() : [];

        let el = queue.shift();
        while (el) {
            const narrowers = this.state.topics[el] && this.state.topics[el].narrowers ? this.state.topics[el].narrowers : [];
            if (!narrowers.length) {
                stainedGlasses.push(el);
            } else {
                queue = queue.concat(narrowers);
            }
            el = queue.shift();
        }

        return stainedGlasses;
    }

    /**
     * Get all the subtopic of the given topic
     * @param {string} topic
     * @returns {Array}
     */
    _getSubTopics(topic) {
        let topics = [];
        let queue = this.state.topics[topic] && this.state.topics[topic].narrowers ? this.state.topics[topic].narrowers.slice() : [];

        let el = queue.shift();
        while (el) {
            const narrowers = this.state.topics[el] && this.state.topics[el].narrowers ? this.state.topics[el].narrowers : [];
            if (narrowers.length) {
                topics.push(el);
                queue = queue.concat(narrowers);
            }
            el = queue.shift();
        }

        return topics;
    }

    render() {
        const topics = this.state.topics;

        // get the topic at the top of the stack, or null if the stack is empty
        const currentTopic = this.state.currentTopicStack.length ? this.state.currentTopicStack[this.state.currentTopicStack.length - 1]: null;

        return (
            <div>
                <h1>Création de votre parcours</h1>
                <Link to='/'>Dashboard</Link>
                <RaisedButton label="Voir mon parcours" secondary={true} onClick={this._showMyPath} />
                <RaisedButton label="Retour" primary={true} onClick={this._navigateBack} />
                {
                    currentTopic
                    ?
                        topics[currentTopic].narrowers.map((topic, i) => {
                            return topics[topic]
                                ?
                                    <PathTopic navigate={_ => this._navigateThoughTopic(topic)} addToMyPath={_ => this._addToMyPath(topic)} key={i} topic={topic} narrowers={topics[topic].narrowers.length} />
                                :
                                    <PathStainedGlass addToMyPath={_ => this._addToMyPath(topic)} key={i} stainedGlassName={topic} />
                        })
                    :
                        Object.keys(topics)
                            .filter(topic => topics[topic].narrowers.length !== 0)
                            .map((topic, i) => <PathTopic navigate={_ => this._navigateThoughTopic(topic)} addToMyPath={_ => this._addToMyPath(topic)} key={i} topic={topic} narrowers={topics[topic].narrowers.length} />)
                }
            </div>
        )
    }
}
