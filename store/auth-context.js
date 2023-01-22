import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { createContext, useEffect, } from 'react';
import { useState } from 'react';
import { BASE_URL } from '../utils/config';

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
    const [isLoading, setIsLoading] = useState(false)
    const [userInfo, setUserInfo] = useState({})
    const [token, setToken] = useState({})
    const [splashLoading, setSplashLoading] = useState(false)

    const login = (url, email, password) => {
        setIsLoading(true)
        AsyncStorage.setItem("url", url)
        axios.post(`${url}/auth/login`, {
            "email": email,
            "password": password,
        })
            .then(res => {
                let userInfo = {};
                userInfo.token = res.data.auth.access_token;
                setUserInfo(userInfo)
                AsyncStorage.setItem('token', JSON.stringify(userInfo))
                setIsLoading(false)
            }).catch(e => {
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

            const getToken = async (userInfo) => {
                let url = await AsyncStorage.getItem("url")
                const tok = await AsyncStorage.getItem('token');
                const tokenInfo = JSON.parse(tok)
                let ui = {}

                if (url != null) {
                    axios.post(`${url}/auth/refresh`, {}, {
                        headers: {
                            'content-type': `application/json`,
                            'Authorization': `Bearer ${tokenInfo.token}`,
                        },
                    }).then((response) => {
                        ui = {}
                        ui.token = response.data.access_token 
    
                        const st = async (t) => {
                            await AsyncStorage.setItem('token', JSON.stringify(t))
                        }
                        
                        st(ui)
                        setUserInfo(ui)
    
    
                    
                    }).catch((error) => {
                        const st = async (t) => {
                            await AsyncStorage.setItem('token', JSON.stringify(t))
                        }
                        ui = {}
                        st(ui)
                        setUserInfo(ui)
                    });
                }
            }
            if(userInfo) {
                getToken(userInfo)
            }


            setSplashLoading(false)
        } catch (e) {
            setSplashLoading(false)
        }
    }

    useEffect(() => {
        isLoggedIn();
    }, [])

    const value = {
        userInfo,
        setUserInfo,
        splashLoading,
        login,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;