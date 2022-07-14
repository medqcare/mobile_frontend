import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    BackHandler,
} from 'react-native'
import { NavigationActions } from 'react-navigation'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { connect } from 'react-redux'

import ProfileInfo from '../../components/profile/dashboard/profile-info'
import secureEmail from '../../helpers/secureEmail';
import GreyHeader from '../../components/headers/GreyHeader';
import capitalFirst from '../../helpers/capitalFirst';
import { dateWithDDMMMYYYYFormat } from '../../helpers/dateFormat';

const mapStateToProps = state => {
    return state
}
function ProfileDetail({ navigation, userDataReducer }){
    const { userData } = userDataReducer
    const { nik, userID, dob, location } = userData;
    const email = secureEmail(userID.email)
    const bloodType = userData.bloodType + ' ' + userData.resus
    function genderIndonesian(string){
        if(string === 'Male'){
            return 'Laki-laki'
        } else {
            return 'Perempuan'
        }
    }
    const gender = genderIndonesian(userData.gender)
    const tglLahir = dateWithDDMMMYYYYFormat(new Date(dob))
    const payment = userData.payment || 'Umum'
    const address = `${capitalFirst(location.city)}, ${capitalFirst(location.province)}` 
    BackHandler.addEventListener('hardwareBackPress', () => {
        const backAction = NavigationActions.back();
        navigation.dispatch(backAction)     
        return true
      });

    return(
        <ScrollView style={styles.container} contentContainerStyle={{alignItems: 'center'}}>
            <GreyHeader
                navigate={navigation.navigate}
                navigateBack={'ProfileStack'}
                navigateTo={'EditProfile'}
                title='Profil Saya'
                edit={true}
            />
            <ProfileInfo navigation={navigation} destination='ProfileDetail' data={userData}/>
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
                        <Text style={styles.profileDetailLabel}>Tanggal Lahir</Text>
                        <Text style={styles.profileDetailValue}>{tglLahir}</Text>
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
                    {/* <View style={styles.upperDetail}>
                        <Text style={styles.profileDetailLabel}>Pembayaran</Text>
                        <Text style={styles.profileDetailValue}>{payment}</Text>
                    </View> */}
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
        width: '80%',
    }
})

export default connect(mapStateToProps)(ProfileDetail)
