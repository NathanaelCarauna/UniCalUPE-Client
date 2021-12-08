import React, { createContext, useState, useEffect } from 'react';
import * as userApi from '../services/userApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

type user = { email: string, name: string, picture: string, id: number, accountType: string }

export const AppContext = createContext({
    signed: false,
    user: {},
    loading: false,
    handleUser: (email) => { }

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

    async function handleUser (email){
        try{
            await userApi.getUser(email)
                .then(response => {
                    if(response.status = 200){
                        setUser(response.data)
                        return true;
                    }else{
                        return false
                    }
                })
        }catch(e){
            console.log(e)
            return false;
        }

    }



    return (
        <AppContext.Provider value={{ signed: !!user, user, loading, handleUser}}>
            {children}
        </AppContext.Provider>
    )
}
export default AppContext;