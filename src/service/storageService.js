const USER_TOKEN = 'token'

const set = (key, data) => {
    localStorage.setItem(key, data);
}

const get = (key) => localStorage.getItem(key);

export default {
    set,
    get,
    USER_TOKEN
}