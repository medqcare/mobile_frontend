import React, { useState } from 'react'
import { connect } from 'react-redux'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    Alert,
    Image
} from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import Popover from 'react-native-popover-view'
import AsyncStorage from '@react-native-async-storage/async-storage'

//function
import getAge from '../../../helpers/getAge'
import { deleteFamily, GetUser } from '../../../stores/action'

//component
import EditFamilyProfile from '../../../components/profile/dashboard/editFamilyData'
// import SettingModal from '../../modals/setModal'
import ConfirmationModal from '../../modals/ConfirmationModal'

//Icon
import IconAD from 'react-native-vector-icons/AntDesign'
import Icon from 'react-native-vector-icons/Ionicons'
import IconM from 'react-native-vector-icons/MaterialCommunityIcons'

const mapDispatchToProps = {
    deleteFamily,
    GetUser
}

const familyList = (props) => {
    // console.log(props, 'ini propsnya di family list card', props.member.firstName, props.member._id)
    const [isVisible, setVisible] = useState(false) //untuk popover edit+delete
    const [modalVisible, setModalVisible] = useState(false) //untuk modal edit
    const [isDelete, setDelete] = useState(false)
    const [touchable, setTouchable] = useState('')
    const [modalW, setModalW] = useState(false) //untuk modal warning
    const [modalS, setModalS] = useState(false) //untuk modal sukses
    const [modalF, setModalF] = useState(false) //untuk modal failed
    const [message, setMessage] = useState('') //untuk pesan dimodal

    var moment = require('moment')

    function modals(pesan) {
        setMessage(pesan)
        setModalF(true)
    }
    return (
        <View
            style={viewStyles.outer}    
        >
       
      
            <TouchableOpacity style={{padding:15}}
            isVisible={isVisible}
            fromView={touchable}
            onRequestClose={() => setVisible(false)}
            ref={ref => {
                setTouchable(ref)
            }}
            activeOpacity={0.5}
            onPress={() => 
                props.move.navigate('EditFamilyForm', { data: props.member })
            }

            onLongPress={async () => {
                await setTimeout(() => {
                    setModalW(true)
                }, 100);
                setVisible(false)
            }}
                
            > 
            
            <View style={{ position: 'absolute', right: -15, top: 5}}>
                {props.member.gender == 'Female' &&
                <Icon name={'md-female'}  style={{backgroundColor:'#91107E', borderRadius:50, padding: 4 }} size={14} color={'white'} />}
                {props.member.gender == 'Male' &&   
                <Icon name={'md-male'}  style={{backgroundColor:'#1486AB', borderRadius:50, padding: 4 }} size={14} color={'white'} />}
                {props.member.gender == null &&
                <IconM name={'gender-male-female'} size={25} />}    
            </View>        
                <View style={{ ...viewStyles.photoContainer }}>
                    <Image style={viewStyles.photo}
                        source={{ uri: (props.member.photo ? props.member.photo : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRH_WRg1exMTZ0RdW3Rs76kCOb9ZKrXddtQL__kEBbrS2lRWL3r') }} />
                </View>
                <View style={{ alignItems: 'center' }}>
                    {/* userData */}
                    <Text style={textStyles.name}>{props.member.firstName} {props.member.lastName}</Text>
                    <Text style={{ fontSize:11,color:'white', marginTop: 2 }}> Umur : {getAge(props.member.dob)}</Text>
                </View>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                >
                <EditFamilyProfile closeModal={setModalVisible} data={props.member} />
            </Modal>
           
            <ConfirmationModal
                modal={modalW}
                warning={'Yakin ingin menghapus anggota keluarga?'}
                optionLeftText={'BATAL'}
                optionRightText={'HAPUS'}
                optionLeftFunction={() => setModalW (false)}
                optionRightFunction={async () => {
                    let token = await AsyncStorage.getItem('token')
                    await props.deleteFamily(props.member._id, JSON.parse(token), modals)
                    setModalW(false)
                }}

            />
        
            {
                isDelete ? (
                    setDelete(false),
                    setModalW(true)
                ) : null
            }
            </View>
    )
}

const viewStyles = StyleSheet.create({
    icon: {
        justifyContent: 'flex-end',
    },
    photoContainer: {
        height: 40,
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 30
    },
    photo: {
        height: '100%',
        width: '100%',
        backgroundColor: '#FFF',
        borderRadius: 50
    },
    outer: {
        borderRadius: 12,
        backgroundColor: '#2f2f2f',
        width: '48%',
        maxHeight: '95%',
        marginTop: 25,
        marginHorizontal:2,
        padding: 1,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 4,   
            height: 7,
        },
        borderRadius: 3,
        shadowOpacity: 0.61,
        shadowRadius: 9.11,
        elevation: 14,
    },
    try: {
        backgroundColor: 'blue'
    },
    edit: {
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 6,
        padding: 5,
        margin: 5,
        minWidth: 90,
        alignItems: 'center',
        justifyContent: 'center'
    },
    delete: {
        borderRadius: 6,
        padding: 5,
        margin:7,
        minWidth: 10,
      
    },
    popover: {
        padding: 15,
        alignItems: 'center'
    }
})
const textStyles = StyleSheet.create({
    name: {
        fontWeight: 'bold',
        fontSize: 14,
        flexShrink: 1,
        textAlign: 'center',
        color:'white',
        marginTop: 4
    },
    delete: {
        color: 'white',
    }
})
export default connect(null, mapDispatchToProps)(familyList)

// <TouchableOpacity>
//     <View style={style.genderLogo} >
        
//     </View>

//     <View style={style.familyData}>
//         <View style={style.profilePicture}>
//         </View>
//         <View style={style.name}>
//         </View>
//         <View style={style.age}>
//         </View>
//     </View>
// </TouchableOpacity>

// const style = StyleSheet.create({
//     genderLogo: {
//         position: 'absolute',
//         right: 10,
//         top: 10
//     }
// })
