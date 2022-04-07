import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  BackHandler,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import ArrowBack from '../../../assets/svg/ArrowBack';
import GreyHeader from '../../../components/headers/GreyHeader';


const resetPasswd = (props) => {
  // const { resetpassword } = props.userData
  BackHandler.addEventListener('hardwareBackPress', () => {
    props.navigation.pop();
    return true;
  });

  return (
    <>
      <GreyHeader
        title="Reset Password"
        navigateBack="SignIn"
        navigate={props.navigation.navigate}
      />
      <View style={style.container}>
        <Text style={style.text}> Pilih metode </Text>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('ResetPasswordEmail')}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 18,
          }}
        >
          <Image
            style={style.image2}
            source={require('../../../assets/png/ic_email.png')}
          />
          <View style={{ width: '95%' }}>
            <Text style={style.title}>Email</Text>
            <Text style={style.description}>
              Pulihkan akun dengan kode yang dikirimkan untuk menggunakan kode
              verifikasi
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => props.navigation.navigate('ResetPasswordPhone')}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Image
            style={style.image2}
            source={require('../../../assets/png/ic_hp.png')}
          />
          <View style={{ width: '95%' }}>
            <Text style={style.title}>Nomor Hp</Text>
            <Text style={style.description}>
              Verifikasi nomor hp untuk memulihkan akun
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

const style = StyleSheet.create({
  base: {
    flex: 1,
    paddingHorizontal: 20,
  },
  container: {
    backgroundColor: '#1F1F1F',
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 14,
  },
  content: {
    height: '15%',
    backgroundColor: '#2F2F2F',
  },
  text: {
    color: 'white',
    fontSize: 18,
    marginBottom: 18,
  },
  wrapper: {
    marginTop: 20,
    marginLeft: 20,
  },
  wrapper2: {
    marginTop: 22,
    marginLeft: 20,
  },
  main: {
    flexDirection: 'row',
    marginTop: 10,
  },
  image: {
    width: 40,
    height: 40,
  },
  image2: {
    width: 40,
    height: 40,
    marginRight: 14,
  },
  title: {
    color: '#DDDDDD',
    fontSize: 16,
  },
  description: {
    color: '#B5B5B5',
    fontSize: 14,
    marginTop: 3,
    width: '90%',
  },
  mainSection: {
    marginTop: 10,
    flexDirection: 'row',
  },
});


export default resetPasswd;
