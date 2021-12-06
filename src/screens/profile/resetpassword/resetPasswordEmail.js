import React, { useState } from 'react'
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
} from 'react-native'

//action
import { resetPasswordEmail ,resetPasswordPhone, setLoading } from '../../../stores/action'
import ArrowBack from '../../../assets/svg/ArrowBack'
import resetPasswd from './resetPassword'
import { ToastAndroid } from 'react-native';

//mapTopProps
const mapStateToProps = state => {
    return state
}

const mapDispatchToProps = {
    resetPasswordEmail
}

const resetPasswdEmail = (props) => {
    
    BackHandler.addEventListener("hardwareBackPress",()=>{
        props.navigation.pop()
        return true
    })

    const [load, setLoad ] = useState(false)
    const [email, setEmail] = useState('')  

    const validation = () => {
        console.log(email, 'Ini data Email User')
        
        if(email === ''){
            ToastAndroid.show('Mohon untuk mengisi alamat email terlebih dahulu.', ToastAndroid.LONG) 
        }else {
            setLoad(true)
            Finalvalidation(email)
            ToastAndroid.show('MedQCare sedang mengirim email. Mohon menunggu', ToastAndroid.LONG)
        }
    }

    function Finalvalidation(email) {
        setLoad(false)
        props.resetPasswordEmail(email, props.navigation.navigate, 'allertEmail')
    }

        

    return (

        <View style={style.container}>
            <View style={style.content}>
                <TouchableOpacity 
                    onPress={() => props.navigation.navigate('ResetPassword')}> 
                    <View style={{ marginLeft:10,flexDirection:'row',marginTop:40 }}>
                    <ArrowBack/>
                    <Text style={{ marginHorizontal:15,paddingHorizontal:7 ,fontSize: 20, color: '#ffff', position: 'relative', }}> Reset Password</Text>
                    </View>
                </TouchableOpacity>  
            </View>

            <View style={style.base}>
                <ScrollView>
                <View style={style.main}>
                    
                    <View style={style.main2}>
                        <Image
                            style={style.image}  
                            source={  require('../../../assets/png/ic_email.png') }  />  
                        <View style={style.wrapper}>
                            <Text style={style.description}>Masukkan alamat email yang  terdaftar untuk mengirimkan kode verifikasi</Text>
                        </View>
                    </View>   
                    
                </View>

                <View style={style.txtInput}>
                      <View style={style.txtInput2}>
                      <TextInput
                        autoFocus={false}
                        placeholder={'Email'}
                        placeholderTextColor="#8b8b8b" 
                        style={style.txtInputTeks}
                        onChangeText={text => 
                            setEmail(text)
                        } 
                        value = {email}
                      />

                      </View>  
                </View>

                
                <TouchableOpacity 
                    style={style.button}
                    onPress={()=> validation()}
                >
                <View>
                    {
                        load ?
                        <ActivityIndicator size={'small'} color={'#FFF'} /> :
                        <Text style={{fontSize:16,color:'#00FFEC'}}>Kirim Kode</Text>
                    }
                </View> 
                   
                </TouchableOpacity>

                </ScrollView>
            </View>
        </View>

    )
}

const style= StyleSheet.create({
    container:{
        backgroundColor: '#1F1F1F',
        minHeight:'100%'   ,
    },
    base:{
        flex:1,
        paddingHorizontal:20,
    },
    content:{
        height:'15%',
        backgroundColor:'#2F2F2F',
    },
    main:{
        flexDirection:'row',
        marginTop:35,
        borderRadius:5,
        backgroundColor:'#2F2F2F'
    },
    main2:{
        flexDirection:'row',
        marginTop:-2,
        borderRadius:5,
        height:75,
        backgroundColor:'#2F2F2F'
    },
    image:{
        width:45,
        height:45,
        marginLeft:15,
        marginTop:18
    },
    description:{
        color:'#B5B5B5',
        fontSize:15,
        width: '59%',
        textAlign:'left',
        marginTop:-4
    },
    wrapper:{
        marginTop:25,
        marginLeft:20
    },
    txtInput:{
        marginTop:35,
        borderRadius:5,
        backgroundColor:'#2F2F2F'
    },
    txtInput2:{
        marginTop:-2,
        borderRadius:5,
        height:55,
        backgroundColor:'#2F2F2F'
    },
    txtInputTeks:{
        color: '#DDDDDD', 
        marginTop:15, 
        width: '100%',
        height: 30,
        paddingHorizontal: 20,
        borderRadius: 3,
        color: '#DDDDDD',
        backgroundColor: '#2F2F2F',
        fontSize: 16
    },
    button:{
        width: '95%',
		height: 50,
		marginTop: '65%',
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
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(resetPasswdEmail) 
