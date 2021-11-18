import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, Picker } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen'

//function
import removeUnderScore from '../../../helpers/vitalSignName'

const vitalSign = (props) => {
    // console.log(props,'ini vital signnya')
    const [data, setData] = useState(props.userData)
    const [selected, setSelected] = useState({
        date: data[0].createdAt,
        index: 0
    })
    const [objectData, setObjectData] = useState(data[0])
    const keys = Object.keys(objectData.vitalSign)
    // console.log(selected, 'ini yang terselectednya')
    // console.log(keys,' ini key vital signnya')
    // console.log(data, 'ini datanya yakk~')

    return (
        <View style={viewStyles.container}>
            {/* <View style={viewStyles.dropbox}> */}
            <Picker
            selectedValue={selected.date}
            style={viewStyles.dropbox}
            onValueChange={(itemValue, itemIndex) =>{
                setSelected({date: itemValue, index: itemIndex}),
                setObjectData(data[itemIndex])
            }
            }>
                {
                    data.map((userData, index) => {
                        return <Picker.Item label={userData.createdAt} value={userData.createdAt} key={index} />
                    })
                }
            </Picker>
            {/* </View> */}
            {
                keys.map((key, index) => {
                    // console.log(key, 'ini keynya~~')
                    return (
                    <View style={viewStyles.rect} key={index}> 
                        <View style={viewStyles.leftBar} />
                        <View style={viewStyles.rightContent}>
                            <View style={viewStyles.key}>
                                <Text style={textStyles.vitalsign}> {removeUnderScore(key)} </Text>
                                <Text style={textStyles.vitalsignkey}> {objectData.vitalSign[key] ? objectData.vitalSign[key] : '-'} </Text>
                            </View>
                            <View style={viewStyles.icon} />
                        </View>
                    </View>)
                })
            }

        </View>
    )
}

const viewStyles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingVertical: hp('2%'),
    },
    rect: {
        width: '100%',
        height: 110,
        backgroundColor: 'white',
        marginVertical: 3,
        borderRadius: 3,
        flexDirection: 'row'
    },
    leftBar: {
        width: 5,
        height: '100%',
        backgroundColor: '#52de97',
        borderTopLeftRadius: 3,
        borderBottomLeftRadius: 3
    },
    rightContent:{
        paddingVertical: 5,
        paddingHorizontal: 9,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '95%',
    },
    key: {
        justifyContent: 'space-between',
    },
    icon: {
        width: 80,
        height: 80,
        backgroundColor: 'green',
        borderRadius: 50,
    },
    dropbox: {
        width: wp('38%'),
        height: 30,
        borderWidth: 1,
        borderColor: 'green',
        alignSelf: 'flex-start',
        marginBottom: 10
    }
})
const textStyles = StyleSheet.create({
    vitalsign: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#3C9D9B',
        textTransform: 'capitalize'
    },
    vitalsignkey: {
        paddingLeft: 5,
        fontSize: 55,
        fontWeight: 'bold',
        color: '#3C9D9B',
        textTransform: 'capitalize',
    },
})

export default vitalSign
