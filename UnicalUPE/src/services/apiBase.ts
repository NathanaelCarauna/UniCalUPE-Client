import axios from 'axios';

const apiBase = axios.create({
    baseURL: 'https://unicalupe.herokuapp.com/'
})

export default apiBase;