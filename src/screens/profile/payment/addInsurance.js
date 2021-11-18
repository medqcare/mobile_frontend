import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import MyInsuranceCard from '../../../components/profile/dashboard/my-insurance-list-card'

const addInsurance = (props) => {
    const [dummy, setDummy] = useState([1,2,3,4,5])

    return (
        <View style={style.container}>
            <Text>addInsurance</Text>
            <ScrollView>
                <View style={style.content}>
                    {
                        dummy.map((myIns, index) => {
                            return <MyInsuranceCard data={myIns} key={index} />
                        })
                    }
                    <TouchableOpacity 
                    style={style.button}
                    onPress={()=> {
                        console.log('menuju formnya')
                        props.navigation.navigate('ListInsurance')
                    }}>
                        <Text>Pindah</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
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
        alignItems: 'center',
        marginBottom: 50,
        marginTop: 20
    },
    content: {
        alignItems: 'center'
    }
})
export default addInsurance
