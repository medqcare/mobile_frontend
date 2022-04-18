import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ActivityIndicator,
  ToastAndroid,
  BackHandler,
} from 'react-native';
import { connect } from 'react-redux';
import { credentialCheck, addNewUser } from '../../stores/action';

import { LinearGradient } from 'expo-linear-gradient'; // Made for background linear gradient
import Feather from 'react-native-vector-icons/Feather'; // Made for password visibility
import formatPhoneNumber from '../../helpers/formatPhoneNumber';

const mapDispatchToProps = {
  credentialCheck,
  addNewUser,
};
const mapStateToProps = (state) => {
  return state;
};

const SignUpScreen = (props) => {
  const [credential, setCredential] = useState({
    phoneNumber: '',
    password: '',
    confirmationPassword: '',
    email: '',
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [isConfirmationPasswordVisible, setIsConfirmationPasswordVisible] =
    useState(true);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorConfirmationPassword, setErrorConfirmationPassword] =
    useState(false);
  const [errorPhoneNumber, setErrorPhonenNumber] = useState(false);

  const { signUpisRegistered, signUpIsLoading, signUpError } = props.entryReducer

  const checkPasswordMatch = (password, confirmationPassword) => {
    return password === confirmationPassword;
  };

  const checkPasswordValid = (password) => {
    return password.length >= 6;
  };

  const checkPhoneNumberValid = (phoneNumber) => {
    const firstCharacter = phoneNumber[0];

    if (firstCharacter === '+') {
      return phoneNumber.slice(0, 4) === '+628';
    }

    if (firstCharacter === '6') {
      return phoneNumber.slice(0, 3) === '628';
    }

    if (firstCharacter === '0') {
      return phoneNumber.slice(0, 2) === '08';
    }

    return false;
  };

  const checkEmailValid = (email) => {
    const pattern =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(email.toLowerCase());
  };

  const payloadValidation = () => {
    const { email, phoneNumber, password, confirmationPassword } = credential;

    const isEmailValid = checkEmailValid(email);
    const isPhoneNumberValid = checkPhoneNumberValid(phoneNumber);
    const isPasswordValid = checkPasswordValid(password);
    const isPasswordMatch = checkPasswordMatch(password, confirmationPassword);

    if (!isEmailValid) {
      setErrorEmail(true);
    } else {
      setErrorEmail(false);
    }

    if (!isPhoneNumberValid) {
      setErrorPhonenNumber(true);
    } else {
      setErrorPhonenNumber(false);
    }
    if (!isPasswordValid) {
      setErrorPassword(true);
    } else {
      setErrorPassword(false);
    }

    if (!isPasswordMatch) {
      setErrorConfirmationPassword(true);
    } else {
      setErrorConfirmationPassword(false);
    }

    const isPayloadValid =
      isPhoneNumberValid && isEmailValid && isPasswordValid && isPasswordMatch;

    if (!isPayloadValid) {
      return false;
    } else {
      setErrorConfirmationPassword(false);
      setErrorPassword(false);
      setErrorPhonenNumber(false);
      setErrorEmail(false);
      return true;
    }
  };

  const onTextChangeHandler = (key, value) => {
    setCredential({ ...credential, [key]: value });
  };

  const onSubmitHandler = async () => {
    const validationResult = payloadValidation();
    console.log(validationResult, 'this is validator result');
    if (validationResult === false) {
      return;
    }

    try {
      const phoneNumber = formatPhoneNumber(credential.phoneNumber);
      const email = credential.email;
      const credentialCheckPayload = {
        phoneNumber,
        email
      }
    
      const { isEmailExist, isPhoneExist } = await props.credentialCheck(credentialCheckPayload)

      if (isEmailExist) {
        ToastAndroid.show('Email sudah terdaftar', ToastAndroid.LONG);
        return;
      }

      if (isPhoneExist) {
        ToastAndroid.show('Nomor Hp sudah terdaftar', ToastAndroid.LONG);
        return;
      }

      const addNewUserPayload = {
        email: credential.email,
        password: credential.password,
        phoneNumber: phoneNumber,
      };

      props.navigation.navigate('InputSecretCodeOTP', {
        phoneNumber,
        backTo: 'SignUp',
        onSuccess: async () => {
          await props.addNewUser(addNewUserPayload, props.navigation);
        },
      });

    } catch (error) {
      console.log(error.message);
      ToastAndroid.show(`Error`, ToastAndroid.LONG);
    } 
  };

  BackHandler.addEventListener('hardwareBackPress', () => {
    props.navigation.pop();
    return true;
  });

  return (
    <LinearGradient colors={['#243555', '#00514B']}>
      <KeyboardAvoidingView
        style={styles.container}
        enabled={false}
        behavior={'height'}
      >
        <Image
          style={styles.topVector}
          source={require('../../assets/png/VectorTop.png')}
        />
        <Image
          style={styles.logoMedQCare}
          source={require('../../assets/png/LogoMedQCare.png')}
        />
        <View style={styles.inputContainer}>
          <View style={styles.action}>
            <TextInput
              placeholder="Email"
              placeholderTextColor="#8b8b8b"
              style={styles.textInput}
              autoCapitalize="none"
              keyboardType={'email-address'}
              autoFocus={true}
              onChangeText={(text) => onTextChangeHandler('email', text)}
            />
          </View>

          {errorEmail && (
            <Text style={styles.errorMessage}>Email tidak valid</Text>
          )}

          <View style={styles.action_below}>
            <TextInput
              placeholder="Nomor Hp"
              placeholderTextColor="#8b8b8b"
              style={styles.textInput}
              autoCapitalize="none"
              keyboardType={'number-pad'}
              onChangeText={(value) =>
                onTextChangeHandler('phoneNumber', value)
              }
            />
          </View>

          {errorPhoneNumber && (
            <Text style={styles.errorMessage}>Nomor hp tidak valid</Text>
          )}

          <View style={styles.action_below}>
            <TextInput
              placeholder="Password"
              placeholderTextColor="#8b8b8b"
              secureTextEntry={isPasswordVisible ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(text) => onTextChangeHandler('password', text)}
            />
            <TouchableOpacity
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              {isPasswordVisible ? (
                <Feather name="eye-off" size={20} color="grey" />
              ) : (
                <Feather name="eye" size={20} color="grey" />
              )}
            </TouchableOpacity>
          </View>
          {errorPassword && (
            <Text style={styles.errorMessage}>
              Password minimal 6 karakter
            </Text>
          )}
          <View style={styles.action_below}>
            <TextInput
              placeholder="Konfirmasi Password"
              placeholderTextColor="#8b8b8b"
              secureTextEntry={isConfirmationPasswordVisible ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(text) =>
                onTextChangeHandler('confirmationPassword', text)
              }
            />
            <TouchableOpacity
              onPress={() =>
                setIsConfirmationPasswordVisible(!isConfirmationPasswordVisible)
              }
            >
              {isConfirmationPasswordVisible ? (
                <Feather name="eye-off" size={20} color="grey" />
              ) : (
                <Feather name="eye" size={20} color="grey" />
              )}
            </TouchableOpacity>
          </View>
          {errorConfirmationPassword && (
            <Text style={styles.errorMessage}>Password tidak cocok</Text>
          )}
          <TouchableOpacity
            style={styles.button}
            onPress={() => onSubmitHandler()}
            disabled={signUpIsLoading}
          >
            {signUpIsLoading ? (
              <ActivityIndicator size="small" color="#FFF" />
            ) : (
              <Text style={styles.buttonText}>Daftar</Text>
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.elipse}>
          <Image source={require('../../assets/png/Image.png')} />
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  topVector: {
    width: '100%',
    height: 100,
  },
  logoMedQCare: {
    marginBottom: 30,
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 50,
    marginBottom: 100,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#506A79',
    paddingBottom: 5,
  },
  action_below: {
    flexDirection: 'row',
    marginTop: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#506A79',
    paddingBottom: 7,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#FFF',
  },
  errorMessage: {
    color: '#ef4444',
    alignSelf: 'flex-start',
    marginVertical: 6,
    paddingLeft: 12,
    fontSize: 12,
  },
  button: {
    width: '85%',
    height: 57,
    marginTop: 50,
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
  },
  buttonText: {
    color: '#00FFEC',
    fontSize: 16,
  },
  elipse: {
    width: '100%',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);
