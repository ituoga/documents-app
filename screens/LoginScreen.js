import { useContext, useState } from "react"
import { View, Text, TextInput, StyleSheet, Button } from "react-native"
import { AuthContext } from "../store/auth-context"

const LoginScreen = () => {

    const [user, setUser] = useState(null)
    const [password, setPassword] = useState(null)
    const [url, setUrl] = useState(null)
    const {login } = useContext(AuthContext)

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.inputs}
                placeholder="URL"
                value={url}
                onChangeText={text => setUrl(text)}
            />
            <TextInput
                style={styles.inputs}
                placeholder="Prisijungimas"
                value={user}
                onChangeText={text => setUser(text)}
            />
            <TextInput
                style={styles.inputs}
                placeholder="Slaptažodis"
                value={password}
                onChangeText={text => setPassword(text)}
            />
            <Button title="Prisijungti" onPress={() => {login(url, user, password) }} />
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
    }
}))
