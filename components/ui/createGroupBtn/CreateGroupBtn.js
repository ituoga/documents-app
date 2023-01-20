import { Pressable, View, Text, StyleSheet } from "react-native"
import { Ionicons } from '@expo/vector-icons'
import { GlobalStyles } from "../../../constants/Styles"

const CreateGroupBtn = ({ group_Name, createGroupName, clearGroupName }) => {
    return (
        <Pressable
            onPress={group_Name ? () => clearGroupName('') : () => createGroupName('')}
            style={({ pressed }) => pressed && styles.pressed} >
            <View style={styles.container}>
                <Text style={styles.btnText}>{group_Name ? 'Clear Group' : 'Create Group'} </Text>
            </View>
        </Pressable >
    )
}
export default CreateGroupBtn

const styles = StyleSheet.create({
    container: {
        padding: 7,
        backgroundColor: GlobalStyles.colors.primary100,
        borderRadius: 5
    },
    btnText: {
       fontWeight: 'bold',
       fontSize: 16,
       color: GlobalStyles.colors.gray500
    },
    pressed: {
        opacity: 0.7,

    }
})