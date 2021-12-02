import React, { useState, useEffect } from 'react'
import { 
    View, 
    Text, 
    Image, 
    StyleSheet, 
    TouchableOpacity,
    Platform,
} from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import { connect } from 'react-redux'
import capitalFirst from '../../../helpers/capitalFirst' // for proper case full name
import PictureModal from '../../modals/profilePictureModal'// modal for profile picture options
import CameraComponent from '../imagePicker/camera'
import GalleryComponent from '../imagePicker/gallery'
import * as ImagePicker from 'expo-image-picker';
import createFormData from '../../../helpers/formData'
import { uploadImage } from '../../../stores/action'
import AsyncStorage from '@react-native-async-storage/async-storage'


const mapStateToProps = state => {
    return state
}

const mapDispatchToProps = {
	uploadImage
};
const profileInfo = (props) => {
    // Camera
    // const [hasPermission, setHasPermission] = useState(null);
    // const [type, setType] = useState(Camera.Constants.Type.back);

    const [image, setImage] = useState(null);



    const userData = props.userData

    // Profile Picture
    const [profilePictureModal, setProfilePictureModal] = useState(false)
    const profileStatusSelection =[
        {   
            label:'Hapus',
            url: require('../../../assets/png/ic_trash.png'),
        },
        {
            label:'Kamera',
            url: require('../../../assets/png/ic_kamera.png'),
        },
        {
            label:'Galeri',
            url: require('../../../assets/png/ic_galeri.png'),
        }
    ]

    function fullName() {
        return userData ? 
            userData?.lastName ?
                capitalFirst(userData?.firstName) + ' ' + capitalFirst(userData?.lastName)
                :
                capitalFirst(userData?.firstName)
            : ''

    }

    async function setSelectedValue(label){
        switch (label) {
            case 'Kamera':
                (async () => {
                    if (Platform.OS !== 'web') {
                      const { status } = await ImagePicker.requestCameraPermissionsAsync();
                      console.log(status)
                      if (status !== 'granted') {
                        alert('Sorry, we need camera roll permissions to make this work!');
                      }
                    }
                  })();
                  takePicture()
                break;

            case 'Galeri':
                (async () => {
                    if (Platform.OS !== 'web') {
                      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                      if (status !== 'granted') {
                        alert('Sorry, we need camera roll permissions to make this work!');
                      }
                    }
                  })();
                  pickImage()
                break;

            case 'Hapus':
                console.log('Hapus')
                break;
        
            default:
                break;
        }
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
          exif: true,
        //   base64: true
        });
        const fileToUpload = createFormData(result)
        let token = await AsyncStorage.getItem('token')
        token = JSON.parse(token).token
        
        console.log('Application is sending data to store/action...')

        props.uploadImage(userData._id, fileToUpload, token)

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    const takePicture = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            // base64: true
        });
        console.log(result)

        if (!result.cancelled) {
            setImage(result.uri);
        }
    }

    

    return (
        <View style={styles.container}>
            <View style={styles.profilePicture}>   
                <Image
                    source={{ uri: userData?.imageUrl ? userData?.imageUrl : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRH_WRg1exMTZ0RdW3Rs76kCOb9ZKrXddtQL__kEBbrS2lRWL3r' }}
                    style={styles.userImage}
                />  
                
                <TouchableOpacity style={{marginTop:-17,zIndex:1,marginLeft:30}}
                    onPress={()=>setProfilePictureModal(true)}
                   
                >
                    
                    <Image source={ require('../../../assets/png/ic_camera.png') } style={{width: 28, height: 30}} />
                </TouchableOpacity>
                
                <PictureModal
                        modal={profilePictureModal}
                        setModal={setProfilePictureModal}
                        selection={profileStatusSelection}
                        setSelectedValue={setSelectedValue}
                >
                </PictureModal>        
            </View>
           
            <View style={styles.profileData}>
                <View style={styles.fullName}>
                    <Text style={styles.fullNameText}>{fullName()}</Text>
                </View>
                <View style={styles.phoneNumber}>
                    <Text style={styles.phoneNumberText}>{userData?.phoneNumber}</Text>
                </View>
                <View style={styles.verified}>
                    <View style={styles.innerVerified}>
                        <Text style={styles.verifiedText}>Sudah Terverifikasi</Text>
                        <View style={styles.verifiedLogo}>
                            <Image
                                source={require('../../../assets/png/VerifiedLogo.png')}
                            />
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}

                        </View>
                    </View>
                </View>
            </View>
        </View>
        
        
    )
}

