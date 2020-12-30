import axios from 'axios'

const request = axios.create({
    baseURL: process.env.VUE_APP_SERVER_ADDR,
    timeout: 1000 * 5,
    headers: { 'Authorization': 'Bearer ' + localStorage.token }
});

export default request;