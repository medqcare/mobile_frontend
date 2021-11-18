import React from 'react'
import { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    TextInput,
    ScrollView,
    Picker,
    Alert,
    ToastAndroid,
    ImageBackground,
    ActivityIndicator,
} from 'react-native'


import {LinearGradient} from 'expo-linear-gradient'
import DatePicker from 'react-native-datepicker';
import { connect } from 'react-redux';
import getDay from '../../../helpers/getDay'
import { edit_profile, setLoading } from '../../../stores/action'
import AsyncStorage from '@react-native-async-storage/async-storage'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import SelectModal from '../../modals/modalPicker'

//Icon
import IconAD from 'react-native-vector-icons/AntDesign'
import Icon from 'react-native-vector-icons/Ionicons'
import ArrowBack from '../../../assets/svg/ArrowBack'
//Modal

import LottieLoader from 'lottie-react-native'

const editFamilyData = (props) => {
    let dataFamily = props.navigation.state.params.data
    const [genderlist, setGender] = useState(['Male', 'Female',])
    const [listTitle, setTitle] = useState(['Mr.', 'Mrs.', 'Miss.', 'Ms.'])
    const [load, setLoad] = useState(false)
    const [modalS, setModalS] = useState(false)

    const [bloodTypeModal, setBloodTypeModal] = useState(false)
    const [rhesusTypeModal, setRhesusModal] = useState(false)
    const [insuranceStatusModal, setInsuranceStatusModal] = useState(false)
    const [statusfamilyModal, setStatusFamilyModal] = useState(false)

    const bloodTypeSelection = ['A', 'AB', 'B', 'O']
    const rhesusTypeSelection = ['+', '-']

    const insuranceStatusSelection = [
        {
            label: 'Umum',
            value: 'UMUM'
        },
        {
            label: 'BPJS',
            value: 'BPJS'
        },
        {
            label: 'Asuransi',
            value: 'ASURANSI'
        }
    ]

    const statusfamilySelection = [
        {
            label: 'Suami',
            value: 'SUAMI'
        },
        {
            label: 'Istri',
            value: 'ISTRI'
        },
        {
            label: 'Anak',
            value: 'ANAK'
        }
    ]

    const [changeData, setChangeData] = useState({
        nik: '',
        title: '',
        firstName: '',
        lastName: '',
        gender: '',
        dob: '',
        bloodType: '',
        resus: '',
        phoneNumber: '',
        insuranceStatus: '',
        statusFamily: '',
        address: '',
    }) 


    async function setSelectedValue(value, changeKey){
        setUserData({
            ...changeData,
            [changeKey] :value
        })
    }

    var radio_props = [
        {label: 'Laki-laki', value: 'Male' },
        {label: 'Perempuan', value: 'Female' }
    ]; 
    
    async function validation() {
        if (changeData.nik !== null && changeData.nik.length > 1 && changeData.nik.length !== 16 ||
            changeData.firstName == '' || changeData.firstName == null ||
            changeData.dob == null) {
            ToastAndroid.show('Please check the data', ToastAndroid.LONG)
        } else {
            setLoad(true)
            let dataSend
            // Methode
            Object.filter = (obj, predicate) =>
                Object.keys(obj)
                    .filter(key => predicate(obj[key]))
                    .reduce((res, key) => (res[key] = obj[key], res), {});
            dataSend = Object.filter(changeData, value => value !== null)
            dataSend = Object.filter(dataSend, value => value !== undefined)
            dataSend = Object.filter(dataSend, value => value !== '')

            console.log(dataSend, 'ini data yang mau di dikirim')
            if (typeof dataSend.nik === 'string' && dataSend.nik !== '') {
                dataSend.nik = Number(dataSend.nik)
            }
            sendData(dataSend)
        }
    }

    async function sendData(data) {
        let token = await AsyncStorage.getItem('token')
        props.edit_profile(data, dataFamily._id, JSON.parse(token).token)
            .then(backData => {
                // console.log(backData.message, 'ini balikan datanya')
                setLoad(false)
                setModalS(true)
            })
            .catch(err => {
                console.log(err)
                setLoad(false)
            })
    }

    useEffect(() => {
        console.log(dataFamily,'panggilan ketika dibuka')
        let _gender,_statusFamily, _dob,_nik, _lastName, _bloodtype, _rhesus, _phoneNumber, _insuranceStatus
        if (dataFamily.nik) {
            _nik = dataFamily.nik + ''
        } else {
            _nik = ''
        }
        if (dataFamily.lastName) {
            _lastName = dataFamily.lastName
        } else {
            _lastName = ''
        }
        if (dataFamily.gender) {
            _gender = dataFamily.gender
        } else {
            _gender = ''
        }
        if (dataFamily.bloodType) {
            _bloodtype = dataFamily.bloodType
        } else {
            _bloodtype = ''
        }
        if (dataFamily.dob) {   
            _dob = dataFamily.dob
        } else{
            _dob= ''
        }
        if (dataFamily.statusFamily) {   
            _statusFamily = dataFamily.statusFamily
        } else{
            _statusFamily= ''
        }
        if (dataFamily.resus) {
            _rhesus = dataFamily.resus
        } else {
            _rhesus = ''
        }
        if (dataFamily.phoneNumber) {
            _phoneNumber = dataFamily.phoneNumber
        } else {
            _phoneNumber = ''
        }
        if (dataFamily.insuranceStatus) {
            _insuranceStatus = dataFamily.insuranceStatus
        } else {
            _insuranceStatus = ''
        }
        // console.log('sedangkan ini adlah niknya', _nik)
        setChangeData({
            nik: _nik,
            title: dataFamily.title,
            firstName: dataFamily.firstName,
            lastName: _lastName,
            gender: _gender,
            dob: _dob,
            bloodType: _bloodtype,
            resus: _rhesus,
            phoneNumber: _phoneNumber,
            insuranceStatus: _insuranceStatus
        })
    }, [])

    
    const[selectedBloodTypeLabel, setselectedBloodTypeLabel] = useState(dataFamily.bloodType)
    const[selectedRhesusLabel,setSelectedRhesusLabel] = useState(dataFamily.resus)
    const[selectedInsuranceLabel,setselectedInsuranceLabel] = useState(dataFamily.insuranceStatus)
    const[selectedStatusFamilyLabel,setSelectedStatusFamilyLabel] = useState(dataFamily.statusFamily)

    console.log('ini adlah change datanya', changeData)
    return (
        <View style={{ flex: 1 }}>
            <LinearGradient  start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={["#073B88",  "#048FBB"]} style={container.content}>
                <View style={{ flex: 1, marginTop: 32, flexDirection: 'row', alignItems: 'center', }}>
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate('FamilyList')}>
                        <View style={{ flexDirection: 'row', }} >
                            <ArrowBack />
                            <Text style={{ paddingHorizontal:7,fontSize: 20, color: '#ffff', position: 'relative', }}>Ubah Data</Text>
                        </View>

                    </TouchableOpacity>
                </View>
            </LinearGradient>
                <View style={container.base}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                    {/* <TouchableOpacity style={container.editphoto}>
                    <Text style={textStyle.editphoto}>Edit Photo</Text>
                    </TouchableOpacity> */}
                    <TextInput
                        style={{ ...container.input, width: '100%' }}
                        autoCapitalize={'none'}
                        autoFocus={false}
                        placeholder={'NIK'}
                        keyboardType={'numeric'}
                        onChangeText={text =>
                            setChangeData({ ...changeData, nik: text })
                        }
                        value={changeData.nik}
                    />
                        {changeData.nik !== null && changeData.nik.length > 0 && changeData.nik.length !== 16 &&
                            <Text style={{ color: 'red' }}>NIK must contain at 16 characters</Text>
                        }
                        {!changeData.firstName &&
                            <Text style={textStyle.start}>*</Text>
                        }
                    <View style={{ flexDirection: 'row', width: '100%' }}>
                        <TextInput
                            style={{ ...container.input, width: '100%' }}
                            autoCapitalize={'sentences'}
                            autoFocus={false}
                            placeholder={'Nama Depan'}
                            onChangeText={text =>
                                setChangeData({ ...changeData, firstName: text })
                            }
                            value={changeData.firstName}
                        />
                    </View>
                    <TextInput
                            style={{ ...container.input, width: '100%' }}
                            autoCapitalize={'sentences'}
                            autoFocus={false}
                            placeholder={'Last Name'}
                            onChangeText={text =>
                                setChangeData({ ...changeData, lastName: text })
                            }
                            value={changeData.lastName}
                     />
                    <View style={{marginTop:20}}>
                        <RadioForm
                            initial={0,1}
                            radio_props={radio_props}
                            onPress={(itemValue) => {setChangeData({ ...changeData, gender:itemValue})}}
                            formHorizontal={true}
                            labelHorizontal={true}
                            animation={true}
                            labelStyle={{ paddingRight:10, fontSize: 14, color: '#DDDDDD'}}
                            style={{alignItems:'center',marginTop:10,paddingHorizontal:20,color: '#DDDDDD'}}
                            buttonOuterSize={20}
                        />
                    </View>
                    <View style={{...container.dob, color: '#DDDDDD'}}>
                        <DatePicker
                            style={{ color:'#DDDDDD',fontWeight:'bold',fontSize:14, width: '100%',backgroundColor: '#2F2F2F' }}
                            date={changeData.dob} //initial date from state
                            mode="date" //The enum of date, datetime and time
                            placeholder="Select date"
                            placeholderTextColor="#DDDDDD"
                            maxDate={new Date()}
                            format='DD/MM/YYYY'
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    display: 'none',
                                    // position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0,
                                },
                                dateInput: {
                                    marginLeft: 0,
                                    // marginLeft: 36,
                                    borderWidth: 0,
                                    borderColor: '#D5EDE1',
                                },
                            }}
                            onDateChange={date => {
                                setChangeData({ ...changeData, dob: date });
                            }}
                        />
                        </View>
                            {!changeData.dob &&
                                <Text style={{ color: 'red' }}>DoB Don't Empty</Text>
                            }
                                                
                            <TextInput
                            style={{ ...container.input, width: '100%' }}
                            autoCapitalize={'none'}
                            autoFocus={false}
                            placeholder={'Phone Number'}
                            keyboardType={'numeric'}
                            onChangeText={text =>
                                setChangeData({ ...changeData, phoneNumber: text })
                            }
                            value={changeData.phoneNumber}
                        />    
                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ ...container.pickerContainer, width: '50%' }}>
                               <TouchableOpacity
                                    onPress={()=>setBloodTypeModal(true)}
                                    style={container.buttonModal}
                                 
                               >
                                    <Text style={container.inputText} >    {selectedBloodTypeLabel} </Text>
                                    <Image
                                        style={{width:12,height:10.2}} 
                                        source={require('../../../assets/png/ArrowDown.png')}
                                    />
                               </TouchableOpacity>
                               <SelectModal
                                    modal={bloodTypeModal}
                                    setModal={setBloodTypeModal}
                                    selection={bloodTypeSelection}
                                    title='Silahkan pilih golongan darah anda'
                                    subtitle='Pilihan yang tersedia'
                                    setSelectedValue={setSelectedValue}
                                    setSelectedLabel={setselectedBloodTypeLabel}
                                    changeKey='bloodType'
                               >
                               </SelectModal>
                            </View>

                            <View style={{ ...container.pickerContainer, width: '50%' }}>
                                <TouchableOpacity
                                    onPress={()=>setRhesusModal(true)}
                                    style={container.buttonModal}
                                >
                                    <Text style={container.inputText}> {selectedRhesusLabel} </Text>
                                    <Image
                                        style={{width:12,height:10.2}} 
                                        source={require('../../../assets/png/ArrowDown.png')}
                                    />
                                </TouchableOpacity>
                                <SelectModal
                                    modal={rhesusTypeModal}
                                    setModal={setRhesusModal}
                                    selection={rhesusTypeSelection}
                                    title='Silahkan pilih golongan resus anda'
                                    subtitle='Pilihan yang tersedia'
                                    setSelectedValue={setSelectedValue}
                                    setSelectedLabel={setSelectedRhesusLabel}
                                    changeKey='resus'
                                >
                                </SelectModal>
                         </View>
                            
                        </View>    
                        <View style={{ ...container.pickerContainer, width: '100%' }}>
                                <TouchableOpacity
                                onPress={()=>setInsuranceStatusModal(true)}
                                style={container.buttonModal}
                                >
                                    <Text style={container.inputText}> {selectedInsuranceLabel} </Text>
                                    <Image
                                        style={{width:12,height:10.2}} 
                                        source={require('../../../assets/png/ArrowDown.png')}
                                    />
                                </TouchableOpacity>
                                <SelectModal
                                    modal={insuranceStatusModal}
                                    setModal={setInsuranceStatusModal}
                                    selection={insuranceStatusSelection}
                                    title='Silahkan pilih golongan resus anda'
                                    subtitle='Pilihan yang tersedia'
                                    setSelectedValue={setSelectedValue}
                                    setSelectedLabel={setselectedInsuranceLabel}
                                    changeKey='insuranceStatus'
                                >
                                </SelectModal>
                        </View>
                        <View style={{ ...container.pickerContainer, width: '100%' }}>
                           <TouchableOpacity
                                onPress={()=>setStatusFamilyModal(true)}
                                style={container.buttonModal}
                           >
                           <Text style={container.inputText}> {selectedStatusFamilyLabel} </Text>
                                <Image
                                    style={{width:12,height:10.2}} 
                                    source={require('../../../assets/png/ArrowDown.png')}
                                />
                           </TouchableOpacity>
                           <SelectModal
                                modal={statusfamilyModal}
                                setModal={setStatusFamilyModal}
                                selection={statusfamilySelection}
                                title='Silahkan pilih Hubungan Keluarga anda'
                                subtitle='Pilihan yang tersedia'
                                setSelectedValue={setSelectedValue}
                                setSelectedLabel={setSelectedStatusFamilyLabel}
                                changeKey='statusFamily'
                           >
                        
                           </SelectModal>             
                        </View>
                    <TextInput
                        style={{   
                            height: 80,
                            borderWidth: 1,
                            paddingHorizontal: 20,
                            borderRadius: 3,
                            color: '#DDDDDD',
                            backgroundColor: '#2F2F2F',
                            marginTop: 20, 
                            color: '#DDDDDD',
                            width: '100%',
                            fontSize: 14,
                            paddingBottom:50 
                        }}
                            autoCapitalize={'sentences'}
                            autoFocus={false}
                            placeholder={'Alamat....'}
                            placeholderTextColor="#DDDDDD"
                            onChangeText={
                                text => setDataFamily({ ...dataFamily, address: text })
                            }
                            value={dataFamily.address}
                        />
                    </ScrollView>
                    <View style={{ alignItems: 'flex-end', marginTop: 20, marginBottom: 5 }}>    
        
                        <TouchableOpacity onPress={() => { validation() }} 
                            style={container.button}>
                            {load ? 
                                <ActivityIndicator size={'small'} color='#FFF' /> :
                                <Text style={{ fontSize: 14, color: '#FFF' }}>Simpan Data</Text>
                            }
                        </TouchableOpacity>
                        {modalS &&
                            <LottieLoader
                                source={require('../../../screens/animation/success-green.json')}
                                autoPlay
                                loop={false}
                                onAnimationFinish={() => props.navigation.navigate('FamilyList')}
                            />
                        }   
                    </View>    
                </View>
        </View> 
    )
}

