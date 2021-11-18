import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    ScrollView,
    ImageBackground,
    TouchableOpacity,
    Image,
    FlatList
} from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import axios from 'axios'

//component
import Alergies from '../../../components/profile/dashboard/family-alergies'
import VitalSign from '../../../components/profile/dashboard/family-vital-sign'
import FamilyListReserv from '../../../components/profile/dashboard/family-listReserv'

//function
import getAge from '../../../helpers/getAge'
import { baseURL } from '../../../config'

//Icon
import Icon from 'react-native-vector-icons/Ionicons'
import IconM from 'react-native-vector-icons/MaterialCommunityIcons'
import IconFI from 'react-native-vector-icons/Fontisto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ArrowBack from '../../../assets/svg/ArrowBack'

const familyDetail = (props) => {
    let getData = props.navigation.getParam('data')
    var moment = require('moment')
    const [userData, setUserData] = useState({...getData})
    // console.log(props, 'ini props abis di kirim family detail =====================>')
    // console.log(userData, "ini hasil uyserdatanya")

    useEffect(() => {
        getRM()
    }, [])

    async function getRM() {
        try {
            console.log('masuk disini')
            let token = await AsyncStorage.getItem('token')
            console.log(token)
            let { data } = await axios({
                method: 'POST',
                url: `${baseURL}/api/v1/members/getRegistrationPatient`,
                headers: { Authorization: JSON.parse(token).token },
                data: {
                    patientID: userData._id
                },
              });
              console.log(data)
            setUserData({ ...userData, historiRegistration: data.data })
            // console.log(userData, 'ini hasilnya')
        } catch (error) {
            console.log(error, 'error')
        }
    }

    useEffect(() => {
        userData.historiRegistration && userData.historiRegistration.length !== 0 ? setRM(true) : setRM(false)
    }, [userData])

    // console.log(userData.historiRegistration, '-=-=-=-=-==--=')
    const [RM, setRM] = useState(false)
    const tabs = ['Vital Sign', 'Alergi']
    const [active, setActive] = useState(0)
    const [tabData, setTabData] = useState([])
    useEffect(() => {
        if (RM) {
            setTabData([
                <VitalSign userData={userData.historiRegistration} />,
                <Alergies userData={userData.historiRegistration} />
            ])
        }
    }, [RM])

    // console.log('ini diprint berkali2')
    // console.log(tabData[0])
    return (
        <View style={viewStyles.container}>
            <ImageBackground source={require('../../../assets/png/Background-Pattern.png')} style={{ height: 85, }}>
                <View style={{ flex: 1, marginTop: 32, flexDirection: 'row', alignItems: 'center', }}>
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate('FamilyList')}>
                        <View style={{ flexDirection: 'row', }} >
                            <ArrowBack />
                            <Text style={{ fontSize: 20, color: '#ffff', fontWeight: 'bold', position: 'relative', }}>Detail Family</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
                <View style={viewStyles.box}>
                    <View style={{ flexDirection: 'row', marginBottom: 20, alignItems: 'center' }}>
                        <Image style={viewStyles.photo} source={{ uri: getData.photo ? getData.photo : 'https://www.mbrsg.ae/MBRSG/media/Images/no-image-icon-6.png' }} />
                        <View style={{ flex: 1, marginHorizontal: 15 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                {userData.gender == 'Female' &&
                                    <View style={{
                                        ...viewStyles.gender,
                                        backgroundColor: '#F06292'
                                    }}>
                                        <Icon name={'md-female'} size={20} color={'#FFF'} />
                                    </View>
                                }
                                {userData.gender == 'Male' &&
                                    <View style={{
                                        ...viewStyles.gender,
                                        backgroundColor: '#004DCF'
                                    }}>
                                        <Icon name={'md-male'} size={20} color={'#FFF'} />
                                    </View>}
                                {userData.gender == null &&
                                    <View style={{
                                        ...viewStyles.gender,
                                        backgroundColor: '#000'
                                    }}>
                                        <IconM name={'gender-male-female'} size={20} color={'#FFF'} />
                                    </View>
                                }
                                <Text style={[textStyles.name, { marginHorizontal: 10 }]}>{userData.title} {userData.firstName} {userData.lastName}</Text>
                            </View>
                            <Text style={textStyles.nik}>NIK : {userData.nik}</Text>
                        </View>
                    </View>
                    <View style={{
                        borderWidth: 2,
                        borderColor: '#4fe39b',
                        borderRadius: 10,
                        backgroundColor: '#FFF',
                        width: '100%',
                    }}>
                        <View style={{
                            alignItems: 'center',
                            borderBottomWidth: 2,
                            borderColor: '#4fe39b',
                            backgroundColor: '#e9e9e9',
                            paddingVertical: 10,
                        }}>
                            <Text style={{ fontWeight: 'bold' }}> Info Patient</Text>
                        </View>
                        <View style={viewStyles.contentDetail}>
                            <View style={viewStyles.icon}>
                                <IconM name='calendar-today' size={20} color='#234' />
                            </View>
                            <Text style={textStyles.textDetail}>{moment(userData.dob).format('DD-MM-YYYY')}  ({getAge(userData.dob)} Th)</Text>
                        </View>
                        <View style={viewStyles.contentDetail}>
                            <View style={viewStyles.icon}>
                                <IconFI name='blood-drop' size={20} color='#234' />
                            </View>
                            <Text style={textStyles.textDetail}>{userData.bloodType} {userData.resus}</Text>
                        </View>
                        <View style={viewStyles.contentDetail}>
                            <View style={viewStyles.icon}>
                                <Icon name='md-call' size={20} color='#234' />
                            </View>
                            <Text style={textStyles.textDetail}>{userData.phoneNumber}</Text>
                        </View>
                        <View style={viewStyles.contentDetail}>
                            <View style={viewStyles.icon}>
                                <Icon name='md-locate' size={20} color='#234' />
                            </View>
                            <Text style={textStyles.textDetail}>{userData.location.province}</Text>
                        </View>

                    </View>
                </View>
                {/* <Text style={{ backgroundColor: 'brown' }}>{JSON.stringify(getData, null, 2)}</Text> */}
                <View style={{
                    borderWidth: 2,
                    borderColor: '#4fe39b',
                    borderRadius: 10,
                    marginHorizontal: 20,
                    alignItems: 'center',
                    // paddingVertical: 10,
                    backgroundColor: '#e9e9e9'
                }}>
                    <View style={{
                        alignItems: 'center',
                        borderBottomWidth: 2,
                        borderColor: '#4fe39b',
                        width: '100%',
                        paddingVertical: 10,
                    }}>
                        <Text style={{ fontWeight: 'bold' }}> History Registration</Text>
                    </View>
                    {
                        userData && userData.historiRegistration ? (
                            <View style={{width: '100%'}}>
                                <FlatList
                                    data={userData.historiRegistration}
                                    keyExtractor={(item, index) => index}
                                    renderItem={(item) => (
                                        <FamilyListReserv data={item.item} />
                                    )}
                                />
                            </View>
                        ) : (
                                <View style={{
                                    backgroundColor: '#FFF',
                                    paddingVertical: 5,
                                    width: '100%',
                                    alignItems: 'center',
                                    paddingVertical: 10,
                                }}>
                                    <Text>Belum ada data</Text>
                                </View>
                            )
                    }
                </View>
            </ScrollView>
        </View>
    )
}

const viewStyles = StyleSheet.create({
    container: {
        minHeight: '100%',
        backgroundColor: '#F5F5F5',
    },
    box: {
        flex: 1,
        padding: 20,
    },
    contentDetail: {
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    photo: {
        width: 80,
        height: 80,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#4fe39b'
    },
    icon: {
        width: 25,
    },
    gender: {
        borderRadius: 30,
        justifyContent: 'center',
        alignContent: 'center',
        padding: 5,
        height: 26,
        width: 26
    },

})
const textStyles = StyleSheet.create({
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        // color: '#FFF'
    },
    textDetail: {
        fontSize: 16,
        color: '#234',
        marginLeft: 10,
    },
    textFacility: {
        fontWeight: 'bold',
        color: '#E3F9E4'
    },
    nik: {
        fontSize: 12,
    }
})

export default familyDetail
// export default connect(null, mapDispatchToProps)(familyDetail)