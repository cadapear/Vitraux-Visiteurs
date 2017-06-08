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
 * Add these new stainedGlasses to my path
 *
 * @param {array} stainedGlasses : the stainedGlasses to add to my path
 */
function add(stainedGlasses) {
    // read my path in the localStorage
    let current = localStorage.getItem(STORAGE_NAME);

    // if there is no path in the localStorage, init it
    current = current ? JSON.parse(current) : [];

    // add the stainedGlasses that are not already in it
    stainedGlasses.map(stainedGlass => !current.includes(stainedGlass) && current.push(stainedGlass));

    // update my path in the localStorage
    localStorage.setItem(STORAGE_NAME, JSON.stringify(current));
}

/**
 * Remove my path from the localStorage
 */
function clean() {
  localStorage.removeItem(STORAGE_NAME);
}

export default {add, clean, read};
