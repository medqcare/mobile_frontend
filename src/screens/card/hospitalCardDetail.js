import React, {useState} from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'

const hospitalCardDetail = (props) => {
    const [data, setData] = useState(props.navigation.state.params)

    return (
        <View style={style.container}>
            <View style={header.container}>
                <View style={header.indicator}></View>
                <Text style={header.title}>Hospital Detail</Text>
            </View>
            <View style={style.board}>
                {
                    data.data.dummy.map((index,i) => {
                        return (
                            <View>
                                <Text>{index}</Text>
                                <Text>{i}</Text>
                            </View>
                        )
                    })
                }
                <Text>{JSON.stringify(data.data.dummy)}</Text>
            </View>
        </View>
    )
}


const header= StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginHorizontal: wp('5%'),
        marginTop: 10,
        alignItems: 'center',

    },
    indicator: {
        backgroundColor: '#52de97',
        width: 7,
        height: 30
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: 15
    },
})
const style= StyleSheet.create({
    container: {
        backgroundColor: '#f4f4f4',
        minHeight: '100%',
        alignItems: 'flex-start',
    },
    board: {
        minHeight: 100,
        width: 370,
        borderRadius: 8,
        borderBottomEndRadius: 0,
        borderBottomStartRadius: 0,
        backgroundColor: 'white',
        marginTop: 20,
        marginHorizontal: 10
    }
})

export default hospitalCardDetail