const container = StyleSheet.create({
    base: {
        flex: 1,
        // backgroundColor: '#CCEDBF',
        padding: 20,
        backgroundColor: '#1F1F1F'
    },
    inputText: {
        color:'#DDDDDD'
    },
    content: {
        height: 85
    },
    input: {
        height: 50,
        paddingHorizontal: 20,
        borderRadius: 3,
        backgroundColor: '#2F2F2F',
        color: '#DDDDDD',
        marginTop:20
    },
    buttonModal:{
        flex: 0.5,
        height: 70,
        
        paddingHorizontal: 20,
        borderRadius: 3,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
        backgroundColor: '#2F2F2F'
	},

	buttonText: {
		fontSize: 15,
		color: '#DDDDDD',
    },
    pickerContainer: {
        height: 50,
        borderRadius: 3,
        borderWidth:1,
        justifyContent: 'center',
        paddingHorizontal: 10,
        backgroundColor: '#2F2F2F',
        color: '#DDDDDD',
        marginTop:20
    },
    dob: {
        flexDirection: 'row',
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderRadius: 3,
        marginTop:10,
        alignItems: 'center',
        justifyContent: 'center',
        color: '#DDDDDD',
        fontWeight:'bold',
        fontSize:14
    },
    button: {
        height: 50,
        width: '100%',
        backgroundColor: '#005EA2',
        borderRadius: 10,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        
        fontSize:14,
        color: '#DDDDDD',
    },
    title: {
        flexDirection: 'row',
        color: '#DDDDDD',
        marginTop:20
    },
})

const textStyle = StyleSheet.create({
    header: {
        fontSize: 14,
        marginVertical: 10,
    },
    start: {
        marginRight: 5,
        color: 'red',
    },
    button: {
        color: '#DDDDDD',
        fontWeight: 'bold'
    },
    input: {
        color: '#DDDDDD'
    },
    pickerContainer: {
        color: '#DDDDDD'
    }
})

const mapDispatchToProps = {
    edit_profile,
    setLoading
}
const mapStateToProps = state => {
    return state
}

export default connect(mapStateToProps, mapDispatchToProps)(editFamilyData)