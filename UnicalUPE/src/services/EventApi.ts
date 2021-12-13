import api from './apiBase';

export function getAllEvents(){
    return new api.get(`/event`)
}

export function createEvent(event){
    return new api.post('/event', event)
}

export function getById(id){
    return new api.post(`/event/${id}`)
}