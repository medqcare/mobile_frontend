import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'

const successSignup = (props) => {
    
    useEffect(() => {
        console.log('memanggil set timeout')
        // redirect()
        setTimeout(() => {
            props.navigation.navigate('SignIn')
        }, 4000);
    }, [])

    function redirect () {
        setTimeout(() => {
            props.navigation.navigate('signIn')
        }, 2000);
    }
    console.log('masuk ke halaman ini boss')
    return (
        <View style={styles.container}>
            <Text>success sign up, {'\n'}please confirm email to continue registration</Text>
        </View>
    )
}

export default successSignup

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
