import HomeScreen from "../../screens/HomeScreen"
import LoginScreen from "../../screens/LoginScreen"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../store/auth-context";
import SplashScreen from "../../screens/SplashScreen";
import { GlobalStyles } from "../../constants/Styles";
import axios from "axios";

const Stack = createNativeStackNavigator()

const Navigation = () => {

    const { userInfo, setUserInfo, splashLoading } = useContext(AuthContext)

    useEffect(() => {
        const getToken = async () => {
            let url = await AsyncStorage.getItem("url")
            const token = await AsyncStorage.getItem('token');

            console.log(url)

            console.log(token)
            if (url !== null) {
                axios.post(`http://mail.c8.lt/api/v1/auth/refresh`, {}, {
                    headers: {
                        'content-type': `application/json`,
                        'Authorization': `Bearer ${token}`,
                    },
                }).then((response) => {
                    console.log(response.data.access_token);
                    console.log(response.data.message)
                    userInfo.token = response.data.access_token
                     AsyncStorage.setItem('token', JSON.stringify(userInfo.token))
                    setUserInfo(userInfo)
                }).catch((error) => {
                    console.log(error);
                    console.log('eroras')
                });
            }
        }
        getToken()
    }, [userInfo])


    return (
        <NavigationContainer>
            <StatusBar style="dark" />
            <Stack.Navigator
                screenOptions={{
                    headerStyle: { backgroundColor: GlobalStyles.colors.primary100 },
                    headerTintColor: GlobalStyles.colors.gray700,
                }}>
                {splashLoading ?
                    (
                        <Stack.Screen name="Splash Screen"
                            component={SplashScreen}
                            options={{ headerShown: false }} />
                    ) : userInfo.token ? (
                        <Stack.Screen name="Buhalterija DVS" component={HomeScreen} />
                    ) : (
                        <Stack.Screen name="Buhalterija DVS" component={LoginScreen} />
                    )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation