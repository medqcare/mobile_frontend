import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, StatusBar, Alert, TouchableWithoutFeedback, ScrollView, ActivityIndicator,
BackHandler} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ActiveActivity from '../../components/activity/activeActivity'
import Entypo from 'react-native-vector-icons/Entypo'

//function 
import { getCurrentQueueingNumber } from '../../stores/action/index'
import getAge from '../../helpers/getAge'

const activity = (props) => {
  // console.log(props.navigation.state.params.flag,'ini yang dikirim dari appointment list')
  const [flag, setFlag] = useState(null)
  const [scannedData, setScannedData] = useState(null)
  const [queueID, setqueueID] = useState(null)
  const [bookingID, setBookingID] = useState(null)
  const [reservationID, setReservationID] = useState(null)
  const [currentQueue, setCurrentQueue] = useState('enol')

  useEffect(() => {
    checkAsync()
  }, [props.navigation.state.params.flag])

  useEffect(() => {
    checkAsync()
  }, [])

  async function checkAsync() {
    // console.log('checkasync ===> disini di checkAsync')

    try {
      let bookingID = props.bookingID ? props.bookingID : props.navigation.state.params.bookingID
      let reservationID = props.reservationID ? props.reservationID : props.navigation.state.params.reservationID
      console.log(bookingID, " ===== ", reservationID);
      let queueID = await AsyncStorage.getItem(`${reservationID}`)
      console.log(queueID, '////');
      
      let savedData = await AsyncStorage.getItem(`flag-async-"${bookingID}"-"${reservationID}"`)
      let getCurrentQueue = await props.getCurrentQueueingNumber(queueID)

      // console.log(`ini yang dicari di async ==> flag-async-${bookingID}-${reservationID}`)
      // console.log( bookingID, queueID, reservationID, savedData, '<<===================')
      console.log(savedData, '<=====save data=====')

      // if(bookingID && queueID && reservationID && getCurrentQueue){
      if (savedData) {
        // console.log('disini ngeset')
        setFlag(true)
        setqueueID(queueID)
        setBookingID(bookingID)
        setReservationID(reservationID)
        setCurrentQueue(getCurrentQueue)
        setScannedData(JSON.parse(savedData))
      } else {
        // console.log('masuk sini nih tapi nggak ngeset')
        setFlag(false)
      }
    } catch (error) {
      // console.log('gagal di checkAsync entah dimana')
      // console.log(error)
      Alert.alert(error.message)
    }
  }

  BackHandler.addEventListener('hardwareBackPress', () => {
    return (props.navigation.navigate('Activity_List'))
  })
  console.log(scannedData, 'ini scanned Data')
  return (
    <View style={Styles.container}>
      <Text style={Styles.headerTitle}>Today Activity</Text>
      {
        scannedData && <View>
          <ActiveActivity data={scannedData} queueId={queueID} currentQueue={currentQueue} />
          {/* <ScrollView showsVerticalScrollIndicator={false}> */}
          <View style={Styles.middleBox}>
            <View style={{ paddingHorizontal: 15, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginVertical: 10 }}>
              <Entypo name={'info-with-circle'} size={15} color={'limegreen'} />
              <Text style={{ marginLeft: 15 }}>Appointment Detail </Text>
            </View>
            <View style={{ paddingHorizontal: 15, marginVertical: 10 }}>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>{scannedData.registration.patient.patientName}</Text>
              <Text>{getAge(scannedData.registration.patient.dob)} y.o, {scannedData.registration.patient.gender}</Text>
            </View>
            <View style={{ height: 0.5, width: '100%', backgroundColor: '#000', opacity: 0.3, marginVertical: 10 }} />
            <View style={{ paddingHorizontal: 15, marginVertical: 10 }}>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>{scannedData.registration.doctor.doctorName}</Text>
              <Text>Specialist {scannedData.registration.doctor.doctorSpecialist}</Text>
              <Text>{scannedData.registration.healthFacility.facilityName}</Text>
            </View>

            {/* //barccode to show patient medical resume */}
            {/* <TouchableWithoutFeedback onPress={() => Alert.alert('kepencet gan')}>
                <View style={{padding: 10, borderRadius: 6, borderWidth: 0.5, justifyContent: 'center', alignItems: 'center'}}>
                  <Text>Show QRCode</Text>
                </View>
              </TouchableWithoutFeedback> */}
          </View>
          {/* </ScrollView> */}
        </View>
      }
      {!flag && <ActivityIndicator size="large" color="#ff0f00" />}
    </View>
  )
}

const Styles = StyleSheet.create({
  headerTitle: {
    fontSize: 25,
    fontWeight: "bold",
    padding: 20,
    paddingTop: StatusBar.currentHeight + 20,
    backgroundColor: 'teal',
    color: '#fff'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  middleBox: {
    width: '90%',
    alignSelf: 'center',
    borderRadius: 6,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    backgroundColor: '#fff',
    marginHorizontal: 5,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingBottom: 20
  }
})

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = {
  getCurrentQueueingNumber
}

export default connect(mapStateToProps, mapDispatchToProps)(activity)
