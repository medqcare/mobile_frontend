import React, { useState, useEffect } from 'react'
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    ImageBackground,
    BackHandler,
    Modal,
    ToastAndroid,
    TextInput,
    Alert
} from 'react-native'
import ModalHalf from 'react-native-modal'
import { connect } from 'react-redux'
import SearchableDropdown from 'react-native-searchable-dropdown'
// import Picker from 'react-native-picker'
import ModalDrug from '../../modals/medSchedule/modalSetDrug'
import AsyncStorage from '@react-native-async-storage/async-storage'
import StopNotif from '../../../helpers/notifStopper'
import createLocalOnly from '../../../worker/createLocalOnly'


import Icon from 'react-native-vector-icons/Ionicons'
import IconAD from 'react-native-vector-icons/AntDesign'

import ModalInstruction from '../../modals/medSchedule/modalInstruction'
import LottieLoader from 'lottie-react-native'
import ArrowBack from '../../../assets/svg/ArrowBack'

const editSchedule = (props) => {
    data = props.navigation.state.params.scheduleDrug
    index = props.navigation.state.params.index

    const [medicineName, setMedName] = useState(null)
    const [dose, setDose] = useState(0)
    const [qty, setQty] = useState(0)
    const [etiquette, setEtiquette] = useState(1)
    const [etiquetteTime, setEtiquetteTime] = useState(null)
    const [Instruction, setInstruction] = useState('')

    const [searchModal, setModal] = useState(false)
    const [otherInsModal, setOtherInstruction] = useState(false)
    const [done, setDone] = useState(false)

    const [validDose, setVDose] = useState(false)
    const [validQty, setVQty] = useState(false)

    const [items, setItems] = useState([])
    let dataHour = [
        ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
        ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59']
    ];

    // async function fetchMedicine() {
    //     props.getDataMedicine()
    //         .then(allMedicine => {
    //             setItems(allMedicine)
    //         })
    //         .catch(error => {
    //             console.log(error)
    //         })
    // }

    useEffect(() => {
        fetchMedicine()
    }, [])

    useEffect(() => {
        setMedName(data.drugName)
        setDose(data.dose)
        setQty(data.quantity)
        setEtiquette(data.schedule ? data.schedule.length : null)
        setInstruction(data.otherInstruction)
        let temp = []
        for (let index = 0; index < data.schedule.length; index++) {
            temp.push(data.schedule ? data.schedule[index] : { jam: "00", menit: "00" })
        }
        setEtiquetteTime(temp)
    }, [data])

    useEffect(() => {
        let temp = []
        for (let index = 0; index < etiquette; index++) {
            temp.push(etiquetteTime
                ? etiquetteTime[index]
                    ? etiquetteTime[index]
                    : data.schedule
                        ? data.schedule[index]
                            ? data.schedule[index]
                            : { jam: "00", menit: "00" }
                        : { jam: "00", menit: "00" }
                : data.schedule
                    ? data.schedule[index]
                    : { jam: "00", menit: "00" })
        }
        console.log(temp, 'ini temp 2')
        setEtiquetteTime(temp)
    }, [etiquette])

    function validation() {
        const newEtiquetteTime = []
        etiquetteTime.map(el => {
            newEtiquetteTime.push({
                jam: el[0],
                menit: el[1]
            })
        })
        let sendData = {
            drugName: medicineName == 'Medicine Name' ? null : medicineName,
            schedule: etiquetteTime,
            dose: dose,
            quantity: qty,
            otherInstruction: Instruction ? Instruction : null,
            notifIndex: data.notifIndex,
            notif: true
        }

        sendData.dose == 0 ? setVDose(true) : setVDose(false)
        sendData.quantity == null || sendData.quantity == 0 ? setVQty(true) : setVQty(false)

        sendData.drugName !== 'Medicine Name' && sendData.schedule && sendData.dose > 0 && sendData.quantity && sendData.quantity > 0
            ? saveSchedule(sendData)
            : ToastAndroid.show('please fill in the data correctly !', ToastAndroid.LONG)

    }

    async function saveSchedule(newData) {
        let schedule = await AsyncStorage.getItem('ScheduleObat')
        let newSchedule = []
        newSchedule = JSON.parse(schedule)
        newSchedule.push(newData)
        console.log(newData, 'ini new data dari edit schedule');
        saveChange(newSchedule)
        createLocalOnly(newData)
    }

    async function deleteSchedule() {
        let schedule = await AsyncStorage.getItem('ScheduleObat')
        saveChange(JSON.parse(schedule))
    }

    async function saveChange(params) {
        var filtered = params.filter(function (value, index1, arr) { return index1 !== index; })
        StopNotif(data)
        try {
            await AsyncStorage.setItem('ScheduleObat', JSON.stringify(filtered))
            setDone(true)
        } catch (error) {
            console.log(error)
            ToastAndroid.show('Error save data schedule', ToastAndroid.LONG)
        }
    }

    BackHandler.addEventListener('hardwareBackPress', () => {
        return (
            props.navigation.navigate('detailSchedule', { scheduleDrug: data, index: index })
        )
    })

    return (
        <View style={{ flex: 1 }} >
            <ImageBackground source={require('../../../assets/png/Background-Pattern.png')} style={{ height: 85, }}>
                <View style={{ flex: 1, marginTop: 32, flexDirection: 'row', alignItems: 'center', }}>
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate('detailSchedule', { scheduleDrug: data, index: index })}>
                        <View style={{ flexDirection: 'row', }} >
                            <ArrowBack />
                            <Text style={{ fontSize: 20, color: '#ffff', fontWeight: 'bold', position: 'relative', }}>Edit schedule</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flex: 1, backgroundColor: '#EDEDED' }}>
                    <View style={{ backgroundColor: '#FFF' }}>
                        <Text style={textStyle.tittle}>Medicine Name</Text>
                        <View style={viewStyle.inputBox}>
                            <TouchableOpacity style={viewStyle.medicineName} onPress={() => setModal(!searchModal)}>
                                <Text style={{ color: medicineName == 'Medicine Name' ? '#808080' : '#000', fontSize: 16, fontWeight: 'bold' }}>{medicineName}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={viewStyle.editIcon} onPress={() => setModal(!searchModal)}>
                                <IconAD name={'edit'} size={17} color={'#FFF'} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text style={textStyle.tittle}>Etiquette Ammount</Text>
                    <View style={viewStyle.etiquetteBox}>
                        <TouchableOpacity onPress={() => {
                            if (etiquette > 1) {
                                setEtiquette(etiquette - 1)
                            }
                        }}>
                            <IconAD name={'minuscircle'} size={30} color={'#44E28B'} />
                        </TouchableOpacity>
                        <View style={viewStyle.number}>
                            <Text style={textStyle.number}>{etiquette}   times/day</Text>
                        </View>
                        <TouchableOpacity onPress={() => {
                            if (etiquette < 5) {
                                setEtiquette(etiquette + 1)
                            }
                        }}>
                            <IconAD name={'pluscircle'} size={30} color={'#44E28B'} />
                        </TouchableOpacity>
                    </View>
                    <Text style={textStyle.tittle}>Set Time</Text>
                        {etiquetteTime && <View>
                            {
                                etiquetteTime.map((el, idx) => {
                                    return (
                                        <View key={idx} style={viewStyle.timeBox}>
                                            <TouchableOpacity activeOpacity={0.6} style={viewStyle.time}
                                                onPress={() => {
                                                    // Picker.init({
                                                    //     pickerData: dataHour,
                                                    //     pickerTitleText: 'Picker Time',
                                                    //     selectedValue: [59],
                                                    //     pickerFontSize: 20,
                                                    //     onPickerConfirm: data => {
                                                    //         let newarray = [...etiquetteTime]
                                                    //         newarray[idx] = { jam: data[0], menit: data[1] }
                                                    //         setEtiquetteTime(newarray)
                                                    //         console.log(newarray)
                                                    //     },
                                                    //     onPickerCancel: data => {
                                                    //         console.log(data);
                                                    //     },
                                                    // })
                                                    // Picker.show()
                                                }}>
                                                <Text style={{ color: '#757575',}}>{el.jam.length == 1 ? `0${el.jam}` : el.jam} : {el.menit.length == 1 ? `0${el.menit}` : el.menit}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    // Picker.init({
                                                    //     pickerData: dataHour,
                                                    //     pickerTitleText: 'Picker Time',
                                                    //     selectedValue: [59],
                                                    //     pickerFontSize: 20,
                                                    //     onPickerConfirm: data => {
                                                    //         let newarray = [...etiquetteTime]
                                                    //         newarray[idx] = { jam: data[0], menit: data[1] }
                                                    //         setEtiquetteTime(newarray)
                                                    //         console.log(newarray)
                                                    //     },
                                                    //     onPickerCancel: data => {
                                                    //         console.log(data);
                                                    //     },
                                                    // })
                                                    // Picker.show()
                                                }}>
                                                <View style={viewStyle.editIcon}>
                                                    <IconAD name={'edit'} size={17} color={'#FFF'} />
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                })
                            }
                        </View>
                        }
                    <Text style={textStyle.tittle}>Dose</Text>
                    <View style={[viewStyle.etiquetteBox, { borderWidth: validDose ? 1 : 0, borderColor: '#FC070B' }]}>
                        <TouchableOpacity onPress={() => {
                            if (dose > 0) {
                                setDose(dose - 0.5)
                            }
                        }}>
                            <IconAD name={'minuscircle'} size={30} color={'#44E28B'} />
                        </TouchableOpacity>
                        <View style={viewStyle.number}>
                            <Text style={textStyle.number}>{dose}</Text>
                        </View>
                        <TouchableOpacity onPress={() => {
                            setDose(dose + 0.5)
                        }}>
                            <IconAD name={'pluscircle'} size={30} color={'#44E28B'} />
                        </TouchableOpacity>
                    </View>
                    <Text style={textStyle.tittle}>Quantity Medicine</Text>
                    <View style={{ backgroundColor: '#FFF', paddingVertical: 3, paddingHorizontal: 8, borderWidth: validQty ? 1 : 0, borderColor: '#FC070B' }}>
                        <TextInput
                            style={{ width: '100%', }}
                            keyboardType={'numeric'}
                            onChangeText={text => setQty(text)}
                            placeholder={"Quantity Medicine"}
                            placeholderTextColor={'#808080'}
                            value={qty.toString()} />
                    </View>
                    <Text style={textStyle.tittle}>Instruction</Text>
                    <View style={viewStyle.etiquetteBox}>
                        <TouchableOpacity onPress={() => setOtherInstruction(!otherInsModal)}>
                            <Text style={{ color: Instruction ? "#000" : "#808080" }}>{Instruction ? Instruction : "Instruction"}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={viewStyle.editIcon} onPress={() => setOtherInstruction(!otherInsModal)}>
                            <IconAD name={'edit'} size={17} color={'#FFF'} />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={viewStyle.buttonSetting}
                        onPress={() => validation()}>
                        <Text style={textStyle.schedule}>Set Schedule</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[viewStyle.buttonSetting, {
                        backgroundColor: '#C60003',
                        borderColor: '#6B0002',
                    }]}
                        onPress={async () => {
                            Alert.alert(
                                "Delete Schedule",
                                "Are you sure to delete this schedule ?",
                                [
                                    {
                                        text: "Cancel",
                                        onPress: () => console.log("Cancel Pressed"),
                                        style: "cancel"
                                    },
                                    {
                                        text: "OK", onPress: () => deleteSchedule()
                                    }
                                ],
                                { cancelable: false }
                            )
                        }}>
                        <Text style={textStyle.schedule}>Delete Schedule</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            {
                searchModal && <ModalDrug
                    settingName={(params) => setMedName(params)}
                    items={items}
                    setVisible={() => setModal(!ModalDrug)} />
            }
            {
                otherInsModal && <ModalInstruction
                    settingInstruction={(params) => setInstruction(params)}
                    setVisible={() => setOtherInstruction(!otherInsModal)}
                />
            }
            <Modal transparent visible={done}>
                <View style={{ flex: 1, padding: 20, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: '100%', height: '20%' }}>
                        <LottieLoader
                            source={require('../../../screens/animation/success-green.json')}
                            autoPlay
                            speed={0.7}
                            loop={false}
                            onAnimationFinish={() => {
                                setDone(false)
                                props.navigation.navigate('Schedule')
                            }}
                        />
                    </View>
                </View>
            </Modal>
        </View >
    )
}

