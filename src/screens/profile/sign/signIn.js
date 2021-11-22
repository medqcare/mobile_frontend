import React, {useState, useEffect} from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	TextInput,
	CheckBox,
	ImageBackground,
	KeyboardAvoidingView,
	BackHandler,
	ActivityIndicator,
	ToastAndroid,
	Image,
} from 'react-native';
import {connect} from 'react-redux';
import IconFontA from 'react-native-vector-icons/FontAwesome5';
// import PushNotification from 'react-native-push-notification';

import Feather from 'react-native-vector-icons/Feather' // Made for password visibility

import {LinearGradient} from 'expo-linear-gradient'; // Made for background linear gradient

import {
	changeLogin,
	SignIn,
	SignInGoogle,
	setLoading,
} from '../../../stores/action';
// import {GoogleSignin} from '';
// import firebase, {messaging} from '@react-native-firebase/app';

const mapDispatchToProps = {
	setLoading,
	changeLogin,
	SignIn,
	SignInGoogle,
};
const mapStateToProps = state => {
	return state;
};

const validateEmail = input => {
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(input).toLowerCase());
};

const signIn = props => {
	// console.log(props)
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [firebaseNotificationToken, setToken] = useState(null)
	const [checked, setChecked] = useState(false);
	const [load, setload] = useState(false);
	const [secureTextEntry, setSecureTextEntry] = useState(true)

	useEffect(() => {
		// console.log(props.navigation.state.params, 'ini adalah params yang dikirim dari tab button')
	// PushNotification.configure({
	// 	onRegister: function(token) {
	// 	setToken(token.token)
	// 	},
	// });
	}, []);

	function CekValidation() {
		if (!validateEmail(email) || password.length == 0) {
			ToastAndroid.show(
				'Please enter email and password !',
				ToastAndroid.SHORT,
			);
		} else {
			const navigateTo = props.navigation.state?.params?.navigateTo ? props.navigation.state?.params?.navigateTo : null
			setload(true);
			props.SignIn(
				{
					email,
					password,
					firebaseNotificationToken
				},
				props.navigation,
				modalFalse,
				navigateTo
			);
		}
	}

	const updateSecureTextEntry = () => {
		setSecureTextEntry(!secureTextEntry)
	}

	function modalFalse(_message) {
		setload(false);
		ToastAndroid.show(_message, ToastAndroid.SHORT);
	}

	useEffect(() => {
		// GoogleSignin.configure({
		// 	// scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
		// 	webClientId:
		// 		'222408999452-o7kis5ujt3sacau3iplrhr9ptqhn3jr5.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
		// 	offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
		// 	hostedDomain: '', // specifies a hosted domain restriction
		// 	loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
		// 	forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
		// 	accountName: '', // [Android] specifies an account name on the device that should be used
		// 	// iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
		// });
	}, []);

	// const googleLogin = async () => {
	// 	console.log('ini masuk sini');
	// 	try {
	// 		console.log('masuk try');
	// 		// add any configuration settings here:
	// 		// await GoogleSignin.hasPlayServices();
	// 		const userInfo = await GoogleSignin.signIn();
	// 		const data = await GoogleSignin.getTokens({
	// 			idToken: 'string',
	// 			accessToken: 'string',
	// 		});
	// 		console.log('ini user info', userInfo.serverAuthCode);
	// 		console.log('ini id token ', data);

	// 		// create a new firebase credential with the token
	// 		const credential = firebase.auth.GoogleAuthProvider.credential(
	// 			userInfo.idToken,
	// 			userInfo.accessToken,
	// 		);
	// 		// login with credential
	// 		const firebaseUserCredential = await firebase
	// 			.auth()
	// 			.signInWithCredential(credential);

	// 		console.log(await firebaseUserCredential.user.getIdToken(), 'ini sudah');
	// 		let tokenDikirim = await firebaseUserCredential.user.getIdToken();

	// 		props.SignInGoogle(tokenDikirim, props.navigation);
	// 		// console.warn(JSON.stringify(firebaseUserCredential.user.toJSON()));
	// 	} catch (e) {
	// 		setLoading(false);
	// 		console.log(e, 'ini error google');
	// 		console.error(e);
	// 	}
	// };

	BackHandler.addEventListener('hardwareBackPress', () => {
		props.navigation.navigate('Home');
		return true;
	});

  return (
    <LinearGradient colors={['#243555', '#00514B']}>
		<KeyboardAvoidingView
			style={viewStyles.container}
			enabled={false}
			behavior={'height'}>
			{/* 4 lines of code below are from the previous design */}
			{/* <ImageBackground
			// source={require('../../../assets/Login-Background-Pattern.png')}
			style={viewStyles.background}
			/> */}
		<Image
			style={viewStyles.topVector}
			source={require('../../../assets/png/VectorTop.png')}
		/>
        <Image
			style={viewStyles.logoMedQCare}
			source={require('../../../assets/png/LogoMedQCare.png')}
     	/>
        <View style={viewStyles.inputContainer}>
			<View style={viewStyles.action}>
				<TextInput
					placeholder="Username / Email"
					placeholderTextColor="#8b8b8b"
					style={viewStyles.textInput}
					autoCapitalize="none"
					onChangeText={text => setEmail(text)}
				/>
			</View>
			<View style={viewStyles.action_below}>
				<TextInput
					placeholder="Password"
					placeholderTextColor="#8b8b8b"
					secureTextEntry={secureTextEntry ? true : false}
					style={viewStyles.textInput}
					autoCapitalize="none"
					onChangeText={text => setPassword(text)}

				/>
				<TouchableOpacity
					onPress={updateSecureTextEntry}
				>
					{secureTextEntry ? 
					<Feather
						name="eye-off"
						size={20}
						color="grey"
					/>
					: <Feather
					name="eye"
					size={20}
					color="grey"
				/>}
				</TouchableOpacity>
			</View>
			
			<View style={viewStyles.forgotPassword}>
        		<TouchableOpacity
					onPress={() => props.navigation.navigate('ResetPassword')}
				>
					<Text style={viewStyles.forgotPasswordText}>Lupa password?</Text>
				</TouchableOpacity>
			</View>

          	<TouchableOpacity
				onPress={() => {
				CekValidation();
				}}
				style={viewStyles.button}>
				{load ? 
					( <ActivityIndicator size="small" color="#FFF" />) 
					: 
					( <Text style={style.buttonText}>Masuk</Text> )
				}
			</TouchableOpacity>
        </View>
		<View style={style.callToAction}>
			<Text style={style.callToActionText}>Belum punya akun?</Text>
			<TouchableOpacity
				onPress={() => props.navigation.navigate('Undefined')}	
			>
				<Text style={{...style.callToActionText, fontWeight: 'bold', paddingLeft: 5}}>Daftar</Text>
			</TouchableOpacity>
		</View>

		{/* <View style={{paddingVertical: 10}}/>
		
        <View style={style.bottom_buttons}>
          <View style={style.separator} />
          <View style={style.or}>
            <Text> Atau sign in dengan  </Text>
          </View>
          <View style={style.sso}>
            <TouchableOpacity
              onPress={() => googleLogin()}
              style={{...style.logo, backgroundColor: 'red'}}>
              <IconFontA name={'google'} size={45} color={'white'} />
            </TouchableOpacity>
          </View>
        </View> */}

		{/* Foto di bawah belom ditambahin dan belom ada punch in hole */}

		<View style={viewStyles.elipse}>
			<Image
				source={require('../../../assets/png/Image.png')}
			/>
		</View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const style = StyleSheet.create({
	logoContainer: {
		width: 100,
		height: 100,
		borderRadius: 80,
		backgroundColor: 'grey',
		marginVertical: 20,
	},
	emailTitle: {
		color: '#3C9D9B',
		fontWeight: 'normal',
		fontSize: 11,
		alignSelf: 'flex-start',
		marginLeft: '8%',
		position: 'relative',
		top: '5%',
	},
	passwordTitle: {
		color: '#3C9D9B',
		fontWeight: 'normal',
		fontSize: 11,
		alignSelf: 'flex-start',
		marginLeft: '8%',
		position: 'relative',
		bottom: '10%',
	},
	buttonText: {
		color: '#00FFEC',
		fontSize: 16,
	},
	callToAction: {
		flexDirection: 'row',
	},
	callToActionText: {
		color: '#fff'
	},
	separator: {
		height: 10,
		width: '100%',
		borderBottomWidth: 1,
		borderBottomColor: 'white',
		position: 'absolute',
		paddingTop: 20
	},
	or: {
		paddingHorizontal: 15,
		height: 40,
		width: '40%',
		borderRadius: 20,
		position: 'relative',
		zIndex: 2,
		backgroundColor: '#FFF',
		alignItems: 'center',
		paddingTop: 10
	},
	sso: {
		marginVertical: '5%',
		flexDirection: 'row',
	},
	logo: {
		width: 70,
		height: 70,
		borderRadius: 60,
		marginHorizontal: 20,
		alignItems: 'center',
		justifyContent: 'center',
	},
	bottom_buttons: {
		width: '85%', 
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-evenly',
	},
	linktoregister: {
		flexDirection: 'column',
		marginBottom: 20,
	},
	registerhere: {
		color: '#3C9D9B',
	},
});

const viewStyles = StyleSheet.create({
	container: {
		minHeight: '100%',
		alignItems: 'center',
		justifyContent: 'flex-start'
	},
	input: {
		width: '85%',
		height: 50,
		marginVertical: 15,
		backgroundColor: 'white',
		paddingHorizontal: 20,
		borderRadius: 3,
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
	forgotPassword: {
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'flex-end',
		paddingTop: 5
	},

	forgotPasswordText: {
		color: '#fff',
		fontStyle: 'italic'
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
	background: {
		width: '100%',
		height: '85%',
		position: 'absolute',
		top: -2,
		opacity: 0.2,
	},

	topVector: {
		width: '100%',
		height: 150
	},
  	elipse: {
		width: '100%',
		height: '100%',
  	},

	logoMedQCare: {
		marginTop: 10
	}
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(signIn);

// The lines of code below are from the previous design
{/* <TextInput
            style={viewStyles.input}x
            autoCapitalize={'none'}
            placeholder={'Username / Email'}
            keyboardType={'email-address'}
            onChangeText={text => setEmail(text)}
            value={email}
          />
          <TextInput
            style={viewStyles.input}
            secureTextEntry={true}
            autoCapitalize={'none'}
            placeholder={'Password'}
            onChangeText={text => setPassword(text)}
            value={password}
          />
           <View style={{ marginBottom: '10%', alignSelf: 'flex-start', paddingHorizontal: '15%', flexDirection: 'row', alignItems: 'center' }}>
                      <CheckBox
                          value={checked}
                          onValueChange={() => setChecked(!checked)}
                      />
                      <Text>Remember password</Text>
                  </View> */}