import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native'

//function
import getAge from '../../../helpers/getAge'

//Icon
import IconAD from 'react-native-vector-icons/AntDesign'
import Icon from 'react-native-vector-icons/Ionicons'
import IconM from 'react-native-vector-icons/MaterialCommunityIcons'


const FamilyListReserv = ({ data }) => {
    return (
        <View style={{
            backgroundColor: '#FFF',
            marginBottom: 10,
            padding: 10,
        }}>
            <View style={{
                alignItems: 'flex-end'
            }}>
                <Text>{data.bookingSchedule}</Text>
            </View>
            <View style={{
                borderColor: '#e9e9e9',
                borderBottomWidth: 1,
                marginBottom: 5,
                paddingBottom: 5,
            }}>
                <Text>{data.healthFacility.facilityMainType} : {data.healthFacility.facilityType} {data.healthFacility.facilityName}</Text>
                <Text>Doctor Name : {data.doctor.title} {data.doctor.doctorName}</Text>
                <Text>{data.doctor.doctorSpecialist}</Text>
            </View>
            <View>
                <Text>MR Number : {data.medrecNumber}</Text>
            </View>
            {/* <Text>{JSON.stringify(data, null, 2)}</Text> */}
        </View>
    )
}

export default (FamilyListReserv)
