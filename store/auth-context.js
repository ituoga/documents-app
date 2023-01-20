import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { createContext, useEffect, } from 'react';
import { useState } from 'react';
import { BASE_URL } from '../utils/config';

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
    const [isLoading, setIsLoading] = useState(false)
    const [userInfo, setUserInfo] = useState({})
    const [splashLoading, setSplashLoading] = useState(false)

    const login = (url, name, password) => {
        setIsLoading(true)

        // axios.post('https://9g.lt/a/ap.php', {
        axios.post(url, {
            "name": name,
            "pass": password,
        })
            .then(res => {
                let userInfo = res.data;
                console.log(userInfo)
                setUserInfo(userInfo)
                AsyncStorage.setItem('token', JSON.stringify(userInfo))
                setIsLoading(false)
            }).catch(e => {
                console.log(`login error ${e}`)
                setIsLoading(false)
            })
    }

    const isLoggedIn = async () => {
        try {
            setSplashLoading(true)
            let userInfo = await AsyncStorage.getItem('token')
            userInfo = JSON.parse(userInfo)

            if (userInfo) {
                setUserInfo(userInfo)
            }
            setSplashLoading(false)
        } catch (e) {
            setSplashLoading(false)
            console.log(`is logged in error ${e}`)
        }
    }

    useEffect(() => {
        isLoggedIn();
    }, [])

    const value = {
        userInfo,
        splashLoading,
        login,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;