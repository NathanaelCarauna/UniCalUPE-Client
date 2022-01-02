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
    currentError: {},
    myEventsList: [],
    setCurrentError: () => { },
    setLoading: () => { },
    getUser: (email: email) => { },
    saveUser: (user: user) => { },
    deleteUser: (email: email) => { },
    signOut: () => { },
    handleSignIn: () => { },
    getEventsByCourse: () => { },
    getEventByUser: () => { },
    getEventsAll: () => { },
    getEventsByDate: (date: string) => { },
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
    deleteEvent: () => { }
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
    const [currentError, setCurrentError] = useState({})
    const [myEventsList, setMyEventsList] = useState({})


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
                getEventByUser(localUser.id)
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
                    else if (response.status == 500) {
                        setCurrentError(500);
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
        let isSuccess = false;
        try {
            console.log('Requesting deleteUser')
            await userApi.deleteUser(email)
                .then((response: AxiosResponse) => {
                    console.log('DeleteUser requested')
                    console.log(response.data)
                    if (response.status == 200) {
                        signOut()
                        isSuccess = true
                    }
                    setLoading(false);
                })
                .catch(err => {
                    console.log(err)
                    isSuccess = false
                    setLoading(false);
                })
        } catch (e) {
            console.log(e)
            isSuccess = false
        }
        setLoading(false);
        return isSuccess
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
                        setEventList(TimeLineEvents(response.data))
                        SetEventsCalendar(processedList)
                    }
                    else if (response.status == 500) {
                        setCurrentError(500);
                    }
                    else if (response.status == 404) {
                        setCurrentError(404);
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
                        setEventList(TimeLineEvents(list))
                        SetEventsCalendar(processedList)
                    }
                    else if (response.status == 500) {
                        setCurrentError(500);
                    }
                    else if (response.status == 404) {
                        setCurrentError(404);
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
        setLoading(true);
        try {
            console.log('Requesting getEventsByDate')
            return EventApi.getEventByDate(date)
                .then((response: AxiosResponse) => {
                    console.log('Events by date requested')
                    //console.log(response.data)
                    if (response.status == 200) {
                        //console.log("EVENTS BY DATE:", response.data)
                        var list = response.data
                        //console.log(course)
                        if (course.id != null && course.id != -1) {
                            list = list.filter(FilterByCourse)
                        }
                        setSelectDate(date)
                        setEventList(TimeLineEvents(list))
                        setEventByDateRequested(true);
                    }
                    else if (response.status == 500) {
                        setCurrentError(500);
                    }
                    else if (response.status == 404) {
                        setCurrentError(404);
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

    async function getEventByUser(Id) {
        setLoading(true);
        try {
            console.log('Requesting getEvents by User')
            await EventApi.getEventByUser(Id)
                .then((response: AxiosResponse) => {
                    console.log('Events by id user requested')
                    if (response.status == 200) {
                        setMyEventsList(response.data);
                        console.log('My Events requested')

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


    async function postEvent(event: eventType) {
        setLoading(true);
        let isSuccess = false;
        try {
            console.log('post Event')
            await EventApi.postEvent(event)
                .then((response: AxiosResponse) => {
                    console.log('Add Event')

                    //console.log(response.data)
                    if (response.status == 200) {
                        console.log('Event created')
                        isSuccess = true
                        getEventsByCourse(user.course.id)
                        setMyEventsList([...myEventsList, response.data]);
                    }
                    setLoading(false);
                })
                .catch(err => {
                    console.log(err)
                    //localUser = null
                    isSuccess = false
                    setLoading(false);
                })
        } catch (e) {
            isSuccess = false
            console.log(e)

        }
        setLoading(false);
        return isSuccess;
    }

    async function updateEvent(event: eventType) {
        setLoading(true);
        let isSuccess = false;
        try {
            console.log('put Event')
            await EventApi.updateEvent(event)
                .then((response: AxiosResponse) => {
                    console.log('Update Event')

                    //console.log(response.data)
                    if (response.status == 200) {
                        console.log(response.data)
                        isSuccess = true
                        getEventsByCourse(user.course.id)
                    }
                    else if (response.status == 500) {
                        setCurrentError(500);
                    }
                    setLoading(false);
                })
                .catch(err => {
                    console.log(err)
                    isSuccess = false
                    setLoading(false);
                })
        } catch (e) {
            console.log(e)
            isSuccess = false
        }
        setLoading(false);
        return isSuccess
    }

    async function deleteEvent(id) {
        let isSuccess = false;
        setLoading(true)
        try {
            console.log('Requesting deleteNotification')
            await EventApi.deleteEvent(id)
                .then((response: AxiosResponse) => {
                    if (response.status == 200) {
                        isSuccess = true
                        getEventsByCourse(user.course.id)
                    }
                    setLoading(false);
                })
                .catch(err => {
                    isSuccess = false
                    console.log(err)
                    setLoading(false)
                })
        } catch (e) {
            console.log(e)
            isSuccess = false
            setLoading(false)
        }
        return isSuccess
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
                    else if (response.status == 500) {
                        setCurrentError(500);
                    }
                    else if (response.status == 404) {
                        setCurrentError(404);
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
                json[item.startDate] = { selected: true, selectedColor: Colors.dark.background }
                // console.log("Prop added: ", json[item.startDate])
            }
            return json
        }, {})
        // console.log("Json created: ", list)
        return list;
    }
    function TimeLineEvents(events) {
        var list = events.map((event) => {
            event.circleColor = setCategoryColor(event);
            event.lineColor = setCategoryColor(event);
            event.time = event.startHour
            return event
        })
        //console.log("#####################################################lista processada###################################################")
        //console.log(list)
        return list;
    }

    function processEventsCalendar(events) {
        // console.log('Process events started')
        let eventJson = createEventsJsonKeys(events);
        // console.log("Json received from creation: ", eventJson)
        return eventJson
    }



    function setCategoryColor(event: eventType) {
        if (event.category == 'EVENTO' && event.course) {
            switch (event.course.name) {
                case 'Engenharia de Software':
                    return '#1f4480'
                case 'Licenciatura em Computação':
                    return '#3d70ad'
                case 'Medicina':
                    return '#0c3120'
                case "Ciências Biológicas":
                    return '#196e33'
                case 'Psicologia':
                    return '#dd5b74'
                case "Letras":
                    return '#e01432'
                case "Geografia":
                    return '#dd7e17'
                case "História":
                    return '#ecb74a'
                case "Matemática":
                    return '#9eada5'
                case "Pedagogia":
                    return '#dbe5e0'
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
                    else if (response.status == 500) {
                        setCurrentError(500);
                    }
                    else if (response.status == 404) {
                        setCurrentError(404);
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
                    //console.log('Notifications:', response.data)
                    if (response.status == 200) {
                        setUserNotifications(response.data)
                    }
                    else if (response.status == 500) {
                        setCurrentError(500);
                    }
                    else if (response.status == 404) {
                        setCurrentError(404);
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
                    else if (response.status == 500) {
                        setCurrentError(500);
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
                    else if (response.status == 500) {
                        setCurrentError(500);
                    }
                    else if (response.status == 404) {
                        setCurrentError(404);
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
                    else if (response.status == 500) {
                        setCurrentError(500);
                    }
                    else if (response.status == 404) {
                        setCurrentError(404);
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
            currentError,
            myEventsList,
            setCurrentError,
            setEventByDateRequested,
            setLoading,
            getUser,
            saveUser,
            deleteUser,
            signOut,
            handleSignIn,
            getEventsByCourse,
            getEventByUser,
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
            deleteEvent,
        }}>
            {children}
        </AppContext.Provider>
    )

}
export default AppContext;