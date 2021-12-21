import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, View, StatusBar, Button, ActivityIndicator, ScrollView, FlatList, TouchableOpacity, BackHandler } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Header from '../../components/headers/GradientHeader'
import Activity from './activity'

//action
import { getTodayRegistration, getCurrentQueueingNumber } from '../../stores/action'

const activityList = (props) => {
    const [dateRef, setDateRef] = useState(null)
    const [refresh, setRefresh] = useState(true)

    useEffect(() => {
        // props.getTodayRegistration(props.userData.userID._id)
        fetchdata()
    }, [props.navigation.state.params, dateRef])
    
    async function fetchdata() {
        try {
            await props.getTodayRegistration(props.userData.userID._id)
                .then(({data}) => {
                    setRefresh(false)
                    if(!dateRef){
                        setDateRef(new Date())
                    }
                }) .catch(error => console.log(error))

            // let queueID = await AsyncStorage.getItem('queueID') 
            // let bookingID = await AsyncStorage.getItem('bookingCode')
            // let reservationID = await AsyncStorage.getItem('reservationID')
            // let savedData = await AsyncStorage.getItem(`flag-async-${bookingID}-${reservationID}`)
            // let getCurrentQueue = await props.getCurrentQueueingNumber(queueID)
            // console.log('savedData ==>',savedData, 'getCurrentQueue ==> ',getCurrentQueue)
            
        } catch (error) {
            console.log(error)
        }
    }

    BackHandler.addEventListener("hardwareBackPress", () => {
        props.navigation.navigate('Home')
        return true
    })
    // console.log('====> ini props.today activity ===>', props.todayActivity)
    return (
        <View style={styles.container}>
            <Header title={'Today Activity'} navigate={props.navigation.navigate}/>
            <View style={{paddingHorizontal: 20, flex:1}}>
                    {props.todayActivity && props.todayActivity.length === 0 && <View style={{justifyContent:'center',alignItems: "center", height: '90%'}}>
                            <Text>You have no ongoing activity today</Text>
                        </View>}
                    {refresh && <ActivityIndicator size="large" color="#0000ff" />}
                <ScrollView>
                    {
                        props.todayActivity && props.todayActivity.map((el, idx) => {
                            // console.log('===> ',el)
                            return (
                                <Activity flag={true} bookingID={el.bookingCode} reservationID={el.reservationID} queueId={JSON.stringify(el.queueID)}  />
                            // <TouchableOpacity key={idx}  onPress={() => {
                            //     props.navigation.navigate('Activity_landing', {flag: true, bookingID: el.bookingCode, reservationID: el.reservationID, queueId:  JSON.stringify(el.queueID)})
                            // }}>
                            //     <View style={[styles.activityCard, {marginTop: idx === 0 ? 20 : 10}]}>
                            //         <View style={styles.leftActivityCard}>
                            //             <Text style={{color: '#000', fontSize: 50, fontWeight: 'bold'}}>{el.queuingNumber}</Text>
                            //             <Text style={{color: '#000'}}>My Queue</Text>
                            //         </View>
                            //         <View style={styles.rightActivityCard}>
                            //             <Text style={{color: '#000', textTransform : 'capitalize'}}>{el.patient.patientName}</Text>
                            //             <Text style={{color: '#000', textTransform : 'capitalize'}}>{el.doctor.tilte}{el.doctor.doctorName}</Text>
                            //             <Text style={{color: '#000', textTransform : 'capitalize', flexWrap: 'wrap'}}>{el.healthFacility.facilityName}</Text>
                            //             <View style={{height:1, width: '100%', backgroundColor: '#000', opacity: 0.3, marginVertical: 13}}/>
                            //             <Text style={{color: '#000', textTransform : 'capitalize'}}>{el.bookingTime}</Text>
                            //         </View>
                            //     </View>
                            // </TouchableOpacity>
                            )
                        })
                    }
                </ScrollView>
            </View>
        </View>
    )
}

const mapStateToProps = state => {
    return state
}

const mapDispatchToProps = {
    getTodayRegistration,
    getCurrentQueueingNumber
}
export default connect(mapStateToProps, mapDispatchToProps)(activityList)

const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: '#1F1F1F'
    },
    headerTitle : {
        fontSize: 25,
        fontWeight: "bold",
        padding: 20,
        paddingTop: StatusBar.currentHeight + 20,
        backgroundColor: 'teal',
        color: '#fff'
    },
    activityCard: {
        flexDirection: 'row',
        width: '95%',
        minHeight: 100,
        alignSelf: 'center',
        backgroundColor:'#fff',
        borderRadius: 3,
        justifyContent: 'flex-start',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginVertical: 10
    },
    leftActivityCard: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'limegreen',
        borderRadius: 3,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 9,
        padding: 10,
        width: '25%'
    },
    rightActivityCard: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: '75%',
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 3
    }
})
