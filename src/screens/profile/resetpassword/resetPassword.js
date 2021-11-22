import React, { useState } from 'react'
import { connect } from 'react-redux'
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Image,
    BackHandler,
} from 'react-native'

import {LinearGradient} from 'expo-linear-gradient'

//action
import { resetPasswordEmail,resetPasswordPhone, setLoading } from '../../../stores/action'

import ArrowBack from '../../../assets/svg/ArrowBack'

//mapTopProps
// const mapStateToProps = state => {
//     return state
// }

const resetPasswd = (props) => {
    // const { resetpassword } = props.userData

    BackHandler.addEventListener("hardwareBackPress", () => {
        props.navigation.pop()
        return true
    })

    return (

        <View style={style.container} >
            <View style={style.content}>
                <TouchableOpacity 
                    onPress={() => props.navigation.navigate('ProfileStack')}> 
                    <View style={{ marginLeft:10,flexDirection:'row',marginTop:40 }}>
                    <ArrowBack/>
                    <Text style={{ marginHorizontal:15,paddingHorizontal:7 ,fontSize: 20, color: '#ffff', position: 'relative', }}> Reset Password</Text>
                    </View>
                </TouchableOpacity>     
            </View>


            <View style={style.base}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={style.text}> Pilih metode </Text>
                <TouchableOpacity
                onPress={() => props.navigation.navigate('ResetPasswordEmail')}
                >
               <View style={style.main}> 
                    <Image
                        style={style.image}  
                        source={  require('../../../assets/png/ic_email.png') }  />
                <View style={style.wrapper}>
                    <Text style={style.title}>Email</Text>
                    <Text style={style.description}>Pulihkan akun dengan kode yang dikirimkan untuk menggunakan kode verifikasi</Text>
                </View>
             </View>
            </TouchableOpacity>  
            
            <TouchableOpacity
            onPress={() => props.navigation.navigate('ResetPasswordPhone')}
            >
                <View style={style.mainSection}>
                    <Image
                        style={style.image2}
                        source={ require('../../../assets/png/ic_hp.png') } 
                    />
                    <View style={style.wrapper2}>
                        <Text style={style.title}>Nomor Hp</Text>
                        <Text style={style.description2}>Verifikasi nomor hp untuk memulihkan akun</Text>
                    </View> 
                </View>
            
            </TouchableOpacity>
            </ScrollView>
        </View>
        </View>

        
    )
}

const style = StyleSheet.create({
    base: {
        flex: 1,
        paddingHorizontal:20
    },
    container: {
        backgroundColor: '#1F1F1F',
        minHeight:'100%'
    },
    content:{
        height:'15%',
        backgroundColor:'#2F2F2F'
    },
    text:{
        color:'white',
        fontSize:18,
        marginLeft:0,
        marginTop:20
    },
    wrapper:{
        marginTop:20,
        marginLeft:20
    },
    wrapper2:{
        marginTop:22,
        marginLeft:20
    },
    main:{
        flexDirection:'row',
        marginTop:10
    },
    image:{
        width:40,
        height:40,
        marginTop:28
    },
    image2:{
        width:40,
        height:40,
        marginTop:22
    },
    title:{
        color:'#DDDDDD',
        fontSize:16
    },
    description:{
        color:'#B5B5B5',
        fontSize:15,
        width: '62%',
        marginTop:3
    },
    description2:{
        color:'#B5B5B5',
        fontSize:15,
        width: '100%',
        marginTop:3
    },
    mainSection: {
        marginTop:10,
        flexDirection:'row'
    }
})


// const mapDispatchToProps = {
//     resetPasswordEmail,
//     resetPasswordPhone,
//     setLoading
// }

// const mapStateToProps = (state) => {
//     return state
// }

export default resetPasswd
