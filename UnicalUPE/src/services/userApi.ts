import api from './apiBase';

export function getUser(email){
    return new api.get(`/user/${email}`)
}

export function saveUser(user){
    console.log(user);
    return new api.put(`/user/${user.email}`, user)
}