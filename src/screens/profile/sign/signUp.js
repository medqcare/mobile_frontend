import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  CheckBox,
  Alert,
  StatusBar,
  ActivityIndicator,
  ToastAndroid
} from 'react-native';
import { connect } from 'react-redux';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { setLoading, SignUp } from '../../../stores/action';
import SettingModal from '../../../components/modals/setModal';
// import PushNotification from 'react-native-push-notification';

import { LinearGradient } from 'expo-linear-gradient'; // Made for background linear gradient
import Feather from 'react-native-vector-icons/Feather' // Made for password visibility



const mapDispatchToProps = {
  setLoading,
  SignUp,
};
const mapStateToProps = state => {
  return state;
};

const signUp = props => {
  const [load, setload] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordValidation, setConfirmPasswordValidation] = useState(false)
  const [signUpData, setSignUpData] = useState({
    email: '',
    password: '',
    firebaseNotificationToken: 'false'
  });
	const [secureTextEntry, setSecureTextEntry] = useState(true)
	const [confirmSecureTextEntry, setConfirmSecureTextEntry] = useState(true)
	const updateSecureTextEntry = () => {
		setSecureTextEntry(!secureTextEntry)
	}
	const updateConfirmSecureTextEntry = () => {
		setConfirmSecureTextEntry(!confirmSecureTextEntry)
	}
	function changeData(field, value) {
		if(field !== 'confirmPassword'){
			setSignUpData({ ...signUpData, [field]: value });
		}
		else if(field === 'confirmPassword'){
			setConfirmPassword(value)
		}

	  }

  const validateEmail = input => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(input).toLowerCase());
  };
  
  function validatePassword(input) {
    if ((input === confirmPassword && input == '') || input.length < 6) {
      return true
	} else {
      return false
    }
  }

	function validateConfirmPassword(input){
		if(input !== signUpData.password){
			return true
		} else {
			return false
		}
	}

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


  function setModalFalse(_message) {
    setMessage(_message);
    setLoading(false);
    setModalF(true);
  }

  function Finalvalidation() {
    console.log(signUpData.password, 'ini pass', signUpData.email);
    if (signUpData.email == '' || signUpData.password == '' || confirmPassword == '') {
		ToastAndroid.show(
			'Please enter all necessary data',
			ToastAndroid.SHORT
		)
    } else if (
		signUpData.email !== '' &&
		validateEmail(signUpData.email) == false
		) {
			ToastAndroid.show(
				'Invalid email format',
				ToastAndroid.SHORT
			)
    } 
	else if(
		validatePassword(signUpData.password) == false
	) {
		ToastAndroid.show(
			'Password must be longer than 6 characters',
			ToastAndroid.SHORT
		)
	}
	else if(
		validateConfirmPassword(confirmPassword) == true
	) {
		ToastAndroid.show(
			'Password does not match',
			ToastAndroid.SHORT
		)
	}else {
		console.log(signUpData, 'signUpData');
		props.setLoading(true);
		setload(true)
		props.SignUp(signUpData, props.navigation, setModalFalse);
    }
  }

  return (
  	<LinearGradient colors={['#243555', '#00514B']}>
		  <KeyboardAvoidingView
		  	style={styles.container}
			enabled={false}
			behavior={'height'}
		>
			<Image
				style={styles.topVector}
				source={require('../../../assets/png/VectorTop.png')}
			/>
			<Image
				style={styles.logoMedQCare}
				source={require('../../../assets/png/LogoMedQCare.png')}
			/>
			<View style={styles.inputContainer}>
				<View style={styles.action}>
					<TextInput
						placeholder="Email"
						placeholderTextColor="#8b8b8b"
						style={styles.textInput}
						autoCapitalize="none"
						onChangeText={text => changeData('email', text)}
					/>
				</View>

				<View style={styles.action_below}>
					<TextInput
						placeholder="Password"
						placeholderTextColor="#8b8b8b"
						secureTextEntry={secureTextEntry ? true : false}
						style={styles.textInput}
						autoCapitalize="none"
						onChangeText={text => changeData('password', text)}
					/>
					<TouchableOpacity
						onPress={updateSecureTextEntry}
					>
						{secureTextEntry ? 
						<Feather
							name="eye-off"
							size={20}
							color="grey"
						/> : 
						<Feather
							name="eye"
							size={20}
							color="grey"
						/>}
					</TouchableOpacity>
				</View>
				{
					signUpData.password !== null && signUpData.password.length < 6 && signUpData.password.length > 0 &&
					// signUpData.password.length < 6 && signUpData.password !== '' ? 
					<Text style={styles.errorMessage}>Password must be longer than 6 characters</Text>
				}
				<View style={styles.action_below}>
					<TextInput
						placeholder="Confirm Password"
						placeholderTextColor="#8b8b8b"
						secureTextEntry={confirmSecureTextEntry ? true : false}
						style={styles.textInput}
						autoCapitalize="none"
						onChangeText={text => changeData('confirmPassword', text)}

					/>
					<TouchableOpacity
						onPress={updateConfirmSecureTextEntry}
					>
						{confirmSecureTextEntry ? 
						<Feather
							name="eye-off"
							size={20}
							color="grey"
						/> : 
						<Feather
							name="eye"
							size={20}
							color="grey"
						/>}
					</TouchableOpacity>
				</View>
				{
					confirmPassword !== signUpData.password && confirmPassword !== null &&
					<Text style={styles.errorMessage}>Password does not match</Text>
				}
				<TouchableOpacity
					onPress={() => {
						Finalvalidation();
					}}
					style={styles.button}>
					{load ? 
						( <ActivityIndicator size="small" color="#FFF" />) 
						: 
						( <Text style={styles.buttonText}>Daftar</Text> )
					}
				</TouchableOpacity>
			</View>
			<View style={styles.elipse}>
				<Image
					source={require('../../../assets/png/Image.png')}
				/>
			</View>
			

		  </KeyboardAvoidingView>
	</LinearGradient>

    
  );
};

