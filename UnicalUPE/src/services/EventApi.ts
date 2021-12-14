import api from './apiBase';

export function getAllEvents(){
    return new api.get(`/event`)
}

export function getEventByCategory(category){
    return new api.get(`/event/findbycategory/${category}`)
}

export function getEventById(id){
    return new api.get(`/event/${id}`)
}

export function createEvent(event){
    return new api.post('/event', event)
}


export function updateEvent(id){
    return new api.put(`/event/${id}`)
}

export function deleteEvent(id){
    return new api.delete(`/event/${id}`)
}
