import HomeScreen from "../../screens/HomeScreen"
import LoginScreen from "../../screens/LoginScreen"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useContext } from "react";
import { AuthContext } from "../../store/auth-context";
import SplashScreen from "../../screens/SplashScreen";
import { GlobalStyles } from "../../constants/Styles";

const Stack = createNativeStackNavigator()

const Navigation = () => {

    const { userInfo, splashLoading } = useContext(AuthContext)

    return (
        <NavigationContainer>
            <StatusBar style="dark" />
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {backgroundColor: GlobalStyles.colors.primary100},
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