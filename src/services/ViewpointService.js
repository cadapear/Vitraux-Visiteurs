import {viewpoints, APIs} from '../config/constants';

// hypertopic
const hypertopic = require('hypertopic');
const db = hypertopic(APIs);

class ViewpointService {

  /**
   * Make a request to get all the viewpoints of the constants file
   * @return {Promise}
   */
  getViewpoints() {
    return new Promise((resolve, reject) => {
      Promise.all(
        viewpoints.map(viewpoint => {
          return new Promise((resolve, reject) => {
            db.getView("/viewpoint/" + viewpoint, x => resolve(x))
          })
        })
      ).then(data => resolve(data))
    })
  }

}

export default new ViewpointService();
