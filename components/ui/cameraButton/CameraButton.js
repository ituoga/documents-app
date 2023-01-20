import { Pressable, View, StyleSheet } from "react-native"
import { Ionicons } from '@expo/vector-icons'
import { GlobalStyles } from "../../../constants/Styles"

const CameraButton = ({ imageHandler, }) => {
    return (
        <Pressable
            onPress={() => imageHandler()}
            style={({ pressed }) => pressed && styles.pressed} >
            <View style={styles.container}>
                <Ionicons name='camera' size={40} color={'white'} />
            </View>
        </Pressable >
    )
}
export default CameraButton

const styles = StyleSheet.create({
    container: {
        
    },
    pressed: {
        opacity: 0.7,

    }
})