const STORAGE_NAME = "myPath";

module.exports = {

    /**
     * add the the new topic and the stained glasses of this topic to the path
     *
     * @param {string} newTopic
     * @param {array} subTopics: the topics under the newTopic in the "topic tree"
     * @param {array} stainedGlasses: the stained glasses under the newTopics in the "topic tree"
     */
    add(newTopic, subTopics, stainedGlasses) {

        let current = localStorage.getItem(STORAGE_NAME);

        // if there is not path in the localStorage, init it
        if (!current) {
            current = {
                topics: [],
                stainedGlasses: []
            };
        } else {
            current = JSON.parse(current);
        }

        // remove all the topics that are in the subTopics array
        current.topics = current.topics.filter(topic => !subTopics.includes(topic));

        // add all strainedGlasses that are not already in the localStorage
        for (let stainedGlass of stainedGlasses) {
            if (!current.stainedGlasses.includes(stainedGlass)) {
                current.stainedGlasses.push(stainedGlass);
            }
        }

        // push only if not already in the path
        if (!current.topics.includes(newTopic)) {
            current.topics.push(newTopic);
        }

        localStorage.setItem(STORAGE_NAME, JSON.stringify(current));

    }

};