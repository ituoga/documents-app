import { useContext, useState } from "react"
import { View, Text, TextInput, StyleSheet, Button } from "react-native"
import { AuthContext } from "../store/auth-context"

const LoginScreen = () => {

    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [url, setUrl] = useState('')
    const { login, error } = useContext(AuthContext)

    return (
        <View style={styles.container}>
            {error && <Text style={styles.error}>{error}</Text>}
            <TextInput
                style={styles.inputs}
                placeholder="URL"
                value={url}
                onChangeText={text => setUrl(text)}
                autoCapitalize='none'
            />
            <TextInput
                style={styles.inputs}
                placeholder="Prisijungimas"
                value={user}
                onChangeText={text => setUser(text)}
                autoCapitalize='none'
            />
            <TextInput
                style={styles.inputs}
                placeholder="Slaptažodis"
                value={password}
                keyboardTyp='lowerCase'
                onChangeText={text => setPassword(text)}
                autoCapitalize='none'
            />
            <Button title="Prisijungti" onPress={() => { login(url, user, password) }} />
        </View>
    )
}
export default LoginScreen

const styles = StyleSheet.create(({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    inputs: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        padding: 5,
        marginVertical: 5,
        width: "70%",
    },
    error: {
        color: 'red',
        paddingTop: 20
    }
}))
