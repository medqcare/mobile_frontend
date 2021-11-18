import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const insuranceList = (props) => {
    return (
        <TouchableOpacity style={style.container}>
            <Text> {props.insurance} </Text>
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    container: {
        width: 70,
        height: 70,
        backgroundColor: 'white',
        borderRadius: 6,
        margin: 6,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
export default insuranceList
