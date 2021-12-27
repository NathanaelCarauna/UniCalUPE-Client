import api from './apiBase';

export function getAllNotifications() {
    return new api.get(`/notification/`)
}

export function getNotificationByUserEmail(userEmail: string) {
    return new api.get(`/notification/findByUserEmail/${userEmail}`)
}

export function GetNotificationByCategory(userEmail: string, category: string) {
    return new api.get(`/notification/findByCategory/${userEmail}/${category}`)
}

export function updateNotification(notification) {
    return new api.put(`/notification/${notification.id}`, notification)
}