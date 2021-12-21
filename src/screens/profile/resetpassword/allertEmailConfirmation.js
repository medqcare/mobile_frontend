import React, { useEffect, useState  } from 'react'
import { connect } from 'react-redux'
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
    SafeAreaView,
    Dimensions
} from 'react-native'


//action
import { resetPasswordEmail,resetPasswordPhone, setLoading } from '../../../stores/action'
import ArrowBack from '../../../assets/svg/ArrowBack'
import resetPasswd from './resetPassword'
import { color } from 'react-native-reanimated'
import { ToastAndroid } from 'react-native';
import { Size } from 'react-native-popover-view';

const emailConfirmation = (props) => {
    const { email } = props.navigation.state.params
    const [displayTime, setDisplayTime] = useState(30);
    const [countDown, setCountDown] = useState(true)

    useEffect(() => {
      if (displayTime > 0) {
        setTimeout(() => setDisplayTime(displayTime - 1), 1000);
      } else {
        setCountDown(false)
    }
    });

    function resendEmail(){
        props.resetPasswordEmail(email, null, null, true)
    }

     return(
        <View style={style.container}>

            {/* Back Button */}
            <TouchableOpacity
                onPress={() => navigation.pop()}
            >
                <View style={style.header}>
                    <Image 
                        source= { require ('../../../assets/png/ic_close.png')} 
                        style={style.backButton} 
                    />
                </View>
            </TouchableOpacity>

            <View style={{justifyContent: 'space-between', flex: 1,}}>
                {/* Success Message */}
                <View style={style.successMessageContainer}>
                    <Text style={style.successMessageTopText}>Reset Password Berhasil</Text>
                    <Image
                        style={style.successMessageCheckLogo}
                        source={require('../../../assets/png/ic_checkmark.png')}
                    />
                    <Text style={style.successMessageBottomText}> Kami telah mengirimkan tautan verifikasi ke email {email} </Text>
                    <Text style={style.successMessageBottomText}> Silahkan cek email Anda mengetahui kode untuk mengganti password {email} </Text>

                    {/* Resend Email Info */}
                    {countDown &&
                    <View style={style.resendEmailInfoContainer}>
                        <Text style={style.resendEmailInfoText}>Tidak Menerima Kode</Text>
                        <View style={style.resendEmailInfoSecondsContainer}>
                            <Text style={style.resendEmailInfoText}>Kirim ulang dalam</Text>
                            <Text style={style.resendEmailInfoSecondText}>{displayTime}</Text>
                            <Text style={style.resendEmailInfoText}>detik</Text>
                        </View>
                    </View>
                    }
                </View>

                {/* Resend email button */}
                <View>
                    <View style={style.bottomButtonContainer}>
                        {!countDown &&
                            <TouchableOpacity
                                disabled={countDown ? true : false}
                                style={style.bottomButton}
                                onPress={() => resendEmail()}
                            >   
                            <View>                               
                                <Text style={style.bottomButtonText}>Kirim Ulang Kode</Text>
                            </View>   
                            </TouchableOpacity>
                        }
                    </View>
                    <View style={style.bottomButtonContainer}>
                        <TouchableOpacity
                            style={{...style.bottomButton, marginTop: 0}}
                            onPress={() => props.navigation.navigate('InputSecretCode', { email})}
                        >   
                        <View>                               
                            <Text style={style.bottomButtonText}>Masukan kode</Text>
                        </View>   
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </View> 


     )
}

const dimension = Dimensions.get("window")
const dimHeight = dimension.height

const style = StyleSheet.create({
    container:{
        backgroundColor: '#1F1F1F',
        height: dimHeight,
    },

    header:{
        marginLeft: 10,
        marginTop: 40
    },

    backButton: {
        marginLeft: 10,
        width: 20,
        height: 20
    },

    successMessageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 54
    },

    successMessageTopText: {
        color:'#FBB632',
        fontSize:20,

    },

    successMessageCheckLogo: {
        marginTop:35, 
        height: 83,
        width: 90
    },

    successMessageBottomText: {
        textAlign: 'center',
        color:'#A2A2A2',
        fontSize:15,
        fontWeight:'400',
        marginTop:32,
        width: '80%'
    },

    resendEmailInfoContainer: {
        paddingTop: 35,
        justifyContent: 'center',
        alignItems: 'center'
    },

    resendEmailInfoText: {
        color:'#A2A2A2',
    },

    resendEmailInfoSecondsContainer: {
        flexDirection: 'row',
        paddingTop: 16,
        justifyContent: 'center',
        alignItems: 'center'
    },

    resendEmailInfoSecondText: {
        paddingHorizontal: 8,
        color:'#FBB632',
    },

    bottomButtonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 15,
    },

    bottomButtonText: {
        fontSize:16,
        color:'#00FFEC'
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
        marginHorizontal:10
    },   

    textTitle:{
        color:'#FBB632',
        fontStyle:'normal',
        fontSize:20,
        textAlign:'center',
        position:'absolute',
        fontWeight:'600',
        left:'25%',
        top:80,
        lineHeight:30
    },
    image:{
        top:60,
        marginLeft:10,
        width: 90, 
        height: 83,
        left:'37%',
        marginTop:30, 
    },
    textConfirmation:{
        color:'#A2A2A2',
        fontSize:17,
        fontWeight:'400',
        textAlign:'center',
        marginHorizontal:'9%',
        marginTop:100
    },
    textAllert:{
        color:'#A2A2A2',
        fontSize:17,
        fontWeight:'400',
        textAlign:'center',
        marginHorizontal:'9%',
        marginTop:10
    },
    textAllertAction:{
        color:'#A2A2A2',
        fontSize:15,
        fontWeight:'400',
        textAlign:'center',
        marginHorizontal:'9%',
        marginTop:180
    },
    buttonCode:{
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
        marginHorizontal:10
      },
})

const mapStateToProps = state => {
    return state
}

const mapDispatchToProps = {
    resetPasswordEmail
}

export default connect(mapStateToProps, mapDispatchToProps)(emailConfirmation)