import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import io from 'socket.io-client';

import {baseURL} from '../../config';

const activeActivity = props => {
  // console.log(Object.keys(props.data.registration))
  let {queuingNumber} = props.data.registration;
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
          <Text style={{color: '#fff'}}>Current Queue</Text>
          <Text style={{fontSize: 55, color: '#fff', fontWeight: 'bold'}}>
            {' '}
            {quesekarang}{' '}
          </Text>
        </View>
        <View
          style={{
            width: 1,
            height: '80%',
            backgroundColor: '#000',
            opacity: 0.6,
          }}
        />
        <View
          style={{
            minWidth: '42%',
            margin: '2%',
            marginRight: '4%',
            alignItems: 'center',
          }}>
          <Text style={{color: '#fff'}}>My Queue</Text>
          <Text style={{fontSize: 55, color: '#fff', fontWeight: 'bold'}}>
            {' '}
            {queuingNumber}{' '}
          </Text>
        </View>
      </View>
      <View style={Styles.bookingCodeBox}>
        <Text style={{color: '#fff', paddingHorizontal: 5, fontSize: 13}}>
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
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  containerComponent: {
    // height: 150,
    width: '90%',
    borderRadius: 6,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: '#00b386',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 20,
    marginTop: 20,
  },
  bookingCodeBox: {
    // paddingHorizontal: 25,
    width: '70%',
    paddingVertical: 10,
    backgroundColor: '#19a119',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    opacity: 0.8,
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
