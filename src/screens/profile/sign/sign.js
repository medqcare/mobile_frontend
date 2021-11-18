import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return state
}

const sign = (props) => {

    const signIn = () => {
        console.log('sign in')
        props.navigation.push('SignIn')
    }
    const signUp = () => {
        console.log('sign up')
        props.navigation.navigate('SignUp')
    }

    return (
        <View style={viewStyles.container}>
            <ImageBackground source={require('../../../assets/png/Login-Background-Pattern.png')}
                style={viewStyles.background} />
            <View style={container.top}>
                <Text style={textStyles.welcome}>Welcome</Text>
                <Text style={textStyles.description}> Hal yang paling menyenangkan di tengah masa sulit adalah kesehatan yang baik dan tidur yang cukup - Knute Nelson </Text>
            </View>
            <View style={container.center}>
                <TouchableOpacity
                    onPress={() => signUp()}
                    style={viewStyles.buttonSignUp}>
                    <Text style={textStyles.buttonTextUp}>SIGN UP</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => signIn()}
                    style={viewStyles.buttonSignIn}>
                    <Text style={textStyles.buttonTextIn}>SIGN IN</Text>
                </TouchableOpacity>
            </View>
            <View style={container.bottom}>
                <Text style={textStyles.version}>Ver.001</Text>
            </View>
        </View>
    )
}

const container = StyleSheet.create({
    top: {
        width: '90%',
        height: '60%',
        paddingLeft: '12%',
        alignSelf: 'flex-start',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'rgba(0,0,0,0.5)'
    },
    center: {
        // backgroundColor: 'rgba(220,220,220,0.5)',
        height: '30%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    bottom: {
        // backgroundColor: 'rgba(0,0,0,0.5)',
        height: '10%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end'
    }
})

const viewStyles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        minHeight: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    buttonSignIn: {
        width: '65%',
        minHeight: '6%',
        backgroundColor: '#1D7CE7',
        borderRadius: 30,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.23,
        shadowRadius: 6,
        elevation: 4,
    },
    buttonSignUp: {
        width: '65%',
        minHeight: '6%',
        backgroundColor: '#14CB81',
        borderColor: '#14CB81',
        borderRadius: 30,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        shadowColor: "#000",
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
        height: '80%',
        position: 'absolute',
        top: -2,
    }
})

const textStyles = StyleSheet.create({
    welcome: {
        color: '#fff',
        fontSize: 50,
        fontFamily: 'NunitoSans-Regular',
        alignSelf: 'flex-start'
    },
    version: {
        color: '#B9B9B9',
        fontFamily: 'NunitoSans-Regular',
    },
    description: {
        fontSize: 13,
        color: '#fff',
        fontFamily: 'NunitoSans-Regular'
    },
    buttonTextUp: {
        color: '#f4f4f4',
        fontSize: 16,
        fontFamily: 'NunitoSans-Bold'
    },
    buttonTextIn: {
        color: '#f4f4f4',
        fontSize: 16,
        fontFamily: 'NunitoSans-Bold'
    },
})

export default connect(mapStateToProps)(sign)
