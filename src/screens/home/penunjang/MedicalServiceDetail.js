import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Platform,
  ActivityIndicator,
  BackHandler,
  Image,
  ToastAndroid,
  Linking,
} from 'react-native';
import { connect } from 'react-redux';
import { formatNumberToRupiah } from '../../../helpers/formatRupiah';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import GradientHeader from '../../../components/headers/GradientHeader';
import { Entypo, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import Calendar from '../../../components/Calendar';
import { checkDisabled } from '../../../helpers/disabledScheduleTime';
import BuatJanji from '../../../assets/svg/BuatJanji';
import getDistanceFromLatLonInKm from '../../../helpers/latlongToKM';
import { GREY_BORDER_LINE, WHITE_PRIMARY } from '../../../values/color';
import { INTER_400 } from '../../../values/font';

const dimHeight = Dimensions.get('window').height;
const dimWidth = Dimensions.get('window').width;

function MedicalServiceDetail({ navigation, userData, myLocation }) {
  const { item } = navigation.state.params;

  const {
    schedule,
    _id: id,
    idMasterLayanan,
    kode,
    name,
    itemCheck,
    type,
    basePrice,
    status,
    discount,
    price,
    startDate,
    endDate,
    clinicID,
    createdAt,
    updatedAt,
    __v,
    clinic,
    photo,
    doctor
  } = item;

  console.log(item, "hehehe ada item")

  const [serviceDetail, setServiceDetail] = useState({
    name,
    id,
    price,
    kode,
  });

  function getClinicLocation(location) {
    const defaultLocation = {
      lat: -6.2416152,
      long: 106.9947997,
    };

    let clinicLocation;

    if (typeof location === 'object') {
      const { coordinates } = location;
      const [long, lat] = coordinates;
      clinicLocation = {
        lat,
        long,
      };
    } else {
      const parsedLocation = JSON.parse(location);
      if (parsedLocation) {
        const { coordinates } = parsedLocation;
        const [long, lat] = coordinates;
        clinicLocation = {
          lat,
          long,
        };
      } else clinicLocation = defaultLocation;
    }

    return clinicLocation;
  }

  const [healthFacility, setHealthFacility] = useState({
    facilityID: clinic.idClinicMobile,
    facilityName: clinic.name,
    // facilityType: 'Klinik',
    // facilityMainType: 'Klinik',
    address: clinic.address,
    clinicIdWeb: clinic.id,
    location: getClinicLocation(clinic.location),
  });

  const [bookingDate, setBookingDate] = useState(null);
  const [bookingSchedule, setBookingSchedule] = useState(null);
  function onDateSelected(selectedDate) {
    setBookingDate(selectedDate);
    const year = selectedDate.getFullYear();
    const Month = selectedDate.getMonth() + 1;
    const date = selectedDate.getDate();
    setBookingSchedule(`${year}-${Month}-${date}`);
  }

  function makeAppointment() {
    if (!bookingSchedule) {
      ToastAndroid.show('Silahkan pilih tanggal janji', ToastAndroid.LONG);
    } else {
      userData
        ? navigation.push('Payment', {
            serviceDetail,
            bookingSchedule,
            healthFacility,
            clinic,
            doctor: {
              doctorName: doctor.doctorName,
              dokterIdWeb: doctor.doctorId
            }
          })
        : navigation.navigate('SignIn')
    }
  }

  const openMap = (lat, lang) => {
    const scheme = Platform.select({
      ios: 'maps:0,0?q=',
      android: 'geo:0,0?q=',
    });

    const latLng = `${lat},${lang}`;
    const label = 'Custom Label';
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });
    Linking.openURL(url);
  };

  const { lat: userLat, lng: userLng } = myLocation;
  const distance = Math.floor(
    getDistanceFromLatLonInKm(
      healthFacility.location.lat,
      healthFacility.location.long,
      userLat,
      userLng
    )
  );

  BackHandler.addEventListener('hardwareBackPress', () => {
    navigation.pop();
    return true;
  });

  return (
    <View style={styles.contentContainer}>
      <GradientHeader
        title="Detail Layanan"
        navigate={navigation.navigate}
        navigateBack={'MedicalServices'}
      />
      <View
        style={{
          justifyContent: 'space-between',
          flex: 1,
          paddingVertical: 12,
        }}
      >
        <View>
          <View style={styles.topContainer}>
            <View style={{ flex: 0.8 }}>
              <View style={{ marginBottom: 8 }}>
                <Text style={textStyles.nameColor}>{name}</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 7,
                }}
              >
                <FontAwesome5 name="hospital-alt" size={12} color="#A5A5A5" />
                <Text style={textStyles.greyColorWithPaddingLeftText}>
                  {clinic.name}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 7,
                }}
              >
                <Entypo name="location" size={12} color="#A5A5A5" />
                <Text
                  numberOfLines={2}
                  style={[
                    textStyles.greyColorWithPaddingLeftText,
                    { width: '90%', alignSelf: 'center' },
                  ]}
                >
                  {clinic.address}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <FontAwesome name="location-arrow" size={12} color="#A5A5A5" />
                <Text style={textStyles.greyColorWithPaddingLeftText}>
                  {distance} Km
                </Text>
              </View>
            </View>
            <View>
              <Image
                source={{
                  uri: photo
                    ? photo
                    : 'https://th.bing.com/th/id/OIP.-MMHEFs3KUsUPZMcRrHP-gHaEo?pid=ImgDet&rs=1',
                }}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 4,
                  marginBottom: 4,
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  const { location } = healthFacility;
                  openMap(location.lat, location.long);
                }}
              >
                <Text style={textStyles.mapSelectionButtonText}>
                  Lihat Maps
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              marginHorizontal: 12,
              backgroundColor: GREY_BORDER_LINE,
              height: 1,
              marginVertical: 20,
            }}
          ></View>

          <View style={styles.middleContainer}>
            {/* <Text style={textStyles.whiteColorText}>Deskripsi</Text>
                        <Text style={[textStyles.whiteColorText, { paddingTop: heightPercentageToDP('0.5%')}]}>{description}</Text> */}
            <Text
              style={[
                textStyles.whiteColorText,
                {
                  paddingTop: heightPercentageToDP('2%'),
                  paddingBottom: heightPercentageToDP('1%'),
                },
              ]}
            >
              Paket termasuk:{' '}
            </Text>
            {itemCheck.map((el, itemCheckIndex) => {
              return (
                <Text
                  key={itemCheckIndex}
                  style={[
                    textStyles.whiteColorText,
                    { paddingTop: heightPercentageToDP('0.2%') },
                  ]}
                >
                  {itemCheckIndex + 1}. {el.name}
                </Text>
              );
            })}
          </View>

          <View style={{ paddingLeft: 12 }}>
            <Calendar
              // selectedDate={}
              onDateSelected={onDateSelected}
              isDateBlackList={false}
              availableDays={schedule}
              isOnlyRenderForOneMonth={true}
            />
          </View>

          {/* {filteredSchedules.length > 0 ? (
                        <View style={styles.avalaibleHours}>
                            {filteredSchedules.map((filteredSchedule, filteredScheduleIndex) => {
                                const { status, limit, cancelledDates, scheduleDay, scheduleTime } = filteredSchedule
                                const disabled = checkDisabled(filteredSchedule, bookingSchedule)

                                return (
                                    <TouchableOpacity
                                        key={filteredScheduleIndex}
                                        onPress={() => {
                                            setBookingTime(scheduleTime)
                                        }}
                                        style={bookingTime === scheduleTime ? styles.selectedScheduleTimeContainer : styles.unSelectedScheduleTimeContainer}
                                        disabled={disabled}
                                    >
                                        <Text style={textStyles.whiteColorText}>{scheduleTime}</Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    ) : null} */}
        </View>
        <View style={{ paddingHorizontal: 12 }}>
          <TouchableOpacity
            onPress={async () => {
              makeAppointment();
            }}
            style={styles.makeAppointmentButton}
          >
            <View style={{ flexDirection: 'row' }}>
              <BuatJanji />
              <Text style={{ color: WHITE_PRIMARY, marginLeft: 8 }}>
                Buat Janji
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const textStyles = StyleSheet.create({
  mapSelectionText: {
    paddingLeft: widthPercentageToDP('1.5%'),
    color: '#A5A5A5',
  },

  mapSelectionButtonText: {
    color: '#F37335',
  },

  whiteColorText: {
    color: '#DDDDDD',
  },

  greyColorText: {
    color: '#A5A5A5',
  },

  greyColorWithPaddingLeftText: {
    color: '#A5A5A5',
    paddingLeft: 10,
  },

  nameColor: {
    color: '#DDDDDD',
    fontWeight: '400',
    fontSize: 16,
    fontFamily: INTER_400,
  },

  promoText: {
    color: '#14AE5F',
  },

  strikedThroughPrice: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    color: '#A5A5A5',
  },

  discountedPrice: {
    color: '#14AE5F',
    paddingLeft: widthPercentageToDP('1%'),
  },
});

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: '#1f1f1f',
    // height: heightPercentageToDP('100%'),
    flex: 1,
  },

  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#3E3D3D',
    alignItems: 'center',
    paddingHorizontal: 12,
  },

  leftContent: {
    alignItems: 'flex-start',
  },

  rightContent: {
    alignItems: 'flex-end',
  },

  middleContainer: {
    paddingLeft: 12,
  },

  avalaibleHours: {
    paddingVertical: heightPercentageToDP('1%'),
    paddingHorizontal: widthPercentageToDP('3%'),
    flexDirection: 'row',
  },

  selectedScheduleTimeContainer: {
    height: 40,
    width: 120,
    borderRadius: 5,
    backgroundColor: '#005EA2',
    marginRight: widthPercentageToDP('1.5%'),
    alignItems: 'center',
    paddingVertical: heightPercentageToDP('1%'),
  },

  unSelectedScheduleTimeContainer: {
    height: 40,
    width: 120,
    borderRadius: 5,
    backgroundColor: '#3F3F3F',
    marginRight: widthPercentageToDP('1.5%'),
    alignItems: 'center',
    paddingVertical: heightPercentageToDP('1%'),
  },

  makeAppointmentButton: {
    backgroundColor: '#005EA2',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    paddingVertical: 16,
  },
});

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(MedicalServiceDetail);
