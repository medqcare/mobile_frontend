import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    BackHandler,
    Image
} from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { connect } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'

import Icon from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import Icon5 from 'react-native-vector-icons/FontAwesome5'
import ArrowBack from '../../assets/svg/ArrowBack'

import ProfileInfo from '../../components/profile/dashboard/profile-info'

import { changeLogin, Logout } from '../../stores/action'
import { SafeAreaView } from 'react-navigation';

import secureEmail from '../../helpers/secureEmail';

const mapStateToProps = state => {
    return state
}
function ProfileDetail({ navigation, userData }){
    console.log(userData, '=======================================')
    const nik = userData.nik
    const email = secureEmail(userData.userID.email)
    const bloodType = userData.bloodType + ' ' + userData.resus
    function genderIndonesian(string){
        if(string === 'Male'){
            return 'Laki-laki'
        } else {
            return 'Perempuan'
        }
    }
    const gender = genderIndonesian(userData.gender)
    const payment = userData.payment || 'Umum'
    const address = userData.address || 'Jl. Pengasinan Tengah Raya No.98 RT 3/11 Bekasi Utara'

    BackHandler.addEventListener("hardwareBackPress", () => {
        navigation.navigate('ProfileStack')
        return true
    })

    return(
        <ScrollView style={styles.container} contentContainerStyle={{alignItems: 'center'}}>
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <TouchableOpacity
                        onPress={() => navigation.pop()}>
                        <View style={{ flexDirection: 'row', }} >
                            <ArrowBack />
                            <Text style={styles.headerText}>Profil Saya</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    onPress={() => navigation.navigate('EditProfile')}>
                    <Feather name="edit" color="#DDDDDD" size={20} style={{paddingRight: 20}}/>
                </TouchableOpacity>
            </View>
            <ProfileInfo />
            <View style={{paddingVertical: 15}}>
                <View style={styles.profileDetail}>
                    <View style={styles.upperDetail}>
                        <Text style={styles.profileDetailLabel}>NIK</Text>
                        <Text style={styles.profileDetailValue}>{nik}</Text>
                    </View>
                    <View style={styles.upperDetail}>
                        <Text style={styles.profileDetailLabel}>Email</Text>
                        <Text style={styles.profileDetailValue}>{email}</Text>
                    </View>
                    <View style={styles.upperDetail}>
                        <Text style={styles.profileDetailLabel}>Jenis Kelamin</Text>
                        <Text style={styles.profileDetailValue}>{gender}</Text>
                    </View>
                    {/* <View style={styles.upperDetail}>
                        <Text style={styles.profileDetailLabel}>Hubungan Keluarga</Text>
                        <Text style={styles.profileDetailValue}>(Hubungan Keluarga)</Text>
                    </View> */}
                    <View style={styles.upperDetail}>
                        <Text style={styles.profileDetailLabel}>Golongan Darah</Text>
                        <Text style={styles.profileDetailValue}>{bloodType}</Text>
                    </View>
                    <View style={styles.upperDetail}>
                        <Text style={styles.profileDetailLabel}>Pembayaran</Text>
                        <Text style={styles.profileDetailValue}>{payment}</Text>
                    </View>
                    <View style={styles.bottomDetail}>
                        <Text style={styles.profileDetailLabel}>Alamat Sesuai KTP</Text>
                        <Text style={styles.profileDetailValue}>{address}</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1f1f1f'
    },

    header: {
        flexDirection: 'row',
        height: 60,
        width: '100%',
        backgroundColor: '#2F2F2F',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingTop: 20,
    },

    headerLeft: {
        flexDirection: 'row',
    },

    headerText: {
        color: '#DDDDDD',
        fontSize: 16
    },

    profileDetail: {
        backgroundColor:'#2f2f2f',
        width: wp('90%'),
        paddingLeft: 16
    },

    upperDetail: {
        paddingTop: 20
    },

    bottomDetail: {
        paddingVertical: 40
    },

    profileDetailLabel:{
        color: '#B5B5B5',
        fontSize: 14
    },

    profileDetailValue: {
        color: '#DDDDDD',
        paddingTop: 10,
        fontSize: 14,
        width: '80%'
    }
})

export default connect(mapStateToProps)(ProfileDetail)