const styles = StyleSheet.create({
	container: {
		minHeight: '100%',
		alignItems: 'center',
		justifyContent: 'flex-start',
		width: '100%'
	},
	topVector: {
		width: '100%',
		height: 150,
	},
	logoMedQCare: {
		marginTop: 10
	},
	inputContainer: {
		width: '100%',
		alignItems: 'center',
		marginTop: 30,
		paddingHorizontal: 50,
		marginBottom: 20
	},
	action: {
		flexDirection: 'row',
		marginTop: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#f2f2f2',
		paddingBottom: 5,
	},
	action_below: {
		flexDirection: 'row',
		marginTop: 30,
		borderBottomWidth: 1,
		borderBottomColor: '#f2f2f2',
		paddingBottom: 7,
	},
	textInput: {
		flex: 1,
		marginTop: Platform.OS === 'ios' ? 0 : -12,
		paddingLeft: 10,
		color: '#FFF'
	},
	errorMessage: {
		color: 'red',
		paddingTop: 5
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
		height: '100%',
  	},
})

const style = StyleSheet.create({
	scrollView: {
		top: 30,
		backgroundColor: 'white',
		minHeight: '100%',
	},
	container: {
		minHeight: '100%',
		alignItems: 'center',
		justifyContent: 'flex-start'
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


{/* <ScrollView style={style.scrollView}>
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
        </View> */}
        {/* <View style={style.wraper}>
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
        </View> */}
        {/* <View style={style.wraper}> */}
          {/* <TextInput
            ref={input => {
              repasswordInput = input;
            }}
            style={style.input}
            secureTextEntry={true}
            autoCapitalize={'none'}
            placeholder={'Confirm Password'}
            onChangeText={text => setRetype(text)}
            value={confirmPassword}
          /> */}
          {/* {passValidation ? (
            <Text />
          ) : signUpData.password === '' || confirmPassword === '' ? (
            <Text />
          ) : (
                <Text style={{ color: 'red' }}>not same password</Text>
              )} */}
        {/* </View> */}

        {/* <View style={viewStyles.agrement}>
          <View style={style.checkbox}> */}
            {/* <CheckBox 
                        value={checkboxValue}
                        disable={false}
                        onValueChange={() => {
                            setCheckboxValue(!checkboxValue)
                        }}
                        /> */}
            {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text>Agree Apps </Text>
              <TouchableOpacity>
                <Text style={{ color: '#3C9D9B' }}>Term and Contidion</Text>
              </TouchableOpacity>
            </View>
          </View> */}
          {/* <TouchableOpacity
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
        </View> */}
        {/* </KeyboardAvoidingView> */}
      {/* </View>
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
    </ScrollView> */}