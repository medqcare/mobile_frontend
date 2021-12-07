import React, { useDebugValue, useEffect, useState } from 'react'
import { 
    View, 
    Text, 
    Image, 
    StyleSheet, 
    TouchableOpacity,
    ActivityIndicator
} from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import { connect, useSelector } from 'react-redux'
import capitalFirst from '../../../helpers/capitalFirst' // for proper case full name
import PictureModal from '../../modals/profilePictureModal'// modal for profile picture options
import ConfirmationModal from '../../modals/ConfirmationModal'
import { deleteImage } from '../../../stores/action'
import AsyncStorage from '@react-native-async-storage/async-storage'


const mapStateToProps = state => {
    return state
}

const mapDispatchToProps = {
    deleteImage
};

const profileInfo = (props) => {
    // const [userData, setUserData] = useState(props.userData)
    const [confirmationModal, setConfirmationModal] = useState(false)

    // Load
    const [load, setLoad] = useState(false)
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
                userData?.firstName + ' ' + userData?.lastName
                :
                userData?.firstName
            : ''

    }

    async function deleteProfilePicture(){
        setLoad(true)
        const patientId = userData._id
        const firstName = userData.firstName
        const lastName = userData.lastName
        const fullName = lastName ? `${firstName}${lastName}` : firstName
        let token = await AsyncStorage.getItem('token')
        token = JSON.parse(token).token
        await props.deleteImage(patientId, fullName, token)
        setLoad(false)
        setConfirmationModal(false)
    }

    async function setSelectedValue(label){
        switch (label) {
            case 'Kamera':
                await props.navigation.navigate('ProfilePictureCamera', { destination: props.destination })
                break;

            case 'Galeri':
                await props.navigation.navigate('ProfilePictureGallery', { destination: props.destination })
                break;

            case 'Hapus':
                setConfirmationModal(true)
                break;
        
            default:
                break;
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
                <ConfirmationModal
                    modal={confirmationModal}
                    optionLeftFunction={() => {
                        setConfirmationModal(false)}
                    }
                    optionLeftText='Batal'
                    optionRightFunction={() => {
                        deleteProfilePicture()}
                    }
                    optionRightText='Hapus'
                    warning='Apakah anda yakin ingin menghapus foto anda?'
                    load={load}
                />        
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
        fontSize: 16,
        textTransform: 'capitalize'
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