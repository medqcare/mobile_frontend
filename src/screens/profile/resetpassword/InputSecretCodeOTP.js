import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  BackHandler,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';

//action
import { validateSecretCode } from '../../../stores/action';
import { ToastAndroid } from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
} from 'react-native-confirmation-code-field';
import firebaseAuthService from '../../../helpers/firebasePhoneAuth';

const InputSecretCodeOTP = (props) => {
  const CELL_COUNT = 6;
  const {
    phoneNumber,
    back = 'Home',
    onSuccess,
  } = props.navigation.state.params;

  const ref = useBlurOnFulfill({ secretCode, cellCount: CELL_COUNT });
  const [secretCode, setSecretCode] = useState('');
  const [timer, setTimer] = useState(30);
  const [verificationId, setVerificationId] = useState('');

  useEffect(() => {
    if (timer === 0) {
      return;
    }

    setTimeout(() => setTimer(timer - 1), 1000);
  }, [timer]);

  useEffect(() => {
    (async () => {
      try {
        const verificationId = await firebaseAuthService.verifyPhoneNumber(
          phoneNumber
        );
        setVerificationId(verificationId);
      } catch (error) {
        console.log(error.message);
        ToastAndroid.show('Silahkan coba lagi nanti', ToastAndroid.LONG)
      }
    })();

    return () => {
      setVerificationId('');
      setSecretCode('');
    };
  }, []);

  async function onPressHandler() {
    ToastAndroid.show('Verifikasi...', ToastAndroid.SHORT);
    try {
      await firebaseAuthService.confirmCode(verificationId, secretCode);
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

  const resendCodeHandler = () => {
    (async () => {
      try {
        const verificationId = await firebaseAuthService.verifyPhoneNumber(
          phoneNumber
        );
        ToastAndroid.show('Mohon tunggu sebentar', ToastAndroid.LONG)
        setVerificationId(verificationId);
        setTimer(120)
      } catch (error) {
        ToastAndroid.show('Yeah :)', ToastAndroid.LONG);
      }
    })();
  };

  BackHandler.addEventListener('hardwareBackPress', () => {
    props.navigation.pop();
    return true;
  });

  return (
    <KeyboardAvoidingView style={style.container}>
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
            onPress={() => onPressHandler()}
          >
            <View>
              <Text style={style.bottomButtonText}>Verifikasi</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignItems: 'center',
            }}
            disabled={timer > 0}
            onPress={() => resendCodeHandler()}
          >
            <Text
              style={{
                color: '#DDDDDD',
                fontSize: 16,
              }}
            >
              {timer === 0 ? (
                'Kirim Ulang Kode'
              ) : (
                <>
                  <Text>Kirim ulang kode dalam </Text>
                  <Text style={{ color: '#FBB632' }}>{`${timer} `}</Text>
                  <Text>detik</Text>
                </>
              )}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const dimension = Dimensions.get('window');
const dimHeight = dimension.height;

const style = StyleSheet.create({
  container: {
    backgroundColor: '#1F1F1F',
    height: dimHeight,
    // minHeight: '100%,
    flex: 1,
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
    textTransform: 'uppercase',
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
