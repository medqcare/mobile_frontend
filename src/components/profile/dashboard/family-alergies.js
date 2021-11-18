import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen'


const familyAlergies = (props) => {
    // console.log(props , 'ini propsnya di alergies')
    const [data, setData] = useState(props.userData[0].alergi)
    console.log(data)

    return (
        <View style={viewStyles.container}>
           <Text style={textStyle.title}> Obat </Text> 
            <View style={viewStyles.sectionContainer}>
                {
                    data.obat.map((ob, index) => {
                        return <View style={viewStyles.section} key={index}>
                            <Text> {ob} </Text>
                        </View>
                    })
                }
            </View>
           <Text style={textStyle.title}> Lain-lain </Text> 
            <View style={viewStyles.sectionContainer}>  
                {
                    data.lain_lain.map((ob, index) => {
                        return <View style={viewStyles.section} key={index}>
                            <Text> {ob} </Text>
                        </View>
                    })
                }
            </View>
        </View>
    )
}

const viewStyles = StyleSheet.create({
    container: {
        paddingVertical: 10, 
        alignItems: 'center'
    },
    section: {
        // backgroundColor: 'white',
        textTransform: 'capitalize',
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        paddingVertical: 5,
        justifyContent: 'center',
        borderRadius: 9
    },
    sectionContainer: {
        paddingHorizontal: 15,
        minHeight: hp('5%'),
        width: wp('90%'),
        backgroundColor: 'white',
        paddingBottom: 5,
        borderRadius: 3,
    }

})

const textStyle = StyleSheet.create({
    title: {
        alignSelf: 'flex-start',
        fontSize:  21,
        fontWeight: 'bold',
        color: '#5d5d5d',
        paddingVertical: 5
    }
})

export default familyAlergies
