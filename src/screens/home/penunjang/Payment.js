import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import InsuranceModal from '../../../components/modals/InsuranceModal';

import { formatNumberToRupiah } from '../../../helpers/formatRupiah';
import ArrowDownWhite from '../../../assets/svg/ArrowDownWhite';
import getFullName from '../../../helpers/getFullName';
import ButtonPrimary from '../../../components/ButtonPrimary';
import { TextInput } from 'react-native-gesture-handler';

const initialPatient = {
  patientID: null,
  patientName: null,
  gender: null,
  nik: null,
  photo: null,
  dob: null,
  insuranceStatus: 'Umum',
};

const paymentMethod = {
  digitalWallets: [
    {
      name: 'Go-Pay',
      iconUrl: require('../../../assets/png/ic_gopay.png'),
    },
    {
      name: 'LinkAja',
      iconUrl: require('../../../assets/png/ic_linkaja.png'),
    },
    {
      name: 'OVO',
      iconUrl: require('../../../assets/png/ic_ovo.png'),
    },
  ],
  banks: [
    {
      name: 'Transfer Virtual Mandiri',
      iconUrl: require('../../../assets/png/ic_mandiri.png'),
    },
    {
      name: 'BNI',
      iconUrl: require('../../../assets/png/ic_BNI.png'),
    },
    {
      name: 'BCA',
      iconUrl: require('../../../assets/png/ic_BCA.png'),
    },
  ],
};

