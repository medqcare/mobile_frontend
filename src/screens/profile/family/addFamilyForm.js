import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
} from 'react-native';

import DatePickerIcon from '../../../assets/svg/DatePickerIcon';
import DatePicker from '@react-native-community/datetimepicker';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import RadioForm from 'react-native-simple-radio-button';
import SelectModal from '../../../components/modals/modalPicker';
import Header from '../../../components/headers/GradientHeader';
//action
import { addFamily, setLoading } from '../../../stores/action';
//Modal
import { ToastAndroid } from 'react-native';

import {
  dateWithDDMMMYYYYFormat,
  fullMonthFormat,
} from '../../../helpers/dateFormat';
import withZero from '../../../helpers/withZero';
import LocationModalPicker from '../../../components/modals/LocationModalPicker';

const familyForm = (props) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [chosenDate, setChosenDate] = useState(new Date());
  const [load, setLoad] = useState(false);
  const [valid, setValid] = useState(false);
  const [bloodTypeModal, setBloodTypeModal] = useState(false);
  const [rhesusTypeModal, setRhesusModal] = useState(false);
  const [insuranceStatusModal, setInsuranceStatusModal] = useState(false);
  const [statusfamilyModal, setStatusFamilyModal] = useState(false);
  const [isErrorPhoneNumber, setIsErrorPhoneNumber] = useState(false);
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

  // Province
  const [province, setProvince] = useState(region.province);
  const [provinceModal, setProvinceModal] = useState(false);
  const [selectedProvinceLabel, setSelectedProvinceLabel] = useState(
    province[0].name
  );
  const provinceSelection = province;

  //District
  const [district, setDistrict] = useState(region.kabupatenkota('11'));
  const [districtModal, setDistrictModal] = useState(false);
  const [selectedDistrictLabel, setSelectedDistrictLabel] = useState(
    district[0].name
  );

  const [dataFamily, setDataFamily] = useState({
    nik: '',
    firstName: '',
    lastName: '',
    gender: 'Male',
    dob: chosenDate,
    bloodType: 'A',
    resus: '+',
    phoneNumber: '',
    relationship: 'SUAMI',
    insuranceStatus: 'UMUM',
    location: {
      province: selectedProvinceLabel,
      city: selectedDistrictLabel,
      type: 'Point',
      coordinates: [district[0].longitude, district[0].latitude],
    },
  });

  var radio_props = [
    { label: 'Laki-laki', value: 'Male' },
    { label: 'Perempuan', value: 'Female' },
  ];

  const validation = () => {
    console.log('Validating new family data...');

    if (
      dataFamily.firstName == null ||
      (dataFamily.nik !== null &&
        dataFamily.nik.length > 1 &&
        dataFamily.nik.length !== 16) ||
      (dataFamily.firstName !== null && dataFamily.firstName.length == 0) ||
      dataFamily.dob == null ||
      isErrorPhoneNumber
    ) {
      console.log(dataFamily, 'ini data family');
      setValid(true);
      ToastAndroid.show('Please check the Data', ToastAndroid.LONG);
    } else {
      setValid(false);
      setLoad(true);
      Finalvalidation(dataFamily);
      console.log('ini data familyy', dataFamily);
    }
  };

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
        setDataFamily({
          ...dataFamily,
          [changeKey]: {
            ...dataFamily[changeKey],
            [changeInnerKey]: name,
            city: firstIndex.name,
            coordinates: [coordinatesKey[0], coordinatesKey[1]],
          },
        });
      } else {
        setSelectedDistrictLabel(name);
        setDataFamily({
          ...dataFamily,
          [changeKey]: {
            ...dataFamily[changeKey],
            [changeInnerKey]: name,
            coordinates: [coordinatesKey[0], coordinatesKey[1]],
          },
        });
      }
    } else {
      setDataFamily({
        ...dataFamily,
        [changeKey]: value,
      });
    }
  }

  function Finalvalidation(_sendData) {
    console.log('Data validated');
    // Methode
    Object.filter = (obj, predicate) =>
      Object.keys(obj)
        .filter((key) => predicate(obj[key]))
        .reduce((res, key) => ((res[key] = obj[key]), res), {});

    var send = Object.filter(_sendData, (value) => value !== null);
    send = Object.filter(send, (value) => value !== '');

    if (typeof send.nik == 'string') {
      send.nik = Number(send.nik);
    }
    console.log('Sending data to store/index...');
    props.addFamily(send, props.navigation, setLoadFalse);
  }

  function setLoadFalse() {
    setLoad(false);
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

  const onChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (event.type === 'dismissed') {
      return;
    }
    setChosenDate(selectedDate);
    setDataFamily({ ...dataFamily, dob: selectedDate });
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Header
        title={'Tambah Keluarga'}
        navigate={props.navigation.navigate}
        navigateBack={'FamilyList'}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* NIK Input */}
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
                setDataFamily({ ...dataFamily, nik: text })
              }
              value={dataFamily.nik}
            />
          </View>
          {/* NIK Error Input */}
          {dataFamily.nik !== null &&
            dataFamily.nik.length > 1 &&
            dataFamily.nik.length !== 16 && (
              <Text style={{ color: 'red' }}>
                NIK must contain at 16 characters
              </Text>
            )}
        </View>

        {/* First Name Error Input */}
        <View style={{ flexDirection: 'row' }}>
          {!dataFamily.firstName && valid && (
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
        {/* First Name Input */}
        <View style={styles.inputMiddleContainer}>
          <View style={styles.input}>
            <TextInput
              style={styles.inputText}
              autoCapitalize={'sentences'}
              autoFocus={false}
              placeholder={'Nama Depan'}
              placeholderTextColor="#8b8b8b"
              onChangeText={(text) =>
                setDataFamily({ ...dataFamily, firstName: text })
              }
              value={dataFamily.firstName}
            />
          </View>
        </View>

        {/* Last Name Input */}
        <View style={styles.inputMiddleContainer}>
          <View style={styles.input}>
            <TextInput
              style={styles.inputText}
              autoCapitalize={'sentences'}
              autoFocus={false}
              placeholder={'Nama Belakang'}
              placeholderTextColor="#8b8b8b"
              onChangeText={(text) =>
                setDataFamily({ ...dataFamily, lastName: text })
              }
              value={dataFamily.lastName}
            />
          </View>
        </View>
        {/* Gender Input */}
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
                setDataFamily({ ...dataFamily, gender: value });
              }}
              formHorizontal={true}
              labelHorizontal={true}
              animation={false}
              labelStyle={{ paddingRight: 10, fontSize: 14, color: '#DDDDDD' }}
              style={styles.inputText}
              buttonOuterSize={20}
            />
          </View>
        </View>

        {/* DOB Error */}
        <View style={{ flexDirection: 'row' }}>
          {!dataFamily.dob && valid && (
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

        {/* DOB Form  */}
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
                setDataFamily({ ...dataFamily, dob: date });
                setChosenDate(fullMonthFormat(date));
              }}
            /> */}
          </View>
        </View>

        {/* Phone Number Input */}
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
                setDataFamily({ ...dataFamily, phoneNumber: text });
              }}
              value={dataFamily.phoneNumber}
            />
          </View>
          {isErrorPhoneNumber && (
            <Text style={{ color: '#ef4444' }}>Invalid mobile number</Text>
          )}
        </View>

        {/* Blood Input */}
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

        {/* Golongan Status Input */}
        <View style={styles.inputMiddleContainer}>
          {/* Insunrace Status Option */}
          {/* <TouchableOpacity 
                            onPress={() => setInsuranceStatusModal(true)}
                            style={styles.button}
                        >
                            <Text style={styles.inputText}>{selectedInsuranceLabel}</Text>
                            <Image
                                source={require('../../../assets/png/ArrowDown.png')}
                            />
                    </TouchableOpacity> */}

          {/* Insunrace Status Modal */}

          {/* <SelectModal
            modal={insuranceStatusModal}
            setModal={setInsuranceStatusModal}
            selection={insuranceStatus}
            title="Silahkan pilih tipe asuransi anda"
            subtitle="Pilihan yang tersedia"
            setSelectedValue={setSelectedValue}
            setSelectedLabel={setselectedInsuranceLabel}
            changeKey="insuranceStatus"
          /> */}
        </View>

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
            onPress={() => {
              validation();
            }}
            style={styles.submitButton}
            disabled={load}
          >
            {load ? (
              <ActivityIndicator size={'small'} color={'#FFF'} />
            ) : (
              <Text style={{ fontSize: 18, color: '#FFF' }}>
                Tambah Keluarga
              </Text>
            )}
          </TouchableOpacity>
        </View>
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

const mapDispatchToProps = {
  addFamily,
  setLoading,
};
const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, mapDispatchToProps)(familyForm);
