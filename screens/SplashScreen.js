import { ActivityIndicator, View, StyleSheet } from "react-native"


const SplashScreen = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#ffffff" />
        </View>
    )
}
export default SplashScreen

const styles = StyleSheet.create(({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white'
    },
}))