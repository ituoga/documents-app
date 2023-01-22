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
                        <Stack.Screen name="Documents APP" component={HomeScreen} />
                    ) : (
                        <Stack.Screen name="Documents APP" component={LoginScreen} />
                    )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation