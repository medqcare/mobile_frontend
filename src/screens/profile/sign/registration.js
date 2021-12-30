import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  BackHandler,
  KeyboardAvoidingView,
  ToastAndroid,
  StatusBar,
  Image,
  Picker,
} from 'react-native';
import { CreatePatientAsUser, setLoading, Logout } from '../../../stores/action';
import { connect } from 'react-redux';



// For proper case
import capitalFirst from '../../../helpers/capitalFirst';

// Select Modal 
import SelectModal from '../../../components/modals/modalPicker'
import LocationModalPicker from '../../../components/modals/LocationModalPicker'

// Radio Form
import RadioForm from 'react-native-simple-radio-button'

// Date picker
import DatePicker from 'react-native-datepicker'

// For finding width percentage
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

// For proper date format
import { fullMonthFormat } from '../../../helpers/dateFormat'

// For proper number format
import withZero from '../../../helpers/withZero';


const DataCompletion = props => {
	// Moment
	var moment = require('moment')

    // Region
    const region = require('../../../assets/Region/province')
    
	// Province 
	const [province, setProvince] = useState(region.province)
	const [provinceModal, setProvinceModal] = useState(false)
	const [selectedProvinceLabel, setSelectedProvinceLabel] = useState(province[0].name)
    const provinceSelection = province
    // console.log(province)

    //District
    const [district, setDistrict] = useState(region.kabupatenkota('11'))
    const [districtModal, setDistrictModal] = useState(false)
    const [selectedDistrictLabel, setSelectedDistrictLabel] = useState(district[0].name)
    // console.log(district[0])
    // console.log(selectedDistrictLabel)

	// UserData
	const [userData, setUserData] = useState({
        imageUrl: '',
        nik: '',
        firstName: '',
        lastName: '',
        gender: 'Male',
        dob: moment(new Date()).format('DD/MMMM/YYYY'),
        bloodType: 'A',
        resus: '+',
        phoneNumber: '',
        insuranceStatus: 'UMUM',
		location: {
			province: selectedProvinceLabel,
			city: selectedDistrictLabel,
			type: "Point",
			coordinates: [district[0].longitude, district[0].latitude]
		},
    })

	const newDate = new Date()
	const sendDate = `${withZero(newDate.getDate())}/${withZero(newDate.getMonth()+1)}/${withZero(newDate.getFullYear())}`
	const [chosenDate, setChosenDate] = useState(fullMonthFormat(sendDate))

	// Loading animation for submit button
    const [load, setLoad] = useState(false)	

	// Gender radio
	const gender_radio = [
        { label: 'Laki-laki', value: 'Male' },
        { label: 'Perempuan', value: 'Female' }
    ]; 

	// Blood Type
	const [bloodTypeModal, setBloodTypeModal] = useState(false)
	const bloodTypeSelection = ['A', 'AB', 'B', 'O']
	const [selectedBloodTypeLabel, setselectedBloodTypeLabel] = useState('A')

	// Rhesus Type
	const [rhesusTypeModal, setRhesusModal] = useState(false)
	const rhesusTypeSelection = ['+', '-']
	const [selectedRhesusLabel, setSelectedRhesusLabel] = useState('+')

	// Insurance Status
	const [insuranceStatusModal, setInsuranceStatusModal] = useState(false)
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
	const [selectedInsuranceLabel, setSelectedInsuranceLabel] = useState(capitalFirst('Umum'))


    // Error Message
    const [messageModals, setMessage] = useState('')

    // Success Message
    const [sucess, setSuccsess] = useState('')


	// Use effect for province and district
	useEffect(() => {
		if (province.length && district.length) {
            // console.log(district[0].province_id, 'district modal')
            // setDistrict(region.kabupatenkota(provinceValue.))
			// setUserData({
			// 	...userData, 
			// 	location: {
			// 	...userData.location,
			// 		province: province[0].label,
			// 		city: district[0].label,
			// 		coordinates: [district[0].longitude, district[0].latitude]
			// 	}
			// })
		}
	}, [district, selectedDistrictLabel, userData])

    console.log(userData, 'current userData')


	// Function for change data
	function setSelectedValue(value, changeKey, changeInnerKey, name, coordinatesKey){
        console.log(changeKey)
        console.log(name)
        if(changeKey === 'location'){
            const firstIndex = region.kabupatenkota(value)[0]
            coordinatesKey =  coordinatesKey ? coordinatesKey: [firstIndex.longitude, firstIndex.latitude]
            if(changeInnerKey === 'province'){
                setDistrict(region.kabupatenkota(value))
                setSelectedDistrictLabel(firstIndex.name)
                setUserData({
                    ...userData,
                    [changeKey]: {
                        ...userData[changeKey],
                        [changeInnerKey]: name,
                        city: firstIndex.name,
                        coordinates: [coordinatesKey[0], coordinatesKey[1]],
                    }
                })
            } else {
                setSelectedDistrictLabel(name)
                setUserData({
                    ...userData,
                    [changeKey]: {
                        ...userData[changeKey],
                        [changeInnerKey]: name,
                        coordinates: [coordinatesKey[0], coordinatesKey[1]]
                    }
                })
            }
		} else {
            setUserData({
                ...userData,
                [changeKey] :value
            })
        }
    }

    // location = {
    //     city: "KABUPATEN SIMEULUE",
    //     // index 0 = longitude, index 1 = latitude
    //     coordinates: [ 96.08333, 2.61667,],
    //     province: "ACEH",
    //     type: "Point",
    // },

	// Function for validation
	function validation() {
		if (userData.nik == null || userData.nik.length !== 16 ||
			userData.firstName == null || userData.dob == null || userData.phoneNumber == null ||
			userData.phoneNumber.length == 0) {
			ToastAndroid.show('Please fill all the necessary data!', ToastAndroid.LONG)
		} else {
			FilterDataSend(userData)
		}
	}

    // Function for success message
    function dataSuccess(message) {
        setMessage(message)
        setSuccsess(true)
    }

    // function for error messsage
    function dataError(message) {
        ToastAndroid.show(message, ToastAndroid.LONG)
    }

	// Function for sending data to server
	function FilterDataSend(data) {
		Object.filter = (obj, predicate) =>
		Object.keys(obj)
			.filter(key => predicate(obj[key]))
			.reduce((res, key) => (res[key] = obj[key], res), {});
	
		console.log(data, 'sebelum Filter')
		var send = Object.filter(data, value => value !== null)
		send = Object.filter(send, value => value !== '')
		console.log(send, 'seudah Filter')
		props.CreatePatientAsUser(send, dataSuccess, dataError, props.navigation.navigate);
	}

	BackHandler.addEventListener("hardwareBackPress", () => {
		ToastAndroid.show('You have to fill this form before you can continue to use MedQCare', ToastAndroid.SHORT)
		return true
	})

	return (
		<KeyboardAvoidingView style={styles.container} behavior={'padding'} enabled>
			{/* <View style={styles.container}> */}
			{/* <StatusBar hidden/> */}
            <ScrollView showsVerticalScrollIndicator={false}>

				{/* Header */}
				<View style={styles.header}>
					<Text style={styles.headerText}>Mohon lengkapi semua data di bawah ini terlebih dahulu</Text>
				</View>

				 {/* NIK */}
				<View style={styles.inputTopContainer}>
                    <View style={styles.input}>
                        <TextInput
                            style={styles.inputText}
                            autoCapitalize={'none'}
                            autoFocus={false}
                            placeholder={'NIK'}
                            keyboardType={'numeric'}
                            placeholderTextColor="#8b8b8b" 
                            onChangeText={text =>
                                setUserData({ ...userData, nik: text })
                            }
                            value={userData.nik}
                        />
                    </View>

				{/* NIK Error */}
				{
					userData.nik !== null && userData.nik.length > 0 && userData.nik.length !== 16 &&
					<Text style={{ color: 'red' }}>NIK must contain at 16 characters</Text>
				}
                </View>


				{/* First name form */}
                <View style={styles.inputMiddleContainer}>
                    <View style={styles.input}>
                        <TextInput
                            style={styles.inputText}
                            autoCapitalize={'sentences'}
                            autoFocus={false}
                            placeholder={'Nama Depan'}
                            placeholderTextColor="#8b8b8b" 
                            onChangeText={text =>
                                setUserData({ ...userData, firstName: text })
                            }
                            value={userData.firstName}
                        />
                    </View>
                </View>

				 {/* Last name form */}
				 <View style={styles.inputMiddleContainer}>
                    <View style={styles.input}>
                        <TextInput
                            style={styles.inputText}
                            autoCapitalize={'sentences'}
                            autoFocus={false}
                            placeholder={'Nama Belakang'}
                            placeholderTextColor="#8b8b8b" 
                            onChangeText={text =>
                                setUserData({ ...userData, lastName: text })
                            }
                            value={userData.lastName}
                    />
                    </View>
                </View>


				 {/* Gender Form */}
				 <View style={styles.inputMiddleContainer}>
                    <View style={{...styles.input, justifyContent: 'center', backgroundColor: 'transparent', borderWidth: 0,}}>
                        <RadioForm
                            radio_props={gender_radio}
                            initial={0}
                            onPress={(value) => {setUserData({ ...userData, gender: value })}}
                            formHorizontal={true}
                            labelHorizontal={true}
                            animation={false}
                            labelStyle={{ paddingRight:10, fontSize: 14, color: '#DDDDDD'}}
                            style={styles.inputText}
                            buttonOuterSize={20}
                        />
                    </View>
                </View>

				 {/* DOB Form */}
				 <View style={styles.inputMiddleContainer}>
                    <View style={{...styles.input, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row'}}>
                        <Text style={styles.inputText}>{chosenDate}</Text>
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
                                setUserData({ ...userData, dob: date });
                                setChosenDate(fullMonthFormat(date))
                            }}
                        />
                    </View>
                </View>

				{/* Phone number form */}
                <View style={styles.inputMiddleContainer}>
                    <View style={styles.input}>
                        <TextInput
                            style={styles.inputText}
                            autoCapitalize={'none'}
                            autoFocus={false}
                            placeholder={'Nomor Hp'}
                            placeholderTextColor="#8b8b8b"
                            keyboardType={'numeric'}
                            onChangeText={text =>
                                setUserData({ ...userData, phoneNumber: text })
                            }
                            value={userData.phoneNumber}
                        />
                    </View>
                </View>

				{/* Bloodtype form */}
                <View style={{...styles.inputMiddleContainer, flexDirection: 'row'}}>
                    <TouchableOpacity 
                            onPress={() => setBloodTypeModal(true)}
                            style={styles.button}
                        >
                            <Text style={styles.inputText}>{selectedBloodTypeLabel}</Text>
                            <Image
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
                    />
                        {/* Rhesus form */}
                    <TouchableOpacity 
                            onPress={() => setRhesusModal(true)}
                            style={styles.button}
                        >
                            <Text style={styles.inputText}>{selectedRhesusLabel}</Text>
                            <Image
                                source={require('../../../assets/png/ArrowDown.png')}
                            />
                    </TouchableOpacity>
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

				{/* Insurance type form */}
				<View style={styles.inputMiddleContainer}>
                        <TouchableOpacity 
                                onPress={() => setInsuranceStatusModal(true)}
                                style={styles.button}
                            >
                                <Text style={styles.inputText}>{selectedInsuranceLabel}</Text>
                                <Image
                                    source={require('../../../assets/png/ArrowDown.png')}
                                />
                        </TouchableOpacity>
                        
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

                {/* Province form */}
				<View style={styles.inputMiddleContainer}>
					<TouchableOpacity 
						onPress={() => setProvinceModal(true)}
						style={styles.button}
					>
						<Text style={styles.inputText}>{selectedProvinceLabel}</Text>
						<Image
							source={require('../../../assets/png/ArrowDown.png')}
						/>
					</TouchableOpacity>
					<LocationModalPicker
						modal={provinceModal}
						setModal={setProvinceModal}
						selection={provinceSelection}
						title='Silahkan pilih lokasi provinsi anda'
						subtitle='Pilihan yang tersedia'
						setSelectedValue={setSelectedValue}
						setSelectedLabel={setSelectedProvinceLabel}
						changeKey='location'
						changeInnerKey='province'
					/>
				</View>

                {/* City form */}
				<View style={styles.inputMiddleContainer}>
					<TouchableOpacity 
						onPress={() => setDistrictModal(true)}
						style={styles.button}
					>
						<Text style={styles.inputText}>{selectedDistrictLabel}</Text>
						<Image
							source={require('../../../assets/png/ArrowDown.png')}
						/>
					</TouchableOpacity>
                    <LocationModalPicker
						modal={districtModal}
						setModal={setDistrictModal}
						selection={district}
						title='Silahkan pilih lokasi kota anda'
						subtitle='Pilihan yang tersedia'
						setSelectedValue={setSelectedValue}
						setSelectedLabel={setSelectedDistrictLabel}
						changeKey='location'
						changeInnerKey='city'
					/>
                </View>

				{/* Address Form */}
                {/* <View style={styles.inputBottomContainer}>
                    <View style={styles.input}>
                        <TextInput
                            autoCapitalize={'sentences'}
                            style={styles.inputText}
                            autoFocus={false}
                            placeholder={'Alamat....'}
                            placeholderTextColor="#8b8b8b"
                            onChangeText={
                                text => setUserData({ ...userData, address: text })
                            }
                            value={userData.address}
                            />
                    </View>
                </View> */}

				{/* Submit button */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => { validation() }} style={styles.submitButton}>
                        {load ? <ActivityIndicator size={'small'} color='#FFF'/> :
                        <Text style={{ fontSize: 18, color: '#FFF' }}>Simpan Data</Text>
                        }
                    </TouchableOpacity>
                </View>

				
			</ScrollView>
			{/* </View> */}
			</KeyboardAvoidingView>

		
	)
}

