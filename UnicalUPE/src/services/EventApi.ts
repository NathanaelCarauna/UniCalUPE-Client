import api from './apiBase';

export function getAllEvents() {
    return new api.get(`/event`)
}

export function getEventByCourse(courseId: { courseId: number }) {
    console.log("CURSOO ID:", courseId)
    return new api.get(`/event/findbycourse/${courseId}`)
}
export function getEventByCategory(category : { category: string}) {
    return new api.get(`/event/findbycategory/${category}`)
}

export function getEventByDate(date: { date: string }) {
    return new api.get(`/event/findByDate/${date}`)
}

export function getEventById(id: { id: number }) {
    return new api.get(`/event/${id}`)
}

export function postEvent(event){
    return new api.post('/event/', event)

}


export function updateEvent(id: { id: number}) {
    return new api.put(`/event/${id}`)
}

export function deleteEvent(id: { id: number }) {
    return new api.delete(`/event/${id}`)
}
