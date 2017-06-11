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
    .catch(err => console.log("[CorpusStore] an error occured during the store initialisation", err));
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
   * Search the church's plan from a stained glass name
   * @param {string} stainedGlassName
   * @return {object|null} 
   */
  getChurchPlan(stainedGlassName) {
      // get the church name. It's the first part of the stainedGlassName : "SNZ" for "SNZ 104" for example
      const churchName = stainedGlassName.split(' ')[0];

      // gor through topics
      for (let corpus of this._corpora) {
          // get the corpus name (first attribute)
          const corpusName = Object.keys(corpus)[0];
          // loop through each items of this corpus
          for (let itemId of Object.keys(corpus[corpusName])) {
              // check if the name of this item is the church's name
              if (corpus[corpusName][itemId].name && corpus[corpusName][itemId].name[0] === churchName) {
                  return corpus[corpusName][itemId];
              }
          }
      }

      return null;
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