const styles = StyleSheet.create({
	container: {
        backgroundColor: '#1f1f1f',
        minHeight: hp('100%'),
        width: wp('100%'),
        flex: 1
    },

	header: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20
	},

	headerText: {
		color: '#DDDDDD'
	},

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
        backgroundColor: '#2F2F2F',
        justifyContent: 'center'
    },

	inputText: {
        color: '#DDDDDD'
    },

	buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20
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

	submitButton: {
        height: 50,
        width: '85%',
        backgroundColor: '#005ea2',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    }
})


// const Registration = props => {
  // var moment = require('moment')
  // const region = require('../../../assets/Region/province')

  // const [valid, setValid] = useState(false)
  // const [success, setSuccsess] = useState(false)
  // const [warning, setWarning] = useState(false)
  // const [messageModals, setMessage] = useState('')
  // const [genderlist, setGender] = useState([
  //   'Male',
  //   'Female',
  // ]);
  // const [listTitle, setTitle] = useState([
  //   'Mr.',
  //   'Mrs.',
  //   'Miss.',
  //   'Ms.'
  // ]);

  // const [dataRegist, setDataRegist] = useState({
  //   nik: null,
  //   title: listTitle[0],
  //   firstName: null,
  //   lastName: '',
  //   gender: genderlist[0],
  //   dob: null,
  //   bloodType: null,
  //   resus: null,
  //   phoneNumber: null,
  //   location: {
  //     province: null,
  //     city: null,
  //     type: "Point",
  //     coordinates: []
  //   },
  //   insuranceStatus: 'UMUM'
  // });

  // const [province, setProvince] = useState(region.province)
  // const [distric, setDistric] = useState(region.kabupatenkota('11'))

  // useEffect(() => {
  //   if (province.length && distric.length) {
  //     setDataRegist({
  //       ...dataRegist, location: {
  //         ...dataRegist.location,
  //         province: province[0].name,
  //         city: distric[0].name,
  //         coordinates: [distric[0].longitude, distric[0].latitude]
  //       }
  //     })
  //   }
  // }, [])

  // function validation() {
  //   if (dataRegist.nik == null || dataRegist.nik.length !== 16 ||
  //     dataRegist.firstName == null || dataRegist.dob == null || dataRegist.phoneNumber == null ||
  //     dataRegist.phoneNumber.length == 0) {
  //     setValid(true)
  //     ToastAndroid.show('Please check the data !', ToastAndroid.LONG)
  //   } else {
  //     setValid(false)
  //     FilterDataSend(dataRegist)
  //   }
  // }

  // function dataSuccess(message) {
  //   setMessage(message)
  //   setSuccsess(true)
  // }

  // function dataError(message) {
  //   ToastAndroid.show(message, ToastAndroid.LONG)
  // }

  // const FilterDataSend = (data) => {
  //   // Methode
  //   Object.filter = (obj, predicate) =>
  //     Object.keys(obj)
  //       .filter(key => predicate(obj[key]))
  //       .reduce((res, key) => (res[key] = obj[key], res), {});

  //   console.log(data, 'sebelum Filter')
  //   var send = Object.filter(data, value => value !== null)
  //   send = Object.filter(send, value => value !== '')
  //   console.log(send, 'seudah Filter')
  //   props.CreatePatientAsUser(send, dataSuccess, dataError);
  // }

  // BackHandler.addEventListener("hardwareBackPress", () => {
  //   ToastAndroid.show('You have to fill this form before you can continue to use MedQCare', ToastAndroid.SHORT)
  //   // setMessage('cancel registration ?')
  //   // setWarning(true)
  //   return true
  // })

  // // console.log(dataRegist, 'ini data registrationnya');
  // return (
  //   <View
  //     // behavior={'height'}
  //     style={container.base}>
  //     <View style={container.header} />
  //     <View style={container.body}>
  //       <View style={container.top}>
  //         <Text style={textStyle.registUser}>Patient Registration </Text>
  //       </View>
  //       <View style={{ flex: 1, marginBottom: '11%', padding: 20 }}>
  //         <View style={container.bottom}>
  //           <ScrollView showsVerticalScrollIndicator={false}>
  //             <View style={container.title}>
  //               {!dataRegist.nik && valid &&
  //                 <Text style={textStyle.start}>*</Text>
  //               }
  //               <Text style={textStyle.title}>NIK</Text>
  //             </View>
  //             <TextInput
  //               style={container.input}
  //               autoCapitalize={'none'}
  //               autoFocus={false}
  //               placeholder={'NIK'}
  //               keyboardType={'numeric'}
  //               onChangeText={text =>
  //                 setDataRegist({ ...dataRegist, nik: text.toString() })
  //               }
  //               value={dataRegist.nik}
  //               autoCorrect={false}
  //             />
  //             {dataRegist.nik !== null && dataRegist.nik.length > 0 && dataRegist.nik.length !== 16 &&
  //               <Text style={{ color: 'red' }}>NIK must contain at 16 characters</Text>
  //             }
  //             <Text style={textStyle.title}>Title</Text>
  //             <View style={[container.pickerContainer]}>
  //               <Picker
  //                 mode={'dropdown'}
  //                 selectedValue={dataRegist.title}
  //                 style={{ height: 45 }}
  //                 onValueChange={(itemValue, itemIndex) => {
  //                   if (itemValue === 'Mr.') {
  //                     setDataRegist({
  //                       ...dataRegist,
  //                       title: itemValue,
  //                       gender: 'Male',
  //                     });
  //                   } else {
  //                     setDataRegist({
  //                       ...dataRegist,
  //                       title: itemValue,
  //                       gender: 'Female',
  //                     });
  //                   }
  //                   console.log(itemValue, ' - ', itemIndex)
  //                 }}>
  //                 {listTitle.map((item, index) => {
  //                   return <Picker.Item label={item} value={item} key={index} />;
  //                 })}
  //               </Picker>
  //             </View>

  //             <View style={container.title}>
  //               {!dataRegist.firstName && valid &&
  //                 <Text style={textStyle.start}>*</Text>
  //               }
  //               <Text style={textStyle.title}>First Name</Text>
  //             </View>
  //             <TextInput
  //               style={container.input}
  //               autoCapitalize={'sentences'}
  //               autoFocus={false}
  //               placeholder={'First Name'}
  //               onChangeText={text =>
  //                 setDataRegist({ ...dataRegist, firstName: text })
  //               }
  //               value={dataRegist.firstName}
  //             />

  //             <Text style={textStyle.title}>Last Name</Text>
  //             <TextInput
  //               style={container.input}
  //               autoCapitalize={'sentences'}
  //               autoFocus={false}
  //               placeholder={'Last Name'}
  //               onChangeText={text =>
  //                 setDataRegist({ ...dataRegist, lastName: text })
  //               }
  //               value={dataRegist.lastName}
  //             />


  //             <Text style={textStyle.title}>Gender</Text>
  //             <View style={[container.pickerContainer]}>
  //               <Picker
  //                 mode={'dropdown'}
  //                 selectedValue={dataRegist.gender}
  //                 style={{ height: 45 }}
  //                 onValueChange={(itemValue, itemIndex) => {
  //                   if (itemIndex != 0) {
  //                     setDataRegist({ ...dataRegist, gender: itemValue });
  //                   }
  //                 }}>
  //                 {genderlist.map((item, index) => {
  //                   return <Picker.Item label={item} value={item} key={0} />;
  //                 })}
  //               </Picker>
  //             </View>

  //             <Text style={textStyle.title}>Province</Text>
  //             <View style={[container.pickerContainer]}>
  //               {province.length > 0 ? (
  //                 <Picker
  //                   selectedValue={dataRegist.location.province}
  //                   style={{ height: 45 }}
  //                   onValueChange={(itemValue, itemIndex) => {
  //                     setDataRegist({ ...dataRegist, location: { ...dataRegist.location, province: itemValue } })
  //                     setDistric(region.kabupatenkota(province[itemIndex].id))
  //                   }}>
  //                   {province.length !== 0 &&
  //                     province.map((item, index) => {
  //                       return <Picker.Item label={capitalFirst(item.name)} value={capitalFirst(item.name)} key={index} />
  //                     })
  //                   }
  //                 </Picker>
  //               ) : (<ActivityIndicator size={'small'} color={'blue'} />)}
  //             </View>
  //             <Text style={textStyle.title}>City</Text>
  //             <View style={[container.pickerContainer]}>
  //               {distric.length > 0 ? (
  //                 <Picker
  //                   selectedValue={dataRegist.location.city}
  //                   style={{ height: 45 }}
  //                   onValueChange={(itemValue, itemIndex) => {
  //                     // console.log('item valuenya', itemValue)
  //                     setDataRegist({
  //                       ...dataRegist,
  //                       location: { ...dataRegist.location, city: itemValue, coordinates: [distric[itemIndex].longitude, distric[itemIndex].latitude] }
  //                     });
  //                   }}>
  //                   {distric.length &&
  //                     distric.map((item, index) => {
  //                       return <Picker.Item label={capitalFirst(item.name)} value={capitalFirst(item.name)} key={index} />
  //                     })
  //                   }
  //                 </Picker>
  //               ) : (<ActivityIndicator size={'small'} color={'blue'} />)}
  //             </View>
  //             <View style={container.title}>
  //               {!dataRegist.dob && valid &&
  //                 <Text style={textStyle.start}>*</Text>
  //               }
  //               <Text style={textStyle.title}>Date of Brith</Text>
  //             </View>
  //             <View style={container.dob}>
  //               <DatePicker
  //                 style={{ width: '100%' }}
  //                 date={dataRegist.dob} //initial date from state
  //                 mode="date" //The enum of date, datetime and time
  //                 placeholder="Date of Brith"
  //                 format='YYYY/MM/DD'
  //                 maxDate={new Date()}
  //                 confirmBtnText="Confirm"
  //                 cancelBtnText="Cancel"
  //                 customStyles={{
  //                   dateIcon: {
  //                     display: 'flex',
  //                     // position: 'absolute',
  //                     left: 0,
  //                     top: 4,
  //                     marginLeft: 0,
  //                   },
  //                   dateInput: {
  //                     marginLeft: 0,
  //                     // marginLeft: 36,
  //                     borderWidth: 0,
  //                     borderColor: '#D5EDE1',
  //                   },
  //                 }}
  //                 onDateChange={date => {
  //                   setDataRegist({ ...dataRegist, dob: date.toString() });
  //                 }}
  //               />
  //             </View>
  //             <View style={{ flexDirection: 'row', flex: 1 }}>
  //               <Text style={textStyle.title}>Blood Type</Text>
  //               <Text style={textStyle.title}>Rhesus</Text>
  //             </View>
  //             <View style={[container.pickerContainer, { flexDirection: 'row', }]}>
  //               <Picker
  //                 selectedValue={dataRegist.bloodType}
  //                 style={{ height: 45, width: '50%' }}
  //                 mode={'dropdown'}
  //                 onValueChange={(itemValue, itemIndex) => {
  //                   if (itemIndex == 0) {
  //                     setDataRegist({ ...dataRegist, bloodType: null });
  //                   } else {
  //                     setDataRegist({ ...dataRegist, bloodType: itemValue });
  //                   }
  //                 }}>
  //                 <Picker.Item label="Blood Type" value="Blodd Type" key={0} color={'#C2C2C2'} />
  //                 <Picker.Item label="A" value="A" key={1} />
  //                 <Picker.Item label="AB" value="AB" key={2} />
  //                 <Picker.Item label="B" value="B" key={3} />
  //                 <Picker.Item label="O" value="O" key={4} />
  //               </Picker>
  //               <Picker
  //                 selectedValue={dataRegist.resus}
  //                 style={{ height: 45, width: '50%', }}
  //                 mode={'dropdown'}
  //                 onValueChange={(itemValue, itemIndex) => {
  //                   if (itemIndex == 0) {
  //                     setDataRegist({ ...dataRegist, resus: null });
  //                   } else {
  //                     setDataRegist({ ...dataRegist, resus: itemValue });
  //                   }
  //                 }}>
  //                 <Picker.Item label="Rhesus" value="Rhesus" key={0} color={'#C2C2C2'} />
  //                 <Picker.Item label="-" value="-" key={1} />
  //                 <Picker.Item label="+" value="+" key={2} />
  //               </Picker>
  //             </View>
  //            <View style={container.title}>
  //               {!dataRegist.phoneNumber && valid &&
  //                 <Text style={textStyle.start}>*</Text>
  //               }
  //               <Text style={textStyle.title}>Phone Number</Text>
  //             </View>
  //             <TextInput
  //               style={container.input}
  //               autoCapitalize={'none'}
  //               autoFocus={false}
  //               placeholder={'Phone Number'}
  //               keyboardType={'numeric'}
  //               onChangeText={text =>
  //                 setDataRegist({ ...dataRegist, phoneNumber: text.toString() })
  //               }
  //               value={dataRegist.phoneNumber}
  //               autoCorrect={false}
  //             />
  //             {dataRegist.phoneNumber !== null && dataRegist.phoneNumber.length == 0 &&
  //               <Text style={{ color: 'red' }}>Phone Number Don't Empty</Text>
  //             }
  //             <Text style={textStyle.title}>Insurance </Text>
  //             <View style={[container.pickerContainer]}>
  //               <Picker
  //                 mode="dropdown"
  //                 selectedValue={dataRegist.insuranceStatus}
  //                 style={{ height: 45 }}
  //                 onValueChange={(itemValue, itemIndex) => {
  //                   // console.log('item valuenya', itemValue)
  //                   setDataRegist({
  //                     ...dataRegist,
  //                     insuranceStatus: itemValue
  //                   });
  //                 }}>
  //                 <Picker.Item label={'Umum'} value={'UMUM'} key={0} />
  //                 <Picker.Item label={'BPJS'} value={'BPJS'} key={1} />
  //                 <Picker.Item label={'Asuransi'} value={'ASURANSI'} key={2} />

  //               </Picker>
  //             </View>
  //           </ScrollView>
  //           {
  //             success &&
  //             <LottieLoader
  //               source={require('../../animation/success-green.json')}
  //               autoPlay
  //               loop={false}
  //               onAnimationFinish={() => props.navigation.navigate('ProfileSwitch')}
  //             />
  //           }
  //           <View style={{ alignItems: 'flex-end', marginTop: 20 }}>
  //             <TouchableOpacity
  //               onPress={() => {
  //                 validation()
  //               }}
  //               style={container.button}>
  //               <Text style={textStyle.button}>DONE</Text>
  //             </TouchableOpacity>
  //           </View>
  //         </View>
  //       </View>

  //     </View>
  //     {
  //       warning &&
  //       <SettingModal
  //         _visible={warning}
  //         _iconId={'warning'}
  //         _navigationRight={() => {
  //           setWarning(false)
  //         }}
  //         _textRight={'Cancel'}
  //         _navigationLeft={() => {
  //           props.Logout(props.navigation)
  //           setWarning(false)
  //         }}
  //         _textLeft={'OK'}
  //         _message={messageModals} />
  //     }
  //   </View>
  // )
