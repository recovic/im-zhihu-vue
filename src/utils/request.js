import axios from 'axios'
import storageService from '../service/storageService';

const request = axios.create({
    baseURL: "http://localhost:8080/",
    timeout: 1000 * 5,
    headers: { 'Authorization': 'Bearer ' + storageService.get(storageService.USER_TOKEN) }
});

export default request;