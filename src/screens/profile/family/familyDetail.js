import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    BackHandler,
} from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import ProfileInfo from '../../../components/profile/dashboard/profile-info'
import GreyHeader from '../../../components/headers/GreyHeader';
import LightHeader from '../../../components/headers/LightHeader';
import capitalFirst from '../../../helpers/capitalFirst';
import { dateWithDDMMMYYYYFormat } from '../../../helpers/dateFormat';


function FamilyDetail(props){
    const { data: familyDetailData, darkMode } = props.navigation.state.params
    const nik = familyDetailData.nik
    const bloodType = familyDetailData.bloodType + ' ' + familyDetailData.resus
    function genderIndonesian(string){
        if(string === 'Male'){
            return 'Laki-laki'
        } else {
            return 'Perempuan'
        }
    }
    const gender = genderIndonesian(familyDetailData.gender)
    const tglLahir = dateWithDDMMMYYYYFormat(new Date(familyDetailData.dob))
    const payment = familyDetailData.payment || 'Umum'
    const address = `${capitalFirst(familyDetailData.location.city)}, ${capitalFirst(familyDetailData.location.province)}` 

    return(
        <ScrollView style={darkMode ? styles.container : styles.containerLight} 
            contentContainerStyle={{alignItems: 'center'}}>
            {
                darkMode ? (
                    <GreyHeader
                        navigate={props.navigation.navigate}
                        navigateBack={'FamilyList'}
                        navigateTo={'EditFamilyForm'}
                        params={{data: familyDetailData}}
                        title='Profil Keluarga'
                        edit={true}
                    />
                ) : (
                    <LightHeader
                        navigate={props.navigation.navigate}
                        navigateBack={'FamilyList'}
                        navigateTo={'EditFamilyForm'}
                        params={{data: familyDetailData}}
                        title='Profil Keluarga'
                        edit={true}
                    />  
                )
            }
            
            <ProfileInfo navigation={props.navigation} destination='FamilyDetail' data={familyDetailData} darkMode={darkMode}/>
            <View style={{paddingVertical: 15}}>
                <View style={darkMode ? styles.profileDetail : styles.profileDetailLight}>
                    <View style={styles.upperDetail}>
                        <Text style={darkMode ? styles.profileDetailLabel : styles.profileDetailLabelLight}>NIK</Text>
                        <Text style={darkMode ? styles.profileDetailValue : styles.profileDetailValueLight}>{nik}</Text>
                    </View>
                    <View style={styles.upperDetail}>
                        <Text style={darkMode ? styles.profileDetailLabel : styles.profileDetailLabelLight}>Tanggal Lahir</Text>
                        <Text style={darkMode ? styles.profileDetailValue : styles.profileDetailValueLight}>{tglLahir}</Text>
                    </View>
                    <View style={styles.upperDetail}>
                        <Text style={darkMode ? styles.profileDetailLabel : styles.profileDetailLabelLight}>Jenis Kelamin</Text>
                        <Text style={darkMode ? styles.profileDetailValue : styles.profileDetailValueLight}>{gender}</Text>
                    </View>
                    <View style={styles.upperDetail}>
                        <Text style={darkMode ? styles.profileDetailLabel : styles.profileDetailLabelLight}>Golongan Darah</Text>
                        <Text style={darkMode ? styles.profileDetailValue : styles.profileDetailValueLight}>{bloodType}</Text>
                    </View>
                    <View style={styles.bottomDetail}>
                        <Text style={darkMode ? styles.profileDetailLabel : styles.profileDetailLabelLight}>Alamat Sesuai KTP</Text>
                        <Text style={darkMode ? styles.profileDetailValue : styles.profileDetailValueLight}>{address}</Text>
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

    containerLight: {
        flex: 1,
        backgroundColor: '#ffffff'
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

    profileDetailLight: {
        backgroundColor:'#ffffff',
        width: wp('90%'),
        borderColor: '#f1f1f1',
        borderWidth: 1,
        borderRadius: 4,
        paddingLeft: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 1,
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

    profileDetailLabelLight:{
        color: '#212121',
        fontSize: 14
    },

    profileDetailValue: {
        color: '#DDDDDD',
        paddingTop: 10,
        fontSize: 14,
        width: '80%',
    },

    profileDetailValueLight: {
        color: '#212121',
        paddingTop: 10,
        fontSize: 14,
        width: '80%',
    }
})

export default FamilyDetail
