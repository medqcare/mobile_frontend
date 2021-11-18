import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const SettingTittle = (props) => {
    let { data } = props
    console.log(data,'ini datadatanya di title')
    return (
        <View style={viewStyles.container}>
            <Text style={textStyles.title}>{ data }</Text>
        </View>
    )
}

const viewStyles = StyleSheet.create ({
    container: {
        width: '100%',
        height: 30,
        padding: 15,
        marginVertical: 5,
        justifyContent: 'center'
    }
})

const textStyles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'capitalize',
        color: '#33691E'
    }
})

export default SettingTittle
