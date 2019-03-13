import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://watch-stocks.firebaseio.com/'
})

export default instance;