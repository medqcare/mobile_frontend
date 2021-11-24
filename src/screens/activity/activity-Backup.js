import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, StatusBar, Alert, TouchableWithoutFeedback, ScrollView, ActivityIndicator,
BackHandler} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ActiveActivity from '../../components/activity/activeActivity'
import Entypo from 'react-native-vector-icons/Entypo'

import Header from '../../components/headers/GradientHeader'

//function 
import { getCurrentQueueingNumber } from '../../stores/action/index'
import getAge from '../../helpers/getAge'

const activity = (props) => {
  const [flag, setFlag] = useState(null)
  const [scannedData, setScannedData] = useState(null)
  const [queueID, setqueueID] = useState(null)
  const [bookingID, setBookingID] = useState(null)
  const [reservationID, setReservationID] = useState(null)
  const [currentQueue, setCurrentQueue] = useState('enol')

  useEffect(() => {
    checkAsync()
  }, [props.navigation.state.params.flag])

  async function checkAsync() {

    try {
      let bookingID = props.bookingID ? props.bookingID : props.navigation.state.params.bookingID
      let reservationID = props.reservationID ? props.reservationID : props.navigation.state.params.reservationID
      // let queueID = props.navigation.state.params.queueId ? props.navigation.state.params.queueId : await AsyncStorage.getItem(`${reservationID}`) 
      let queueID = props.navigation.state.params.queueId ? props.navigation.state.params.queueId : await AsyncStorage.getItem(`${reservationID}`)
      let savedData = await AsyncStorage.getItem(`flag-async-"${bookingID}"-"${reservationID}"`)
      let getCurrentQueue = await props.getCurrentQueueingNumber(queueID)
      
      if (savedData) {
        setFlag(true)
        setqueueID(queueID)
        setBookingID(bookingID)
        setReservationID(reservationID)
        setCurrentQueue(getCurrentQueue)
        setScannedData(JSON.parse(savedData))
      } else {
        setFlag(false)
      }
    } catch (error) {
      setFlag(false)
    }
  }
  BackHandler.addEventListener('hardwareBackPress', () => {
    return (props.navigation.navigate('Activity_List'))
  })
  
  return (
    <>
    {
      scannedData && <View >
        <ActiveActivity data={scannedData} queueId={queueID} currentQueue={currentQueue} />
        <View style={Styles.middleBox}>
            <Text style={Styles.text}>Pasien </Text>
            <Text style={{color:'#fff', marginTop: 10, fontSize: 16, fontWeight: 'bold'}}>{scannedData.registration.patient.patientName}</Text>
            <Text style={Styles.text}>{getAge(scannedData.registration.patient.dob)} tahun</Text>
          
          <View style={{ height: 1, width: '100%', backgroundColor: '#4F4F4F', marginVertical: 10 }} />
          
            <Text style={Styles.text}>Dokter </Text>
            <Text style={{color:'#fff', marginTop: 10, fontSize: 16, fontWeight: 'bold'}}>{scannedData.registration.doctor.doctorName}</Text>
            <Text style={Styles.text}>Specialist {scannedData.registration.doctor.doctorSpecialist}</Text>
            <Text style={{...Styles.text, marginTop: 18}}>{scannedData.registration.healthFacility.facilityName}</Text>
          
        </View>
      </View>
    }
    </>
    // <View style={Styles.container}>
    //   <Header title={'Antrian'} navigate={props.navigation.navigate} navigateBack={'Activity_List'}/>
    //   {
    //     scannedData && <View >
    //       <ActiveActivity data={scannedData} queueId={queueID} currentQueue={currentQueue} />
    //       <View style={Styles.middleBox}>
    //           <Text style={Styles.text}>Pasien </Text>
    //           <Text style={{color:'#fff', marginTop: 10, fontSize: 16, fontWeight: 'bold'}}>{scannedData.registration.patient.patientName}</Text>
    //           <Text style={Styles.text}>{getAge(scannedData.registration.patient.dob)} tahun</Text>
            
    //         <View style={{ height: 1, width: '100%', backgroundColor: '#4F4F4F', marginVertical: 10 }} />
            
    //           <Text style={Styles.text}>Dokter </Text>
    //           <Text style={{color:'#fff', marginTop: 10, fontSize: 16, fontWeight: 'bold'}}>{scannedData.registration.doctor.doctorName}</Text>
    //           <Text style={Styles.text}>Specialist {scannedData.registration.doctor.doctorSpecialist}</Text>
    //           <Text style={{...Styles.text, marginTop: 18}}>{scannedData.registration.healthFacility.facilityName}</Text>
            
    //       </View>
    //     </View>
    //   }
    //   {!flag && <Text style={{...Styles.text, textAlign: 'center', marginTop: 30}}>Tidak ada antrian</Text>}
    // </View>
  )
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F1F1F'
  },
  middleBox: {
    width: '90%',
    alignSelf: 'center',
    borderRadius: 6,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    backgroundColor: '#3C3C3C',
    marginHorizontal: 5,
    padding: 20,
    paddingBottom: 25
  },
  text: {
    color: '#B5B5B5',
    marginTop: 5
  }
})

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = {
  getCurrentQueueingNumber
}

export default connect(mapStateToProps, mapDispatchToProps)(activity)
