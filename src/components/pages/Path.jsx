import React from 'react';

import RaisedButton from 'material-ui/RaisedButton';

import {viewpoints, corpusArgos, APIs} from '../../config/constants';

// hypertopic
const hypertopic = require('hypertopic');
const db = hypertopic(APIs);

export default class Path extends React.Component {

    constructor() {
        super();

        this.state = {
            viewpoints: [],
            corpus: []
        };

        this._showMyPath = this._showMyPath.bind(this);
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

    /**
     * Redirect the user to the page where he can see the details of his path
     */
    _showMyPath() {
        this.props.history.push('/mypath');
    }

    render() {
        return (
            <div>
                <h1>Création de votre parcours</h1>
                <RaisedButton label="Voir mon parcours" secondary={true} onClick={this._showMyPath} />
            </div>
        )
    }
}