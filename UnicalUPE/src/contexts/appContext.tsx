import React, { createContext, useState, useEffect } from 'react';
import * as userApi from '../services/userApi';
import * as EventApi from '../services/EventApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AuthSession from 'expo-auth-session';

type AuthResponse = {
    type: string;
    params: {
        access_token: string;
    }
}

type user = { email: string, name: string, picture: string, id: number, accountType: string }
type email = { email: string }
export const AppContext = createContext({
    signed: false,
    user: {},
    loading: false,
    getUser: (email: email) => { },
    createUser: (user: user) => { },
    signOut: () => { },
    handleSignIn: () => { }
});

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState<boolean | undefined>()
    const [user, setUser] = useState();


    useEffect(() => {
        setLoading(true)
        async function loadStorageData() {
            const storagedUser = await AsyncStorage.getItem('@TGAuth:user');

            if (storagedUser) {
                setUser(JSON.parse(storagedUser));
            }
            setLoading(false);
        }
        loadStorageData();
    }, [])


    async function getUser(email: email) {
        setLoading(true);
        let localUser;
        try {
            console.log('Requesting getUser')
            await userApi.getUser(email)
                .then(response => {
                    console.log('GetUser requested')
                    console.log(response.data)
                    if (response.status == 200) {
                        setUser(response.data)
                        localUser = response.data
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

    async function createUser(user: user) {
        setLoading(true);
        try {
            await userApi.createUser(user)
                .then(response => {
                    let result = false;
                    if (response.status = 200) {
                        setUser(response.status)
                        result = true;
                    }
                    setLoading(false);
                    return result
                })
        } catch (e) {
            console.log(e)
            return false;
        }

    }

    function signOut() {
        console.log('SignOut Called')
        AsyncStorage.clear().then(() => {
            setUser(null);
            console.log('LocalStorage cleaned')
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
        setUser({name: userinfo.name, email: userinfo.email})
        console.log('User email: ' + userinfo.email)
        await getUser(userinfo.email)
        setLoading(false)
    }
    return (
        <AppContext.Provider value={{ signed: !!user, user, loading, getUser, createUser, signOut, handleSignIn }}>
            {children}
        </AppContext.Provider>
    )

    // --------------------------------------------//Events//------------------------------------------------------------

    async function getEventsAll() {
        setLoading(true);
        try {
            console.log('Requesting getEvents')
            await EventApi.getAllEvents()
                .then(response => {
                    console.log('Events requested')
                    console.log(response.data)
                    if (response.status == 200) {
                        console.log("deu certo")
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
}
export default AppContext;