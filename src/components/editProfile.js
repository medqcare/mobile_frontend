import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import {
    View,
    Text,
    Image,
    TextInput,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    ActivityIndicator,
    TouchableOpacity,
    Picker,
    BackHandler,
} from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Header } from 'react-navigation-stack'
import IfontAwesome from 'react-native-vector-icons/FontAwesome'
import RadioForm from 'react-native-simple-radio-button'
import DatePicker from 'react-native-datepicker'
import LottieLoader from 'lottie-react-native'
import {LinearGradient} from 'expo-linear-gradient'
import { edit_profile, setLoading } from '../stores/action'
import AsyncStorage from '@react-native-async-storage/async-storage'

//ICON
import Icon from 'react-native-vector-icons/Ionicons'
//Modal
import SettingModal from '../components/modals/setModal'
import { fullMonthFormat } from '../helpers/dateFormat'
import SelectModal from './modals/modalPicker'
import capitalFirst from '../helpers/capitalFirst'
import ArrowBack from '../assets/svg/ArrowBack'

const editProfile = (props) => {
    // console.log(props.userData, 'ini propsnya rwaktu di edit profile')
    var moment = require('moment')
    const [load, setLoad] = useState(false)
    const [modalF, setModalF] = useState(false)
    const [modalS, setModalS] = useState(false)
    const [valid, setValid] = useState(false)
    const [bloodTypeModal, setBloodTypeModal] = useState(false)
    const [rhesusTypeModal, setRhesusModal] = useState(false)
    const [insuranceStatusModal, setInsuranceStatusModal] = useState(false)
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

    const [genderlist, setGender] = useState([
        'Male',
        'Female',
    ])
    const [listTitle, setTitle] = useState([
        'Mr.',
        'Mrs.',
        'Miss.',
        'Ms.'
    ])
    const [userData, setUserData] = useState({
        photo: props.userData.photo || '',
        nik: props.userData.nik.toString(),
        title: props.userData.title || 'Mr.',
        firstName: props.userData.firstName,
        lastName: props.userData.lastName,
        gender: props.userData.gender || 'Male',
        dob: moment(props.userData.dob).format('DD/MM/YYYY'),
        bloodType: props.userData.bloodType || '',
        resus: props.userData.resus || '',
        phoneNumber: props.userData.phoneNumber || '',
        location: props.userData.location,
        insuranceStatus: props.userData.insuranceStatus,
    })
    const [selectedBloodTypeLabel, setselectedBloodTypeLabel] = useState(userData.bloodType)
    const [selectedRhesusLabel, setSelectedRhesusLabel] = useState(userData.resus)
    const [selectedInsuranceLabel, setSelectedInsuranceLabel] = useState(capitalFirst(userData.insuranceStatus))

    function setSelectedValue(value, changeKey){
        setUserData({
            ...userData,
            [changeKey] :value
        })
    }
    function validation() {
        if (userData.nik !== null && userData.nik.length > 0 && userData.nik.length !== 16 ||
            userData.firstName == '' || userData.firstName == null ||
            userData.dob == null ||
            userData.phoneNumber == null) {
            setValid(true)
            setModalF(true)
        } else {
            setValid(false)
            _filterdataSend(),
            props.navigation.navigate('Home')
        }
    }

    const _filterdataSend = () => {
        let dataSend
        // Methode
        Object.filter = (obj, predicate) =>
            Object.keys(obj)
                .filter(key => predicate(obj[key]))
                .reduce((res, key) => (res[key] = obj[key], res), {});
        dataSend = Object.filter(userData, value => value !== null)
        dataSend = Object.filter(dataSend, value => value !== undefined)
        dataSend = Object.filter(dataSend, value => value !== '')
        sendData(dataSend)
    }

    async function sendData(data) {
        console.log(data, 'yang mau dikirim')
        // console.log('masuk ke sendData')
        setLoad(true)
        // props.edit_profile(userData, props.setmodal)
        let token = await AsyncStorage.getItem('token')
        // console.log(JSON.parse(token).token)
        console.log(data.dob, 'ini dob');
        let wantedDate = data.dob.split('/')
        wantedDate = `${wantedDate[1]}/${wantedDate[0]}/${wantedDate[2]}`
        // console.log(new Date(wantedDate));
        data.dob = new Date(wantedDate)
        props.edit_profile(data, props.userData._id, JSON.parse(token).token)
            .then(backData => {
                console.log(backData, 'ini balikan datanya')
                setLoad(false)
                setModalS(true)
            })
            .catch(err => {
                setLoad(false)
                console.log(err)
            })
    }

    BackHandler.addEventListener('hardwareBackPress', () => {
        return (props.navigation.navigate('ProfileDetail'))
    })

    var radio_props = [
        {label: 'Laki-laki', value: 'Male' },
        {label: 'Perempuan', value: 'Female' }
    ]; 
    const chosenDate = fullMonthFormat(userData.dob)
    return (
        <KeyboardAvoidingView style={viewStyles.container} behavior={'padding'} enabled>
            <LinearGradient  start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={["#073B88",  "#048FBB"]} style={style.content}>
                <View style={{ flex: 1, marginTop: 32, flexDirection: 'row', alignItems: 'center', }}>
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate('ProfileDetail')}>
                        <View style={{ flexDirection: 'row', marginBottom: 15}} >
                            <ArrowBack />
                            <Text style={{ fontSize: 20, color: '#ffff', position: 'relative', }}>Ubah Data</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </LinearGradient>

            {/* Starts here */}

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* NIK */}
                <View style={style.inputTopContainer}>
                    <View style={style.input}>
                        <TextInput
                            style={style.inputText}
                            autoCapitalize={'none'}
                            autoFocus={false}
                            placeholder={'NIK'}
                            keyboardType={'numeric'}
                            placeholderTextColor="#DDDDDD" 
                            onChangeText={text =>
                                setUserData({ ...userData, nik: text })
                            }
                            value={userData.nik}
                        />
                    </View>
                </View>
                {/* NIK Error */}
                {userData.nik !== null && userData.nik.length > 0 && userData.nik.length !== 16 &&
                    <Text style={{ color: 'red' }}>NIK must contain at 16 characters</Text>
                }

                {/* First name error */}
                <View style={{  flexDirection: 'row', }}>
                    {!userData.firstName && valid &&
                        <Text style={{ color: 'red', marginVertical: 10, marginLeft: 5, fontSize: 14 }}>*</Text>
                    }
                </View>
                
                {/* First name form */}
                <View style={style.inputMiddleContainer}>
                    <View style={style.input}>
                        <TextInput
                            style={style.inputText}
                            autoCapitalize={'sentences'}
                            autoFocus={false}
                            placeholder={'Nama Depan'}
                            placeholderTextColor="#DDDDDD" 
                            onChangeText={text =>
                                setUserData({ ...userData, firstName: text })
                            }
                            value={userData.firstName}
                        />

                    </View>
                </View>

                {/* Last name form */}
                <View style={style.inputMiddleContainer}>
                    <View style={style.input}>
                        <TextInput
                            style={style.inputText}
                            autoCapitalize={'sentences'}
                            autoFocus={false}
                            placeholder={'Nama Belakang'}
                            placeholderTextColor="#DDDDDD" 
                            onChangeText={text =>
                                setUserData({ ...userData, lastName: text })
                            }
                            value={userData.lastName}
                    />
                    </View>
                </View>

                {/* Gender Form */}
                <View style={style.inputMiddleContainer}>
                    <View style={{...style.input, justifyContent: 'center', backgroundColor: 'transparent', borderWidth: 0,}}>
                        <RadioForm
                            radio_props={radio_props}
                            initial={0}
                            onPress={(value) => {setUserData({ ...userData, gender: value })}}
                            formHorizontal={true}
                            labelHorizontal={true}
                            animation={true}
                            labelStyle={{ paddingRight:10, fontSize: 14, color: '#DDDDDD'}}
                            style={style.inputText}
                            // style={{justifyContent:'center', color: '#DDDDDD'}}
                            buttonOuterSize={20}
                        />
                    </View>
                </View>

                {/* DOB error */}
                <View style={{ flexDirection: 'row', }}>
                    {!userData.dob && valid &&
                        <Text style={{ color: 'red', marginVertical: 15, marginLeft: 5, fontSize: 14 }}>*</Text>
                    }
                </View>

                {/* DOB Form */}
                <View style={style.inputMiddleContainer}>
                    <View style={{...style.input, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row'}}>
                        <Text style={style.inputText}>{chosenDate}</Text>
                        <DatePicker
                            date={chosenDate} //initial date from state
                            mode="date" //The enum of date, datetime and time                            
                            format='DD/MMMM/YYYY'
                            maxDate={new Date()}
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    display: 'none',
                                    position: 'absolute',
                                    right: 0,
                                    top: 5,
                                    justifyContent: 'center',
                                    alignItems: 'center',
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
                                setUserData({ ...userData, dob: date });
                                console.log(date);
                            }}
                        />
                    </View>
                </View>

                {/* Phone number form */}
                <View style={style.inputMiddleContainer}>
                    <View style={style.input}>
                        <TextInput
                            style={style.inputText}
                            autoCapitalize={'none'}
                            autoFocus={false}
                            placeholder={'Nomor Hp'}
                            placeholderTextColor="#DDDDDD"
                            keyboardType={'numeric'}
                            onChangeText={text =>
                                setUserData({ ...userData, phoneNumber: text })
                            }
                            value={userData.phoneNumber}
                        />
                    </View>
                </View>

                {/* Bloodtype form */}
                <View style={{...style.inputMiddleContainer, flexDirection: 'row'}}>
                    <TouchableOpacity 
                            onPress={() => setBloodTypeModal(true)}
                            style={style.button}
                        >
                            <Text style={style.inputText}>{selectedBloodTypeLabel}</Text>
                            <Image
                                source={require('../assets/png/ArrowDown.png')}
                            />
                            {/* <View style={{...style.input, flex: 0.5}}>
                        <Picker
                            selectedValue={userData.bloodType}
                            placeholderTextColor="#DDDDDD"
                            style={style.inputText}
                            mode={'dropdown'}
                            onValueChange={(itemValue, itemIndex) => {
                                setUserData({ ...userData, bloodType: itemValue });
                                console.log(userData)
                            }}>
                            <Picker.Item label="Gol Darah" value="Blodd Type" key={0}/>
                            <Picker.Item label="A" value="A" key={1}/>
                            <Picker.Item label="AB" value="AB" key={2}/>
                            <Picker.Item label="B" value="B" key={3}/>
                            <Picker.Item label="O" value="O" key={4}/>
                        </Picker>
                        </View> */}
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
                    />
                        {/* Rhesus form */}
                    <TouchableOpacity 
                            onPress={() => setRhesusModal(true)}
                            style={style.button}
                        >
                            <Text style={style.inputText}>{selectedRhesusLabel}</Text>
                            <Image
                                source={require('../assets/png/ArrowDown.png')}
                            />
                    </TouchableOpacity>
                        {/* <Picker
                            selectedValue={userData.resus}
                            placeholderTextColor="#DDDDDD"
                            style={style.inputText}
                            mode={'dropdown'}                                                                                                                                                                                                           
                            onValueChange={(itemValue, itemIndex) => {
                                setUserData({ ...userData, resus: itemValue });
                            }}>
                            <Picker.Item label="Rhesus" value="Rhesus" key={0} text-color={'red'} />
                            <Picker.Item label="-" value="-" key={1}  />
                            <Picker.Item label="+" value="+" key={2} />
                        </Picker> */}
                        <SelectModal
                            modal={rhesusTypeModal}
                            setModal={setRhesusModal}
                            selection={rhesusTypeSelection}
                            title='Silahkan pilih rhesus darah anda'
                            subtitle='Pilihan yang tersedia'
                            setSelectedValue={setSelectedValue}
                            setSelectedLabel={setSelectedRhesusLabel}
                            changeKey='resus'
                        />
                </View>

                {/* Relation form */}
                <View style={style.inputMiddleContainer}>
                    <View style={style.input}>
                {/* <View style={{ ...container.pickerContainer, width: '100%' }}> */}
                        <Picker
                            selectedValue={userData.statusFamily}
                            style={{ color: '#DDDDDD', height: 45, width: '100%' }}
                            placeholderTextColor="#DDDDDD"
                            mode={'dropdown'}
                            onValueChange={(itemValue, itemIndex) => {
                                setUserData({ ...userData, statusFamily: itemValue });
                            }}>
                            <Picker.Item label="Hubungan Keluarga" color="#DDDDDD" value="Status type" key={0}/>
                            <Picker.Item label="Adik" value="Adik" key={1}/>
                            <Picker.Item label="Kakak" value="Kakak" key={2}/>
                            <Picker.Item label="Paman" value="Paman" key={3}/>
                            <Picker.Item label="Bibi" value="Bibi" key={4}/>
                            <Picker.Item label="Ayah" value="Ayah" key={5}/>
                            <Picker.Item label="Ibu" value="Ibu" key={6}/>
                            <Picker.Item label="Kakek" value="Kakek" key={7}/>
                            <Picker.Item label="Nenek" value="Nenek" key={8}/>
                            <Picker.Item label="Anak" value="Anak" key={9}/>
                            <Picker.Item label="Sepupu" value="sepupu" key={10}/>
                    `        <Picker.Item label="Suami" value="suami" key={11}/>
                            <Picker.Item label="Istri" value="istri" key={12}/>
                        </Picker>
                    </View>
                </View>

                <View style={style.inputMiddleContainer}>
                        <TouchableOpacity 
                                onPress={() => setInsuranceStatusModal(true)}
                                style={style.button}
                            >
                                <Text style={style.inputText}>{selectedInsuranceLabel}</Text>
                                <Image
                                    source={require('../assets/png/ArrowDown.png')}
                                />
                        </TouchableOpacity>
                        {/* <Picker
                            mode="dropdown"
                            selectedValue={userData.InsuranceStatus}
                            // style={style.inputText}
                            style={{ height: 45, color: '#DDDDDD' }}
                            placeholderTextColor="#DDDDDD"
                            onValueChange={(itemValue, itemIndex) => {
                                setUserData({ ...userData, InsuranceStatus: itemValue })
                            }}>
                            <Picker.Item label={'Umum'} value={'UMUM'} key={0} />
                            <Picker.Item label={'BPJS'} value={'BPJS'} key={0} />
                            <Picker.Item label={'Asuransi'} value={'ASURANSI'} key={0} />
                        </Picker> */}
                        <SelectModal
                            modal={insuranceStatusModal}
                            setModal={setInsuranceStatusModal}
                            selection={insuranceStatusSelection}
                            title='Silahkan pilih tipe asuransi anda'
                            subtitle='Pilihan yang tersedia'
                            setSelectedValue={setSelectedValue}
                            setSelectedLabel={setSelectedInsuranceLabel}
                            changeKey='insuranceStatus'
                        />
                </View>

                {/* Address Form */}
                <View style={style.inputBottomContainer}>
                    <View style={style.input}>
                        <TextInput
                            autoCapitalize={'sentences'}
                            style={style.inputText}
                            autoFocus={false}
                            placeholder={'Alamat....'}
                            placeholderTextColor="#DDDDDD"
                            onChangeText={
                                text => setUserData({ ...userData, address: text })
                            }
                            value={userData.address}
                            />
                    </View>
                </View>


                <View style={style.buttonContainer}>
                    <TouchableOpacity onPress={() => { validation() }} style={container.button}>
                        {load ? <ActivityIndicator size={'small'} color='#FFF'/> :
                        <Text style={{ fontSize: 18, color: '#FFF' }}>Simpan Data</Text>
                        }
                    </TouchableOpacity>
                </View>

            </ScrollView>
            
        </KeyboardAvoidingView>
    )
}

const style = StyleSheet.create({
    inputTopContainer: {
        paddingTop: 20,
        paddingHorizontal: 10
    },

    inputMiddleContainer: {
        paddingTop: 10,
        paddingHorizontal: 10
    },

    inputBottomContainer: {
        paddingTop: 10,
        paddingBottom: 20,
        paddingHorizontal: 10
    },

    input: {
        height: 50,
        borderWidth: 1,
        paddingHorizontal: 20,
        borderRadius: 3,
        backgroundColor: '#2F2F2F'
    },

    inputText: {
        color: '#DDDDDD'
    },

    button: {
        flex: 0.5,
        height: 50,
        borderWidth: 1,
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

    content: {
        height: 70,
    },

    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:60
    }
})

const container = StyleSheet.create({
    base: {
        flex: 1,
        // backgroundColor: '#CCEDBF',
        alignItems: 'center',
        paddingVertical: 20
    },
    photoContainer: {
        height: 80,
        width: 80,
        alignItems: 'center',
        justifyContent: 'center'
    },
    photo: {
        height: '100%',
        width: '100%',
        backgroundColor: 'yellow',
        borderRadius: 50
    },
    editphoto: {
        width: '30%',
        height: 30,
        backgroundColor: '#33691E',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginTop: 10
    },
    input: {
        height: 50,
        borderColor: '#33691E',
        borderWidth: 1,
        paddingHorizontal: 20,
        borderRadius: 3,
    },
    pickerContainer: {
        height: 50,
        borderColor: '#33691E',
        borderWidth: 1,
        borderRadius: 3,
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    dob: {
        flexDirection: 'row',
        width: '100%',
        height: 50,
        borderColor: '#33691E',
        borderWidth: 1,
        borderRadius: 3,
        alignItems: 'center',
        paddingHorizontal: 10,
        justifyContent: 'space-between'
    },
    button: {
        height: 50,
        width: '85%',
        backgroundColor: '#005ea2',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    }
})
const textStyle = StyleSheet.create({
    editphoto: {
        color: '#FFF'
    },
    header: {
        color: '#33691E',
        fontSize: 16,
        marginVertical: 10
    }
})


const viewStyles = StyleSheet.create({
    container: {
        backgroundColor: '#1f1f1f',
        minHeight: hp('100%'),
        width: wp('100%'),
        flex: 1
    },
    form: {
        width: wp('90%'),
        minHeight: hp('70%'),
        backgroundColor: '#FFF',
        marginLeft: 'auto',
        marginRight: 'auto',
        flex: 1,
    },
    name: {
        flexDirection: 'row'
    }
})

const textStyles = StyleSheet.create({
    textInput: {
        height: 40,
        borderColor: 'gray',
        borderBottomWidth: 1,
        marginHorizontal: wp('2%')
    },
    titleInput: {
        marginLeft: wp('2%'),
        marginTop: 10
    }
})

const mapDispatchToProps = {
    edit_profile,
    setLoading
}

const mapStateToProps = state => {
    return state
}
export default connect(mapStateToProps, mapDispatchToProps)(editProfile)