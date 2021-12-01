import React, { useState } from 'react'
import { 
    View, 
    Text, 
    Image, 
    StyleSheet, 
    TouchableOpacity,
} from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import { connect } from 'react-redux'
import capitalFirst from '../../../helpers/capitalFirst' // for proper case full name
import PictureModal from '../../modals/profilePictureModal'// modal for profile picture options


const mapStateToProps = state => {
    return state
}

const profileInfo = (props) => {

    const [userData, setUserData] = useState(props.userData)

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
                props.navigation.navigate('ProfilePictureCamera')
                break;

            case 'Galeri':
                props.navigation.navigate('ProfilePictureGallery')
                break;

            case 'Hapus':
                console.log('Hapus')
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
)(profileInfo)