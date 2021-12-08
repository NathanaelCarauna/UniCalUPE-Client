import React, { createContext, useState, useEffect } from 'react';
// import * as auth from '../services/auth';
// import * as userApi from '../services/userApi';
// import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

type user = { email: string, name: string, picture: string, id: number, accountType: string }

export const AppContext = createContext({
    signed: false,
    user: {},
    loading: false,
    signIn: () => { }

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



    return (
        <AppContext.Provider value={{ signed: !!user, user, loading}}>
            {children}
        </AppContext.Provider>
    )
}
export default AppContext;