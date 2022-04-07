import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Image,
    ActivityIndicator,
} from 'react-native'
import { connect, useSelector } from 'react-redux'
import { updateProfilePicture } from '../../stores/action'

import createFormData from '../../helpers/formData'
import * as ImagePicker from 'expo-image-picker';

const mapStateToProps = state => {
    return state
}

const mapDispatchToProps = {
    updateProfilePicture
};

function ProfilePictureCamera({navigation, updateProfilePicture}){
    const { userData, isLoading } = useSelector(state => state.userDataReducer)
    const { destination } = navigation.state.params
    // Image
    const [image, setImage] = useState(null)
    const [imageToUpload, setImageToUpload] = useState(null)

    // Load
    // const [load, setLoad] = useState(false)

    // Use effect for asking permission
    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
              const { status } = await ImagePicker.requestCameraPermissionsAsync();
              console.log(status, 'status at profilePictureCamera')
              if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
              }
            }
        })();
        takePicture()
    }, [])


    // Function for open camera and take a picture
    const takePicture = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        
        if (!result.cancelled) {
            setImage(result.uri);
            const _id = userData._id
            const fileToUpload = createFormData(result, _id)
            setImageToUpload(fileToUpload)
        }
    }

    const saveImage = async() => {
        // setLoad(true)
        // let token = await AsyncStorage.getItem('token')
        // token = JSON.parse(token).token
        const id = userData._id

        console.log('Application is sending data to store/action...')

        await updateProfilePicture(id, imageToUpload, navigation.navigate, destination, userData)
        // setLoad(false)
    }

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <TouchableOpacity
                    style={styles.editTouchable}
                    onPress={() => takePicture()}
                >
                    <Text style={styles.text}>Edit foto profil</Text>
                </TouchableOpacity>
                    <Image 
                        source={{ uri: image || 'https://st.depositphotos.com/1052233/2815/v/600/depositphotos_28158459-stock-illustration-male-default-profile-picture.jpg' }} 
                        style={styles.profilePicture} 
                    />
            </View>
            <View style={styles.bottomContainer}>
                <TouchableOpacity
                    onPress={() => navigation.navigate(destination)}
                >
                    <Text style={styles.text}>Kembali</Text>  
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => saveImage()}
                    disabled={isLoading}
                    >
                        {isLoading ? (
                            <ActivityIndicator size={"small"} color="#FFF" />
                            ) : (
                                <Text style={styles.text}>Simpan</Text>
                            )}
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(31, 31, 31, 1)',
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },

    topContainer: {
        flex: 0.9,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red',
        width: '100%',
        paddingBottom: 50
    },

    editTouchable: {
        paddingBottom: 50
    },

    // https://stackoverflow.com/questions/30404067/creating-css-circles-in-react-native#:~:text=None%20of%20these%20fit%20my%20needs%2C%20if%20you%20need%20a%20responsive%20circle%20you%20can%20try%20using%20my%20solution%3A
    profilePicture: { 
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width,
    },

    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        // backgroundColor: 'green',
        paddingVertical: 20,
        width: '100%'
    },

    text: {
        color: '#DDDD'
    }
})

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(ProfilePictureCamera)