const STORAGE_NAME = "myPath";

module.exports = {

    add(topic, subtopics) {

        let current = localStorage.getItem(STORAGE_NAME);

        // if there is not path in the localStorage, init it
        if (!current) {
            current = [];
        } else {
            current = JSON.parse(current);
        }

        // remove all the elements that are in the subtopics array
        current = current.filter(el => !subtopics.includes(el));

        // push only if not already in the path
        if (!current.includes(topic)) {
            current.push(topic);
            localStorage.setItem(STORAGE_NAME, JSON.stringify(current));
        }

    }

};