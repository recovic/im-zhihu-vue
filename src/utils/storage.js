const ID = "id";
const TOKEN = "token";
const LOGGED = "logged";

function get(key) {
    return localStorage.getItem(key);
}

function set(key, val) {
    localStorage.setItem(key, val);
}

function remove(key) {
    localStorage.removeItem(key);
}

export default {
    ID,
    TOKEN,
    LOGGED,
    get,
    set,
    remove
}