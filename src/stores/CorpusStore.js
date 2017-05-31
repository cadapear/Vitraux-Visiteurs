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

}

export default new CorpusStore();
