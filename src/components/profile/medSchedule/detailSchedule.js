import React, { useState, useEffect, useRef } from 'react'
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    ImageBackground,
    BackHandler,
    Modal,
    Dimensions,
    Animated,
} from 'react-native'
import ModalHalf from 'react-native-modal'
import { connect } from 'react-redux'
import SearchableDropdown from 'react-native-searchable-dropdown'
import ModalDrug from '../../modals/medSchedule/modalSetDrug'
import AsyncStorage from '@react-native-async-storage/async-storage'


import IconA from 'react-native-vector-icons/AntDesign'
import Icon from 'react-native-vector-icons/Ionicons'
import IconFA from 'react-native-vector-icons/FontAwesome'
import ArrowBack from '../../../assets/svg/ArrowBack'

import ModalInstruction from '../../modals/medSchedule/modalInstruction'
import LottieLoader from 'lottie-react-native'

const detailSchedule = (props) => {

    data = props.navigation.state.params.scheduleDrug
    index = props.navigation.state.params.index

    const [medicineName, setMedicineName] = useState('')
    const [schedule, setSchedule] = useState([])
    const [dose, setDose] = useState('')
    const [qty, setQty] = useState('')
    const [instruction, setInstruction] = useState('')

    useEffect(() => {
        setMedicineName(data.drugName)
        setSchedule(data.schedule)
        setDose(data.dose)
        setQty(data.quantity)
        setInstruction(data.otherInstruction)
    }, [data])

    BackHandler.addEventListener('hardwareBackPress', () => {
        return (props.navigation.navigate('Schedule'))
    })

    return (
        <View style={{ flex: 1, }} >
            <ImageBackground source={require('../../../assets/png/Background-Pattern.png')} style={{ height: 100, }}>
                <View style={{ flex: 1, marginTop: 32, flexDirection: 'row', alignItems: 'center', }}>
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate('Schedule')}
                        style={{ flex: 1 }}>
                        <View style={{ flexDirection: 'row', }} >
                            <ArrowBack />
                            <Text style={{ fontSize: 20, color: '#ffff', fontWeight: 'bold', position: 'relative', }}>Detail schedule</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
            <ScrollView>
                <View style={{ flex: 1, padding: 10 }}>
                    <View style={{ flex: 1 }}>
                        <Text style={textStyle.detail}>Medicine Name </Text>
                        <View style={{ flex: 1, padding: 10, borderRadius: 10, backgroundColor: '#e9e9e9', flexDirection: 'row', justifyContent: 'space-between', }}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ color: '#606060', fontSize: 20 }}>{medicineName}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', marginVertical: 10 }}>
                        <View style={{ width: 34, alignItems: 'center' }}>
                            <IconA name={'calendar'} size={20} color='#606060' />
                        </View>
                        <Text style={{ color: '#606060', }}>{schedule.length} Times/day</Text>
                        <View style={{ width: 34, alignItems: 'center' }}>
                            <IconFA name={'spoon'} size={20} color='#606060' />
                        </View>
                        <Text style={{ color: '#606060', }}>{dose}</Text>
                    </View>
                    {schedule && <View>
                        {
                            schedule.map((el, idx) => {
                                return (
                                    <View style={{ flex: 1, flexDirection: 'row', marginVertical: 5 }} key={idx}>
                                        <View style={{ width: 34, alignItems: 'center' }}>
                                            <IconA name={'clockcircleo'} size={20} color='#606060' />
                                        </View>
                                        <Text style={{ color: '#606060', }}>{String(el.jam).length == 1 ? `0${el.jam}` : el.jam} : {String(el.menit).length == 1 ? `0${el.menit}` : el.menit}</Text>
                                    </View>
                                )
                            })
                        }
                    </View>
                    }
                    <View style={{ flex: 1, flexDirection: 'row', marginVertical: 10 }}>
                        <View style={{ width: 34, alignItems: 'center' }}>
                            <IconA name={'form'} size={20} color='#606060' />
                        </View>
                        <Text style={{ color: '#606060', }}>{qty}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={textStyle.detail}>Instruction </Text>
                        <View style={{ flex: 1, padding: 10, borderRadius: 10, backgroundColor: '#e9e9e9', flexDirection: 'row', justifyContent: 'space-between', }}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ color: '#606060', }}>{instruction}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <TouchableOpacity style={viewStyle.buttonSetting}
                onPress={() => props.navigation.navigate('editSchedule', { scheduleDrug: data, index: index })}>
                <Icon name={'md-create'} size={20} color={'#FFF'} />
            </TouchableOpacity>
        </View >
    )
}

const viewStyle = StyleSheet.create({
    buttonSetting: {
        width: 50,
        height: 50,
        padding: 10,
        marginHorizontal: 10,
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: '#3AD584',
        justifyContent: 'center',
        marginVertical: 20,
        alignSelf: 'center'
    },
})

const textStyle = StyleSheet.create({
    clock: {
        fontWeight: 'bold',
        color: '#000'
    },
    detail: {
        color: '#9D9D9D'
    },
    schedule: {
        color: '#FFF',
        fontWeight: 'bold',
    }
})
const mapStateToProps = state => {
    return state
}

const mapDispatchToProps = {

}
export default connect(mapStateToProps, mapDispatchToProps)(detailSchedule)