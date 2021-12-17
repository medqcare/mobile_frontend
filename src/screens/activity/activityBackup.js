import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, Dimensions, ImageBackground, Image, TouchableOpacity } from 'react-native'
import io from 'socket.io-client'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { connect } from 'react-redux';
import CardActivity from '../../components/activity/dashboard/activity-card'
import { baseURL } from '../../config'
import QRCode from 'react-native-qrcode-svg'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'

const mapStateToProps = state => {
  return state
}


const activity = (props) => {
  // console.log(props.navigation,'masuk dini loooohhh')
  const [Act, setAct] = useState(null)
  const [hospital, setHospital] = useState(null)
  const [doctor, setDoctor] = useState(null)
  const [billing, setBilling] = useState(null)
  const [patient, setPatient] = useState(null)
  const [status, setStatus] = useState(false)
  const [Reg, setReg] = useState(null)

  // console.log(props.userData, 'ini user datanya')

  const checkStatusRegister = (data, hospitalID) => {
    data.forEach(element => {
      if (element.ID._id == hospitalID) {
        // console.log(element.ID._id, 'ini id');
        // console.log(hospitalID, 'ini id pembanding')
        // console.log(element.NO_REKAM_MEDIS);
        if (element.NO_REKAM_MEDIS == null) {
          setStatus(true)
        }
      }
    });
  }

  const dataHospital = async (id) => {
    try {
      let { data } = await axios({
        method: 'GET',
        url: baseURL + `/api/hospitals/${id}`
      })
      // console.log(data.NAMA_RS, 'ini data RS')
      setHospital(data)
    } catch (error) {
      console.log(error)
    }
  }

  const dataPatient = async (id, hospitalID) => {
    try {
      let { data } = await axios({
        method: 'GET',
        url: baseURL + `/api/users/findById/${id}`
      })
      setPatient(data)
      // console.log(data.hospital[0].NO_REKAM_MEDIS, 'dataPatient....');
      if (data) {
        checkStatusRegister(data.hospital, hospitalID)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const dataDoctor = async (id) => {
    try {
      let { data } = await axios({
        method: 'GET',
        url: baseURL + `/api/doctors/${id}`
      })
      setDoctor(data)
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    const serverIO = `${baseURL}:3004`
    const socket = io(serverIO)
    let token

    AsyncStorage.getItem('token')
      .then(data => {
        token = JSON.parse(data).token
        return axios({
          method: "GET",
          url: `${baseURL}/api/activities/date`,
          headers: { token: token }
        })
      })
      .then(({ data }) => {
        // userID = data[0].userID
        console.log('dapat disini======>')
        dataHospital(data[0].hospitalID)
        dataDoctor(data[0].doctorID)
        dataPatient(data[0].patientID, data[0].hospitalID)
        setAct(...data)
        socket.on(`activity-${data[0]._id}`, data2 => {
          // console.log(data2, 'ini data dari scoket');
          setAct(data2.data)
        })
        // console.log(data[0])

        /// INI BUAT AMBIL BILLINGNYA
        return axios({
          method: "GET",
          url: `${baseURL}/api/payments/findByActivity/${data[0]._id}`,
          headers: { token: token }
        })
      })
      .then(({ data }) => {

        const serverIO2 = `${baseURL}:3008`
        const socket2 = io(serverIO2)
        setBilling(data)
        socket2.on(`payment-${data.activityID}`, data2 => {
          setBilling(data2.data)
        })
      })
      .catch(err => {
        console.log(err);
      })
  }, [Reg])

  useEffect(() => {
    const serverIO = `${baseURL}:3005`
    const socket = io(serverIO)
    let token
    AsyncStorage.getItem('token')
      .then(data => {
        token = JSON.parse(data).token
        return axios({
          method: "GET",
          url: `${baseURL}/api/registers/date`,
          headers: { token: token }
        })
      })
      .then(({ data }) => {
        // console.log(data, 'ini data reg')
        dataHospital(data[0].hospitalID)
        dataDoctor(data[0].doctorID)
        dataPatient(data[0].patientID, data[0].hospitalID)
        setReg(...data)
        socket.on(`register-${data[0]._id}`, data2 => {
          // console.log(data2, 'ini data dari scoket');
          setReg(data2.data)
        })
        // console.log(data[0])
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  // const _retrieveDataActivity = async () => {
  //   try {
  //     let value = await AsyncStorage.getItem('token');
  //     if (value !== null) {
  //       const serverIO = `${baseURL}:3004`
  //       const socket = io(serverIO)
  //       let userID;
  //       console.log(JSON.parse(value).token, 'ini dapet valuenya')
  //       axios({
  //         url: `${baseURL}/api/activities/not-complete`,
  //         method: 'GET',
  //         headers: { token: JSON.parse(value).token }
  //       })
  //         .then(({ data }) => {
  //           // console.log(data);
  //           userID = data[0].userID
  //           setAct(data)
  //           socket.on(`activity-${userID}`, data2 => {
  //             // console.log(data2, 'ini data dari scoket');
  //             setAct(data2.data)
  //           })
  //         })
  //         .catch(err => {
  //           console.log(err.response)
  //         })
  //     }
  //     else {
  //       console.log('masuk sini belom sign in')
  //     }
  //   } catch (error) {
  //     // Error retrieving data
  //     console.log(error);
  //   }
  // }
  // const _retrieveDataRegister = async () => {
  //   // console.log('masuk retrieve data');
  //   try {
  //     let value = await AsyncStorage.getItem('token');
  //     if (value !== null) {
  //       const serverIO = `${baseURL}:3005`
  //       const socket = io(serverIO)
  //       let userID;
  //       axios({
  //         url: `${baseURL}/api/registers`,
  //         method: 'GET',
  //         headers: { token: JSON.parse(value).token }
  //       })
  //         .then(({ data }) => {
  //           userID = data[0].userID
  //           setReg(data)
  //           socket.on(`register-${userID}`, data2 => {
  //             setReg(data2.data)
  //           })
  //         })
  //         .catch(err => {
  //           console.log(err);
  //         })
  //     }
  //     else {
  //       console.log('masuk sini belom sign in')
  //     }
  //   } catch (error) {
  //     // Error retrieving data
  //     console.log(error);
  //   }
  // }

  useEffect(() => {
    if (!props.userData) {
      props.navigation.navigate('Sign')
    }
  }, [props.navigation.state.params.date])

  const [noAntrian, setAntrian] = useState(true)

  return (
    <View style={styles.container}>
      <View style={[styles.header, { position: 'absolute' }]}>
        <ImageBackground
          imageStyle={{ height: "100%", width: '100%', resizeMode: 'cover' }}
          source={require('../../assets/png/Background-Pattern.png')}
          style={styles.headerImage} />
      </View>
      <View style={{ flex: 1, alignItems: 'center', position: 'relative', top: 83, backgroundColor: '#C3ABE9' }}>
        <TouchableOpacity onPress={() => setAntrian(!noAntrian)} style={{ height: dimHeight * 0.2, width: dimWidth * 0.5, backgroundColor: '#FFF', borderRadius: 20, alignItems: 'center', justifyContent: 'center', padding: 10 }}>
          {!noAntrian &&
            <View style={{ backgroundColor: '#16E0F5', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={styles.headerText}>QR Code</Text>
            </View>
          }
          {noAntrian &&
            <View style={{ backgroundColor: '#B46464', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={styles.headerText}>No Antiran</Text>
              <Text style={{fontSize:60}}>001</Text>
            </View>
          }
        </TouchableOpacity>
        
        <View style={{ borderTopWidth: 3, borderColor: '#CDCDCD', width: '100%', marginTop: 30, backgroundColor: '#E79BE2', padding: 5 }}>
          
          <View style={{ flexDirection: 'row', backgroundColor: '#E5EC9B', flexGrow: 1, }}>
            <View style={{ padding: 10, flex: 4 }}>
              <Text>Booking Code</Text>
              <Text>BKN/001/31012020/TKN</Text>
            </View>
            <View style={{ padding: 10, flexDirection: 'row', flex: 2 }}>
              <Text>Image </Text>
              <Text>Pending</Text>
            </View>
          </View>

          <View style={{ height: 10, width: '100%', backgroundColor: '#CDCDCD' }} />
          
          <View style={{ padding: 10, backgroundColor: '#BFF6D6' }}>
            <Text>Patient's Name</Text>
            <Text>Medina Kartika</Text>
            <Text>Poly</Text>
            <Text>THT</Text>
            <Text>Time of Treatment</Text>
            <Text>16.30 WIB</Text>
          </View>
          
          <View style={{ backgroundColor: '#9EE8EF', borderTopWidth: 3, borderColor: '#CDCDCD', paddingTop: 20 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text>Status :</Text>
              <Text>Done</Text>
            </View>
          </View>
        </View>
      </View>
      {
        Act !== null &&
        <View style={styles.activity}>
          <View>
            {
              status == false && <View style={{ alignItems: 'center', paddingVertical: 30, backgroundColor: 'white', width: "100%" }}>
                <Text>INI NOMER ANTRIANNYA</Text>
              </View>
            }
            <View style={{
              alignSelf: 'center',
              backgroundColor: '#e9e9e9',
              height: 2,
              width: '100%',
            }}>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: '4%', backgroundColor: 'white', minHeight: "15%", marginBottom: "3%" }}>
              <View style={{ justifyContent: 'space-evenly' }}>
                <Text style={{ fontSize: 18, color: 'green', fontWeight: 'bold' }}>Booking Code</Text>
                <Text>{Act.bookingCode}</Text>
              </View>
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text>JPG</Text>
              </View>
            </View>
          </View>
          <ScrollView
            style={{ height: 10, paddingHorizontal: "4%", backgroundColor: "white", paddingVertical: "5%" }}
          >
            <View>
              <Text style={{ fontSize: 12, color: 'gray' }}>Nama Pasien</Text>
              {
                patient != null && <Text>{patient.firstName + ' ' + patient.lastName}</Text>
              }
            </View>
            <View>
              <Text style={{ fontSize: 12, color: 'gray' }} >Poli</Text>
              {
                doctor !== null && <Text>{doctor.SPESIALIS}</Text>
              }
            </View>
            <View>
              <Text style={{ fontSize: 12, color: 'gray' }} >Dokter</Text>
              {
                doctor !== null && <Text>{doctor.NAMA_DOKTER}</Text>
              }
              <Text>{Act.status}</Text>
            </View>
            <View>
              <Text style={{ fontSize: 12, color: 'gray' }} >Schedule</Text>
              <Text>{Act.bookingSchedule}</Text>
            </View>
          </ScrollView>
        </View>
      }
      {
        Reg !== null &&
        <View style={styles.activity}>

          {
            status && <View style={{ alignItems: 'center', paddingVertical: 30, backgroundColor: 'white', width: "100%", height: "100%" }}>
              <QRCode
                size={150}
                value={JSON.stringify({
                  data: props.userData._id
                })} />
              <Text>Please Register Your Card First</Text>
            </View>
          }
          {
            status == false && <View style={{ alignItems: 'center', paddingVertical: 30, backgroundColor: 'white', width: "100%" }}>
              <QRCode
                size={150}
                value={JSON.stringify({
                  data: props.userData._id
                })} />
            </View>
          }
          {
            status == false && <View>
              <View style={{
                alignSelf: 'center',
                backgroundColor: '#e9e9e9',
                height: 2,
                width: '100%',
              }}>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: '4%', backgroundColor: 'white', minHeight: "20%", marginBottom: "3%" }}>
                <View style={{ justifyContent: 'space-evenly' }}>
                  <Text style={{ fontSize: 18, color: 'green', fontWeight: 'bold' }}>Booking Code</Text>
                  <Text>{Reg.bookingCode}</Text>
                </View>
                <View style={{ alignItems: 'center', justifyContent: 'center', width: 1, height: 1 }}>
                  <Text>IMAGE</Text>
                </View>
              </View>
            </View>
          }
          <ScrollView
            style={{ height: 10, paddingHorizontal: "4%", backgroundColor: "white", paddingVertical: "5%" }}
          >
            <View>
              <Text style={{ fontSize: 12, color: 'gray' }}>Nama Pasien</Text>
              {
                patient != null && <Text>{patient.firstName + ' ' + patient.lastName}</Text>
              }
            </View>
            <View>
              <Text style={{ fontSize: 12, color: 'gray' }} >Poli</Text>
              {
                doctor !== null && <Text>{doctor.SPESIALIS}</Text>
              }
            </View>
            <View>
              <Text style={{ fontSize: 12, color: 'gray' }} >Dokter</Text>
              {
                doctor !== null && <Text>{doctor.NAMA_DOKTER}</Text>
              }
            </View>
            <View>
              <Text style={{ fontSize: 12, color: 'gray' }} >Schedule</Text>
              <Text>{Reg.bookingSchedule}</Text>
            </View>
          </ScrollView>
        </View>
      }
    </View>

    //   <View style={styles.container}>
    //     {
    //       (Reg.length === 0 && Act.length === 0) && <Text>BELOM ADA AKTIVITAS</Text>
    //     }

    //     <ScrollView
    //       style={styles.scrollContainer}
    //     >
    //       {Act.map((el, i) => {
    //         return (
    //           <CardActivity
    //             data={el}
    //             key={i}
    //           />
    //         )
    //       })}
    //       {
    //         Reg.map((el, i) => {
    //           return (
    //             <CardActivity
    //               data={el}
    //               key={i}
    //             />
    //           )
    //         })
    //       }
    //     </ScrollView>
    //   </View>
  )
}

const dimHeight = Dimensions.get('screen').height
const dimWidth = Dimensions.get('screen').width

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f4f4f4',
    height: '100%',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000'
  },
  scrollContainer: {
    marginTop: dimHeight * 0.11,
    width: '100%',
  },
  header: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#3c9d9b',
    minWidth: dimWidth,
    minHeight: dimHeight * 0.2,
    top: 0
  },
  activity: {
    marginTop: dimHeight * 0.1,
    height: '100%',
    width: '100%'
  },
  headerImage: {
    width: '100%',
    height: '100%',
    position: 'absolute'
  },
})

export default connect(mapStateToProps)(activity);
