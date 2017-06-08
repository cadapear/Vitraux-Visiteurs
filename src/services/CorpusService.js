import {corpusArgos, APIs} from '../config/constants';

// hypertopic
const hypertopic = require('hypertopic');
const db = hypertopic(APIs);

class CorpusService {

  /**
   * Make a request to get all the corpora of the constants file
   * @return {Promise}
   */
  getCorpora() {
    return new Promise((resolve, reject) => {
      Promise.all(
        corpusArgos.map(corpus => {
          return new Promise((resolve, reject) => {
            db.getView("/corpus/" + corpus, x => resolve(x))
          })
        })
      ).then(data => resolve(data))
    })
  }

}

export default new CorpusService();
