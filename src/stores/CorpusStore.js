import BaseStore from './BaseStore';
import CorpusService from '../services/CorpusService';

class CorpusStore extends BaseStore {

  constructor() {
    super();

    this._corpora = [];

    this._init();
  }

  get corpora() {
    return this._corpora;
  }

  /**
   * Use the CorpusService to init the store data
   */
  _init() {
    CorpusService.getCorpora()
    .then(data => {
      this._corpora = data

      // tell all the listening components that the store data has changed
      this.emitChange();
    })
    .catch(err => console.log("[CorpusStore] an error occured during the store initialisation"));
  }

  /**
   * Go through the corpora and filter the items by name
   * @param {string} str : the filter value
   * @return {array}
   */
  filterByName(str) {
    let matches = [];
    const filterRgx = new RegExp(str, 'i');

    // loop through each corpus
    this._corpora.map(corpus => {
      // get the corpus name (first attribute)
      const corpusName = Object.keys(corpus)[0];
      // using the corpus name, loop through each item
      Object.keys(corpus[corpusName]).map(itemId => {
        const itemName = corpus[corpusName][itemId].name;
        // check if the item name is matching the given string
        if (itemName && filterRgx.test(itemName[0])) {
          matches.push({
            name: itemName[0],
            id: itemId,
            corpus: corpusName
          });
        }
      });
    });

    return matches;
  }

  /**
   * Search a stained glass in the corpora by id
   * @param {string} id : the stained glass id
   * @return {object|null}
   */
  findById(id) {
    // gor through topics
    for (let corpus of this._corpora) {
      // get the corpus name (first attribute)
      const corpusName = Object.keys(corpus)[0];
      // loop through each items of this corpus
      for (let itemId of Object.keys(corpus[corpusName])) {
        if (itemId === id) {
          return corpus[corpusName][itemId];
        }
      }
    }

    return null;
  }

}

export default new CorpusStore();