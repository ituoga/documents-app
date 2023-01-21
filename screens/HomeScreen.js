import { View, Text, StyleSheet, Button } from "react-native"
import { Ionicons } from '@expo/vector-icons';
import CreateGroupBtn from "../components/ui/createGroupBtn/CreateGroupBtn";
import ImagePicker from "../components/imagePicker/ImagePicker";
import { useContext, useState } from "react";
import { AuthContext } from "../store/auth-context";
import GenerateRandomCode from "react-random-code-generator";
import { GlobalStyles } from "../constants/Styles";


const HomeScreen = () => {

    const [group_Name, setGroup_Name] = useState('')

    const generateCode = () => {
        setGroup_Name(GenerateRandomCode.TextCode(10))
    }

    return (
        <View style={styles.container}>
            <View style={styles.createBtn}>
                <CreateGroupBtn group_Name={group_Name} createGroupName={generateCode} clearGroupName={() => setGroup_Name('')} />
            </View>
            <View style={styles.line}></View>
            <View style={styles.buttons}>
                <ImagePicker group_Name={group_Name} />
            </View>
        </View>
    )
}
export default HomeScreen

const styles = StyleSheet.create(({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: GlobalStyles.colors.primary50,
    },
    line: {
        borderTopColor: GlobalStyles.colors.primary100,
        borderTopWidth: 1,
        width: '100%',
        margin: 20
    },
    buttons: {
        marginBottom: 70,
        marginTop: 30
    }
}))