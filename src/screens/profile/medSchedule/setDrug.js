import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    ScrollView,
    Dimensions,
    ImageBackground,
    TouchableOpacity,
    BackHandler,
    Modal,
    ToastAndroid
} from 'react-native'
import SearchableDropdown from 'react-native-searchable-dropdown'

import { connect } from 'react-redux'
import io from 'socket.io-client'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
// import Picker from 'react-native-picker'
import QRCode from 'react-native-qrcode-svg'

import { baseURL } from '../../../config/index'

import Icon from 'react-native-vector-icons/Ionicons'
import IconAD from 'react-native-vector-icons/AntDesign'

import ModalInstruction from '../../../components/modals/medSchedule/modalInstruction'
import createLocalNotification from '../../../worker/createLocalNotification'
import LottieLoader from 'lottie-react-native'
import ArrowBack from '../../../assets/svg/ArrowBack'

const SetDrug = (props) => {
    const [searchModal, setModal] = useState(true)
    const [done, setDone] = useState(false)
    const [dose, setDose] = useState(0)
    const [qty, setQty] = useState(0)
    const [etiquette, setEtiquette] = useState(1)
    const [etiquetteTime, setEtiquetteTime] = useState([])
    const [Instruction, setInstruction] = useState('')
    const [medicineName, setMedName] = useState('Medicine Name')

    const [time, setTime] = useState('')
    const [hour, setHour] = useState(['00', '00'])
    const [minute, setMinute] = useState('0')
    const [before, setBefore] = useState(false)
    const [after, setAfter] = useState(false)
    const [withMeals, setWithMeals] = useState(false)

    const [validDose, setVDose] = useState(false)
    const [validQty, setVQty] = useState(false)

    const [otherInsModal, setOtherInstruction] = useState(false)

    const [items, setItems] = useState([])

    BackHandler.addEventListener('hardwareBackPress', () => {
        return (props.navigation.navigate('Schedule'))
    })

    // async function fetchMedicine() {
    //     props.getDataMedicine()
    //         .then(allMedicine => {
    //             setItems(allMedicine)
    //         })
    //         .catch(error => {
    //             console.log(error)
    //         })
    // }

    function validation() {
        const newEtiquetteTime = []
        etiquetteTime.map(el => {
            newEtiquetteTime.push({
                jam: el[0],
                menit: el[1]
            })
        })
        var newIntraction = null
        if (before) {
            newIntraction = "Before Meals"
        }
        if (after) {
            newIntraction = newIntraction ? newIntraction.concat(',' + "After Meals") : "After Meals"
        }
        if (withMeals) {
            newIntraction = newIntraction ? newIntraction.concat(',' + "With Meals") : "With Meals"
        }
        let sendData = {
            drugName: medicineName == 'Medicine Name' ? null : medicineName,
            schedule: newEtiquetteTime,
            dose: dose,
            quantity: qty,
            otherInstruction: Instruction ? Instruction : null,
        }
        sendData.dose == 0 ? setVDose(true) : setVDose(false)
        sendData.quantity == 0 ? setVQty(true) : setVQty(false)
        sendData.drugName !== 'Medicine Name' && sendData.schedule && sendData.dose > 0 && sendData.quantity && sendData.quantity > 0
        ? saveSchedule(sendData)
        : ToastAndroid.show('please fill in the data correctly !', ToastAndroid.LONG)
    }

    async function saveSchedule(data) {
        createLocalNotification([data])
        setDone(true)
    }

    useEffect(() => {
        fetchMedicine()
    }, [])

    let dataHour = [
        ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
        ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59']
    ];

    useEffect(() => {
        let h = '0'
        let m = '0'
        if (hour.length == 1) {
            h = '0' + hour
        } else {
            h = hour
        }

        if (minute.length == 1) {
            m = '0' + minute
        } else {
            m = minute
        }
        setTime(`${h} : ${m}`)
    }, [hour, minute])

    useEffect(() => {
        let temp = []
        for (let index = 0; index < etiquette; index++) {
            temp.push(etiquetteTime
                ? etiquetteTime[index]
                    ? etiquetteTime[index]
                    : ["00", "00"]
                : ["00", "00"])
        }
        setEtiquetteTime(temp)
    }, [etiquette])

    return (
        <View style={viewStyle.container}>
            <ImageBackground source={require('../../../assets/png/Background-Pattern.png')} style={{ height: 85, }}>
                <View style={{ flex: 1, marginTop: 32, flexDirection: 'row', alignItems: 'center', }}>
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate('Schedule')}>
                        <View style={{ flexDirection: 'row', }} >
                            <ArrowBack />
                            <Text style={{ fontSize: 20, color: '#ffff', fontWeight: 'bold', position: 'relative', }}>Setting schedule</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
            <View style={{ flex: 1, justifyContent: 'space-between', }}>
                <ScrollView showsVerticalScrollIndicator={false} >
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
                    <Text style={textStyle.tittle}>Etiquette </Text>
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
                    <View>
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
                                                    //         newarray[idx] = data
                                                    //         setEtiquetteTime(newarray)
                                                    //         console.log(newarray)
                                                    //     },
                                                    //     onPickerCancel: data => {
                                                    //         console.log(data);
                                                    //     },
                                                    // })
                                                    // Picker.show()
                                                }}>
                                                <Text>{el.join(' : ')}</Text>
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
                                                    //         newarray[idx] = data
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
                    </View>
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
                    <View style={{ backgroundColor: '#FFF', paddingVertical: 3, paddingHorizontal: 8, borderWidth: validQty ? 1 : 0, borderColor: '#FC070B'}}>
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
                    {
                        otherInsModal && <ModalInstruction
                            settingInstruction={(params) => setInstruction(params)}
                            setVisible={() => setOtherInstruction(!otherInsModal)}
                        />
                    }
                </ScrollView>
                <Modal
                    animationType={'fade'}
                    visible={searchModal}
                // onRequestClose={() => { setModal(false) }}
                >
                    <View style={{
                        flex: 1,
                    }}>
                        <ImageBackground source={require('../../../assets/png/Background-Pattern.png')} style={{ height: 65, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 20, color: '#ffff', fontWeight: 'bold', position: 'relative', }}>Select Medicine</Text>
                        </ImageBackground>

                        <SearchableDropdown
                            onTextChange={text => setMedName(text)}
                            //On text change listner on the searchable input
                            onItemSelect={item => {
                                setMedName(item.name)
                            }}
                            //onItemSelect called after the selection from the dropdown
                            // containerStyle={{ flex:0, }}
                            //suggestion container style
                            textInputStyle={{
                                //inserted text style
                                height: 60,
                                width: '100%',
                                alignItems: 'center',
                                // marginVertical: 10,
                                paddingHorizontal: 10,
                                borderBottomWidth: 1,
                                borderColor: '#Cdcdcd'
                            }}
                            itemStyle={{
                                //single dropdown item style
                                width: Dimensions.get('screen').width,
                                paddingHorizontal: 10,
                                paddingVertical: 13,
                                // marginTop: 2,
                                backgroundColor: '#f4f4f4',
                            }}
                            itemTextStyle={{
                                //text style of a single dropdown item
                                color: '#222',
                            }}
                            itemsContainerStyle={{
                                //items container style you can pass maxHeight
                                //to restrict the items dropdown hieght
                                maxHeight: '40%',
                                width: '100%',
                                marginTop: 60,
                                position: 'absolute',
                                zIndex: 100,
                                backgroundColor: '#f4f4f4',
                                shadowColor: '#000',
                                shadowOffset: {
                                    width: 4,
                                    height: 7,
                                },
                                shadowOpacity: 0.61,
                                shadowRadius: 9.11,
                                elevation: 14,
                            }}
                            items={items}
                            //mapping of item array
                            defaultIndex={0}
                            //default selected item index
                            placeholder="Medicine Name"
                            //place holder for the search input
                            resetValue={false}
                        //reset textInput Value with true and false state
                        // underlineColorAndroid="transparent"
                        //To remove the underline from the android input
                        />
                        {medicineName !== "Medicine Name" && medicineName !== "" && medicineName !== null &&
                            <TouchableOpacity onPress={() => setModal(false)} style={{
                                backgroundColor: '#9e8', justifyContent: 'center', alignItems: 'center',
                                height: 40,
                                backgroundColor: '#3AD584',
                                borderColor: '#18A85D',
                            }}>
                                <Text style={{ color: '#FFF', fontSize: 20 }}> + </Text>
                            </TouchableOpacity>
                        }
                    </View>
                </Modal>
                <Modal transparent visible={done}>
                    <View style={{ flex: 1, padding: 20, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ width: '100%', height: '20%' }}>
                            <LottieLoader
                                source={require('../../animation/success-green.json')}
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
            </View>
        </View>
    )
}

const viewStyle = StyleSheet.create({
    container: {
        backgroundColor: '#EDEDED',
        flex: 1,
    },
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
        marginVertical: 20,
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
        justifyContent: 'space-between',
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
    number: {
        fontSize: 16
    },
    tittle: {
        margin: 10,
        color: '#808080'
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
export default connect(mapStateToProps, mapDispatchToProps)(SetDrug)