const styles = StyleSheet.create({
    container: {
        width: wp('100%'),
        height: hp('14%'),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#2F2F2F',
        paddingLeft: 20,
        paddingVertical: 20
    },

    profilePicture: {
        // flex: 0.1,
        flexDirection: 'column',
        position:'absolute',
        marginLeft:15
    },

    userImage: {
        width: 55,
        height: 55,
        borderRadius: 150 / 2,
        overflow: "hidden",
        borderWidth: 3,
        borderColor: "#4BE395"
    },

    profileData: {
        justifyContent: 'space-around',
        paddingLeft: 70,
    },

    fullName: {

    },

    fullNameText: {
        color: '#DDDDDD',
        fontSize: 16
    },

    phoneNumber: {
        paddingVertical: 10,
    },

    phoneNumberText: {
        color: '#B5B5B5',
        fontSize: 14
    },

    verified: {
        backgroundColor: '#3C3C3C',
        alignSelf: 'flex-start'
    },

    innerVerified: {
        flexDirection: 'row', 
        paddingHorizontal: 10
    },

    verifiedText: {
        color: '#B5B5B5',
        fontSize: 14
    },

    verifiedLogo: {
        paddingLeft: 10,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(profileInfo)

//     return (
//         <View style={viewStyles.container}>
//             <ImageBackground
//                 source={require('../../../assets/Background-Pattern.png')}
//                 style={[viewStyles.backgroundImage, { justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 15 }]}>
//                 <View style={{ height: 120, width: 100, alignItems: 'flex-end', justifyContent: 'flex-end' }}>
//                     <View style={{
//                         width: wp(25),
//                         height: wp(25),
//                         borderWidth: 2,
//                         borderColor: 'white',
//                         borderRadius: 80,
//                         position: 'absolute',
//                         alignSelf:'center'
//                     }}>
//                         <Image
//                             // source={require('../../../assets/irs.png')}
//                             source={{ uri: props.userData?.photo ? props.userData?.photo : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRH_WRg1exMTZ0RdW3Rs76kCOb9ZKrXddtQL__kEBbrS2lRWL3r' }}
//                             style={viewStyles.userImage} />
//                     </View>
//                     {/* <TouchableOpacity onPress={() => alert('to gallery')}>
//                         <Image source={{ uri: 'https://img.icons8.com/carbon-copy/2x/camera.png' }}
//                             style={{ height: 35, width: 35, backgroundColor: '#FFF', borderRadius: 30, borderColor: '#22FF08', borderWidth: 1, position: 'relative' }} />
//                     </TouchableOpacity> */}
//                 </View>
//                 <Text style={textStyles.fullname}>{fullName()}</Text>
//                 <View style={viewStyles.premiumUser}>
//                     <Icon5
//                         name={'crown'}
//                         size={13}
//                         color={'yellow'} />
//                     <Text style={textStyles.premiumTitle}> Premium User</Text>
//                 </View>
//             </ImageBackground>

//             {/* <TouchableOpacity
//                 onPress={() => modalvisible()}
//                 style={viewStyles.editProfile}>
//                 <Text style={textStyles.editProfile}> Edit Profile </Text>
//             </TouchableOpacity> */}
//             <Modal
//                 animationType="slide"
//                 transparent={false}
//                 visible={modalVisibility}
//                 onRequestClose={() => {
//                     Alert.alert('Modal has been closed.');
//                 }}>
//                 <EditProfile setmodal={modalvisible} userData={userData} />
//             </Modal>
//         </View>
//     )
// }


// const viewStyles = StyleSheet.create({
//     container: {
//         // justifyContent: 'center',
//         // alignItems: 'center',
//         // borderWidth: 1,
//         // borderColor: 'blue',
//         backgroundColor: '#CC896E',
//         width: wp('100%'),
//         height: hp('31%'),
//         // paddingTop: hp('5%'),
//     },
//     container2: {
//         top: hp('5%'),
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderWidth: 1,
//         borderColor: 'yellow'
//     },
//     userImage: {
//         width: '100%',
//         height: '100%',
//         // borderWidth: 2,
//         // borderColor: 'white',
//         borderRadius: 80,
//         // position: 'absolute',
//     },
//     mid: {
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginStart: '5%'
//     },
//     edit: {
//         flexDirection: 'row',
//         justifyContent: 'flex-end',
//         width: 30,
//         maxHeight: '50%'
//     },
//     premiumUser: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'center'
//     },
//     littlebox: {
//         width: 90,
//         height: 30,
//         backgroundColor: 'yellow',
//         borderTopLeftRadius: 20,
//         borderBottomLeftRadius: 20,
//         marginRight: -25,
//         shadowColor: "#000",
//         shadowOffset: {
//             width: 0,
//             height: 4,
//         },
//         shadowOpacity: 0.32,
//         shadowRadius: 5.46,
//         elevation: 9,
//     },
//     editProfile: {
//         width: '100%',
//         height: 30,
//         backgroundColor: 'white',
//         marginVertical: 20,
//         alignItems: 'center',
//         justifyContent: 'center'
//     },
//     backgroundImage: {
//         height: '100%',
//         width: '100%',
//         position: 'absolute',
//         zIndex: 0
//     }
// })
// const textStyles = StyleSheet.create({
//     fullname: {
//         fontSize: 20,
//         color: 'grey',
//         textTransform: 'capitalize',
//         paddingTop: 5,
//         fontFamily: 'NunitoSans-Bold'
//     },
//     nik: {
//         fontSize: 13,
//         color: 'white',
//         fontFamily: 'NunitoSans-Regular'
//     },
//     phone: {
//         fontSize: 13,
//         color: 'white',
//         fontFamily: 'NunitoSans-Regular'
//     },
//     premiumTitle: {
//         color: 'grey',
//         fontSize: 16,
//         fontFamily: 'NunitoSans-Regular'
//     },
//     editProfile: {
//         fontSize: 15,
//         fontFamily: 'NunitoSans-Regular'
//     }
// })
