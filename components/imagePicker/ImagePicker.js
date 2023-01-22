import { View, Button, Image, Pressable, StyleSheet } from "react-native"
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from 'expo-image-picker'
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../store/auth-context"
import CameraButton from "../ui/cameraButton/CameraButton"
import { GlobalStyles } from "../../constants/Styles"
import AsyncStorage from "@react-native-async-storage/async-storage"

const ImagePicker = ({ group_Name }) => {

    const { userInfo } = useContext(AuthContext)
    const [documentDirection, setDocumentDirection] = useState();

    const imageHandler = async () => {

        if (!documentDirection) return;

        const image = await launchCameraAsync({
            aspect: [4, 3],
            quality: 1,
        })

        if (image.canceled) {
            setDocumentDirection('')
            return;
        } else {
            const token = userInfo.token;
            let url = await AsyncStorage.getItem("url")
            let formData = new FormData();
            formData.append("file", {
                uri: image.uri,
                type: "image/jpeg",
                name: 'image.jpg',
            });
            formData.append("group_name", `${group_Name}`)
            formData.append("document_direction", `${documentDirection}`)
            axios.post(`${url}/files`, formData, {
                headers: {
                    'content-type': `multipart/form-data;`,
                    "Authorization": `Bearer ${token}`,
                },
            }).then((response) => {
                // console.log(response);
            }).catch((error) => {
                console.log(error);
            });
        }
    }

    useEffect(() => {
        imageHandler();
    }, [documentDirection]);

    return (
        <View style={styles.container}>
            <View style={styles.cameraButtonLeft}>
                <CameraButton imageHandler={() => setDocumentDirection('incoming')} />
            </View>
            <View style={styles.cameraButtonRight}>
                <CameraButton imageHandler={() => setDocumentDirection('outcoming')} />
            </View>
        </View>
    )
}
export default ImagePicker

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    cameraButtonLeft: {
        marginHorizontal: 60,
        backgroundColor: GlobalStyles.colors.red,
        borderRadius: 50,
        padding: 10
    },
    cameraButtonRight: {
        marginHorizontal: 60,
        backgroundColor: GlobalStyles.colors.green,
        borderRadius: 50,
        padding: 10
    },
    pressed: {
        opacity: 0.7,

    }
})