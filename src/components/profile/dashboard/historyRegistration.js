import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { setLoading } from '../../../stores/action'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { baseURL } from '../../../config'

import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    ImageBackground,
    TouchableOpacity,
    Dimensions,
    Picker,
    RefreshControl,
} from 'react-native'

//Icon
import Icon from 'react-native-vector-icons/Ionicons'
import IconFA from 'react-native-vector-icons/FontAwesome'
import LottieLoader from 'lottie-react-native'
import { BackHandler } from 'react-native'
import ArrowBack from '../../../assets/svg/ArrowBack'


const Widht = Dimensions.get('screen').width
const Height = Dimensions.get('screen').height

const History = props => {
    // console.log(props, 'ada isinya')
    const [patient, setPatient] = useState(null)
    const [patientId, setId] = useState({ id: null, firstName: 'null' })
    const [historyRegist, setHistory] = useState(null)
    const [loader, setLoad] = useState(false)

    function getPatient() {
        let temp = []
        temp.push({
            _id: props.userData._id,
            firstName: props.userData.lastName ?
                props.userData.firstName + ' ' + props.userData.lastName
                : props.userData.firstName
        })
        props.userData.family.forEach(el => {
            temp.push({
                _id: el._id,
                firstName: el.lastName ? el.firstName + ' ' + el.lastName : el.firstName
            });
        })
        setPatient(temp)
    }

    async function getHistoryRegistration(_id) {
        console.log(_id, '?')
        setLoad(true)
        try {
            // console.log('masuk disini')
            let token = await AsyncStorage.getItem('token')
            console.log(token)
            let { data } = await axios({
                method: 'POST',
                url: `${baseURL}/api/v1/members/getRegistrationPatient`,
                headers: { Authorization: JSON.parse(token).token },
                data: {
                    patientID: _id
                },
            });
            // console.log(data)
            setHistory(data.data)
            // console.log(userData, 'ini hasilnya')
            setLoad(false)
        } catch (error) {
            console.log(error, 'error')
            setLoad(false)
        }
    }

    useEffect(() => {
        getPatient()
        setId({
            _id: props.userData._id,
            firstName: props.userData.lastName ?
                props.userData.firstName + ' ' + props.userData.lastName
                : props.userData.firstName
        })
    }, [])

    useEffect(() => {
        // console.log(patientId, 'pay')
        getHistoryRegistration(patientId._id)
    }, [patientId])

    const onRefresh = React.useCallback(() => {
        getHistoryRegistration(patientId._id)
    }, [loader]);

    BackHandler.addEventListener('hardwareBackPress', () => {
        props.navigation.pop()
        return true
    })

    return (
        <View style={{ flex: 1, backgroundColor: '#1F1F1F'}}>
            <ImageBackground source={require('../../../assets/png/Background-Pattern.png')} style={{ height: Widht * 0.20, }}>
                <View style={{ flex: 1, marginTop: 32, flexDirection: 'row', alignItems: 'center', }}>
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate('ProfileSwitch')}>
                        <View style={{ flexDirection: 'row', }} >
                            <ArrowBack />
                            <Text style={{ fontSize: 20, color: '#ffff', fontWeight: 'bold', position: 'relative', }}>History Registration</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
            {patient &&
                <View style={{
                    backgroundColor: '#FFF',
                    padding: 10,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    shadowColor: '#C2C2C2',
                    shadowOffset: { height: 5, width: 5 },
                    shadowOpacity: 0.61,
                    shadowRadius: 9.11,
                    elevation: 9
                }}>
                    <View style={{ padding: 5, justifyContent: 'center' }}>
                        <IconFA name='user-o' size={25} color='#707070' />
                    </View>
                    <Picker
                        mode={'dropdown'}
                        selectedValue={patientId.firstName}
                        style={{ flex:1 }}
                        onValueChange={(itemValue, itemIndex) => {
                            setId({
                                _id: patient[itemIndex]._id,
                                firstName: itemValue
                            })
                        }}>
                        {patient.map((el, i) => {
                            return (
                                <Picker.Item
                                    key={i}
                                    label={el.firstName}
                                    value={el.firstName}
                                />
                            );
                        })}
                    </Picker>
                </View>
            }
            {
                loader ? (
                    <LottieLoader
                        source={require('../../../screens/animation/loading.json')}
                        autoPlay
                        loop
                    />
                ) : (
                        <>
                            {historyRegist ? (
                                <ScrollView
                                    style={{ flex: 1 }}
                                    refreshControl={
                                        <RefreshControl refreshing={loader} onRefresh={onRefresh} />
                                    }>
                                    {historyRegist.map((history, index) => {
                                        return (
                                            <View key={index} style={{
                                                padding: 10,
                                                flexDirection: 'row'
                                            }}>
                                                <View style={{ width: 10, backgroundColor: '#cdcdcd', marginRight: 5 }} />
                                                <View style={{ flex: 1, padding: 5, borderColor: '#cdcdcd', borderWidth: 1 }}>
                                                    <Text style={{ alignSelf: 'flex-end' }}>{history.bookingSchedule}</Text>
                                                    <Text>Doctor Name : {history.doctor.doctorName}</Text>
                                                    <Text>{history.doctor.doctorSpecialist}</Text>
                                                    <Text>Facility : {history.healthFacility.facilityType} {history.healthFacility.facilityName}</Text>

                                                    {/* <Text>{JSON.stringify(history, null, 2)}</Text> */}
                                                </View>
                                            </View>
                                        )
                                    })
                                    }
                                </ScrollView>
                            ) : (
                                    <View style={{ flex: 1, alignItems: 'center', padding: 20 }}>
                                        <Text>You have never been registered </Text>
                                    </View>
                                )}
                        </>
                    )



                // {/* <Text>{JSON.stringify(patient, null, 2)}</Text> */} 
                //                             </ScrollView>
                // )
            }
        </View >
    )
}

const styles = StyleSheet.create({

})

const mapStateToProps = state => {
    return state
}
const mapDispatchToProps = {
    setLoading
}

export default connect(mapStateToProps, mapDispatchToProps)(History)