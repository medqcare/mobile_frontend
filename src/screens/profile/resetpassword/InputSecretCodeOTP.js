import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  BackHandler,
  ActivityIndicator,
  Dimensions,
} from 'react-native';

//action
import { validateSecretCode } from '../../../stores/action';
import ArrowBack from '../../../assets/svg/ArrowBack';
import { ToastAndroid } from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebaseAuthService from '../../../helpers/firebasePhoneAuth';

const InputSecretCodeOTP = (props) => {
  const {
    email,
    phoneNumber,
    back = 'Home',
    onSuccess,
  } = props.navigation.state.params;
  const CELL_COUNT = 6;
  const [secretCode, setSecretCode] = useState('');
  const ref = useBlurOnFulfill({ secretCode, cellCount: CELL_COUNT });

  BackHandler.addEventListener('hardwareBackPress', () => {
    props.navigation.pop();
    return true;
  });

  async function validation() {
    const isNumber = +secretCode;
    if (secretCode.length < 6) {
      ToastAndroid.show(
        'Mohon ketik kode yang anda terima di SMS',
        ToastAndroid.SHORT
      );

      return;
    } else if (!isNumber) {
      ToastAndroid.show(
        'Format kode tidak valid, mohon masukan angka',
        ToastAndroid.SHORT
      );
      return;
    }

    try {
      const verificationId = props.navigation.getParam('verificationId');
      const result = await firebaseAuthService.confirmCode(
        verificationId,
        secretCode
      );
      console.log('Verification Result: ', result);
      /**
       * params: onSuccess
       * function
       */
      await onSuccess();
    } catch (error) {
      console.log(error);
      ToastAndroid.show('Invalid Code', ToastAndroid.LONG);
    }
  }

  return (
    <View style={style.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => props.navigation.navigate(back)}>
        <View style={style.header}>
          <Image
            source={require('../../../assets/png/ic_close.png')}
            style={style.backButton}
          />
        </View>
      </TouchableOpacity>
      <View style={{ justifyContent: 'space-between', flex: 1 }}>
        <View style={style.TopContainer}>
          <Text style={style.MessageTopText}>Verifikasi Kode</Text>
          <Text style={style.MessageBottomText}>
            {' '}
            Masukan kode verifikasi yang telah dikirimkan ke nomor{' '}
          </Text>
          <Text style={style.emailText}> {phoneNumber} </Text>
          <CodeField
            ref={ref}
            {...props}
            value={secretCode}
            onChangeText={setSecretCode}
            cellCount={CELL_COUNT}
            rootStyle={style.codeFieldRoot}
            keyboardType={'numeric'}
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
              <View
                // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
                // onLayout={getCellOnLayoutHandler(index)}
                key={index}
                style={[style.cellRoot, isFocused && style.focusCell]}
              >
                <Text style={style.cellText}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              </View>
            )}
          />
        </View>
        <View style={style.bottomButtonContainer}>
          <TouchableOpacity
            style={style.bottomButton}
            onPress={() => validation()}
          >
            <View>
              <Text style={style.bottomButtonText}>Masukan kode</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const dimension = Dimensions.get('window');
const dimHeight = dimension.height;

const style = StyleSheet.create({
  container: {
    backgroundColor: '#1F1F1F',
    height: dimHeight,
    // minHeight: '100%'
  },

  header: {
    marginLeft: 10,
    marginTop: 40,
  },

  backButton: {
    marginLeft: 10,
    width: 20,
    height: 20,
  },

  TopContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 54,
  },

  MessageTopText: {
    color: 'rgba(221, 221, 221, 1)',
    fontSize: 24,
    fontWeight: '600',
  },

  MessageCheckLogo: {
    marginTop: 35,
    height: 83,
    width: 90,
  },

  MessageBottomText: {
    textAlign: 'center',
    color: '#A2A2A2',
    fontSize: 15,
    fontWeight: '400',
    marginTop: 32,
    width: '80%',
  },

  emailText: {
    textAlign: 'center',
    color: 'rgba(221, 221, 221, 1)',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 32,
    width: '80%',
  },

  codeFieldRoot: {
    marginTop: 70,
    width: 330,
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  cellRoot: {
    width: 30,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#353535',
    borderBottomWidth: 4,
  },

  cellText: {
    color: '#DDDDDD',
    fontSize: 36,
    textAlign: 'center',
  },

  focusCell: {
    borderBottomColor: '#007AFF',
    borderBottomWidth: 2,
  },

  bottomButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 15,
  },

  bottomButtonText: {
    fontSize: 16,
    color: '#00FFEC',
  },

  bottomButton: {
    width: '95%',
    height: 60,
    marginTop: '5%',
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

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = {
  validateSecretCode,
};

export default connect(mapStateToProps, mapDispatchToProps)(InputSecretCodeOTP);
