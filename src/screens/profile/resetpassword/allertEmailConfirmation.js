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


//action
import { resetPasswordEmail,resetPasswordPhone, setLoading } from '../../../stores/action'
import ArrowBack from '../../../assets/svg/ArrowBack'
import resetPasswd from './resetPassword'
import { color } from 'react-native-reanimated'
import { ToastAndroid } from 'react-native';
import { Size } from 'react-native-popover-view';

const emailConfirmation = (props) => {
    const emailConfirm = props.navigation.state.params.data.emailConfirm
    console.log('Ini data wait',emailConfirm)
     return(
        <View style={style.container}>
            <TouchableOpacity
                onPress={() => props.navigation.pop()}
            >
            <View style={style.base}>
            <Image source= { require ('../../../assets/png/ic_close.png')} style={{marginLeft:10,width: 20, height: 20}} />
            </View>
            </TouchableOpacity>
            
                <Text style={style.textTitle}>Reset Password Berhasil</Text>
                <Image style={style.image} source= { require ('../../../assets/png/ic_checkmark.png')} />
                <Text style={style.textConfirmation}> Kami telah mengirimkan tautan verifikasi ke email {emailConfirm} </Text>
                <Text style={style.textAllert}> Silahkan cek email Anda untuk melakukan verifikasi akun </Text>
                <Text style={style.textAllertAction}> Tidak mendapatkan email verifikasi? </Text>
           <View>
             <TouchableOpacity
             style={style.buttonCode}
             >   
             <View>                               
                <Text style={{fontSize:16,color:'#00FFEC'}}>Kirim Ulang Email</Text>
             </View>   
             </TouchableOpacity>
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


export default emailConfirmation