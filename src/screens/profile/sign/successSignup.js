import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'

const successSignup = (props) => {
    
    useEffect(() => {
        console.log('Set timeout called')
        // redirect()
        setTimeout(() => {
            console.log('Navigating to sign in page...')
            props.navigation.navigate('SignIn')
        }, 4000);
    }, [])

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
