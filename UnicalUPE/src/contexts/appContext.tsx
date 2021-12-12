import React, { createContext, useState, useEffect } from 'react';
import * as userApi from '../services/userApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

type user = { email: string, name: string, picture: string, id: number, accountType: string }
type email = { email: string }
export const AppContext = createContext({
    signed: false,
    user: {},
    loading: false,
    getUser: (email: email) => { },
    createUser: (user: user) => { },
    signOut: () => { },
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

    return (
        <AppContext.Provider value={{ signed: !!user, user, loading, getUser, createUser, signOut }}>
            {children}
        </AppContext.Provider>
    )
}
export default AppContext;