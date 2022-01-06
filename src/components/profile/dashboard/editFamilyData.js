import React from 'react';
import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  ToastAndroid,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import DatePickerIcon from '../../../assets/svg/DatePickerIcon';
import DateTimePicker from '@react-native-community/datetimepicker';
import { connect } from 'react-redux';
import { edit_profile, setLoading } from '../../../stores/action';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RadioForm from 'react-native-simple-radio-button';
import SelectModal from '../../modals/modalPicker';
import {
  dateWithDDMMMYYYYFormat,
  fullMonthFormat,
} from '../../../helpers/dateFormat';
import Header from '../../../components/headers/GradientHeader';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import withZero from '../../../helpers/withZero';
//Modal
import LocationModalPicker from '../../../components/modals/LocationModalPicker';

const editFamilyData = (props) => {
  let dataFamily = props.navigation.state.params.data;
  const dateOfBirthDay = new Date(dataFamily.dob);
  const [load, setLoad] = useState(false);
  const [bloodTypeModal, setBloodTypeModal] = useState(false);
  const [rhesusTypeModal, setRhesusModal] = useState(false);
  const [insuranceStatusModal, setInsuranceStatusModal] = useState(false);
  const [statusfamilyModal, setStatusFamilyModal] = useState(false);

  const [chosenDate, setChosenDate] = useState(dateOfBirthDay);
  const [dateForShowingToUser, setDateForShowingToUser] = useState(
    dateWithDDMMMYYYYFormat(dateOfBirthDay)
  );

  const [changeData, setChangeData] = useState({
    nik: dataFamily.nik.toString(),
    firstName: dataFamily.firstName,
    lastName: dataFamily.lastName,
    gender: dataFamily.gender,
    dob: chosenDate,
    bloodType: dataFamily.bloodType,
    resus: dataFamily.resus,
    phoneNumber: dataFamily.phoneNumber,
    insuranceStatus: dataFamily.insuranceStatus,
    location: dataFamily.location,
  });

  const bloodType = ['A', 'AB', 'B', 'O'];
  const resus = ['+', '-'];

  const insuranceStatus = [
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

  const statusFamily = [
    {
      label: 'Suami',
      value: 'SUAMI',
    },
    {
      label: 'Istri',
      value: 'ISTRI',
    },
    {
      label: 'Anak',
      value: 'ANAK',
    },
  ];

  // Region
  const region = require('../../../assets/Region/province');

  // Province; 34 provinces
  const [province, setProvince] = useState(region.province);
  const [provinceModal, setProvinceModal] = useState(false);
  const [selectedProvinceLabel, setSelectedProvinceLabel] = useState(
    changeData.location.province
  );
  const [isErrorPhoneNumber, setIsErrorPhoneNumber] = useState(false);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const provinceSelection = province;

  // District
  const provinceObject = province.filter((el) => {
    return el.name === selectedProvinceLabel;
  });
  const provinceId = provinceObject[0].id;
  const [district, setDistrict] = useState(region.kabupatenkota(provinceId));
  const [districtModal, setDistrictModal] = useState(false);
  const [selectedDistrictLabel, setSelectedDistrictLabel] = useState(
    changeData.location.city
  );

  async function setSelectedValue(
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
        setChangeData({
          ...changeData,
          [changeKey]: {
            ...changeData[changeKey],
            [changeInnerKey]: name,
            city: firstIndex.name,
            coordinates: [coordinatesKey[0], coordinatesKey[1]],
          },
        });
      } else {
        setSelectedDistrictLabel(name);
        setChangeData({
          ...changeData,
          [changeKey]: {
            ...changeData[changeKey],
            [changeInnerKey]: name,
            coordinates: [coordinatesKey[0], coordinatesKey[1]],
          },
        });
      }
    } else {
      setChangeData({
        ...changeData,
        [changeKey]: value,
      });
    }
  }

  var radio_props = [
    { label: 'Laki-laki', value: 'Male' },
    { label: 'Perempuan', value: 'Female' },
  ];

  async function validation() {
    console.log('Validating data...');
    if (
      (changeData.nik !== null &&
        changeData.nik.length > 1 &&
        changeData.nik.length !== 16) ||
      changeData.firstName == '' ||
      changeData.firstName == null ||
      changeData.dob == null ||
      isErrorPhoneNumber
    ) {
      ToastAndroid.show('Please check the data', ToastAndroid.LONG);
    } else {
      setLoad(true);
      let dataSend;
      // Methode
      Object.filter = (obj, predicate) =>
        Object.keys(obj)
          .filter((key) => predicate(obj[key]))
          .reduce((res, key) => ((res[key] = obj[key]), res), {});
      dataSend = Object.filter(changeData, (value) => value !== null);
      dataSend = Object.filter(dataSend, (value) => value !== undefined);
      dataSend = Object.filter(dataSend, (value) => value !== '');

      if (typeof dataSend.nik === 'string' && dataSend.nik !== '') {
        dataSend.nik = Number(dataSend.nik);
      }
      sendData(dataSend);
    }
  }

  async function sendData(data) {
    console.log('Data validated');
    console.log('Sending data to store/index');
    let token = await AsyncStorage.getItem('token');
    props
      .edit_profile(
        data,
        dataFamily._id,
        JSON.parse(token).token,
        props.navigation.navigate
      )
      .then((backData) => {
        setLoad(false);
      })
      .catch((err) => {
        console.log(err);
        setLoad(false);
      });
  }

  const [selectedBloodTypeLabel, setselectedBloodTypeLabel] = useState(
    dataFamily.bloodType
  );
  const [selectedRhesusLabel, setSelectedRhesusLabel] = useState(
    dataFamily.resus
  );
  const [selectedInsuranceLabel, setselectedInsuranceLabel] = useState(
    dataFamily.insuranceStatus
  );
  const [selectedStatusFamilyLabel, setSelectedStatusFamilyLabel] = useState(
    dataFamily.relationship
  );
  const newDate = new Date(dataFamily.dob);
  const sendDate = `${withZero(newDate.getDate())}/${withZero(
    newDate.getMonth() + 1
  )}/${withZero(newDate.getFullYear())}`;
  const onChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (event.type === 'dismissed') {
      return;
    }
    setChosenDate(selectedDate);
    setDateForShowingToUser(dateWithDDMMMYYYYFormat(selectedDate));
    setChangeData({ ...changeData, dob: selectedDate });
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      <Header
        title={'Ubah Data'}
        navigate={props.navigation.navigate}
        navigateBack={'FamilyList'}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* NIK Input Edit */}
        <View style={styles.inputTopContainer}>
          <View style={styles.input}>
            <TextInput
              style={styles.inputText}
              autoCapitalize={'none'}
              autoFocus={false}
              placeholder={'NIK'}
              keyboardType={'numeric'}
              placeholderTextColor="#8b8b8b"
              onChangeText={(text) =>
                setChangeData({ ...changeData, nik: text })
              }
              value={changeData.nik}
            />
          </View>
          {/* NIK Input Edit Error */}
          {changeData.nik !== null &&
            changeData.nik.length > 0 &&
            changeData.nik.length !== 16 && (
              <Text style={{ color: 'red' }}>
                NIK must contain at 16 characters
              </Text>
            )}
        </View>

        {/* First Name Input Edit Error */}
        {!changeData.firstName && <Text style={textStyle.start}>*</Text>}
        {/* First Name Input Edit */}
        <View style={styles.inputMiddleContainer}>
          <View style={styles.input}>
            <TextInput
              style={styles.inputText}
              autoCapitalize={'sentences'}
              autoFocus={false}
              placeholder={'Nama Depan'}
              placeholderTextColor="#8b8b8b"
              onChangeText={(text) =>
                setChangeData({ ...changeData, firstName: text })
              }
              value={changeData.firstName}
            />
          </View>
        </View>

        {/* Last Name Input Edit */}
        <View style={styles.inputMiddleContainer}>
          <View style={styles.input}>
            <TextInput
              style={styles.inputText}
              autoCapitalize={'sentences'}
              autoFocus={false}
              placeholder={'Nama Belakang'}
              placeholderTextColor="#8b8b8b"
              onChangeText={(text) =>
                setChangeData({ ...changeData, lastName: text })
              }
              value={changeData.lastName}
            />
          </View>
        </View>

        {/* Gender Input Edit */}
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
              radio_props={radio_props}
              initial={0}
              onPress={(value) => {
                setChangeData({ ...changeData, gender: value });
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

        {/* DOB Input Edit */}
        <View style={styles.inputMiddleContainer}>
          <View
            style={{
              ...styles.input,
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
            }}
          >
            <Text style={styles.inputText}>{dateForShowingToUser}</Text>
            {showDatePicker && (
              <DateTimePicker
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
                setChangeData({ ...changeData, dob: date });
                setChosenDate(fullMonthFormat(date));
              }}
            /> */}
          </View>
        </View>

        {/* DOB Input Edit Error */}
        {!changeData.dob && (
          <Text style={{ color: 'red' }}>DoB Don't Empty</Text>
        )}
        {/* Phone Number Input Edit */}
        <View style={styles.inputMiddleContainer}>
          <View style={styles.input}>
            <TextInput
              style={styles.inputText}
              autoCapitalize={'none'}
              autoFocus={false}
              placeholder={'Nomor Hp'}
              placeholderTextColor="#8b8b8b"
              keyboardType={'numeric'}
              onChangeText={(text) => {
                text.length > 13
                  ? setIsErrorPhoneNumber(true)
                  : setIsErrorPhoneNumber(false);
                setChangeData({ ...changeData, phoneNumber: text });
              }}
              value={changeData.phoneNumber}
            />
          </View>
          {isErrorPhoneNumber && (
            <Text style={{ color: '#ef4444' }}>Invalid mobile number</Text>
          )}
        </View>

        {/* Bloodtype form */}
        <View style={{ ...styles.inputMiddleContainer, flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={() => setBloodTypeModal(true)}
            style={styles.button}
          >
            <Text style={styles.inputText}>{selectedBloodTypeLabel}</Text>
            <Image source={require('../../../assets/png/ArrowDown.png')} />
          </TouchableOpacity>
          <SelectModal
            modal={bloodTypeModal}
            setModal={setBloodTypeModal}
            selection={bloodType}
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
            <Image source={require('../../../assets/png/ArrowDown.png')} />
          </TouchableOpacity>
          <SelectModal
            modal={rhesusTypeModal}
            setModal={setRhesusModal}
            selection={resus}
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
              selection={insuranceStatus}
              title="Silahkan pilih tipe asuransi anda"
              subtitle="Pilihan yang tersedia"
              setSelectedValue={setSelectedValue}
              setSelectedLabel={setselectedInsuranceLabel}
              changeKey="insuranceStatus"
            />
          </View> */}

        {/* Status Family Input */}
        <View style={styles.inputMiddleContainer}>
          <TouchableOpacity
            onPress={() => setStatusFamilyModal(true)}
            style={styles.button}
          >
            <Text style={styles.inputText}>{selectedStatusFamilyLabel} </Text>
            <Image source={require('../../../assets/png/ArrowDown.png')} />
          </TouchableOpacity>
          <SelectModal
            modal={statusfamilyModal}
            setModal={setStatusFamilyModal}
            selection={statusFamily}
            title="Silahkan pilih golongan keluarga anda"
            subtitle="Pilihan yang tersedia"
            setSelectedValue={setSelectedValue}
            setSelectedLabel={setSelectedStatusFamilyLabel}
            changeKey="relationship"
          ></SelectModal>
        </View>

        {/* Province form */}
        <View style={styles.inputMiddleContainer}>
          <TouchableOpacity
            onPress={() => setProvinceModal(true)}
            style={styles.button}
          >
            <Text style={styles.inputText}>{selectedProvinceLabel}</Text>
            <Image source={require('../../../assets/png/ArrowDown.png')} />
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
            <Image source={require('../../../assets/png/ArrowDown.png')} />
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

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => validation()}
            style={styles.submitButton}
          >
            {load ? (
              <ActivityIndicator size={'small'} color="#FFF" />
            ) : (
              <Text style={{ fontSize: 18, color: '#FFF' }}>Simpan Data</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* <View style={{ alignItems: 'flex-end', marginTop: 20, marginBottom: 5 }}>    
            
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
                          buttonContainer  }   
                        </View>    */}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1f1f1f',
    minHeight: hp('100%'),
    width: wp('100%'),
    flex: 1,
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

const container = StyleSheet.create({
  base: {
    flex: 1,
    // backgroundColor: '#CCEDBF',
    padding: 20,
    backgroundColor: '#1F1F1F',
  },
  inputText: {
    color: '#DDDDDD',
  },
  content: {
    height: 85,
  },
  input: {
    height: 50,
    paddingHorizontal: 20,
    borderRadius: 3,
    backgroundColor: '#2F2F2F',
    color: '#DDDDDD',
    marginTop: 20,
  },
  buttonModal: {
    flex: 0.5,
    height: 70,
    paddingHorizontal: 20,
    borderRadius: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#2F2F2F',
  },
  dobMiddleContainer: {
    paddingTop: 0,
    paddingHorizontal: 0,
  },
  buttonText: {
    fontSize: 15,
    color: '#DDDDDD',
  },
  pickerContainer: {
    height: 50,
    borderRadius: 3,
    borderWidth: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#2F2F2F',
    color: '#DDDDDD',
    marginTop: 20,
  },
  dob: {
    height: 50,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 3,
    backgroundColor: '#2F2F2F',
    justifyContent: 'center',
    marginTop: 20,
  },
  button: {
    height: 50,
    width: '100%',
    backgroundColor: '#005EA2',
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',

    fontSize: 14,
    color: '#DDDDDD',
  },
  title: {
    flexDirection: 'row',
    color: '#DDDDDD',
    marginTop: 20,
  },
});

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
    fontWeight: 'bold',
  },
  input: {
    color: '#DDDDDD',
  },
  pickerContainer: {
    color: '#DDDDDD',
  },
});

const mapDispatchToProps = {
  edit_profile,
  setLoading,
};
const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, mapDispatchToProps)(editFamilyData);
