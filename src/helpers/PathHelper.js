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

function remove(stainedGlassId) {
  // read my path in the localStorage
  let current = localStorage.getItem(STORAGE_NAME);

  // if there is no path in the localStorage, init it
  current = current ? JSON.parse(current) : [];

  // remove the stainedGlass which has the id wanted
  const filtered = current.filter(stainedGlass => stainedGlass.id !== stainedGlassId)
  console.log(filtered)

  // update my path in the localStorage
  localStorage.setItem(STORAGE_NAME, JSON.stringify(filtered));
}

/**
 * Remove my path from the localStorage
 */
function clean() {
  localStorage.removeItem(STORAGE_NAME);
}

export default {add, remove, clean, read};