function Circle({ selected }) {
  return (
    <View
      style={{
        width: 16,
        height: 16,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: selected ? '#1380C3' : '#B5B5B5',
        backgroundColor: selected ? '#1380C3' : 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {selected ? (
        <View
          style={{
            height: 7,
            width: 7,
            borderRadius: 7,
            backgroundColor: '#DDDDDD',
          }}
        />
      ) : null}
    </View>
  );
}

function Payment(props) {
  const { clinic, tests, bookingTime, bookingSchedule } =
    props.navigation.getParam('penunjang');
  const [patient, setPatient] = useState(initialPatient);
  const [payment, setPayment] = useState('');
  const [isModalPaymentVisible, setIsModalPaymentVisible] = useState(false);
  const [numberBPJS, setNumberBPJS] = useState(null);

  const onInsuranceSelectedHandler = (insuranceName) => {
    setPatient({ ...patient, insuranceStatus: insuranceName });
  };
  const onPressHandler = () => {
    props.navigation.navigate('TransactionDetail', {
      penunjang: {
        clinic,
        bookingTime,
        bookingSchedule,
        patient,
        numberBpjs: patient.insuranceStatus === 'BPJS' ? numberBPJS : null,
        paymentMethod: patient.insuranceStatus === 'Umum' ? payment : null,
      },
    });
  };

  const formatDate = (dateObject) => {
    const year = dateObject.getFullYear();
    const date = dateObject.getDate();
    const month = dateObject.getMonth() + 1;

    return `${date}/${month}/${year}`;
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: 16 }}
      >
        <View style={styles.card}>
          <View style={styles.clinicInfoContainer}>
            <Image
              source={{
                uri: clinic.image_url,
              }}
              style={styles.clinicInfoImage}
            />
            <View style={styles.clinicInfoTextContainer}>
              {/* Clinic Info */}
              <View>
                <Text style={styles.clinicInfoTextTitle}>
                  {clinic.Lab_name}
                </Text>
                <View style={styles.clinicInfoAddressContainer}>
                  <Text style={styles.textGreyNormal} numberOfLines={3}>
                    {clinic.Alamat}
                  </Text>
                </View>
              </View>
              {/* Border Line */}
              <View style={styles.borderLine}></View>
              {/* Pasien Info */}
              <View>
                <View style={styles.patientInfoContainer}>
                  <Text style={styles.textGreyNormal}>
                    Pasien:{' '}
                    <Text style={styles.textWhiteNormal}>
                      {getFullName(props.userData)}
                    </Text>
                  </Text>
                </View>
                <View style={styles.dateInfoContainer}>
                  <Text style={styles.textGreyNormal}>
                    {formatDate(bookingSchedule)}
                  </Text>
                  <View style={styles.dividingPoint}></View>
                  <Text style={styles.textGreyNormal}>{bookingTime}</Text>
                </View>
                <View style={styles.priceInfoContainer}>
                  <Text style={styles.textGreyNormal}>Biaya Cek Lab</Text>
                  <Text style={styles.priceInfoTextWhite}>
                    {formatNumberToRupiah(clinic.totalPrice)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 13,
            paddingVertical: 16,
            backgroundColor: colors.lightGrey,
            borderRadius: 4,
            marginVertical: 16,
          }}
          onPress={() => setIsModalPaymentVisible(true)}
        >
          <Text
            style={styles.textWhiteNormal}
          >{`Pembayaran - ${patient.insuranceStatus}`}</Text>
          <ArrowDownWhite />
        </TouchableOpacity>
        <View>
          {/* Umum */}
          {patient.insuranceStatus === 'Umum' ? (
            <>
              {/* Wallets */}
              {/* <View style={{ marginBottom: 16 }}>
                <Text style={styles.paymentTitle}>Dompet Digital</Text>
                <View style={styles.paymentContainer}>
                  {paymentMethod.digitalWallets.map((wallet, index) => {
                    const isLastIndex =
                      index === paymentMethod.digitalWallets.length - 1;
                    return (
                      <TouchableOpacity
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: !isLastIndex ? 20 : 0,
                        }}
                        key={`${index}-digtal-wallet`}
                        onPress={() => setPayment(wallet)}
                      >
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <Image
                            source={wallet.iconUrl}
                            width={25}
                            height={25}
                          />
                          <Text style={styles.paymentName}>{wallet.name}</Text>
                        </View>
                        <Circle selected={payment.name === wallet.name} />
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View> */}
              <View>
                <Text style={styles.paymentTitle}>Transfer Bank</Text>
                <View style={styles.paymentContainer}>
                  {paymentMethod.banks.map((data, index) => {
                    const isLastIndex =
                      index === paymentMethod.banks.length - 1;
                    return (
                      <TouchableOpacity
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: !isLastIndex ? 20 : 0,
                        }}
                        key={`${index}-transfer-bank`}
                        onPress={() => setPayment(data)}
                      >
                        <View
                          style={{ flexDirection: 'row', alignItems: 'center' }}
                        >
                          <Image source={data.iconUrl} width={20} height={20} />
                          <Text style={styles.paymentName}>{data.name}</Text>
                        </View>
                        <Circle selected={payment.name === data.name} />
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            </>
          ) : null}

          {/*  BPJS */}

          {patient.insuranceStatus === 'BPJS' ? (
            <View>
              <TextInput
                placeholder="Masukan nomor BPJS"
                placeholderTextColor="#B5B5B5"
                style={{
                  paddingVertical: 15,
                  paddingHorizontal: 14,
                  backgroundColor: colors.lightGrey,
                  borderRadius: 4,
                  color: colors.grey,
                }}
                keyboardType="number-pad"
                value={numberBPJS}
                onChangeText={setNumberBPJS}
              />
            </View>
          ) : null}
        </View>
      </ScrollView>
      {(patient.insuranceStatus === 'Umum' && !!payment) ||
      (patient.insuranceStatus === 'BPJS' && !!numberBPJS) ? (
        <ButtonPrimary label={'Lanjutkan'} onPress={onPressHandler} />
      ) : null}
      {isModalPaymentVisible ? (
        <InsuranceModal
          isVisible={isModalPaymentVisible}
          setIsVisible={setIsModalPaymentVisible}
          onInsuranceSelected={onInsuranceSelectedHandler}
        />
      ) : null}
    </View>
  );
}

const colors = {
  white: '#DDDDDD',
  grey: '#B5B5B5',
  lightGrey: '#2F2F2F',
  borderColor: '#515151',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F1F1F',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  textWhiteNormal: {
    color: colors.white,
    fontSize: 12,
  },
  textGreyNormal: {
    color: colors.grey,
    fontSize: 12,
  },
  card: {
    paddingVertical: 20,
    paddingHorizontal: 12,
    backgroundColor: colors.lightGrey,
  },
  clinicInfoContainer: {
    flexDirection: 'row',
  },
  clinicInfoImage: {
    width: 60,
    height: 60,
    borderRadius: 3,
    marginRight: 12,
  },
  clinicInfoTextContainer: {
    flex: 1,
  },
  clinicInfoTextTitle: {
    color: colors.white,
    fontWeight: '500',
    fontSize: 12,
    marginBottom: 6,
  },
  clinicInfoAddressContainer: {
    width: '60%',
    marginBottom: 6,
  },
  clinicInfoTextNormal: {
    color: colors.grey,
    fontSize: 12,
  },
  borderLine: {
    width: '100%',
    height: 1,
    backgroundColor: colors.borderColor,
    marginVertical: 12,
  },
  patientInfoContainer: {
    marginBottom: 6,
    flexDirection: 'row',
  },
  dateInfoContainer: {
    marginBottom: 6,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
  },
  dividingPoint: {
    height: 4,
    width: 4,
    borderRadius: 100,
    backgroundColor: 'white',
    marginHorizontal: 8,
  },
  priceInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceInfoTextWhite: {
    color: colors.white,
    fontSize: 16,
  },
  paymentContainer: {
    borderRadius: 6,
    paddingVertical: 15,
    paddingHorizontal: 12,
    backgroundColor: colors.lightGrey,
  },
  paymentIcon: {
    marginRight: 20,
  },
  paymentName: {
    marginLeft: 20,
    color: colors.white,
    fontSize: 14,
  },
  paymentTitle: {
    marginBottom: 8,
    color: colors.white,
  },
});

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(Payment);
