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
import { connect } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { uploadImage, updateDrugImageUrl, } from '../../../stores/action'

import createFormData from '../../../helpers/formData'
import * as ImagePicker from 'expo-image-picker';


const mapStateToProps = state => {
    return state
}

const mapDispatchToProps = {
	uploadImage,
    updateDrugImageUrl,
};

function DrugPictureGallery({navigation, updateDrugImageUrl}){
    const { destination, drugDetail, setDrugImage } = navigation.state.params
    // Image
    const [image, setImage] = useState(null)
    const [imageToUpload, setImageToUpload] = useState(null)

    // Load
    const [load, setLoad] = useState(false)


    // Use effect for asking permission
    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
        pickImage()
    }, [])


    // Function for picking an image from gallery
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
          exif: true,
        });
        
        if (!result.cancelled) {
            setImage(result.uri);
            setDrugImage(result.uri)
            const _id = drugDetail._id
            const fileToUpload = createFormData(result, _id)
            setImageToUpload(fileToUpload)
        } 
    }

    const saveImage = async () => {
        setLoad(true)
        let token = await AsyncStorage.getItem('token')
        token = JSON.parse(token).token
        const id = drugDetail._id
        
        console.log('Application is sending data to store/action...')
        
        await updateDrugImageUrl(id, imageToUpload, token, navigation.navigate, destination)
        setLoad(false)
    }

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <TouchableOpacity
                    style={styles.editTouchable}
                    onPress={() => pickImage()}
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
                {imageToUpload ? 
                    <TouchableOpacity
                        onPress={() => saveImage()}
                        disabled={load}
                    >
                        {load ? (
                            <ActivityIndicator size={"small"} color="#FFF" />
                            ) : (
                                <Text style={styles.text}>Simpan</Text>
                            )}
                    </TouchableOpacity> :
                    <Text style={styles.text}>Pilih foto untuk melanjutkan</Text>
                }
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
)(DrugPictureGallery)