const viewStyle = StyleSheet.create({
    inputBox: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        marginHorizontal: 10,
    },
    etiquetteBox: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#FFF',
    },
    selectBox: {
        height: 60,
        width: '100%',
        alignItems: 'center',
    },
    buttonCicle: {
        padding: 5,
    },
    buttonSetting: {
        padding: 15,
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 6,
        backgroundColor: '#3AD584',
        borderColor: '#18A85D',
        justifyContent: 'center',
        marginHorizontal: 10,
        marginTop: 20,
    },
    medicineName: {
        flex: 1,
        overflow: 'hidden',
        justifyContent: 'center',
    },
    timeBox: {
        flex: 1,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
        marginBottom: 3,
    },
    time: {
        flex: 1,
    },
    editIcon: {
        height: 35,
        width: 35,
        borderRadius: 30,
        padding: 7,
        backgroundColor: '#44E28B',
        justifyContent: 'center',
        alignItems: 'center',
    },
    instructionBox: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    InstructionMeals: {
        flex: 1,
        padding: 10,
        borderWidth: 1,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    number: {
        flex: 1,
        alignItems: 'center',
        marginHorizontal: 10,
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
    },
    number: {
        fontSize: 16
    },
    tittle: {
        margin: 10,
        color: '#808080'
    },
})
const mapStateToProps = state => {
    return state
}

const mapDispatchToProps = {

}
export default connect(mapStateToProps, mapDispatchToProps)(editSchedule)