import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import InsuranceCard from '../../../components/profile/dashboard/insurance-list-card'

const listInsurance = (props) => {
    const [dummy, setDummy] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

    return (
        <View style={style.container}>
            <Text>list insurance</Text>

            <View style={style.list}>
                {
                    dummy.map((insurance, index) => {
                        return <InsuranceCard insurance={insurance} key={index} />
                    })
                }
                <TouchableOpacity
                    style={style.ins}
                    onPress={() => {
                        console.log('menuju formnya')
                        props.navigation.navigate('InsuranceForm')
                    }}>
                    <Text>Pindah</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        backgroundColor: '#f4f4f4',
        minHeight: '100%'
    },
    list: {
        margin: 25,
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderWidth: 1,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center'
    },
    ins: {
        width: 70,
        height: 70,
        backgroundColor: 'white',
        borderRadius: 6,
        margin: 6,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
export default listInsurance
