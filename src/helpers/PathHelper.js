const STORAGE_NAME = "myPath";

/**
 * Read my path in the localStorage
 * @return {array}
 */
function read() {
  let myPath = localStorage.getItem(STORAGE_NAME);
  return myPath ? JSON.parse(myPath) : [];
}

/**
 * Count the number of stained glasses in path
 * @return {number}
 */
function count() {
    return read().length;
}

/**
 * Add these new stainedGlasses to my path
 *
 * @param {array} stainedGlasses : the stainedGlasses to add to my path
 * @return {Promise}
 */
function add(stainedGlasses) {
    return new Promise((resolve, reject) => {
        try {
            let added = 0;

            // read my path in the localStorage
            let current = localStorage.getItem(STORAGE_NAME);

            // if there is no path in the localStorage, init it
            current = current ? JSON.parse(current) : [];

            // add the stainedGlasses that are not already in it
            stainedGlasses.map(stainedGlass => {
                if (!current.filter(c => c.id === stainedGlass.id).length) {
                    current.push(stainedGlass);
                    added++;
                }
            });

            // update my path in the localStorage
            localStorage.setItem(STORAGE_NAME, JSON.stringify(current));

            resolve(added);
        } catch(e) {
            reject(e);
        }
    });
}

/**
 * Remove an item of the path in the localStorage
 * @param {string} stainedGlassId : the id of the stained glass to remove
 * @return {Promise}
 */
function remove(stainedGlassId) {
    return new Promise((resolve, reject) => {
        try {
            // read my path in the localStorage
            let current = localStorage.getItem(STORAGE_NAME);

            // if there is no path in the localStorage, init it
            current = current ? JSON.parse(current) : [];

            // remove the stainedGlass which has the id wanted
            const filtered = current.filter(stainedGlass => stainedGlass.id !== stainedGlassId)

            // update my path in the localStorage
            localStorage.setItem(STORAGE_NAME, JSON.stringify(filtered));

            resolve(current);
        } catch(e) {
            reject(e);
        }
    });
}

/**
 * Remove my path from the localStorage
 * @return {Promise}
 */
function clean() {
    return new Promise((resolve, reject) => {
        localStorage.removeItem(STORAGE_NAME);
        resolve([]);
    });
}

export default {add, count, remove, clean, read};
