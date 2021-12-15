import api from './apiBase';

export function getAllNotifications(){
    return new api.get(`/notification/`)
}

export function GetNotificationByCategory(user){
    return new api.put(`/notification/findByUser/${user}`)
}