import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import io from 'socket.io-client';
import getAge from '../../helpers/getAge'
import IcPatient from '../../assets/svg/ic_pasien'
import {baseURL} from '../../config';

const activeActivity = props => {
  // console.log(Object.keys(props.data.registration))
  let queuingNumber = props.data.queuingNumber;
  const [quesekarang, setquesekarang] = useState(props.currentQueue);

  useEffect(() => {
    let socketer = socketers();
    console.log('socket nyala')
    return () => {
      console.log('ini pas mau cabut dari component jadi manggil socket supaya mati')
      socketer.close();
    };
  }, []);
  function socketers() {
    let socketIO = `${baseURL}`;
    // let socketIO = `http://192.168.43.100:3004` // only development
    let socket = io(socketIO);
    socket.on(`que-${JSON.parse(props.queueId)}`, data => {
      console.log('ini console.log dari socket ', `que-${props.queueId}`);
      console.log(data);
      setquesekarang(data);
    });
    return socket;
  }
  return (
    <View style={Styles.containerComponent}>
      <View style={{marginBottom: 20, paddingHorizontal: 20}}>
        <Text style={{color: '#B5B5B5'}}>Pasien </Text>
        <View style={{flexDirection: 'row',marginTop: 10}}>
          <View style={{marginTop: 2}}>
            <IcPatient />
          </View>
          <Text style={{color:'#FFF', fontSize: 14, marginLeft: 10}}>{props.data.patient.patientName}</Text>
        </View>
      </View>


    
          
            
    

          
    
    
  
          
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View
          style={{
            minWidth: '42%',
            margin: '2%',
            marginLeft: '4%',
            alignItems: 'center',
          }}>
          <Text style={{color: '#B5B5B5'}}>Antrian Saat Ini</Text>
          <Text style={{fontSize: 55, color: '#B5B5B5', fontWeight: 'bold'}}>
            {' '}
            {quesekarang}{' '}
          </Text>
        </View>
        <View
          style={{
            width: 1,
            height: '80%',
            backgroundColor: '#757575'
          }}
        />
        <View
          style={{
            minWidth: '42%',
            margin: '2%',
            marginRight: '4%',
            alignItems: 'center',
          }}>
          <Text style={{color: '#FFBD00'}}>Antrian Saya</Text>
          <Text style={{fontSize: 55, color: '#FFBD00', fontWeight: 'bold'}}>
            {' '}
            {queuingNumber}{' '}
          </Text>
        </View>
      </View>
      {/* <View style={Styles.bookingCodeBox}>
        <Text style={{color: '#DDDDDD', paddingHorizontal: 5, fontSize: 13}}>
          {props.data.registration.bookingCode}
        </Text>
        <Text
          style={{
            color: '#fff',
            paddingHorizontal: 5,
            fontSize: 13,
            fontWeight: 'bold',
          }}>
          {props.data.registration.bookingTime}
        </Text>
      </View> */}
    </View>
  );
};
const Styles = StyleSheet.create({
  containerComponent: {
    // height: 150,
    width: '100%',
    borderRadius: 10,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    backgroundColor: '#2F2F2F',
    // alignSelf: 'center',
    // alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 20,
  },
  bookingCodeBox: {
    // paddingHorizontal: 25,
    width: '50%',
    paddingVertical: 10,
    backgroundColor: '#067019',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    margin: 8,
  },
  clockBox: {
    width: '90%',
    borderRadius: 6,
    backgroundColor: '#00b386',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
});
export default activeActivity;