import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    KeyboardAvoidingView,
    ImageBackground,
    Picker,
    ActivityIndicator,
    Image
} from 'react-native'
import {LinearGradient} from 'expo-linear-gradient'
import DatePicker from 'react-native-datepicker';
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import getDay from '../../../helpers/getDay'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import SelectModal from '../../../components/modals/modalPicker'

//action
import { addFamily, setLoading } from '../../../stores/action'
//Icon
import Icon from 'react-native-vector-icons/Ionicons'
//Modal
import { ToastAndroid } from 'react-native';

import ArrowBack from '../../../assets/svg/ArrowBack'
import { fullMonthFormat } from '../../../helpers/dateFormat';
import SelectModalFamily from '../../../components/modals/modalPickerFamily';

const familyForm = (props) => {
    // console.log(props, 'ini data yang di addFamily')
    //local state
    var moment = require('moment')
    const genderlist = ['Male', 'Female']
    const listTitle = ['Mr.', 'Mrs.', 'Miss.', 'Ms.', 'Children']
    const [load, setLoad] = useState(false)
    const [valid, setValid] = useState(false)
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
            url: require('../../../assets/png/ic_profile0.png'),
            label: 'Suami',
            value: 'SUAMI'
        },
        {
            url: require('../../../assets/png/ic_profile1.png'),
            label: 'Istri',
            value: 'ISTRI'
        },
        {
            url: require('../../../assets/png/ic_profile2.png'),
            label: 'Anak',
            value: 'ANAK'
        }
    ]



    const [dataFamily, setDataFamily] = useState({
        nik: null,
        firstName: null,
        lastName: null,
        gender: null,
        // dob: null,
        dob: moment(props.userData.dob).format('DD/MM/YYYY') || null,
        bloodType: null,
        resus: null,
        phoneNumber: null,
        // statusFamily: null,
        insuranceStatus: '',
      
    })
    
    const [gender , setGender] = useState  ({
    })
    var radio_props = [
        {label: 'Laki-laki', value: 'Male' },
        {label: 'Perempuan', value: 'Female' }
    ]; 

    const validation = () => {
        console.log(dataFamily, 'log======');

        if (dataFamily.firstName == null ||
            dataFamily.nik !== null && dataFamily.nik.length > 1 && dataFamily.nik.length !== 16 ||
            dataFamily.firstName !== null && dataFamily.firstName.length == 0 ||
            dataFamily.dob == null) {
            console.log(dataFamily, 'ini data family')
            setValid(true)
            ToastAndroid.show('Please check the Data', ToastAndroid.LONG)
        } else {
            setValid(false)
            setLoad(true)
            Finalvalidation(dataFamily)
        }
    }

    async function setSelectedValue(value, changeKey){
        setUserData({
            ...dataFamily,
            [changeKey] :value
        })
    }


    function Finalvalidation(_sendData) {
        // Methode
        Object.filter = (obj, predicate) =>
            Object.keys(obj)
                .filter(key => predicate(obj[key]))
                .reduce((res, key) => (res[key] = obj[key], res), {});

        var send = Object.filter(_sendData, value => value !== null)
        send = Object.filter(send, value => value !== '')

        let str = _sendData.dob.split('/')
        let newStr = [str[1], str[0], str[2]]
        send.dob = newStr.join('/')
        if (typeof send.nik == 'string') {
            send.nik = Number(send.nik)
        }
        console.log(send, 'data yang mau dikirim')
        props.addFamily(send, props.navigation, setLoadFalse)
    }

    function setLoadFalse() {
        setLoad(false)
    }
    
    const[selectedBloodTypeLabel, setselectedBloodTypeLabel] = useState(dataFamily.bloodType)
    const[selectedRhesusLabel,setSelectedRhesusLabel] = useState(dataFamily.resus)
    const[selectedInsuranceLabel,setselectedInsuranceLabel] = useState(dataFamily.insuranceStatus)
    const[selectedStatusFamilyLabel,setSelectedStatusFamilyLabel] = useState(dataFamily.statusFamily)
   
    const chosenDate = fullMonthFormat(dataFamily.dob)
    return (
        <View style={style.container}>
            <LinearGradient  start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={["#073B88",  "#048FBB"]} style={style.content}>
                <View style={{ flex: 1, marginTop: 32, flexDirection: 'row', alignItems: 'center', }}>
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate('FamilyList')}>
                        <View style={{ flexDirection: 'row', }} >
                            <ArrowBack />
                            <Text style={{ paddingHorizontal:7,fontSize: 20, color: '#ffff', position: 'relative', }}>Tambah Keluarga</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </LinearGradient>

              <View style={container.base}>
                <ScrollView showsVerticalScrollIndicator={false}>
                {/* NIK Input */}
                    <TextInput
                        style={{ ...container.input, color: '#DDDDDD', marginTop:25, width: '100%' }}
                        autoCapitalize={'none'}
                        autoFocus={false}
                        placeholder={'NIK'}
                        keyboardType={'numeric'}
                        placeholderTextColor="#DDDDDD" 
                        onChangeText={text =>
                            setDataFamily({ ...dataFamily, nik: text })
                        }
                        value={dataFamily.nik}
                    />
                {/* NIK Error Input */}    
                        {dataFamily.nik !== null && dataFamily.nik.length > 1 && dataFamily.nik.length !== 16 &&
                            <Text style={{ color: 'red' }}>NIK must contain at 16 characters</Text>
                        }
                {/* First Name Error Input */}            
                        <View style={{  flexDirection: 'row', }}>
                            {!dataFamily.firstName && valid &&
                                <Text style={{ color: 'red', marginVertical: 10, marginLeft: 5, fontSize: 14 }}>*</Text>
                            }
                        </View>
                {/* First Name Input */}    
                    <View style={{ flexDirection: 'row', width: '100%' }}>
                        <TextInput
                            style={{ ...container.input, width: '100%' }}
                            autoCapitalize={'sentences'}
                            autoFocus={false}
                            placeholder={'Nama Depan'}
                            placeholderTextColor="#DDDDDD" 
                            onChangeText={text =>
                                setDataFamily({ ...dataFamily, firstName: text })
                            }
                            value={dataFamily.firstName}
                        />
                    </View>
                {/* Last Name Input */}        
                    <TextInput
                            style={{ ...container.input, width: '100%' }}
                            autoCapitalize={'sentences'}
                            autoFocus={false}
                            placeholder={'Nama Belakang'}
                            placeholderTextColor="#DDDDDD" 
                            onChangeText={text =>
                                setDataFamily({ ...dataFamily, lastName: text })
                            }
                            value={dataFamily.lastName}
                    />
                {/* Gender Input */}               
                    <View style={{marginTop:10}}>
                        <RadioForm
                            radio_props={radio_props}
                            initial={0}
                            onPress={(value) => {setDataFamily({ ...dataFamily, gender:value})}}
                            formHorizontal={true}
                            labelHorizontal={true}
                            animation={true}
                            labelStyle={{ paddingRight:10, fontSize: 14, color: '#DDDDDD'}}
                            style={{alignItems:'center',marginTop:10,paddingHorizontal:20,color: '#DDDDDD'}}
                            buttonOuterSize={20}
                    />      
                    </View>
                {/* DOB Error */}    
                        <View style={{ flexDirection: 'row', }}>
                            {!dataFamily.dob && valid &&
                                <Text style={{ color: 'red', marginVertical: 15, marginLeft: 5, fontSize: 14 }}>*</Text>
                            }
                        </View>
                {/* DOB Form  */}      
                  <View style={container.dobMiddleContainer}>   
                    <View style={container.dob}>
                        <Text style={{marginLeft:5,marginTop:30,color:'#DDDDDD'}}> {chosenDate}</Text>
                        <DatePicker
                            style={{ width: '100%' }}
                            date={chosenDate.dob} //initial date from state
                            mode="date" //The enum of date, datetime and time
                            format='DD/MM/YYYY'
                            maxDate={new Date()}
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    display: 'none',
                                    position: 'absolute',
                                    right: 1,
                                    bottom:30,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    shadowColor: 'black',
                                },
                                dateInput: {
                                    marginLeft: 0,
                                    borderWidth: 0,
                                    borderColor: '#D5EDE1',
                                },
                                dateText: {
                                    display: 'none',
                                }
                            }}
                            onDateChange={date => {
                                setDataFamily({ ...dataFamily, dob: date });
                            }}
                        />
                    </View>
                 </View>   
                  {/* Phone Number Input */}        
                    <TextInput
                        style={{ ...container.input, marginTop:15, width: '100%' }}
                        autoCapitalize={'none'}
                        autoFocus={false}
                        placeholder={'Nomor Hp'}
                        placeholderTextColor="#DDDDDD"
                        keyboardType={'numeric'}
                        onChangeText={text =>
                            setDataFamily({ ...dataFamily, phoneNumber: text })
                        }
                        value={dataFamily.phoneNumber}
                    />
                    {/* Blood Input */} 
                    <View style={{ width: '100%', flexDirection: 'row' }}>
                        <View style={{ ...container.pickerContainer, width: '50%' }}>
                            <TouchableOpacity
                                onPress={()=>setBloodTypeModal(true)}
                                style={container.buttonModal}
                                >
                                <Text style={container.inputText}> Gol Darah:  {selectedBloodTypeLabel} </Text>
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
                    {/* Rhesus Input */} 
                        <View style={{ ...container.pickerContainer, width: '50%' }}>
                            <TouchableOpacity
                                onPress={()=>setRhesusModal(true)}
                                style={container.buttonModal}
                                >
                                <Text style={container.inputText} >  Rhesus : {selectedRhesusLabel} </Text>
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
                                changeKey='rhesusType'
                           >
                           
                           </SelectModal>
                        </View>
                    </View>
                {/* Status Family Input */}     
                    <View style={{ ...container.pickerContainer, width: '100%' }}>
                        <TouchableOpacity
                            onPress={()=>setStatusFamilyModal(true)}
                            style={container.buttonModal}
                            >
                            <Text style={container.inputText}>  Hubungan Keluarrga : {selectedStatusFamilyLabel} </Text>
                            <Image
                                style={{width:12,height:10.2}} 
                                source={require('../../../assets/png/ArrowDown.png')}
                        />
                        </TouchableOpacity>

                        <SelectModalFamily
                                modal={statusfamilyModal}
                                setModal={setStatusFamilyModal}
                                selection={statusfamilySelection}
                                title='Silahkan pilih golongan keluarga anda'
                                subtitle='Pilihan yang tersedia'
                                setSelectedValue={setSelectedValue}
                                setSelectedLabel={setSelectedStatusFamilyLabel}
                                changeKey='statusfamilyType'
                        >
                        </SelectModalFamily>
                
                    </View>
                {/* Golongan Status Input */}     
                    <View style={[container.pickerContainer]}>
                            <TouchableOpacity
                                onPress={()=>setInsuranceStatusModal(true)}
                                style={container.buttonModal}
                                >
                                <Text style={container.inputText}>  Status : {selectedInsuranceLabel} </Text>
                                <Image
                                    style={{width:12,height:10.2}} 
                                    source={require('../../../assets/png/ArrowDown.png')}
                                 />
                            </TouchableOpacity>

                            <SelectModal
                                    modal={insuranceStatusModal}
                                    setModal={setInsuranceStatusModal}
                                    selection={insuranceStatusSelection}
                                    title='Silahkan pilih golongan Status anda'
                                    subtitle='Pilihan yang tersedia'
                                    setSelectedValue={setSelectedValue}
                                    setSelectedLabel={setselectedInsuranceLabel}
                                    changeKey='insurancestatusType'
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
                        // onChangeText={
                        //     text => setDataFamily({ ...dataFamily, address: text })
                        // }
                        // value={dataFamily.address}
                     />
                </ScrollView>
                <View style={{ alignItems: 'flex-end', marginTop: 20, marginBottom: 5 }}>
            
                    <TouchableOpacity onPress={() => {validation() }}
                        style={container.button}>
                        {load ?
                            <ActivityIndicator size={'small'} color={'#FFF'} /> :
                            <Text style={{...textStyle.button, fontSize:14}}>Tambah Keluarga</Text>
                        }
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const container = StyleSheet.create({
    base: {
        flex: 1,
        // backgroundColor: '#CCEDBF',
        paddingHorizontal: 20   
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
    inputText:{
        color:'#DDDDDD',
        marginLeft:-17
    },
    input: {
        height: 50,
        borderWidth: 1,
        paddingHorizontal: 20,
        borderRadius: 3,
        color: '#DDDDDD',
        backgroundColor: '#2F2F2F',
        marginTop: 20,
        fontSize: 14
    },
    pickerContainer: {
        height: 50,
        backgroundColor: '#2F2F2F',
        borderWidth: 1,
        borderRadius: 3,
        justifyContent: 'center',
        paddingHorizontal: 10,
        marginTop:20,
        fontSize:14
    },
    dob: {
        height: 50,
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 3,
        backgroundColor: '#2F2F2F',
        justifyContent: 'center',
        marginTop:20
    },
    dobMiddleContainer:{
        paddingTop: 0,
        paddingHorizontal: 0
    },
    button: {
        height: 50,
        width: '100%',
        backgroundColor: '#005EA2',
        borderWidth: 1,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        
        fontSize:14,
        color: '#DDDDDD'
    },
})

const textStyle = StyleSheet.create({
    header: {
        color: '#33691E',
        fontSize: 14,
        marginVertical: 10
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

const style = StyleSheet.create({
    container: {
        backgroundColor: '#1F1F1F',
        minHeight: '100%'
    },
    content:{
        height: 85
    },
    input: {
        alignItems: 'center',
        justifyContent: 'center',
        width: wp('95%'),
        fontSize: 14
    },
    inputMiddleContainer: {
        paddingTop: 10,
        paddingHorizontal: 10
    },
    textInput: {
        width: 330,
        paddingTop: 6,
        paddingBottom: 6,
        margin: 5,
        fontSize:14
    },
    submit: {
        backgroundColor: 'skyblue',
        width: 150,
        height: 48,
        borderRadius: 9,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30
    }
})

const mapDispatchToProps = {
    addFamily,
    setLoading
}
const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps, mapDispatchToProps)(familyForm)