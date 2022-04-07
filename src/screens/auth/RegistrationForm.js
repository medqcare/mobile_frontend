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
  Image,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { createPatientAsUser, setShowInstruction, Logout } from '../../stores/action';
import { connect } from 'react-redux';

import Feather from 'react-native-vector-icons/Feather'; // Made for password visibility

// For proper case
import capitalFirst from '../../helpers/capitalFirst';

// Select Modal
import SelectModal from '../../components/modals/modalPicker';
import LocationModalPicker from '../../components/modals/LocationModalPicker';

// Radio Form
import RadioForm from 'react-native-simple-radio-button';
import LottieLoader from 'lottie-react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// For proper date format
import { dateWithDDMMMYYYYFormat } from '../../helpers/dateFormat';

// For proper number format

import DatePicker from '@react-native-community/datetimepicker';
import DatePickerIcon from '../../assets/svg/DatePickerIcon';
import nikValidation from '../../helpers/validationNIK';
import AsycnStorage from '@react-native-async-storage/async-storage';
import { changePassword } from '../../stores/action';
import formatPhoneNumber from '../../helpers/formatPhoneNumber';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { baseURL } from '../../config';

const RegistrationForm = (props) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [chosenDate, setChosenDate] = useState(null);
  // Region
  const region = require('../../assets/Region/province');

  // Province
  const [province, setProvince] = useState(region.province);
  const [provinceModal, setProvinceModal] = useState(false);
  const [selectedProvinceLabel, setSelectedProvinceLabel] = useState(
    province[0].name
  );
  const provinceSelection = province;
  // console.log(province)

  //District
  const [district, setDistrict] = useState(region.kabupatenkota('11'));
  const [districtModal, setDistrictModal] = useState(false);
  const [selectedDistrictLabel, setSelectedDistrictLabel] = useState(
    district[0].name
  );
  const [isErrorPhoneNumber, setIsErrorPhoneNumber] = useState(false);

  // console.log(district[0])
  // console.log(selectedDistrictLabel)

  // UserData
  const [userData, setUserData] = useState({
    imageUrl: '',
    nik: '',
    firstName: '',
    lastName: '',
    gender: 'Male',
    dob: '',
    bloodType: 'A',
    resus: '+',
    phoneNumber: props.navigation.getParam('phoneNumber'),
    insuranceStatus: 'UMUM',
    location: {
      province: selectedProvinceLabel,
      city: selectedDistrictLabel,
      type: 'Point',
      coordinates: [district[0].longitude, district[0].latitude],
    },
  });

  const [loadingGetData, setLoadingGetData] = useState(false);

  const [passwordData, setPasswordData] = useState({
    password: '',
    confirmPassword: '',
  });

  const [secureTextEntry, setSecureTextEntry] = useState({
    password: true,
    confirmPassword: true,
  });

  const updateSecureTextEntry = (key) => {
    setSecureTextEntry({
      ...secureTextEntry,
      [key]: !secureTextEntry[key],
    });
  };

  // const newDate = new Date();
  // const sendDate = `${withZero(newDate.getDate())}/${withZero(
  //   newDate.getMonth() + 1
  // )}/${withZero(newDate.getFullYear())}`;

  // Loading animation for submit button
  const [load, setLoad] = useState(false);
  const { isLoading } = props.userDataReducer

  // Gender radio
  const gender_radio = [
    { label: 'Laki-laki', value: 'Male' },
    { label: 'Perempuan', value: 'Female' },
  ];

  // Blood Type
  const [bloodTypeModal, setBloodTypeModal] = useState(false);
  const bloodTypeSelection = ['A', 'AB', 'B', 'O'];
  const [selectedBloodTypeLabel, setselectedBloodTypeLabel] = useState('A');

  // Rhesus Type
  const [rhesusTypeModal, setRhesusModal] = useState(false);
  const rhesusTypeSelection = ['+', '-'];
  const [selectedRhesusLabel, setSelectedRhesusLabel] = useState('+');

  // Insurance Status
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
    capitalFirst('Umum')
  );

  // Error Message
  const [messageModals, setMessage] = useState('');

  // Success Message
  const [sucess, setSuccsess] = useState('');

  const [googleEmail, setGoogleUserEmail] = useState('');
  const [isEmployee, setIsEmployee] = useState(false);
  const [employee, setEmployee] = useState();

  useEffect(async () => {
    const googleUserEmail = await AsycnStorage.getItem('GoogleUserEmail');
    if (googleUserEmail) setGoogleUserEmail(googleUserEmail);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        setLoadingGetData(true);
        const tokenString = await AsyncStorage.getItem('token');
        const { token } = JSON.parse(tokenString);
        const { data: response } = await axios({
          url: baseURL + '/api/v1/members/company/employee',
          method: 'GET',
          headers: {
            Authorization: token,
          },
        });
        const user = response.user;
        const employee = response.data;
        console.log(employee.gender, ">>>>> gender employee ku")
        const splittedNameBySpace = employee.name.split(' ');
        const [firstName, ...rest] = splittedNameBySpace;
        const lastName = rest.join(' ');
        const [day, month, year] = employee.dob.split('/');
        const dob = new Date(year, Number(month) - 1, day);
        setChosenDate(dob);
        setUserData({
          ...userData,
          firstName,
          lastName,
          gender: employee.gender.toLowerCase() === gender_radio[0].label.toLowerCase() ? 'Male' : 'Female',
          nik: employee.NIK ? employee.NIK : '',
          dob: employee.dob ? dob : '',
        });
        setEmployee(employee);
        setIsEmployee(true);
      } catch (error) {
        console.log('Error : ', error.response.data);
      } finally {
        setLoadingGetData(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (userData.phoneNumber) return;

    (async () => {
      try {
        const { token } = JSON.parse(await AsyncStorage.getItem('token'));
        const { data: res } = await axios({
          url: baseURL + '/api/v1/members/users',
          method: 'GET',
          headers: {
            Authorization: token,
          },
        });
        const { user } = res.data;
        console.log(user)
        setUserData({ ...userData, phoneNumber: user.phoneNumber });
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, [userData]);

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
  }, [district, selectedDistrictLabel, userData]);

  // Function for change data
  function setSelectedValue(
    value,
    changeKey,
    changeInnerKey,
    name,
    coordinatesKey
  ) {
    console.log(changeKey);
    console.log(name);
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

  async function validation() {
    if (!nikValidation(userData.nik)) {
      ToastAndroid.show('Invalid NIK', ToastAndroid.LONG);
      return;
    }

    if (
      !nikValidation(userData.nik) ||
      userData.firstName == null ||
      !userData.dob ||
      userData.phoneNumber == null ||
      userData.phoneNumber.length == 0 ||
      isErrorPhoneNumber ||
      !chosenDate
    ) {
      ToastAndroid.show(
        'Tolong lengkapi seluruh data yang diperlukan!',
        ToastAndroid.LONG
      );
    } else {
      if (googleEmail) {
        const { password, confirmPassword } = passwordData;
        if (password.length < 7) {
          ToastAndroid.show(
            'Password harus lebih banyak dari 6 karakter',
            ToastAndroid.SHORT
          );
        } else if (password !== confirmPassword) {
          ToastAndroid.show('Password anda tidak sesuai', ToastAndroid.SHORT);
        } else {
          props.changePassword(
            googleEmail,
            password,
            props.navigation.navigate,
            'Home'
          );
          FilterDataSend(userData);
          await AsycnStorage.removeItem('GoogleUserEmail');
        }
      } else {
        FilterDataSend(userData);
      }
    }
  }

  // Function for success message
  function dataSuccess(message) {
    setMessage(message);
    setSuccsess(true);
  }

  // function for error messsage
  function dataError(message) {
    ToastAndroid.show(message, ToastAndroid.LONG);
  }

  // Function for sending data to server
  async function FilterDataSend(data) {
    Object.filter = (obj, predicate) =>
      Object.keys(obj)
        .filter((key) => predicate(obj[key]))
        .reduce((res, key) => ((res[key] = obj[key]), res), {});

    var send = Object.filter(data, (value) => value !== null);
    send = Object.filter(send, (value) => value !== '');

    setLoad(true);
    const payload = { patient: send };

    if (employee) {
      payload.employee = employee;
    }
    console.log('Sending data to action (createPatientAsUse)')
    await props.createPatientAsUser(
      payload,
      dataSuccess,
      dataError,
      props.navigation.navigate
    );

    await props.setShowInstruction(true)
    setLoad(false);
  }

  BackHandler.addEventListener('hardwareBackPress', () => {
    ToastAndroid.show(
      'Anda harus melengkapi form ini agar bisa menggunakan MedQCare',
      ToastAndroid.SHORT
    );
    return true;
  });

  const onChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (event.type === 'dismissed') {
      return;
    }
    setChosenDate(selectedDate);
    setUserData({ ...userData, dob: selectedDate });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={'padding'} enabled>
      {/* <View style={styles.container}> */}
      {/* <StatusBar hidden/> */}
      {loadingGetData ? (
        <LottieLoader
          source={require('../animation/loading.json')}
          autoPlay
          loop
        />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerText}>
              Mohon lengkapi semua data di bawah ini terlebih dahulu
            </Text>
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
                onChangeText={(text) => setUserData({ ...userData, nik: text })}
                value={userData.nik}
              />
            </View>

            {/* NIK Error */}
            {userData.nik !== null &&
              userData.nik.length > 0 &&
              userData.nik.length !== 16 && (
                <Text style={{ color: 'red' }}>
                  NIK must contain at 16 characters
                </Text>
              )}
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
                onChangeText={(text) =>
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
                onChangeText={(text) =>
                  setUserData({ ...userData, lastName: text })
                }
                value={userData.lastName}
              />
            </View>
          </View>

          {googleEmail ? (
            <>
              <View style={styles.inputMiddleContainer}>
                <View
                  style={[
                    styles.input,
                    {
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    },
                  ]}
                >
                  <TextInput
                    style={[styles.inputText, { flex: 1 }]}
                    autoCapitalize={'sentences'}
                    secureTextEntry={secureTextEntry.password}
                    autoFocus={false}
                    placeholder={'Password'}
                    placeholderTextColor="#8b8b8b"
                    onChangeText={(text) =>
                      setPasswordData({ ...passwordData, password: text })
                    }
                    value={passwordData.password}
                  />
                  <TouchableOpacity
                    style={{ paddingLeft: 10 }}
                    onPress={() => updateSecureTextEntry('password')}
                  >
                    {secureTextEntry.password ? (
                      <Feather name="eye-off" size={20} color="grey" />
                    ) : (
                      <Feather name="eye" size={20} color="grey" />
                    )}
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.inputMiddleContainer}>
                <View
                  style={[
                    styles.input,
                    {
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    },
                  ]}
                >
                  <TextInput
                    style={[styles.inputText, { flex: 1 }]}
                    autoCapitalize={'sentences'}
                    secureTextEntry={secureTextEntry.confirmPassword}
                    autoFocus={false}
                    placeholder={'Confrim Password'}
                    placeholderTextColor="#8b8b8b"
                    onChangeText={(text) =>
                      setPasswordData({
                        ...passwordData,
                        confirmPassword: text,
                      })
                    }
                    value={passwordData.confirmPassword}
                  />

                  <TouchableOpacity
                    style={{ paddingLeft: 10 }}
                    onPress={() => updateSecureTextEntry('confirmPassword')}
                  >
                    {secureTextEntry.password ? (
                      <Feather name="eye-off" size={20} color="grey" />
                    ) : (
                      <Feather name="eye" size={20} color="grey" />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </>
          ) : null}

          {/* Gender Form */}
          <View style={styles.inputMiddleContainer}>
            <View
              style={{
                ...styles.input,
                justifyContent: 'center',
                backgroundColor: 'transparent',
                borderWidth: 0,
              }}
            >
              <RadioForm
                radio_props={gender_radio}
                initial={0}
                onPress={(value) => {
                  setUserData({ ...userData, gender: value });
                }}
                formHorizontal={true}
                labelHorizontal={true}
                animation={false}
                labelStyle={{
                  paddingRight: 10,
                  fontSize: 14,
                  color: '#DDDDDD',
                }}
                style={styles.inputText}
                buttonOuterSize={20}
              />
            </View>
          </View>

          {/* DOB Form */}
          <View style={styles.inputMiddleContainer}>
            <View
              style={{
                ...styles.input,
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
              }}
            >
              <Text style={styles.inputText}>
                {chosenDate
                  ? dateWithDDMMMYYYYFormat(chosenDate)
                  : 'Pilih Tanggal Lahir'}
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
          <View style={styles.inputMiddleContainer}>
            <View style={styles.input}>
              <TextInput
                style={styles.inputText}
                autoCapitalize={'none'}
                editable={false}
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
              <Text style={{ color: '#ef4444' }}>
                Mohon masukkan no. HP yang valid
              </Text>
            )}
          </View>

          {/* Bloodtype form */}
          <View
            style={{ ...styles.inputMiddleContainer, flexDirection: 'row' }}
          >
            <TouchableOpacity
              onPress={() => setBloodTypeModal(true)}
              style={styles.button}
            >
              <Text style={styles.inputText}>{selectedBloodTypeLabel}</Text>
              <Image source={require('../../assets/png/ArrowDown.png')} />
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
              style={styles.button}
            >
              <Text style={styles.inputText}>{selectedRhesusLabel}</Text>
              <Image source={require('../../assets/png/ArrowDown.png')} />
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
            />
          </View>

          {/* Insurance type form */}
          {/* <View style={styles.inputMiddleContainer}>
          <TouchableOpacity
            onPress={() => setInsuranceStatusModal(true)}
            style={styles.button}
          >
            <Text style={styles.inputText}>{selectedInsuranceLabel}</Text>
            <Image source={require('../../../assets/png/ArrowDown.png')} />
          </TouchableOpacity>

          <SelectModal
            modal={insuranceStatusModal}
            setModal={setInsuranceStatusModal}
            selection={insuranceStatusSelection}
            title="Silahkan pilih tipe asuransi anda"
            subtitle="Pilihan yang tersedia"
            setSelectedValue={setSelectedValue}
            setSelectedLabel={setSelectedInsuranceLabel}
            changeKey="insuranceStatus"
          />
        </View> */}

          {/* Province form */}
          <View style={styles.inputMiddleContainer}>
            <TouchableOpacity
              onPress={() => setProvinceModal(true)}
              style={styles.button}
            >
              <Text style={styles.inputText}>{selectedProvinceLabel}</Text>
              <Image source={require('../../assets/png/ArrowDown.png')} />
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
          </View>

          {/* City form */}
          <View style={styles.inputMiddleContainer}>
            <TouchableOpacity
              onPress={() => setDistrictModal(true)}
              style={styles.button}
            >
              <Text style={styles.inputText}>{selectedDistrictLabel}</Text>
              <Image source={require('../../assets/png/ArrowDown.png')} />
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

          {/* Address Form */}
          <View style={styles.inputBottomContainer}>
            <View style={styles.input}>
              <TextInput
                autoCapitalize={'sentences'}
                style={styles.inputText}
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

          {/* Submit button */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => {
                validation();
              }}
              style={styles.submitButton}
            >
              {isLoading === true ? (
                <ActivityIndicator size={'small'} color="#FFF" />
              ) : (
                <Text style={{ fontSize: 18, color: '#FFF' }}>Simpan Data</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}

      {/* </View> */}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1f1f1f',
    minHeight: hp('100%'),
    width: wp('100%'),
    flex: 1,
    paddingTop: hp('7%'),
  },

  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  headerText: {
    color: '#DDDDDD',
  },

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
    paddingBottom: 20,
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

  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
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

  submitButton: {
    height: 50,
    width: '85%',
    backgroundColor: '#005ea2',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
});

const mapDispatchToProps = {
  createPatientAsUser,
  setShowInstruction,
  changePassword,
  Logout,
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);
