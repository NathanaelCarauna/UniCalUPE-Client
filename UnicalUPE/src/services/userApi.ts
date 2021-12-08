import api from './apiBase';

export function getUser(email){
    return new api.get('/user', {email})
}