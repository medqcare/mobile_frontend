import React, { useState } from 'react'
import { connect } from 'react-redux'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    Image
} from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'

//function
import { properAge } from '../../../helpers/getAge'
import { deleteFamily, GetUser } from '../../../stores/action'

//component
import ConfirmationModal from '../../modals/ConfirmationModal'

//Icon
import Icon from 'react-native-vector-icons/Ionicons'

const mapDispatchToProps = {
    deleteFamily,
    GetUser
}

const mapStateToProps = state => {
    return state
}

const familyList = (props) => {
    const [isVisible, setVisible] = useState(false) //untuk popover edit+delete
    const [modalVisible, setModalVisible] = useState(false) //untuk modal edit
    const [isDelete, setDelete] = useState(false)
    const [touchable, setTouchable] = useState('')
    const [modalW, setModalW] = useState(false) //untuk modal warning
    const [modalS, setModalS] = useState(false) //untuk modal sukses
    const [modalF, setModalF] = useState(false) //untuk modal failed
    const [message, setMessage] = useState('') //untuk pesan dimodal
    const [load, setLoad] = useState(false)



    const families = props.userData.family

    function iconProps(gender, props){
        const name = gender === 'Female' ? 'md-female' : 'md-male' 
        const color = gender === 'Female' ? '#91107E': '#1486AB' 
        if(props === 'name'){
            return name
        } else {
            return color
        }
    }

    function fullName(firstName, lastName){
        const fullName = lastName ? firstName + ' ' + lastName : firstName
        return fullName
    }

    return (
        families.map((family, index) => {
            return (
                <TouchableOpacity
                    onPress={() => 
                        props.navigateTo('EditFamilyForm', { data: family })
                    }
                    key={index}
                    onLongPress={async () => {
                        setTimeout(() => {
                            setModalW(true)
                        }, 100);
                        setVisible(false)
                    }}
                    style={styles.container}
                >
                    <View style={styles.topContainer}>
                        <View style={styles.imageContainer}>
                            <Image 
                                source={{ uri: (family.imageUrl ? family.imageUrl : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRH_WRg1exMTZ0RdW3Rs76kCOb9ZKrXddtQL__kEBbrS2lRWL3r') }}
                                style={styles.image}
                            />
                        </View>
                        <View style={styles.genderLogoContainer}>
                            <Icon name={iconProps(family.gender, 'name')}  style={{backgroundColor:iconProps(family.gender), borderRadius:50, padding: 4 }} size={14} color={'white'}/>
                        </View>
                    </View>
                    <View style={styles.bottomContainer}>
                        <View style={styles.fullNameContainer}>
                            <Text style={styles.fullNameText}>{fullName(family.firstName, family.lastName)}</Text>
                        </View>
                        <View style={styles.ageContainer}>
                            <Text style={styles.ageText}>{properAge(family.dob)}</Text>
                        </View>
                    </View>
                
                    <ConfirmationModal
                        modal={modalW}
                        warning={'Yakin ingin menghapus anggota keluarga?'}
                        optionLeftText={'BATAL'}
                        optionRightText={'HAPUS'}
                        optionLeftFunction={() => setModalW (false)}
                        optionRightFunction={async () => {
                            setLoad(true)
                            let token = await AsyncStorage.getItem('token')
                            await props.deleteFamily(family._id, JSON.parse(token))
                            setModalW(false)
                            setLoad(false)
                        }}
                        load={load}

                    />
                
                    {
                        isDelete ? (
                            setDelete(false),
                            setModalW(true)
                        ) : null
                    }
                </TouchableOpacity>
        )})
    )
}

const styles = StyleSheet.create({
    container: {
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

    topContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '100%',
    },

    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        width: 40,
        marginRight: 40,
        marginTop: 14,
    },

    image: {
        height: '100%',
        width: '100%',
        backgroundColor: '#FFF',
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#4BE395'
    },

    genderLogoContainer: {
        alignItems: 'flex-start',
        padding: 5
    },

    bottomContainer: {
        paddingTop: 8,
        paddingBottom: 14,
        justifyContent: 'center',
        alignItems: 'center'
    },

    fullNameContainer: {
        width: '90%',
    },

    fullNameText: {
        color: 'rgba(255, 255, 255, 1)',
        textAlign: 'center'
    },

    ageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 6,
    },

    ageText: {
        color: 'rgba(192, 192, 192, 1)'
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(familyList)