// };

// const container = StyleSheet.create({
//   base: {
//     flex: 1,
//     alignItems: 'center',
//     // height: '90%',
//     justifyContent: 'space-between'
//   },
//   header: {
//     backgroundColor: '#85EC92',
//     height: Dimensions.get('screen').height * 0.30,
//     width: '100%',
//     alignItems: 'center',
//   },
//   top: {
//     // backgroundColor: '#F99898',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 20,
//   },
//   body: {
//     // backgroundColor: '#C4DEF6',
//     width: '100%',
//     height: '100%',
//     top: '10%',
//     position: 'absolute',
//   },
//   bottom: {
//     backgroundColor: '#fff',
//     flex: 1,
//     borderColor: '#CDCDCD',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 4,
//       height: 0,
//     },
//     shadowOpacity: 0.4,
//     shadowRadius: 3,
//     elevation: 4,
//     padding: 20,
//   },
//   contain: {
//     backgroundColor: '#D9AFF9',
//     position: 'absolute',
//   },
//   input: {
//     width: '100%',
//     height: 50,
//     marginBottom: 5,
//     borderColor: '#D5EDE1',
//     borderWidth: 1,
//     paddingHorizontal: 20,
//     borderRadius: 3,
//   },
//   pickerContainer: {
//     width: '100%',
//     height: 50,
//     marginVertical: 5,
//     borderColor: '#D5EDE1',
//     borderWidth: 1,
//     borderRadius: 3,
//     justifyContent: 'center',
//     paddingHorizontal: 10,
//   },
//   dob: {
//     flexDirection: 'row',
//     width: '100%',
//     height: 50,
//     marginVertical: 5,
//     borderColor: '#D5EDE1',
//     borderWidth: 1,
//     borderRadius: 3,
//     alignItems: 'center',
//     paddingHorizontal: 10,
//     justifyContent: 'space-between'
//   },
//   button: {
//     height: 50,
//     width: '100%',
//     backgroundColor: '#85EC92',
//     borderWidth: 1,
//     borderColor: '#D5EDE1',
//     borderRadius: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   dropDown: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   title: {
//     marginBottom: 5,
//     flexDirection: 'row',
//   },

// });

// const textStyle = StyleSheet.create({
//   registUser: {
//     fontSize: 20,
//     color: '#FFF',
//   },
//   button: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   title: {
//     flex: 1,
//     fontSize: 16,
//     marginTop: 5,
//   },
//   start: {
//     marginRight: 5,
//     color: 'red',
//   }
// });

const mapDispatchToProps = {
  CreatePatientAsUser, setLoading, Logout
};

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps, mapDispatchToProps)(DataCompletion);
