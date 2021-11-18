import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const InsuranceForm = (props) => {
    return (
        <View style={style.container}>
            <Text>insurance form</Text>
            <TouchableOpacity 
            onPress={() => {
                console.log('hehhehe')
                props.navigation.navigate('AddInsurance')
            }}
            style={style.button}>
                <Text>Submit</Text>
            </TouchableOpacity>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f4f4f4',
        minHeight: '100%'
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
export default InsuranceForm
