import api from './apiBase';

export function getAllNotifications(){
    return new api.get(`/notification/`)
}

export function getNotificationByUserEmail(userEmail:string){
    return new api.get(`/notification/findByUserEmail/${userEmail}`)
}

export function GetNotificationByCategory(user){
    return new api.put(`/notification/findByUser/${user}`)
}