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
  BackHandler,
  ToastAndroid,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Radio Form
import RadioForm from 'react-native-simple-radio-button';
import { updateProfileData } from '../stores/action';

// Modal
import {
  dateWithDDMMMYYYYFormat,
} from '../helpers/dateFormat';
import SelectModal from './modals/modalPicker';
import GradientHeader from './headers/GradientHeader';
import LocationModalPicker from '../components/modals/LocationModalPicker';

// for proper case
import capitalFirst from '../helpers/capitalFirst';
import DatePickerIcon from '../assets/svg/DatePickerIcon';
import DatePicker from '@react-native-community/datetimepicker';
import nikValidation from '../helpers/validationNIK';

const editProfile = ({ navigation, userDataReducer, updateProfileData }) => {
  const { userData, isLoading, darkMode } = userDataReducer
  const {
    photo,
    nik,
    firstName,
    lastName,
    gender,
    dob,
    bloodType,
    resus,
    phoneNumber,
    location,
    insuranceStatus
  } = userData
  const dateOfBirthDay = new Date(dob);
  const [isErrorPhoneNumber, setIsErrorPhoneNumber] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [chosenDate, setChosenDate] = useState(dateOfBirthDay);
  const [dateForShowingToUser, setDateForShowingToUser] = useState(
    dateWithDDMMMYYYYFormat(dateOfBirthDay)
  );
  const [currentUserData, setCurrentUserData] = useState({
    photo: photo || '',
    nik: nik.toString(),
    firstName,
    lastName,
    gender: gender || 'Male',
    dob: dateOfBirthDay,
    bloodType: bloodType || 'A',
    resus: resus || '+',
    phoneNumber: phoneNumber,
    location,
    insuranceStatus: insuranceStatus || 'UMUM',
  });

  // Region
  const region = require('../assets/Region/province');

  // Province; 34 provinces
  const [province, setProvince] = useState(region.province);
  const [provinceModal, setProvinceModal] = useState(false);
  const [selectedProvinceLabel, setSelectedProvinceLabel] = useState(
    currentUserData.location.province
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
    currentUserData.bloodType
  );

  // Rhesus type
  const [rhesusTypeModal, setRhesusModal] = useState(false);
  const rhesusTypeSelection = ['+', '-'];
  const [selectedRhesusLabel, setSelectedRhesusLabel] = useState(
    currentUserData.resus
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
    capitalFirst(currentUserData.insuranceStatus)
  );

  useEffect(() => {
    if (province.length && district.length) {
    }
  }, [district, selectedDistrictLabel, currentUserData]);

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
        setCurrentUserData({
          ...currentUserData,
          [changeKey]: {
            ...userData[changeKey],
            [changeInnerKey]: name,
            city: firstIndex.name,
            coordinates: [coordinatesKey[0], coordinatesKey[1]],
          },
        });
      } else {
        setSelectedDistrictLabel(name);
        setCurrentUserData({
          ...currentUserData,
          [changeKey]: {
            ...currentUserData[changeKey],
            [changeInnerKey]: name,
            coordinates: [coordinatesKey[0], coordinatesKey[1]],
          },
        });
      }
    } else {
      setCurrentUserData({
        ...currentUserData,
        [changeKey]: value,
      });
    }
  }

  // Function for validation
  function validation() {
    if (!nikValidation(currentUserData.nik)) {
      ToastAndroid.show('Invalid NIK', ToastAndroid.LONG);
      return;
    }

    if (
      !nikValidation(currentUserData.nik) ||
      currentUserData.firstName == '' ||
      currentUserData.firstName == null ||
      currentUserData.dob == null ||
      currentUserData.phoneNumber == null ||
      isErrorPhoneNumber
    ) {
      setValid(true);
      setModalF(true);
    } else {
      setValid(false);
      sendData();
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
    dataSend = Object.filter(currentUserData, (value) => value !== null);
    dataSend = Object.filter(dataSend, (value) => value !== undefined);
    dataSend = Object.filter(dataSend, (value) => value !== '');
    sendData(dataSend);
  };


  // Function for sending data to server
  async function sendData() {
    try {
      const patientID = userData._id
      await updateProfileData(currentUserData, patientID, patientID, navigation.navigate, 'ProfileDetail', userData)
    } catch (error) {
      console.log(error)
    }
  }

  BackHandler.addEventListener('hardwareBackPress', () => {
    navigation.pop();
    return true;
  });

  const onChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (event.type === 'dismissed') {
      return;
    }
    setChosenDate(selectedDate);
    setDateForShowingToUser(dateWithDDMMMYYYYFormat(selectedDate));
    setCurrentUserData({ ...userData, dob: selectedDate });
  };

  return (
    <KeyboardAvoidingView
      style={darkMode ? viewStyles.container : viewStyles.containerLight}
      behavior={'padding'}
      enabled
    >
      <GradientHeader
        navigate={navigation.navigate}
        navigateBack={'ProfileDetail'}
        title="Ubah Data"
        darkMode={darkMode}
      />

      {/* Starts here */}

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* NIK */}
        <View style={style.inputTopContainer}>
          <View style={darkMode ? style.input : style.inputLight}>
            <TextInput
              style={darkMode ? style.inputText : style.inputTextLight}
              autoCapitalize={'none'}
              autoFocus={false}
              placeholder={'NIK'}
              keyboardType={'numeric'}
              placeholderTextColor="#8b8b8b"
              onChangeText={(text) => setCurrentUserData({ ...currentUserData, nik: text })}
              value={currentUserData.nik}
            />
          </View>
        </View>
        {/* NIK Error */}
        {currentUserData.nik !== null &&
          currentUserData.nik.length > 0 &&
          currentUserData.nik.length !== 16 && (
            <Text style={{ color: 'red', paddingLeft: 10 }}>
              NIK must contain 16 characters
            </Text>
          )}

        {/* First name error */}
        <View style={{ flexDirection: 'row' }}>
          {!currentUserData.firstName && valid && (
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
          <View style={darkMode ? style.input : style.inputLight}>
            <TextInput
              style={darkMode ? style.inputText : style.inputTextLight}
              autoCapitalize={'sentences'}
              autoFocus={false}
              placeholder={'Nama Depan'}
              placeholderTextColor="#8b8b8b"
              onChangeText={(text) =>
                setCurrentUserData({ ...currentUserData, firstName: text })
              }
              value={currentUserData.firstName}
            />
          </View>
        </View>

        {/* Last name form */}
        <View style={style.inputMiddleContainer}>
          <View style={darkMode ? style.input : style.inputLight}>
            <TextInput
              style={darkMode ? style.inputText : style.inputTextLight}
              autoCapitalize={'sentences'}
              autoFocus={false}
              placeholder={'Nama Belakang'}
              placeholderTextColor="#8b8b8b"
              onChangeText={(text) => {
                setCurrentUserData({ ...currentUserData, lastName: text })
              }}
              value={currentUserData.lastName}
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
              initial={currentUserData.gender === 'Male' ? 0 : 1}
              onPress={(value) => {
                setCurrentUserData({ ...currentUserData, gender: value });
              }}
              formHorizontal={true}
              labelHorizontal={true}
              animation={false}
              labelStyle={{ paddingRight: 10, fontSize: 14, color: darkMode ? '#DDDDDD' : '#212121' }}
              style={darkMode ? style.inputText : style.inputTextLight}
              buttonOuterSize={20}
            />
          </View>
        </View>

        {/* DOB error */}
        <View style={{ flexDirection: 'row' }}>
          {!currentUserData.dob && valid && (
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
            style={ darkMode ? style.birthOfDate : style.birthOfDateLight }
          >
            <Text style={darkMode ? style.inputText : style.inputTextLight}>
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
          </View>
        </View>

        {/* Phone number form */}
        <View style={style.inputMiddleContainer}>
          <View style={darkMode ? style.input : style.inputLight}>
            <TextInput
              style={darkMode ? style.inputText : style.inputTextLight}
              autoCapitalize={'none'}
              autoFocus={false}
              placeholder={'Nomor Hp'}
              placeholderTextColor="#8b8b8b"
              keyboardType={'numeric'}
              onChangeText={(text) => {
                text.length > 13
                  ? setIsErrorPhoneNumber(true)
                  : setIsErrorPhoneNumber(false);
                setCurrentUserData({ ...currentUserData, phoneNumber: text });
              }}
              value={currentUserData.phoneNumber}
            />
          </View>
          {isErrorPhoneNumber && (
            <Text style={{ color: '#ef4444' }}>Invalid mobile number</Text>
          )}
        </View>

        {/* Bloodtype form */}
        <View style={{ ...style.inputMiddleContainer, flexDirection: 'row', justifyContent: "space-between" }}>
          <TouchableOpacity
            onPress={() => setBloodTypeModal(true)}
            style={darkMode ? style.button : style.buttonLight }
          >
            <Text style={darkMode ? style.inputText : style.inputTextLight}>{selectedBloodTypeLabel}</Text>
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
            darkMode={darkMode}
          />
          {/* Rhesus form */}
          <TouchableOpacity
            onPress={() => setRhesusModal(true)}
            style={darkMode ? style.button : style.buttonLight }
          >
            <Text style={darkMode ? style.inputText : style.inputTextLight}>{selectedRhesusLabel}</Text>
            <Image source={require('../assets/png/ArrowDown.png')} />
          </TouchableOpacity>
         
          <SelectModal
            modal={rhesusTypeModal}
            setModal={setRhesusModal}
            selection={rhesusTypeSelection}
            title="Silahkan pilih rhesus darah anda"
            subtitle="Pilihan yang tersedia"
            setSelectedValue={setSelectedValue}
            setSelectedLabel={setSelectedRhesusLabel}
            changeKey="resus"
            darkMode={darkMode}
          />
        </View>

        <View style={style.inputMiddleContainer}>
          
        </View>

        <View style={style.inputMiddleContainer}>
          <TouchableOpacity
            onPress={() => setProvinceModal(true)}
            style={darkMode ? style.button : style.buttonLight}
          >
            <Text style={darkMode ? style.inputText : style.inputTextLight}>{selectedProvinceLabel}</Text>
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
            darkMode={darkMode}
          />
          
        </View>

        <View style={style.inputBottomContainer}>
          <TouchableOpacity
            onPress={() => setDistrictModal(true)}
            style={darkMode ? style.button : style.buttonLight}
          >
            <Text style={darkMode ? style.inputText : style.inputTextLight}>{selectedDistrictLabel}</Text>
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
          
        </View>

        <View style={{ paddingHorizontal: 12 }}>
          <View style={darkMode ? style.input : style.inputLight}>
            <TextInput
              autoCapitalize={'sentences'}
              style={darkMode ? style.inputText : style.inputTextLight}
              autoFocus={false}
              placeholder={'Detail Alamat'}
              placeholderTextColor="#8b8b8b"
              onChangeText={(text) => {
                const { location } = currentUserData;
                const newLocation = { ...location, address: text };
                setCurrentUserData({ ...currentUserData, location: newLocation });
              }}
              value={currentUserData.location.address}
            />
          </View>
        </View>

        <View style={style.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              validation();
            }}
            style={darkMode ? container.button : container.buttonLight}
          >
            {isLoading ? (
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
    marginBottom: 10,
    paddingHorizontal: 10,
  },

  input: {
    height: 50,
    borderWidth: 1,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#2F2F2F',
    justifyContent: 'center',
  },

  inputLight: {
    height: 50,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
  },

  birthOfDate: {
    height: 50,
    borderWidth: 1,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#2F2F2F',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },

  birthOfDateLight: {
    height: 50,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#ffffff',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },

  inputText: {
    color: '#DDDDDD',
  },

  inputTextLight: {
    color: '#212121',
  },

  button: {
    flex: 0.48,
    height: 50,
    borderWidth: 1,
    paddingHorizontal: 20,
    borderRadius: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#2F2F2F',
  },

  buttonLight: {
    flex: 0.48,
    height: 50,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: 20,
    borderRadius: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
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
    width: '95%',
    backgroundColor: '#005ea2',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  buttonLight: {
    height: 50,
    width: '95%',
    backgroundColor: '#1090C5',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  }
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
  containerLight: {
    backgroundColor: '#ffffff',
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
  updateProfileData,
};

const mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps, mapDispatchToProps)(editProfile);
