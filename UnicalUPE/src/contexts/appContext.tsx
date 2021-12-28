import React, { createContext, useState, useEffect } from 'react';
import * as userApi from '../services/userApi';
import * as EventApi from '../services/EventApi';
import * as CoursesApi from '../services/CoursesApi';
import * as NotificationApi from '../services/NotificationApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AuthSession from 'expo-auth-session';
import { AxiosResponse } from 'axios';
import { eventType } from '../types'
import Colors from '../constants/Colors';

type AuthResponse = {
    type: string;
    params: {
        access_token: string;
    }
}

type user = { email: string, name: string, id: number, accountType: string }
type email = { email: string }
export const AppContext = createContext({
    signed: false,
    user: {},
    eventsList: {},
    coursesList: {},
    loading: false,
    EventsCalendar: {},
    eventByDateRequested: false,
    course: {},
    selectedDate: '',
    userNotifications: [],
    setLoading: () => { },
    getUser: (email: email) => { },
    saveUser: (user: user) => { },
    deleteUser: (email: email) => { },
    signOut: () => { },
    handleSignIn: () => { },
    getEventsByCourse: () => { },
    getEventsAll: () => { },
    getEventsByDate: () => { },
    setEventByDateRequested: () => { },
    postEvent: () => { },
    updateEvent: () => { },
    CurrentCourse: () => { },
    setCategoryColor: (courseName: { courseName: string }) => { },
    setSelectDate: () => { },
    getNotificationByUserEmail: () => { },
    updateNotification: () => { },
    getNotificationsByCategory: () => { },
    deleteNotification: () => { },
});

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState<boolean | undefined>()
    const [eventByDateRequested, setEventByDateRequested] = useState<boolean | undefined>()
    const [user, setUser] = useState();
    const [userNotifications, setUserNotifications] = useState([]);
    const [eventsList, setEventList] = useState([]);
    const [coursesList, setCoursesList] = useState([]);
    const [EventsCalendar, SetEventsCalendar] = useState({});
    const [course, setCurrentCourse] = useState({})
    const [selectedDate, setSelectDate] = useState({})


    useEffect(() => {
        console.log("################################# INITIALIZING APPLICATION ############################################")
        setLoading(true)
        async function loadStorageData() {
            const storagedUser = await AsyncStorage.getItem('@TGAuth:user');
            getAllCourses()
            setCurrentCourse({})
            console.log("storagedUser: ", storagedUser)
            if (storagedUser) {
                const localUser = JSON.parse(storagedUser)
                setUser(localUser);
                console.log(localUser.course)
                setCurrentCourse(localUser.course)
                getEventsByCourse(localUser.course.id)
                getNotificationByUserEmail(localUser.email);
            }
            else {
                getEventsAll();

            }
            setLoading(false);
        }
        loadStorageData();
    }, [])

    function FilterByCourse(event: eventType) {

        var eventCourse = event.course
        if (!eventCourse) {
            return false
        }
        return eventCourse.name == course.name;
    }
    function FilterByDate(event: eventType) {

        var eventDate = event.startDate
        if (!eventDate) {
            return false
        }
        return eventDate.name == selectedDate;
    }

    async function getUser(email: email) {
        setLoading(true);
        let localUser;
        try {
            console.log('Requesting getUser')
            await userApi.getUser(email)
                .then((response: AxiosResponse) => {
                    console.log('GetUser requested')
                    console.log(response.data)
                    if (response.status == 200) {
                        setUser(response.data)
                        localUser = response.data
                        setSelectDate({})
                        setCurrentCourse(response.data.course)
                        getEventsByCourse(localUser.course.id)
                        AsyncStorage.setItem("@TGAuth:user", JSON.stringify(response.data));
                    }
                    setLoading(false);
                })
                .catch(err => {
                    console.log(err)
                    localUser = null
                    setLoading(false);
                })
        } catch (e) {
            console.log(e)
            localUser = null
        }
        setLoading(false);
        return localUser
    }

    async function saveUser(user: user) {
        setLoading(true);
        let result = false;
        try {
            await userApi.saveUser(user)
                .then((response: AxiosResponse) => {
                    if (response.status = 200) {
                        setUser(response.data)
                        setCurrentCourse(response.data.course)
                        getEventsByCourse(response.data.course.id)
                        console.log("User that came from back after save:", response.data)
                        result = true;
                    }
                    setLoading(false);
                })
        } catch (e) {
            console.log(e)
            setLoading(false);
            return false;
        }
        return result

    }

    async function deleteUser(email: email) {
        setLoading(true);
        let localUser;
        try {
            console.log('Requesting deleteUser')
            await userApi.deleteUser(email)
                .then((response: AxiosResponse) => {
                    console.log('DeleteUser requested')
                    console.log(response.data)
                    if (response.status == 200) {
                        signOut()
                    }
                    setLoading(false);
                })
                .catch(err => {
                    console.log(err)
                    localUser = null
                    setLoading(false);
                })
        } catch (e) {
            console.log(e)
            localUser = null
        }
        setLoading(false);
        return localUser
    }

    function signOut() {
        console.log('SignOut Called')

        AsyncStorage.clear().then(() => {
            const currentDate = new Date();
            setUser(null);
            setSelectDate(`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`)
            setCurrentCourse({})
            console.log('LocalStorage cleaned')
            getEventsAll()
        })
    }

    async function handleSignIn() {
        const CLIENT_ID = '162955034296-ah2keq2dk20d7qvpm0qj4h9bi7iratcr.apps.googleusercontent.com'
        const REDIRECT_URI = 'https://auth.expo.io/@nathanaelcarauna/UnicalUPE'
        const RESPONSE_TYPE = 'token'
        const SCOPE = encodeURI('profile email')

        const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`

        const { type, params } = await AuthSession.startAsync({ authUrl }) as AuthResponse

        if (type === 'success') {
            console.log(type)
            loadProfile(params.access_token)
        }
    }

    async function loadProfile(token: string) {
        setLoading(true)
        const response = await fetch(`https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=${token}`)
        const userinfo = await response.json()
        // console.log(userinfo)
        setUser({ name: userinfo.name, email: userinfo.email })
        console.log('User email: ' + userinfo.email)
        await getUser(userinfo.email)
        setLoading(false)
    }

    // --------------------------------------------//Events//------------------------------------------------------------

    async function getEventsAll() {
        setLoading(true);
        try {
            console.log('Requesting getEvents')
            await EventApi.getAllEvents()
                .then((response: AxiosResponse) => {
                    console.log('Events requested')
                    //console.log(response.data)
                    if (response.status == 200) {
                        let processedList = processEventsCalendar(response.data)
                        //console.log("############### Lista processada ############")
                        //console.log(JSON.stringify(processedList))
                        setEventList(response.data)
                        SetEventsCalendar(processedList)
                    }
                    setLoading(false);
                })
                .catch(err => {
                    console.log(err)
                    //localUser = null
                    setLoading(false);
                })
        } catch (e) {
            console.log(e)

        }
        setLoading(false);
    }

    async function getEventsByCourse(courseId) {
        setLoading(true);
        try {
            console.log('Requesting getEvents')
            await EventApi.getEventByCourse(courseId)
                .then((response: AxiosResponse) => {
                    console.log('Events by course requested')
                    //console.log(response.data)
                    if (response.status == 200) {
                        let processedList = processEventsCalendar(response.data)
                        // console.log("############### Events by course processed list ############")
                        // console.log(JSON.stringify(processedList))
                        // console.log(response.data)
                        var list = response.data
                        if (selectedDate != null) {
                            list = list.filter(FilterByDate)
                        }
                        setEventList(list)
                        SetEventsCalendar(processedList)
                    }
                    setLoading(false);
                })
                .catch(err => {
                    console.log(err)
                    //localUser = null
                    setLoading(false);
                })
        } catch (e) {
            console.log(e)

        }
        setLoading(false);
    }

    async function getEventsByDate(date: { date: string }) {
        // setLoading(true);
        try {
            console.log('Requesting getEventsByDate')
            return EventApi.getEventByDate(date)
                .then((response: AxiosResponse) => {
                    console.log('Events by date requested')
                    //console.log(response.data)
                    if (response.status == 200) {
                        //console.log("EVENTS BY DATE:", response.data)
                        var list = response.data
                        console.log(course)
                        if (course.id != null && course.id != -1) {
                            list = list.filter(FilterByCourse)
                        }
                        setSelectDate(date)
                        setEventList(list)
                        setEventByDateRequested(true);
                    }
                    // setLoading(false);
                })
                .catch(err => {
                    console.log(err)
                    // setLoading(false);
                })
        } catch (e) {
            console.log(e)
        }
        // setLoading(false);
    }

    async function postEvent(event) {
        setLoading(true);
        try {
            console.log('post Event')
            await EventApi.postEvent(event)
                .then((response: AxiosResponse) => {
                    console.log('Add Event')

                    //console.log(response.data)
                    if (response.status == 200) {
                        console.log('Event created')
                        getEventsByCourse(user.course)
                    }
                    setLoading(false);
                })
                .catch(err => {
                    console.log(err)
                    //localUser = null
                    setLoading(false);
                })
        } catch (e) {
            console.log(e)

        }
        setLoading(false);
    }

    async function updateEvent(event) {
        setLoading(true);
        try {
            console.log('put Event')
            await EventApi.updateEvent(event)
                .then((response: AxiosResponse) => {
                    console.log('Update Event')

                    //console.log(response.data)
                    if (response.status == 200) {
                        console.log(response.data)
                        getEventsAll();
                    }
                    setLoading(false);
                })
                .catch(err => {
                    console.log(err)
                    //localUser = null
                    setLoading(false);
                })
        } catch (e) {
            console.log(e)

        }
        setLoading(false);
    }

    async function getEventsByCategory(category: string) {
        setLoading(true);
        try {
            console.log('Requesting getEvents')
            await EventApi.getEventByCategory(category)
                .then((response: AxiosResponse) => {
                    console.log('Events requested')
                    //console.log(response.data)
                    if (response.status == 200) {
                        setEventList(response.data)
                    }
                    setLoading(false);
                })
                .catch(err => {
                    console.log(err)
                    //localUser = null
                    setLoading(false);
                })
        } catch (e) {
            console.log(e)

        }
        setLoading(false);
    }

    function createEventsJsonKeys(events) {
        // console.log("Create Json")
        var list = events.reduce((json, item, i) => {
            // console.log("Json: :", json)
            // console.log("Item: ", item)
            if (!json.hasOwnProperty(item.startDate)) {
                json[item.startDate] = { dots: [], selected: true, selectedColor: Colors.dark.background }
                // console.log("Prop added: ", json[item.startDate])
            }
            return json
        }, {})
        // console.log("Json created: ", list)
        return list;
    }

    function processEventsCalendar(events) {
        // console.log('Process events started')
        let eventJson = createEventsJsonKeys(events);
        // console.log("Json received from creation: ", eventJson)

        // console.log("Starting adding object to dots")
        events.forEach(element => {
            // console.log("Element: ", element)
            eventJson[element.startDate].dots.push({ key: element.id, color: setCategoryColor(element) })
            // console.log("object added: ", eventJson[element.startDate])
        });
        // console.log("Final list json: ", eventJson)
        return eventJson
    }



    function setCategoryColor(event: eventType) {
        if (event.category == 'EVENTO' && event.course) {
            switch (event.course.name) {
                case 'Engenharia de Software':
                    return '#5e60ce' //azul
                case 'Psicologia':
                    return '#f7b538' // amarelo claro
                case 'Medicina':
                    return '#e63946' //verde
                case 'Licenciatura em Computação':
                    return '#168aad'
                case "Ciências Biológicas":
                    return '#f4a261'
                case "Letras":
                    return '#5390d9'
                case "Geografia":
                    return '#6930c3'
                case "História":
                    return '#606c38'
                case "Matemática":
                    return '#ff8fa3'
                case "Pedagogia":
                    return '#ddbdfc'
                default:
            }
        } else if (event.category == 'PESQUISA') {
            return '#ade8f4' // Azull bebê
        } else {
            return '#cfc0bd' // cinza

        }

    }

    // --------------------------------------------//Courses//------------------------------------------------------------

    async function getAllCourses() {
        setLoading(true);
        try {
            console.log('Requesting getAllCourses')
            await CoursesApi.getAllCourses()
                .then((response: AxiosResponse) => {
                    //console.log('Courses requested')
                    // console.log(response.data)
                    if (response.status == 200) {
                        setCoursesList([{ id: -1, name: 'Todos' }, ...response.data])
                    }
                    setLoading(false);
                })
                .catch(err => {
                    console.log(err)
                    setLoading(false);
                })
        } catch (e) {
            console.log(e)

        }
        setLoading(false);
    }

    function CurrentCourse(course) {
        setCurrentCourse(course)
    }

    // --------------------------------------------//Notifications//------------------------------------------------------------

    async function getNotificationByUserEmail(email: string = user.email) {
        // setLoading(true);
        try {
            console.log('Requesting getNotificationByUserEmail')
            await NotificationApi.getNotificationByUserEmail(email)
                .then((response: AxiosResponse) => {
                    console.log('Notifications:', response.data)
                    if (response.status == 200) {
                        setUserNotifications(response.data)
                    }
                    // setLoading(false);
                })
                .catch(err => {
                    console.log(err)
                    // setLoading(false);
                })
        } catch (e) {
            console.log(e)

        }
        // setLoading(false);
    }

    async function updateNotification(notification) {
        // setLoading(true);
        try {
            console.log('Requesting updateNotification')
            await NotificationApi.updateNotification(notification)
                .then((response: AxiosResponse) => {
                    if (response.status == 200) {
                        getNotificationByUserEmail(user.email)
                    }
                    setLoading(false);
                })
                .catch(err => {
                    console.log(err)
                    // setLoading(false);
                })
        } catch (e) {
            console.log(e)

        }
        // setLoading(false);
    }

    async function deleteNotification(id) {
        try {
            console.log('Requesting deleteNotification')
            await NotificationApi.deleteNotification(user.email, id)
                .then((response: AxiosResponse) => {
                    if (response.status == 200) {
                        getNotificationByUserEmail(user.email)
                    }
                    setLoading(false);
                })
                .catch(err => {
                    console.log(err)
                })
        } catch (e) {
            console.log(e)
        }
    }

    async function getNotificationsByCategory(category: string) {
        // setLoading(true);
        try {
            console.log('Requesting getNotifications by Category')
            await NotificationApi.GetNotificationByCategory(user.email, category)
                .then((response: AxiosResponse) => {
                    console.log('Events requested')
                    //console.log(response.data)
                    if (response.status == 200) {
                        setUserNotifications(response.data)
                    }
                    // setLoading(false);
                })
                .catch(err => {
                    console.log(err)
                    // setLoading(false);
                })
        } catch (e) {
            console.log(e)

        }
        setLoading(false);
    }
    return (

        <AppContext.Provider value={{
            signed: !!user,
            user,
            loading,
            EventsCalendar,
            coursesList,
            eventsList,
            eventByDateRequested,
            course,
            selectedDate,
            userNotifications,
            setEventByDateRequested,
            setLoading,
            getUser,
            saveUser,
            deleteUser,
            signOut,
            handleSignIn,
            getEventsByCourse,
            getEventsAll,
            getEventsByDate,
            postEvent,
            updateEvent,
            CurrentCourse,
            setCategoryColor,
            setSelectDate,
            getNotificationByUserEmail,
            updateNotification,
            getNotificationsByCategory,
            deleteNotification,
        }}>
            {children}
        </AppContext.Provider>
    )

}
export default AppContext;