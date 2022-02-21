import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
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
  ToastAndroid,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Radio Form
import RadioForm from 'react-native-simple-radio-button';
import { edit_profile, setLoading } from '../stores/action';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Modal
import {
  dateWithDDMMMYYYYFormat,
  fullMonthFormat,
} from '../helpers/dateFormat';
import SelectModal from './modals/modalPicker';
import GradientHeader from './headers/GradientHeader';
import LocationModalPicker from '../components/modals/LocationModalPicker';

// for proper case
import capitalFirst from '../helpers/capitalFirst';
import DatePickerIcon from '../assets/svg/DatePickerIcon';
import DatePicker from '@react-native-community/datetimepicker';
import nikValidation from '../helpers/validationNIK';
const editProfile = (props) => {
  const dateOfBirthDay = new Date(props.userData.dob);
  const [isErrorPhoneNumber, setIsErrorPhoneNumber] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [chosenDate, setChosenDate] = useState(dateOfBirthDay);
  const [dateForShowingToUser, setDateForShowingToUser] = useState(
    dateWithDDMMMYYYYFormat(dateOfBirthDay)
  );
  const [userData, setUserData] = useState({
    photo: props.userData.photo || '',
    nik: props.userData.nik.toString(),
    firstName: props.userData.firstName,
    lastName: props.userData.lastName,
    gender: props.userData.gender || 'Male',
    dob: dateOfBirthDay,
    bloodType: props.userData.bloodType || 'A',
    resus: props.userData.resus || '+',
    phoneNumber: props.userData.phoneNumber,
    location: props.userData.location,
    insuranceStatus: props.userData.insuranceStatus || 'UMUM',
  });

  // Region
  const region = require('../assets/Region/province');

  // Province; 34 provinces
  const [province, setProvince] = useState(region.province);
  const [provinceModal, setProvinceModal] = useState(false);
  const [selectedProvinceLabel, setSelectedProvinceLabel] = useState(
    userData.location.province
  );
  const provinceSelection = province;

  // District
  const provinceObject = province.filter((el) => {
    return el.name === selectedProvinceLabel;
  });
  const provinceId = provinceObject[0].id;
  const [district, setDistrict] = useState(region.kabupatenkota(provinceId));
  const [districtModal, setDistrictModal] = useState(false);
  const [selectedDistrictLabel, setSelectedDistrictLabel] = useState(
    userData.location.city
  );

  // Loading animation for submit button
  const [load, setLoad] = useState(false);

  const [modalF, setModalF] = useState(false);
  const [modalS, setModalS] = useState(false);
  const [valid, setValid] = useState(false);

  // Gender radio
  var radio_props = [
    { label: 'Laki-laki', value: 'Male' },
    { label: 'Perempuan', value: 'Female' },
  ];

  // Bloodtype
  const [bloodTypeModal, setBloodTypeModal] = useState(false);
  const bloodTypeSelection = ['A', 'AB', 'B', 'O'];
  const [selectedBloodTypeLabel, setselectedBloodTypeLabel] = useState(
    userData.bloodType
  );

  // Rhesus type
  const [rhesusTypeModal, setRhesusModal] = useState(false);
  const rhesusTypeSelection = ['+', '-'];
  const [selectedRhesusLabel, setSelectedRhesusLabel] = useState(
    userData.resus
  );

  // Insurance status
  const [insuranceStatusModal, setInsuranceStatusModal] = useState(false);
  const insuranceStatusSelection = [
    {
      label: 'Umum',
      value: 'UMUM',
    },
    {
      label: 'BPJS',
      value: 'BPJS',
    },
    {
      label: 'Asuransi',
      value: 'ASURANSI',
    },
  ];
  const [selectedInsuranceLabel, setSelectedInsuranceLabel] = useState(
    capitalFirst(userData.insuranceStatus)
  );

  useEffect(() => {
    if (province.length && district.length) {
    }
  }, [district, selectedDistrictLabel, userData]);

  // Function for change data
  function setSelectedValue(
    value,
    changeKey,
    changeInnerKey,
    name,
    coordinatesKey
  ) {
    if (changeKey === 'location') {
      const firstIndex = region.kabupatenkota(value)[0];
      coordinatesKey = coordinatesKey
        ? coordinatesKey
        : [firstIndex.longitude, firstIndex.latitude];
      if (changeInnerKey === 'province') {
        setDistrict(region.kabupatenkota(value));
        setSelectedDistrictLabel(firstIndex.name);
        setUserData({
          ...userData,
          [changeKey]: {
            ...userData[changeKey],
            [changeInnerKey]: name,
            city: firstIndex.name,
            coordinates: [coordinatesKey[0], coordinatesKey[1]],
          },
        });
      } else {
        setSelectedDistrictLabel(name);
        setUserData({
          ...userData,
          [changeKey]: {
            ...userData[changeKey],
            [changeInnerKey]: name,
            coordinates: [coordinatesKey[0], coordinatesKey[1]],
          },
        });
      }
    } else {
      setUserData({
        ...userData,
        [changeKey]: value,
      });
    }
  }

  // Function for validation
  function validation() {
    if (!nikValidation(userData.nik)) {
      ToastAndroid.show('Invalid NIK', ToastAndroid.LONG);
      return;
    }

    if (
      !nikValidation(userData.nik) ||
      userData.firstName == '' ||
      userData.firstName == null ||
      userData.dob == null ||
      userData.phoneNumber == null ||
      isErrorPhoneNumber
    ) {
      setValid(true);
      setModalF(true);
    } else {
      setValid(false);
      _filterdataSend();
    }
  }

  // Function for data preparation
  const _filterdataSend = () => {
    let dataSend;
    // Methode
    Object.filter = (obj, predicate) =>
      Object.keys(obj)
        .filter((key) => predicate(obj[key]))
        .reduce((res, key) => ((res[key] = obj[key]), res), {});
    dataSend = Object.filter(userData, (value) => value !== null);
    dataSend = Object.filter(dataSend, (value) => value !== undefined);
    dataSend = Object.filter(dataSend, (value) => value !== '');
    sendData(dataSend);
  };

  // Function for sending data to server
  async function sendData(data) {
    setLoad(true);
    let token = await AsyncStorage.getItem('token');
    props
      .edit_profile(data, props.userData._id, JSON.parse(token).token)
      .then((backData) => {
        setLoad(false);
        setModalS(true);
        props.navigation.navigate('ProfileDetail');
      })
      .catch((err) => {
        setLoad(false);
        console.log(err);
      });
  }

  BackHandler.addEventListener('hardwareBackPress', () => {
    props.navigation.pop();
    return true;
  });

  const onChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (event.type === 'dismissed') {
      return;
    }
    setChosenDate(selectedDate);
    setDateForShowingToUser(dateWithDDMMMYYYYFormat(selectedDate));
    setUserData({ ...userData, dob: selectedDate });
  };

  return (
    <KeyboardAvoidingView
      style={viewStyles.container}
      behavior={'padding'}
      enabled
    >
      <GradientHeader
        navigate={props.navigation.navigate}
        navigateBack={'ProfileDetail'}
        title="Ubah Data"
      />

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
              placeholderTextColor="#8b8b8b"
              onChangeText={(text) => setUserData({ ...userData, nik: text })}
              value={userData.nik}
            />
          </View>
        </View>
        {/* NIK Error */}
        {userData.nik !== null &&
          userData.nik.length > 0 &&
          userData.nik.length !== 16 && (
            <Text style={{ color: 'red' }}>
              NIK must contain at 16 characters
            </Text>
          )}

        {/* First name error */}
        <View style={{ flexDirection: 'row' }}>
          {!userData.firstName && valid && (
            <Text
              style={{
                color: 'red',
                marginVertical: 10,
                marginLeft: 5,
                fontSize: 14,
              }}
            >
              *
            </Text>
          )}
        </View>

        {/* First name form */}
        <View style={style.inputMiddleContainer}>
          <View style={style.input}>
            <TextInput
              style={style.inputText}
              autoCapitalize={'sentences'}
              autoFocus={false}
              placeholder={'Nama Depan'}
              placeholderTextColor="#8b8b8b"
              onChangeText={(text) =>
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
              placeholderTextColor="#8b8b8b"
              onChangeText={(text) =>
                setUserData({ ...userData, lastName: text })
              }
              value={userData.lastName}
            />
          </View>
        </View>

        {/* Gender Form */}
        <View style={style.inputMiddleContainer}>
          <View
            style={{
              ...style.input,
              justifyContent: 'center',
              backgroundColor: 'transparent',
              borderWidth: 0,
            }}
          >
            <RadioForm
              radio_props={radio_props}
              initial={userData.gender === 'Male' ? 0 : 1}
              onPress={(value) => {
                setUserData({ ...userData, gender: value });
              }}
              formHorizontal={true}
              labelHorizontal={true}
              animation={false}
              labelStyle={{ paddingRight: 10, fontSize: 14, color: '#DDDDDD' }}
              style={style.inputText}
              buttonOuterSize={20}
            />
          </View>
        </View>

        {/* DOB error */}
        <View style={{ flexDirection: 'row' }}>
          {!userData.dob && valid && (
            <Text
              style={{
                color: 'red',
                marginVertical: 15,
                marginLeft: 5,
                fontSize: 14,
              }}
            >
              *
            </Text>
          )}
        </View>

        {/* DOB Form */}
        <View style={style.inputMiddleContainer}>
          <View
            style={{
              ...style.input,
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
            }}
          >
            <Text style={style.inputText}>
              {dateWithDDMMMYYYYFormat(chosenDate)}
            </Text>
            {showDatePicker && (
              <DatePicker
                value={new Date()}
                mode={'date'}
                maximumDate={new Date()}
                onChange={onChange}
                onTouchCancel={() => setShowDatePicker(false)}
              />
            )}
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <DatePickerIcon />
            </TouchableOpacity>
            {/* <DatePicker
              date={chosenDate} //initial date from state
              mode="date" //The enum of date, datetime and time
              format="DD/MMMM/YYYY"
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
                },
              }}
              onDateChange={(date) => {
                setUserData({ ...userData, dob: date });
              }}
            /> */}
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
              placeholderTextColor="#8b8b8b"
              keyboardType={'numeric'}
              onChangeText={(text) => {
                text.length > 13
                  ? setIsErrorPhoneNumber(true)
                  : setIsErrorPhoneNumber(false);
                setUserData({ ...userData, phoneNumber: text });
              }}
              value={userData.phoneNumber}
            />
          </View>
          {isErrorPhoneNumber && (
            <Text style={{ color: '#ef4444' }}>Invalid mobile number</Text>
          )}
        </View>

        {/* Bloodtype form */}
        <View style={{ ...style.inputMiddleContainer, flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={() => setBloodTypeModal(true)}
            style={style.button}
          >
            <Text style={style.inputText}>{selectedBloodTypeLabel}</Text>
            <Image source={require('../assets/png/ArrowDown.png')} />
          </TouchableOpacity>
          <SelectModal
            modal={bloodTypeModal}
            setModal={setBloodTypeModal}
            selection={bloodTypeSelection}
            title="Silahkan pilih golongan darah anda"
            subtitle="Pilihan yang tersedia"
            setSelectedValue={setSelectedValue}
            setSelectedLabel={setselectedBloodTypeLabel}
            changeKey="bloodType"
          />
          {/* Rhesus form */}
          <TouchableOpacity
            onPress={() => setRhesusModal(true)}
            style={style.button}
          >
            <Text style={style.inputText}>{selectedRhesusLabel}</Text>
            <Image source={require('../assets/png/ArrowDown.png')} />
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
            title="Silahkan pilih rhesus darah anda"
            subtitle="Pilihan yang tersedia"
            setSelectedValue={setSelectedValue}
            setSelectedLabel={setSelectedRhesusLabel}
            changeKey="resus"
          />
        </View>

        {/* Relation form */}
        {/* <View style={style.inputMiddleContainer}>
						<View style={style.input}>
							<Picker
								selectedValue={userData.statusFamily}
								style={{ color: '#DDDDDD', height: 45, width: '100%' }}
								placeholderTextColor="#8b8b8b"
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
					</View> */}

        <View style={style.inputMiddleContainer}>
          {/* Insurance Status */}

          {/* <TouchableOpacity
            onPress={() => setInsuranceStatusModal(true)}
            style={style.button}
          >
            <Text style={style.inputText}>{selectedInsuranceLabel}</Text>
            <Image source={require('../assets/png/ArrowDown.png')} />
          </TouchableOpacity> */}

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
          {/* Imsurance Status Modal */}
          {/* <SelectModal
            modal={insuranceStatusModal}
            setModal={setInsuranceStatusModal}
            selection={insuranceStatusSelection}
            title="Silahkan pilih tipe asuransi anda"
            subtitle="Pilihan yang tersedia"
            setSelectedValue={setSelectedValue}
            setSelectedLabel={setSelectedInsuranceLabel}
            changeKey="insuranceStatus"
          /> */}
        </View>

        <View style={style.inputMiddleContainer}>
          <TouchableOpacity
            onPress={() => setProvinceModal(true)}
            style={style.button}
          >
            <Text style={style.inputText}>{selectedProvinceLabel}</Text>
            <Image source={require('../assets/png/ArrowDown.png')} />
          </TouchableOpacity>
          <LocationModalPicker
            modal={provinceModal}
            setModal={setProvinceModal}
            selection={provinceSelection}
            title="Silahkan pilih lokasi provinsi anda"
            subtitle="Pilihan yang tersedia"
            setSelectedValue={setSelectedValue}
            setSelectedLabel={setSelectedProvinceLabel}
            changeKey="location"
            changeInnerKey="province"
          />
          {/* {province.length > 0 ? (
				<View style={style.input}>
				<Picker
					selectedValue={userData.location.province}
					style={style.inputText}
					onValueChange={(itemValue, itemIndex) => {
					setUserData({
						...userData,
						location: { 
							...userData.location, 
							province: itemValue,
							city: region.kabupatenkota(province[itemIndex].id)[0].name,
							coordinates: [
								region.kabupatenkota(province[itemIndex].id)[0].longitude,
								region.kabupatenkota(province[itemIndex].id)[0].latitude,
							],
						},
					});
					setDistrict(region.kabupatenkota(province[itemIndex].id));
					}}
				>
					{province.length !== 0 &&
					province.map((item, index) => {
						return (
						<Picker.Item
							label={capitalFirst(item.name)}
							value={capitalFirst(item.name)}
							key={index}
						/>
						);
					})}
				</Picker>
				</View>
			) : (
				<ActivityIndicator size={"small"} color={"blue"} />
			)} */}
        </View>

        <View style={style.inputBottomContainer}>
          <TouchableOpacity
            onPress={() => setDistrictModal(true)}
            style={style.button}
          >
            <Text style={style.inputText}>{selectedDistrictLabel}</Text>
            <Image source={require('../assets/png/ArrowDown.png')} />
          </TouchableOpacity>
          <LocationModalPicker
            modal={districtModal}
            setModal={setDistrictModal}
            selection={district}
            title="Silahkan pilih lokasi kota anda"
            subtitle="Pilihan yang tersedia"
            setSelectedValue={setSelectedValue}
            setSelectedLabel={setSelectedDistrictLabel}
            changeKey="location"
            changeInnerKey="city"
          />
          {/* {district.length > 0 ? (
				<View style={style.input}>
				<Picker
					selectedValue={userData.location.city}
					style={style.inputText}
					onValueChange={(itemValue, itemIndex) => {
					setUserData({
						...userData,
						location: {
						...userData.location,
						city: itemValue,
						coordinates: [
							district[itemIndex].longitude,
							district[itemIndex].latitude,
						],
						},
					});
					}}
				>
					{district.length &&
					district.map((item, index) => {
						return (
						<Picker.Item
							label={capitalFirst(item.name)}
							value={capitalFirst(item.name)}
							key={index}
						/>
						);
					})}
				</Picker>
				</View>
			) : (
				<ActivityIndicator size={"small"} color={"blue"} />
			)} */}
        </View>

        <View style={{ paddingHorizontal: 12}}>
            <View style={style.input}>
              <TextInput
                autoCapitalize={'sentences'}
                style={style.inputText}
                autoFocus={false}
                placeholder={'Detail Alamat'}
                placeholderTextColor="#8b8b8b"
                onChangeText={(text) => {
                  const { location } = userData;
                  const newLocation = { ...location, address: text };
                  setUserData({ ...userData, location: newLocation });
                }}
                value={userData.location.address}
              />
            </View>
          </View>

        <View style={style.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              validation();
            }}
            style={container.button}
          >
            {load ? (
              <ActivityIndicator size={'small'} color="#FFF" />
            ) : (
              <Text style={{ fontSize: 18, color: '#FFF' }}>Simpan Data</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const style = StyleSheet.create({
  inputTopContainer: {
    paddingTop: 20,
    paddingHorizontal: 10,
  },

  inputMiddleContainer: {
    paddingTop: 10,
    paddingHorizontal: 10,
  },

  inputBottomContainer: {
    paddingTop: 10,
    // paddingBottom: 20,
    marginBottom: 10,
    paddingHorizontal: 10,
  },

  input: {
    height: 50,
    borderWidth: 1,
    paddingHorizontal: 20,
    borderRadius: 3,
    backgroundColor: '#2F2F2F',
    justifyContent: 'center',
  },

  inputText: {
    color: '#DDDDDD',
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
    backgroundColor: '#2F2F2F',
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
    marginBottom: 60,
  },
});

const container = StyleSheet.create({
  base: {
    flex: 1,
    // backgroundColor: '#CCEDBF',
    alignItems: 'center',
    paddingVertical: 20,
  },
  photoContainer: {
    height: 80,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photo: {
    height: '100%',
    width: '100%',
    backgroundColor: 'yellow',
    borderRadius: 50,
  },
  editphoto: {
    width: '30%',
    height: 30,
    backgroundColor: '#33691E',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginTop: 10,
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
    justifyContent: 'space-between',
  },
  button: {
    height: 50,
    width: '85%',
    backgroundColor: '#005ea2',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
});
const textStyle = StyleSheet.create({
  editphoto: {
    color: '#FFF',
  },
  header: {
    color: '#33691E',
    fontSize: 16,
    marginVertical: 10,
  },
});

const viewStyles = StyleSheet.create({
  container: {
    backgroundColor: '#1f1f1f',
    minHeight: hp('100%'),
    width: wp('100%'),
    flex: 1,
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
    flexDirection: 'row',
  },
});

const textStyles = StyleSheet.create({
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderBottomWidth: 1,
    marginHorizontal: wp('2%'),
  },
  titleInput: {
    marginLeft: wp('2%'),
    marginTop: 10,
  },
});

const mapDispatchToProps = {
  edit_profile,
  setLoading,
};

const mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps, mapDispatchToProps)(editProfile);
