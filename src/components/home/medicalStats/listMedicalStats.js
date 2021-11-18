import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, FlatList, ImageBackground } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Modal from 'react-native-modal'

//function
import getAge from '../../../helpers/getAge'
import QRCode from 'react-native-qrcode-svg'

const ListMedStats = (props) => {
    const [registrationID, setRegistrationID] = useState(props.data.registrationID)
    const [showQR, setShowQR] = useState(false)
    var moment = require('moment')
    console.log("============================================");
    
    console.log({
        patient: props.data.registrationID.patient,
        registrationID: registrationID.registrationID
    });
    console.log("============================================");


    return (
        <View style={{ borderRadius: 20, marginVertical: 8, }}>
            {/* <ImageBackground source={require('../../../assets/Background-Pattern.png')} style={styles.container} > */}
            <TouchableOpacity activeOpacity={0.7} style={{ flex: 1, backgroundColor: '#FFF' }}
                onPress={() => props.navigation.navigate('DetailMedRes', (data = props), patient = props.patient)}>
                <View style={{ flex: 1, borderRadius: 10, backgroundColor: '#FFF', }}>
                    <View style={{ justifyContent: 'center', borderBottomWidth: 1, borderColor: '#e9e9e9', padding: 10 }}>
                        <Text style={styles.rs}>{registrationID.healthFacility.facilityName}</Text>
                        <View style={{ flexDirection: 'row', }}>
                            <Text style={styles.mrNumber}>MR Number : </Text>
                            <Text style={styles.mrNumber}>{registrationID.healthFacility.medrecNumber}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
                        <View style={{ flex: 1, padding: 8, justifyContent: 'space-between' }}>
                            <View>
                                <Text style={styles.patient}>Patient Name</Text>
                                <Text style={styles.patientname}>{registrationID.patient.patientName}</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => {
                                    setShowQR(true)
                                }}
                                style={{ width: 30, height: 30, justifyContent: 'center', alignItems: 'center', borderRadius: 3, backgroundColor: '#44E28B', }}>
                                <Icon name={'qrcode'} size={25} color={'#FFF'} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, padding: 8, alignItems: 'flex-end' }}>
                            <View style={{ paddingHorizontal: 10, paddingVertical: 5, backgroundColor: '#44E28B', borderRadius: 30, marginBottom: 20 }}>
                                <Text style={styles.date}>{registrationID.bookingSchedule}</Text>
                            </View>

                            <Text style={styles.patientname}>{registrationID.doctor.title} {registrationID.doctor.doctorName}</Text>
                            <Text style={{ flex: 4, fontSize: 12, color: '#9D9D9D' }}>{registrationID.doctor.doctorSpecialist}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
            {/* </ImageBackground> */}
            {/* <Text>{JSON.stringify(props.data, null, 2)}</Text> */}

            {showQR && <Modal
                isVisible={showQR}
                swipeDirection={'down'}
                onSwipeComplete={() => setShowQR(false)}
                style={{
                    justifyContent: 'flex-end',
                    margin: 0,
                }}
            >
                <View style={{ padding: 20, height: '60%', borderTopEndRadius: 6, borderTopStartRadius: 6, backgroundColor: '#44E28B', alignItems: 'center', }}>
                    <View style={{ height: 5, width: '20%', backgroundColor: '#FFF', borderRadius: 5, marginVertical: 10 }} />
                    <View style={{ padding: 10, borderRadius: 10, backgroundColor: '#FFF', marginVertical: 10 }}>
                        <QRCode
                            size={250}
                            value={JSON.stringify({
                                flag: 'medqcare',
                                patient: props.data.registrationID.patient,
                                registrationID: registrationID.registrationID
                            })} />
                    </View>
                    <Text style={{ color: '#FFF', textAlign: 'center' }}>Scan this QR for share your medical resume</Text>
                    <Text style={{ fontSize: 16, color: '#FFF' }}>SCAN QR CODE</Text>
                </View>
            </Modal>}
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        overflow: 'hidden',
        // borderRadius: 10,
        padding: 5,
    },
    top: {
        flex: 1,
        flexDirection: 'row',
    },
    patientname: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#69937C'
    },
    patient: {
        fontSize: 12,
        color: '#9D9D9D'
    },
    mrNumber: {
        fontSize: 14,
        // fontWeight: 'bold',
        color: '#69937C'
    },
    rs: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#69937C'
    },
    date: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#FFF',
    },
    textDetail: {
        fontSize: 14,
        color: '#707070',
    },
    modal: {
        backgroundColor: '#000',
        opacity: 0.5
    }
})

export default ListMedStats