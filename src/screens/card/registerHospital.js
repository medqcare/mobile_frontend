import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const registerHospital = (props) => {
    return (
        <View style={style.container}>
            <Text>register hospital</Text>
            <Text>ini harusnya ada form yang harus diisi</Text>
            <TouchableOpacity 
            onPress={() => {
                console.log('tombol submit di register hospital')
                props.navigation.navigate('Card')
            }}
            style={style.button}>
                <Text>Submit</Text>
            </TouchableOpacity>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        backgroundColor: '#f4f4f4',
        minHeight: '100%',
        alignItems: 'center'
    },
    button: {
        backgroundColor: 'pink',
        width: 250,
        height: 60,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default registerHospital
