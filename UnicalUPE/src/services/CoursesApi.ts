import api from './apiBase';

export function getAllCourses(){
    return new api.get(`/course`)
}

export function saveCourse(course){
    console.log(course);
    return new api.post(`/course/create`, course)
}
