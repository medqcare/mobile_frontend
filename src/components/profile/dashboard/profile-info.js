import React, { useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, ImageBackground, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon5 from 'react-native-vector-icons/FontAwesome5'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import { connect } from 'react-redux'

import EditProfile from '../../../components/editProfile'

import capitalFirst from '../../../helpers/capitalFirst' // for proper case full name
import SetsModal from '../../modals/modalPickerProfile'
import SelectModal from '../../modals/modalPicker'

const mapStateToProps = state => {
    return state
}

const profileInfo = (props) => {
    // console.log(props.userData, 'ini user Datanya==~~')
    const [modalVisibility, setModalVisibility] = useState(false)
    const [userData, setUserData] = useState(props.userData)
    const [profileStatusModal, setProfileStatusModal] = useState(false)
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

    function modalvisible() {
        setModalVisibility(!modalVisibility)
    }
    function fullName() {
        // console.log( 'ini user data =====>', Object.keys(props.userData), '<====')
        return props.userData ? 
            props.userData?.lastName ?
                capitalFirst(props.userData?.firstName) + ' ' + capitalFirst(props.userData?.lastName)
                :
                capitalFirst(props.userData?.firstName)
            : ''

    }

    async function setSelectedValue(value,uri, changeKey){
        setUserData({
            ...dataProfile,
            [changeKey] :value,uri
        })
        
    }

    const [selectedProfileLabel,setselectedProfileLabel] = useState(false)

    return (
        <View style={styles.container}>
        
            <View style={styles.profilePicture}>   
                <Image
                    source={{ uri: props.userData?.photo ? props.userData?.photo : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRH_WRg1exMTZ0RdW3Rs76kCOb9ZKrXddtQL__kEBbrS2lRWL3r' }}
                    style={styles.userImage}
                />  
                
                <TouchableOpacity style={{marginTop:-17,zIndex:1,marginLeft:30}}
                    onPress={()=>setProfileStatusModal(true)}
                   
                >
                    
                    <Image source={ require('../../../assets/png/ic_camera.png') } style={{width: 28, height: 30}} />
                </TouchableOpacity>
                
                <SetsModal
                        modal={profileStatusModal}
                        setModal={setProfileStatusModal}
                        selection={profileStatusSelection}
                        title='Silahkan Pilih Apa yang anda Ubah'
                        subtitle='Pilihan yang tersedia'
                        setSelectedValue={setSelectedValue}
                        setSelectedLabel={setselectedProfileLabel}
                >
                </SetsModal>        

                {/* <Text>Profile Picture</Text> */}
            </View>
           
            <View style={styles.profileData}>
                <View style={styles.fullName}>
                    <Text style={styles.fullNameText}>{fullName()}</Text>
                </View>
                <View style={styles.phoneNumber}>
                    <Text style={styles.phoneNumberText}>{props.userData?.phoneNumber}</Text>
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
        paddingVertical: 10
    },

    phoneNumberText: {
        color: '#B5B5B5',
        fontSize: 14
    },

    verified: {
        backgroundColor: '#3C3C3C'
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
export default connect(mapStateToProps)(profileInfo)
