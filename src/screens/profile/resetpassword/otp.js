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
    SafeAreaView
} from 'react-native'

import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 
'react-native-confirmation-code-field';

//action
import { resetPasswordEmail,resetPasswordPhone, setLoading } from '../../../stores/action'
import ArrowBack from '../../../assets/svg/ArrowBack'
import resetPasswd from './resetPassword'
import { color } from 'react-native-reanimated'
import { ToastAndroid } from 'react-native';
import { Size } from 'react-native-popover-view';



const CELL_COUNT = 4


const otpp = (props) => {
        
    const [load, setLoad ] = useState(false)
    const [valid, setValid] = useState(false)
        //to start resent otp option
        // const startResendOtpTimer = () => {W
        //     if (resendOtpTimerInterval) {
        //         clearInterval(resendOtpTimerInterval);
        //     }
        //     resendOtpTimerInterval = setInterval(() => {
        //         if (resendButtonDisabledTime <= 0) {
        //             clearInterval(resendOtpTimerInterval);
        //         } else {
        //             setResendButtonDisabledTime(resendButtonDisabledTime - 1);
        //         }
        //     }, 1000);
        // };

        
        //on click of resend button
        // const onResendOtpButtonPress = () => {
        //     //clear input field
        //     setValue('')
        //     setResendButtonDisabledTime(RESEND_OTP_TIME_LIMIT);
        //     startResendOtpTimer();

        //     // resend OTP Api call
        //     // todo
        //     console.log('todo: Resend OTP');
        // };

        
        //declarations for input field
        // const [value, setValue] = useState('');
        // const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
        // const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        //     value,
        //     setValue,
        // });

        //start timer on screen on launch
        // useEffect(() => {
        //     startResendOtpTimer();
        //     return () => {
        //         if (resendOtpTimerInterval) {
        //             clearInterval(resendOtpTimerInterval);
        //         }
        //     };
        // }, [resendButtonDisabledTime]);
    

    const phoneNumber = props.navigation.state.params.data.phoneNumber
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
    // const [ getCellOnLayoutHandler] = useClearByFocusCell({
    //   value,
    //   setValue,
    // });
    const [seconds, setSeconds] = React.useState(30);
    
  React.useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      setSeconds('0');
    }
  });


    return (

        <View style={style.container}>
           
            <TouchableOpacity 
                onPress={() => props.navigation.pop()}> 
                <View style={style.base}>
                    <Image source= { require ('../../../assets/png/ic_close.png')} style={{marginLeft:10,width: 20, height: 20}} />
                </View>
            </TouchableOpacity> 
             
            <View >
                <View >
                    <Text style={style.text}>Verifikasi OTP</Text>
                    <Text style={style.textDesc}> Masukan kode verifikasi yang dikirimkan ke nomer </Text>
                    <Text style={style.textNumber}> {phoneNumber} </Text>
                    <TouchableOpacity
                        onPress={() => props.navigation.pop()}
                    >
                        <Text style={style.textEdit} > Ubah Nomor</Text>
                    </TouchableOpacity>
                    <View >

                    <CodeField
                        ref={ref}
                        {...props}
                        value={value}
                        onChangeText={setValue}
                        cellCount={CELL_COUNT}
                        rootStyle={style.codeFieldRoot}
                        keyboardType={'numeric'}
                        textContentType="oneTimeCode"
                        renderCell={({index, symbol, isFocused}) => (
                      <View
                        // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
                        // onLayout={getCellOnLayoutHandler(index)}
                            key={index}
                            style={[style.cellRoot, isFocused && style.focusCell]}>
                            <Text style={style.cellText}>
                            {symbol || (isFocused ? <Cursor /> : null)}
                            </Text>
                      </View>
                          )}
                       />
                    </View>
                        <Text style={style.notCode} > Tidak menerima kode? </Text>
                       
                        
                        {seconds >  0 ?(
                        <View style={{flexDirection:'row',alignSelf:'center'}}>
                        <Text style={style.timeCode} > Kirim ulang dalam   </Text>
                        <Text style={style.timeCode2}> {seconds} </Text>
                        <Text style={style.timeCode} > detik   </Text>
                        </View> 
                        
                        ):(
                            <TouchableOpacity>    
                            <Text style={style.timeCode}>Kirim Ulang Kode</Text>
                            </TouchableOpacity>
                        )   
                        }
                       
                        <View>
                        <TouchableOpacity 
                        style={style.buttonCode}

                      
                         >
                        <View>
                          
                               
                                <Text style={{fontSize:16,color:'#00FFEC'}}>Kirim Kode</Text>
                            
                        </View>   
                       
                    </TouchableOpacity>
                        </View>
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
    base:{
        marginLeft:10,
        flexDirection:'row',
        marginTop:40 
    },
    text:{
        color:'#DDDDDD',
        fontWeight:'600',
        fontSize:26,
        textAlign:'center',
        top:29,
        marginHorizontal:'30%',
        position:'absolute',
        lineHeight: 29,
        textAlign:'center',
        fontStyle:'normal'
    },
    textDesc:{
        fontWeight:'normal',
        color:'#DDDDDD',
        left:'15%',
        marginTop:70,
        fontSize:13,
        textAlign:'center',
        position:'absolute'
    },
    textNumber:{
        color:'#DDDDDD',
        fontWeight:'600',
        fontStyle:'normal',
        marginTop:90,
        lineHeight:35,
        textAlign: 'center',
        fontSize:18
    },
    textEdit:{
        color:'#FBB632',
        fontSize: 14,
        textAlign:'center',
        lineHeight:20,
        fontWeight:'normal',
        fontStyle:'normal',
    },
    inputWrapper:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput:{
        width: '80%',
        height: 200,
        color: 'black'
    },
      codeFieldRoot: {
        marginTop: 70,
        width: 330,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
      cellRoot: {
        width: 70,
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
      notCode:{
          color:'#A2A2A2',
          fontSize:12,
          marginTop:40,
          textAlign:'center'
      },
      timeCode:{
        color:'#A2A2A2',
        fontSize:13,
        marginTop:20,
        textAlign:'center'
      },
      timeCode2:{
        color:'#FBB632',
        fontSize:13,
        marginTop:20,
        textAlign:'center'
      },
      buttonCode:{
        width: '95%',
		height: 50,
		marginTop: '35%',
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
      resendCode: {
        color: 'blue',
        marginStart: 20,
        marginTop: 40,
    },
    resendCodeText: {
        marginStart: 20,
        marginTop: 40,
    },
    resendCodeContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})

export default otpp