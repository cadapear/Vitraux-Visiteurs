import BaseStore from './BaseStore';
import ViewpointService from '../services/ViewpointService';

class ViewpointStore extends BaseStore {

  constructor() {
    super();

    this._topics = [];
    this._upperTopics = [];

    this._init();
  }

  get topics() {
    return this._topics;
  }

  get upperTopics() {
    return this._upperTopics;
  }

  /**
<<<<<<< HEAD
   * Get the path for a given topic
   */
  getTopicPath(topicId) {
    const topicsId = Object.keys(this._topics);

    let name = this._topics[topicId].name;

    for (let id of topicsId) {
      if (this._topics[id].narrowers.includes(topicId)) {
        name = this.getTopicPath(id) + ' > ' + name;
      }
    }

    return name;
  }

  /**
=======
>>>>>>> 5151461be7b3abd08b7246c74cb971cc2d562956
   * Use the ViewpointService to init the store data
   */
  _init() {
    ViewpointService.getViewpoints()
    .then(data => this._parseViewpoints(data))
    .catch(err => console.log("[ViewpointStore] an error occured during the store initialisation"));
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

      this._topics = topics;
      this._upperTopics = uppers;

      // tell all the listening components that the store data has changed
      this.emitChange();
  }

}

export default new ViewpointStore();
