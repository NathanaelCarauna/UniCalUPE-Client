import api from './apiBase';

export function getUser(email){
    return new api.get(`/user/${email}`)
}

export function createUser(user){
    return new api.post('/user', user)
}