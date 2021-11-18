import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  CheckBox,
  Alert,
  StatusBar,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { setLoading, SignUp } from '../../../stores/action';
import SettingModal from '../../../components/modals/setModal';
// import PushNotification from 'react-native-push-notification';

const mapDispatchToProps = {
  setLoading,
  SignUp,
};
const mapStateToProps = state => {
  return state;
};

const signUp = props => {
  const [load, setload] = useState(false);
  const [passValidation, setPassValidation] = useState(false);
  const [retype, setRetype] = useState('');
  const [signUpData, setSignUpData] = useState({
    email: '',
    password: '',
    firebaseNotificationToken: ''
  });
  const [modalF, setModalF] = useState(false);
  const [message, setMessage] = useState('');

  const validateEmail = input => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(input).toLowerCase());
  };

  useEffect(() => {
    // PushNotification.configure({
    //   onRegister: function (token) {
    //     console.log('ini token', token);
    //     setSignUpData({
    //       ...signUpData,
    //       firebaseNotificationToken: token.token
    //     })
    //   },
    // });
  }, []);

  function validationPass() {
    if (signUpData.password === retype && signUpData.password !== '') {
      setPassValidation(true);
    } else {
      setPassValidation(false);
    }
  }
  useEffect(() => {
    validationPass();
  }, [retype, signUpData.password]);

  function changeData(field, value) {
    setSignUpData({ ...signUpData, [field]: value });
  }
  function setModalFalse(_message) {
    setMessage(_message);
    setLoading(false);
    setModalF(true);
  }

  function Finalvalidation() {
    console.log(signUpData.password, 'ini pass', signUpData.email);
    if (signUpData.email == '' || signUpData.password == '' || retype == '') {
      setModalFalse('Please enter the data');
    } else if (
      signUpData.email !== '' &&
      validateEmail(signUpData.email) == false
    ) {
      setModalFalse('Please enter email correctly');
    } else if (
      (signUpData.password.length !== 0 && signUpData.password.length < 6) ||
      !passValidation
    ) {
      setModalFalse('Please enter password correctly');
    } else {
      console.log(signUpData, 'signUpData');
      props.setLoading(true);
      setload(true)
      props.SignUp(signUpData, props.navigation, setModalFalse);
    }
  }

  return (
    <ScrollView style={style.scrollView}>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor={'transparent'}
      />
      <View style={style.container}>
        <Text style={textStyles.header}> SIGN UP </Text>
        <View style={style.wraper}>
          <TextInput
            ref={input => {
              emailInput = input;
            }}
            onSubmitEditing={() => {
              passwordInput.focus();
            }}
            blurOnSubmit={false}
            style={style.input}
            returnKeyType={'next'}
            autoCapitalize={'none'}
            placeholder={'Email'}
            keyboardType={'email-address'}
            onChangeText={text => changeData('email', text)}
            value={signUpData.email}
          />
        </View>
        <View style={style.wraper}>
          <TextInput
            ref={input => {
              passwordInput = input;
            }}
            onSubmitEditing={() => {
              repasswordInput.focus();
            }}
            blurOnSubmit={false}
            style={style.input}
            secureTextEntry={true}
            returnKeyType={'next'}
            autoCapitalize={'none'}
            placeholder={'Password'}
            onChangeText={text => changeData('password', text)}
            value={signUpData.password}
          />
          {signUpData.password.length !== 0 &&
            signUpData.password.length < 6 && (
              <Text style={{ color: 'red' }}>
                Password must contain at least 6 characters
              </Text>
            )}
        </View>
        <View style={style.wraper}>
          <TextInput
            ref={input => {
              repasswordInput = input;
            }}
            style={style.input}
            secureTextEntry={true}
            autoCapitalize={'none'}
            placeholder={'Confirm Password'}
            onChangeText={text => setRetype(text)}
            value={retype}
          />
          {passValidation ? (
            <Text />
          ) : signUpData.password === '' || retype === '' ? (
            <Text />
          ) : (
                <Text style={{ color: 'red' }}>not same password</Text>
              )}
        </View>

        <View style={viewStyles.agrement}>
          <View style={style.checkbox}>
            {/* <CheckBox 
                        value={checkboxValue}
                        disable={false}
                        onValueChange={() => {
                            setCheckboxValue(!checkboxValue)
                        }}
                        /> */}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text>Agree Apps </Text>
              <TouchableOpacity>
                <Text style={{ color: '#3C9D9B' }}>Term and Contidion</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              // console.log(signUpData, ' ini sign up datanyaa,, uhuuyy~~')
              Finalvalidation();
            }}
            style={style.button}>
            {load ? (
              <ActivityIndicator size="small" color="#FFF" />
            ) : (
                <Text style={style.buttonText}>SIGN UP</Text>
              )}
          </TouchableOpacity>
        </View>
        {/* </KeyboardAvoidingView> */}
      </View>
      {modalF && (
        <SettingModal
          _visible={modalF}
          _navigationRight={() => {
            setload(false)
            setModalF(false)
          }}
          _textRight={'OK'}
          _message={message}
          _iconId={'failed'}
        />
      )}
    </ScrollView>
  );
};

const style = StyleSheet.create({
  scrollView: {
    top: 30,
    backgroundColor: 'white',
    minHeight: '100%',
  },
  container: {
    alignItems: 'center',
    width: '100%',
  },
  button: {
    width: wp('70%'),
    height: 47,
    backgroundColor: '#14CB81',
    borderRadius: 30,
    margin: 10,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.23,
    shadowRadius: 6,
    elevation: 4,
  },
  input: {
    width: '100%',
    height: 55,
    backgroundColor: '#e9e9e9',
    borderWidth: 1,
    borderColor: '#82FEBE',
    borderRadius: 3,
    paddingHorizontal: 10,
  },
  name: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  nameInput: {
    backgroundColor: '#e9e9e9',
    borderColor: '#82FEBE',
    borderWidth: 1,
    paddingHorizontal: 10,
    height: 55,
    width: '42%',
    borderRadius: 3,
  },
  nameTitle: {
    color: '#3C9D9B',
    fontWeight: 'normal',
    fontSize: 11,
    alignSelf: 'flex-start',
  },
  wraper: {
    width: '100%',
    paddingHorizontal: '7%',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
  checkbox: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 5,
  },
});

const textStyles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontFamily: 'NuitoSans-Bold',
    marginVertical: 15,
  },
});
const viewStyles = StyleSheet.create({
  hr: {
    borderRadius: 2,
    borderWidth: 1.5,
    // borderBottomWidth: 2,
    borderBottomColor: '#ABABAB',
    width: wp('100%'),
    borderStyle: 'dashed',
    opacity: 0.3,
    marginVertical: 20,
  },
  agrement: {
    borderTopColor: '#00000029',
    borderTopWidth: 1,
    backgroundColor: '#fff',
    width: wp('100%'),
    paddingVertical: hp('3%'),
    alignItems: 'center',
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(signUp);
