import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const myInsuranceListCard = (props) => {
    return (
        <View style={style.outer}>
            <Text>Insurance card: {props.data}</Text>
            <Text>Name: {props.data}</Text>
            <Text>Insurance card: {props.data}</Text>
        </View>
    )
}

const style = StyleSheet.create ({
   outer: {
       backgroundColor: 'white',
       width: 350,
       height: 70,
       borderRadius: 6,
       paddingHorizontal: 10,
       paddingVertical: 5,
       marginVertical: 5
   }
})
export default myInsuranceListCard
