import React, { createContext, useState, useEffect } from 'react';
import * as userApi from '../services/userApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

type user = { email: string, name: string, picture: string, id: number, accountType: string }
type email = { email: string }
export const AppContext = createContext({
    signed: false,
    user: {},
    loading: false,
    handleUser: (email: email) => { },
    createUser: (user: user) => { },
    signOut: () => {},
});

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState<boolean | undefined>()
    const [user, setUser] = useState(null);

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

    async function handleUser(email: email) {
        setLoading(true);
        try {
            console.log('Requesting getUser')
            await userApi.getUser(email)
                .then(response => {
                    console.log('GetUser requested')
                    console.log(response.data)
                    let result = false;
                    if (response.status == 200) {                        
                        setUser(response.data)
                        result = true;
                    }                   
                    setLoading(false);
                    return result
                })
        } catch (e) {
            console.log(e)
            return false;
        }
        setLoading(false);
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
        <AppContext.Provider value={{ signed: !!user, user, loading, handleUser, createUser, signOut }}>
            {children}
        </AppContext.Provider>
    )
}
export default AppContext;