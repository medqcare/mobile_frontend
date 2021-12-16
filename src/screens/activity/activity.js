import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, StatusBar, Alert, TouchableWithoutFeedback, ScrollView, ActivityIndicator,
BackHandler} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ActiveActivity from '../../components/activity/activeActivity'
import Entypo from 'react-native-vector-icons/Entypo'
import IcDokter from '../../assets/svg/ic_dokter'

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
  }, [props.flag])

  async function checkAsync() {

    try {
      let bookingID = props.bookingID
      let reservationID = props.reservationID 
      // let queueID = props.navigation.state.params.queueId ? props.navigation.state.params.queueId : await AsyncStorage.getItem(`${reservationID}`) 
      // let queueID = props.queueId ? props.queueId : await AsyncStorage.getItem(`${reservationID}`)
      // let savedData = await AsyncStorage.getItem(`flag-async-"${bookingID}"-"${reservationID}"`)
      let savedData = props.data
      let queueID = props.queueId
      let getCurrentQueue = await props.getCurrentQueueingNumber(queueID)

      console.log(savedData );
      
      if (savedData) {
        setFlag(true)
        setqueueID(queueID)
        setBookingID(bookingID)
        setReservationID(reservationID)
        setCurrentQueue(getCurrentQueue)
        setScannedData(savedData)
      } else {
        setFlag(false)
      }
    } catch (error) {
      console.log(error);
      setFlag(false)
    }
  }
  BackHandler.addEventListener('hardwareBackPress', () => {
    return (props.navigation.navigate('Home'))
  })
  
  return (
    <>
    {
      scannedData && <View >
        <View style={Styles.middleBox}>
            <Text style={Styles.text}>Dokter </Text>
            <View style={{flexDirection: 'row',marginTop: 10}}>
              <View style={{marginTop: 2}}>
                <IcDokter />
              </View>
              <Text style={{color:'#FFF', fontSize: 14, marginLeft: 10}}>{scannedData?.doctor.doctorName}</Text>
            </View>
            
        </View>
        <ActiveActivity data={scannedData} queueId={queueID} currentQueue={currentQueue} />
      </View>
    }
    </>
  )
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F1F1F'
  },
  middleBox: {
    width: '100%',
    alignSelf: 'center',
    borderRadius: 10,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    backgroundColor: '#3C3C3C',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginTop: 20
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
