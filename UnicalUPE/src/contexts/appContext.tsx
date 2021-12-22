import React, { createContext, useState, useEffect } from 'react';
import * as userApi from '../services/userApi';
import * as EventApi from '../services/EventApi';
import * as CoursesApi from '../services/CoursesApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AuthSession from 'expo-auth-session';
import { AxiosResponse } from 'axios';
import {eventType} from '../types'

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
    postEvent: () => {},
    CurrentCourse: () =>{},
    
});

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState<boolean | undefined>()
    const [eventByDateRequested, setEventByDateRequested] = useState<boolean | undefined>()
    const [user, setUser] = useState();
    const [eventsList, setEventList] = useState([]);
    const [coursesList, setCoursesList] = useState([]);
    const [EventsCalendar, SetEventsCalendar] = useState({});
    const [course, setCurrentCourse] = useState({})
    const [SelectDate, setSelectDate] = useState({})


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
                getEventsByCourse(localUser.course.id)
            }
            else {
                getEventsAll();

            }
            setLoading(false);
        }
        loadStorageData();
    }, [])

    function FilterByCourse(event: eventType){
        
        var eventCourse = event.course 
        if(!eventCourse){
            return false
        }
        return eventCourse.name == course.name;
    }
    function FilterByDate(event: eventType){
        
        var eventDate = event.startDate
        if(!eventDate){
            return false
        }
        return eventDate.name == SelectDate;
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
            setUser(null);
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
                        if(SelectDate != null){
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
                        console.log(course)
                        if(course.id != null){
                            list = list.filter(FilterByCourse) 
                        }
                        setSelectDate(date)
                        setEventList(list)
                        setEventByDateRequested(true);
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

    async function postEvent(event) {
        setLoading(true);
        try {
            console.log('post Event')
            await EventApi.postEvent(event)
                .then((response: AxiosResponse) => {
                    console.log('Add Event')
                    
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
                json[item.startDate] = { dots: [] }
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
            eventJson[element.startDate].dots.push({ key: element.title, color: setCategoryColor(element.course ? element.course.name : "a") })
            // console.log("object added: ", eventJson[element.startDate])
        });
        // console.log("Final list json: ", eventJson)
        return eventJson
    }



    function setCategoryColor(courseName) {
        switch (courseName) {
            case 'Engenharia de Software':
                return 'blue'
            case 'Psicologia':
                return 'red'
            case 'Medicina':
                return 'green'
            case 'Licenciatura em Computação':
                return 'yellow'
            default: return 'gray'
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

    function CurrentCourse(course){
        setCurrentCourse(course)
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
            CurrentCourse,
            
        }}>
            {children}
        </AppContext.Provider>
    )

}
export default AppContext;