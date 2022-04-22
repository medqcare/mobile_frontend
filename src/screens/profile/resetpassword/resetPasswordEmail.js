import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  BackHandler,
  ActivityIndicator,
} from 'react-native';

//action
import { ToastAndroid } from 'react-native';
import GreyHeader from '../../../components/headers/GreyHeader';

//mapTopProps
const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = {
};

const resetPasswdEmail = (props) => {
  BackHandler.addEventListener('hardwareBackPress', () => {
    props.navigation.pop();
    return true;
  });

  const [load, setLoad] = useState(false);
  const [email, setEmail] = useState('');

  const validation = () => {
    console.log(email, 'Ini data Email User');

    if (email === '') {
      ToastAndroid.show(
        'Mohon untuk mengisi alamat email terlebih dahulu.',
        ToastAndroid.LONG
      );
    } else {
      setLoad(true);
      Finalvalidation(email);
      ToastAndroid.show(
        'MedQCare sedang mengirim email. Mohon menunggu',
        ToastAndroid.LONG
      );
    }
  };

  function Finalvalidation(email) {
    setLoad(false);
    // props.resetPasswordEmail(email, props.navigation.navigate, 'allertEmail');
  }

  return (
    <>
      <GreyHeader
        title="Reset Password"
        navigateBack="ResetPassword"
        navigate={props.navigation.navigate}
      />
      <View style={style.container}>
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 16,
              paddingHorizontal: 14,
              backgroundColor: '#2F2F2F',
              borderRadius: 4,
              marginBottom: 20,
            }}
          >
            <Image
              style={style.image}
              source={require('../../../assets/png/ic_email.png')}
            />
            <Text
              style={{ width: '80%', marginLeft: 12, color: '#f8fafc' }}
              numberOfLines={3}
            >
              Masukkan alamat email yang sudah terdaftar untuk mengirimkan kode
              verifikasi
            </Text>
          </View>
          <TextInput
            value={email}
            placeholder="Email"
            placeholderTextColor={'#cbd5e1'}
            style={{
              paddingVertical: 14,
              paddingHorizontal: 12,
              backgroundColor: '#2F2F2F',
              color: '#f8fafc',
            }}
            onChangeText={setEmail}
          />
        </View>
        <TouchableOpacity style={style.button} onPress={() => validation()}>
          <View>
            {load ? (
              <ActivityIndicator size={'small'} color={'#FFF'} />
            ) : (
              <Text style={{ fontSize: 16, color: '#00FFEC' }}>Kirim Kode</Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: '#1F1F1F',
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 18,
    justifyContent: 'space-between',
  },
  base: {
    flex: 1,
    paddingHorizontal: 20,
  },
  content: {
    height: '15%',
    backgroundColor: '#2F2F2F',
  },
  main: {
    flexDirection: 'row',
    marginTop: 35,
    borderRadius: 5,
    backgroundColor: '#2F2F2F',
  },
  main2: {
    flexDirection: 'row',
    marginTop: -2,
    borderRadius: 5,
    height: 75,
    backgroundColor: '#2F2F2F',
  },
  image: {
    width: 45,
    height: 45,
  },
  description: {
    color: '#B5B5B5',
    fontSize: 15,
    width: '59%',
    textAlign: 'left',
    marginTop: -4,
  },
  wrapper: {
    marginTop: 25,
    marginLeft: 20,
  },
  txtInput: {
    marginTop: 35,
    borderRadius: 5,
    backgroundColor: '#2F2F2F',
  },
  txtInput2: {
    marginTop: -2,
    borderRadius: 5,
    height: 55,
    backgroundColor: '#2F2F2F',
  },
  txtInputTeks: {
    color: '#DDDDDD',
    marginTop: 15,
    width: '100%',
    height: 30,
    paddingHorizontal: 20,
    borderRadius: 3,
    color: '#DDDDDD',
    backgroundColor: '#2F2F2F',
    fontSize: 16,
  },
  button: {
    width: '95%',
    height: 50,
    marginTop: '65%',
    marginBottom: 10,
    backgroundColor: 'rgba(31, 198, 188, 0.3)',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },

    shadowOpacity: 0.23,
    shadowRadius: 6,
    elevation: 4,
    marginHorizontal: 10,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(resetPasswdEmail);
