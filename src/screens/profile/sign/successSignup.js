import React, { useEffect, useState  } from 'react'
import { connect } from 'react-redux'
import { resendConfirmationEmail } from '../../../stores/action'
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
    SafeAreaView
} from 'react-native'


//action

const mapStateToProps = state => {
    return state
}

const mapDispatchToProps = {
    resendConfirmationEmail
}

const SuccessSignUp = ({navigation, resendConfirmationEmail}) => {
    const [displayTime, setDisplayTime] = useState(30);
    const [countDown, setCountDown] = useState(true)
    const [timeCreated, setTimeCreated] = useState(new Date())
    const { email } = navigation.state.params

    useEffect(() => {
        console.log('Current second:', displayTime)
        console.log('current countdown value', countDown)
      if (displayTime > 0) {
        setTimeout(() => setDisplayTime(displayTime - 1), 1000);
      } else {
        setCountDown(false)
    }
    });

    // Resend button function
    function resendEmail(){
        setCountDown(true)
        setDisplayTime(30)
        resendConfirmationEmail(email)
    }

     return(
        <View style={style.container}>

            {/* Back button */}
            <TouchableOpacity
                onPress={() => navigation.navigate('SignIn')}
            >
                <View style={style.header}>
                    <Image 
                        source= { require ('../../../assets/png/ic_close.png')} 
                        style={style.backButton} 
                    />
                </View>
            </TouchableOpacity>

            <View style={{justifyContent: 'space-between', flex: 1}}>
                {/* Success Message */}
                <View style={style.successMessageContainer}>
                    <Text style={style.successMessageTopText}>Pendaftaran Berhasil</Text>
                    <Image
                        style={style.successMessageCheckLogo}
                        source={require('../../../assets/png/ic_checkmark.png')}
                    />
                    <Text style={style.successMessageBottomText}> Silahkan cek email Anda untuk melakukan verifikasi akun </Text>

                {/* Resend Email Info     */}
                <View style={style.resendEmailInfoContainer}>
                    <Text style={style.resendEmailInfoText}>Tidak Menerima Kode</Text>
                    {countDown &&
                        <View style={style.resendEmailInfoSecondsContainer}>
                                    <Text style={style.resendEmailInfoText}>Kirim ulang dalam</Text>
                                    <Text style={style.resendEmailInfoSecondText}>{displayTime}</Text>
                                    <Text style={style.resendEmailInfoText}>detik</Text>
                        </View>
                    }
                </View>
                </View>
                    {/* <Text style={style.textAllertAction}> Tidak mendapatkan email verifikasi? </Text> */}

                {/* Resend email button */}
                <View style={style.bottomButtonContainer}>
                    <TouchableOpacity
                        disabled={countDown ? true : false}
                        style={style.bottomButton}
                        onPress={() => resendEmail()}
                    >   
                    <View>                               
                        <Text style={style.bottomButtonText}>Kirim Ulang Kode</Text>
                    </View>   
                    </TouchableOpacity>
                </View>
            </View>
        </View> 


     )
}

const style = StyleSheet.create({
    container:{
        backgroundColor: '#1F1F1F',
        minHeight: '100%'
    },

    header:{
        marginLeft:10,
        flexDirection:'row',
        marginTop:40 
    },

    backButton: {
        marginLeft:10,
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
        paddingBottom: 15
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
})


export default connect(mapStateToProps, mapDispatchToProps)(SuccessSignUp)

// import React, {useEffect, useState} from 'react'
// import { StyleSheet, Text, View } from 'react-native'

// const successSignup = (props) => {
    
//     // useEffect(() => {
//     //     console.log('Set timeout called')
//     //     // redirect()
//     //     setTimeout(() => {
//     //         console.log('Navigating to sign in page...')
//     //         navigation.navigate('SignIn')
//     //     }, 4000);
//     // }, [])

//     return (
//         <View style={styles.container}>
//             <Text>success sign up, {'\n'}please confirm email to continue registration</Text>
//         </View>
//     )
// }

// export default successSignup

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center'
//     }
// })
