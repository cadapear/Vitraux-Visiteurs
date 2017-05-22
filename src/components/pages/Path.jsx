import React from 'react';

import {viewpoints, corpusArgos, APIs} from '../../config/constants';

const hypertopic = require('hypertopic');

const db = hypertopic(APIs);

export default class Path extends React.Component {

    constructor() {
        super();

        this.state = {
            viewpoints: [],
            corpus: []
        };
    }

    componentDidMount() {

        Promise.all([

            new Promise((resolve, reject) => {
                // get the viewpoints
                Promise.all(
                    viewpoints.map(viewpoint => {
                        return new Promise((resolve, reject) => {
                            db.getView("/viewpoint/" + viewpoint, x => resolve(x))
                        })
                    })
                ).then(data => resolve(data))
            }),

            new Promise((resolve, reject) => {
                // get the corpus
                Promise.all(
                    corpusArgos.map(corpus => {
                        return new Promise((resolve, reject) => {
                            db.getView("/corpus/" + corpus, x => resolve(x))
                        })
                    })
                ).then(data => resolve(data))
            })

        ]).then(data => {
            console.log(data);
            // the the data in the component state
            this.setState({
                viewpoints: data[0],
                corpus: data[1]
            })
        });
    }

    render() {
        return (
            <div>
                 Path page
            </div>
        )
    }
}