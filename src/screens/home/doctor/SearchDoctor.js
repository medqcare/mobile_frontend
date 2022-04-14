import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  BackHandler,
  RefreshControl,
  Dimensions,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { connect, useDispatch } from 'react-redux';
import CardDoctor from '../../../components/home/doctor/card-doctor';
import {
  setLoading,
  searchAllDoctors,
  searchDoctorBySpecialist,
  searchDoctorByName,
} from '../../../stores/action';
import keys from '../../../stores/keys';
import SearchBar from '../../../components/headers/SearchBar';
import IconFilter from '../../../assets//svg/Filter';

import ArrowBack from '../../../assets/svg/ArrowBack';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import LottieLoader from 'lottie-react-native';
import { getSpecialists } from '../../../stores/action/specialists';
import ModalFilterDoctor from '../../../components/modals/ModalFilterDoctor';
const DEFAULT_SPESIALIS = 'Semua';

function SearchDoctorPage(props) {
  const dispatch = useDispatch();
  const { SET_SPECIALIST, SET_CURRENT_PAGE, DELETE_DOCTORS } = keys.doctorKeys;
  const {
    doctors,
    isLoading: isloadingDoctor,
    error: errorDoctor,
    currentPage: currentPageReducer,
  } = props.doctorReducer;
  const {
    userLocation,
    isLoading: isLoadingUserLocation,
    error: errorUserLocation,
  } = props.userLocationReducer;

  const { specialists } = props.specialistReducer;

  const [availableLocations, setAvalaibleLocations] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [show, setShow] = useState([]);
  const [showLoading, setLoading] = useState(true);
  const [loader, setLoad] = useState(false);

  const [modalFilterIsActive, setModalFilterIsActive] = useState();

  useEffect(() => {
    setLoading(true);
    setShow([]);
    setCurrentPage(0);
    props.getSpecialists();
    _fetchDataDoctorPagination(DEFAULT_SPESIALIS);
  }, []);

  const _fetchDataDoctorPagination = async (params, filterQuery) => {
    console.log(params, 'params ...', currentPage);
    if (params == DEFAULT_SPESIALIS) {
      props.searchAllDoctors(currentPageReducer, userLocation, doctors);
    }
    else if(filterQuery){
      props.searchAllDoctors(currentPageReducer, userLocation, doctors, filterQuery)
    } else {
      props.searchDoctorBySpecialist(currentPageReducer, null, doctors);
    }
  };

  const _textChange = async (params) => {
    if (params === '') {
      dispatch({
        type: SET_CURRENT_PAGE,
        payload: 0,
      });
    }
    props.searchDoctorByName(currentPageReducer, params, userLocation, doctors);
  };

  const onRefresh = React.useCallback(async () => {
    setLoading(true);
    setShow([]);
    setCurrentPage(0);
    _fetchDataDoctorPagination(DEFAULT_SPESIALIS);
  }, [loader]);

  const searchSpecialistHandler = (query) => {
    props.getSpecialists(query)
  }

  BackHandler.addEventListener('hardwareBackPress', () => {
    dispatch({
      type: SET_CURRENT_PAGE,
      payload: 0,
    });
    return props.navigation.pop();
  });

  function NoContent() {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loader} onRefresh={onRefresh} />
        }
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
          }}
        >
          <Text style={{ color: '#fff' }}>Tidak ada dokter terdekat</Text>
        </View>
      </ScrollView>
    );
  }

  return (
    <>
      <KeyboardAvoidingView
        style={styles.Container}
        behavior="height"
        enabled={false}
      >
        <View
          style={{
            height: heightPercentageToDP('18%'),
            marginBottom: heightPercentageToDP('4%'),
          }}
        >
          <ImageBackground
            source={require('../../../assets/background/RectangleHeader.png')}
            style={{
              flex: 1,
              paddingTop: heightPercentageToDP('5%'),
            }}
          >
            <View style={{ marginHorizontal: 20, flex: 1 }}>
              <TouchableOpacity
                onPress={() => {
                  dispatch({
                    type: SET_CURRENT_PAGE,
                    payload: 0,
                  });
                  props.navigation.pop();
                }}
              >
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ marginTop: 3 }}>
                    <ArrowBack />
                  </View>
                  <Text
                    style={{
                      fontSize: 18,
                      color: '#ffff',
                      position: 'relative',
                      marginLeft: 10,
                    }}
                  >
                    Pilih Dokter
                  </Text>
                </View>
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <View style={{ width: '90%' }}>
                  <SearchBar
                    placeholder={'cari dokter atau spesialis'}
                    onChangeText={(text) => _textChange(text)}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => {
                    console.log('terpanggil');
                    setModalFilterIsActive(true);
                  }}
                >
                  <IconFilter />
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>
        {isloadingDoctor ? (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: heightPercentageToDP('50%'),
            }}
          >
            <LottieLoader
              source={require('../../animation/loading.json')}
              loop
              autoPlay
            />
          </View>
        ) : (
          <>
            <View style={{ flex: 1 }}>
              {doctors?.length > 0 ? (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'space-between',
                    marginTop: -10,
                  }}
                >
                  <FlatList
                    refreshControl={
                      <RefreshControl
                        refreshing={loader}
                        onRefresh={onRefresh}
                      />
                    }
                    style={{ flex: 1 }}
                    data={doctors}
                    keyExtractor={(item, index) => String(index)}
                    renderItem={({ item }) => {
                      const { distance, doctors } = item;
                      const { humanReadable } = distance
                      return doctors.map((el) => {
                        return (
                          <TouchableOpacity
                            key={el._id}
                            onPress={() => {
                              props.navigation.navigate('DetailDoctor', {
                                data: el,
                                back: 'SearchDoctor',
                                distance: humanReadable,
                              });
                            }}
                          >
                            <View style={{ marginHorizontal: dimWidth * 0.03 }}>
                              <CardDoctor
                                data={el}
                                distance={humanReadable}
                              />
                            </View>
                          </TouchableOpacity>
                        );
                      });
                    }}
                    onEndReached={() => {
                      if (availableLocations.length >= 10) {
                        _fetchDataDoctorPagination(name);
                      }
                    }}
                    onEndReachedThreshold={1}
                  />
                </View>
              ) : (
                <NoContent />
              )}
            </View>
          </>
        )}
      </KeyboardAvoidingView>
      <ModalFilterDoctor
        searchByFilter={_fetchDataDoctorPagination}
        isVisible={modalFilterIsActive}
        onBackButtonPress={() => {
          setModalFilterIsActive(false);
        }}
        specialists={specialists}
        searchSpecialistHandler={searchSpecialistHandler}
        getSpecialists={props.getSpecialists}
      />
    </>
  );
}

const dimHeight = Dimensions.get('screen').height;
const dimWidth = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  Container: {
    marginHorizontal: 0,
    marginTop: 0,
    flex: 1,
    backgroundColor: '#181818',
  },
  Icon: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '20%',
    marginBottom: '10%',
  },
  HeaderBar: {
    minHeight: '10%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#3c9d9b',
    padding: 5,
  },
  SearchBar: {
    padding: 10,
    minWidth: '100%',
  },
  Category: {
    borderStyle: 'solid',
    borderWidth: 0.7,
    borderColor: 'gray',
    backgroundColor: '#fff',
    minHeight: '10%',
    marginBottom: '10%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    paddingTop: '5%',
  },
  searchBar: {
    borderColor: '#DDDDDD',
    borderWidth: 0.8,
    padding: 5,
    height: 50,
    marginRight: 10,
    marginTop: 15,
    borderRadius: 25,
    flexDirection: 'row',
    width: '90%',
  },
  NearestBar: {
    marginBottom: 10,
    marginHorizontal: '5%',
    flexDirection: 'row',
  },
  containerBottom: {
    flexDirection: 'row',
    width: '100%',
    borderTopColor: '#DCD6D6',
    borderTopWidth: 1,
    backgroundColor: '#FFF',
  },
  filterBottom: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});

const stylesF = StyleSheet.create({
  container: {
    width: '100%',
    height: '50%',
    backgroundColor: '#FFF',
    alignItems: 'center',
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
    borderColor: '#CDCDCD',
    borderWidth: 1,
    marginBottom: 70,
  },
  textSortby: {
    color: '#CDCDCD',
    fontSize: 14,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  item: {
    height: '50%',
    width: '30%',
    backgroundColor: '#CACACA',
    marginHorizontal: 5,
    paddingHorizontal: 5,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textItem: {
    textAlign: 'center',
    marginTop: 5,
    fontSize: 12,
  },
});

const layoutSkeleton = [
  {
    key: 'image',
    width: 80,
    height: 80,
    marginTop: 10,
    marginBottom: 8,
    marginLeft: 20,
    borderRadius: 80,
    flexDirection: 'row',
  },
  {
    key: 'text',
    width: dimWidth * 0.6,
    height: 30,
    marginTop: -86,
    marginBottom: 6,
    marginLeft: 120,
  },
  {
    key: 'text2',
    width: dimWidth * 0.6,
    height: 50,
    marginBottom: 6,
    marginLeft: 120,
  },
  {
    key: 'line',
    width: dimWidth,
    height: 2,
    marginVertical: 6,
  },
  {
    key: 'image2',
    width: 80,
    height: 80,
    marginTop: 10,
    marginBottom: 8,
    marginLeft: 20,
    borderRadius: 80,
    flexDirection: 'row',
  },
  {
    key: 'text21',
    width: dimWidth * 0.6,
    height: 30,
    marginTop: -86,
    marginBottom: 6,
    marginLeft: 120,
  },
  {
    key: 'text22',
    width: dimWidth * 0.6,
    height: 50,
    marginBottom: 6,
    marginLeft: 120,
  },
  {
    key: 'line2',
    width: dimWidth,
    height: 2,
    marginVertical: 6,
  },
  {
    key: 'image3',
    width: 80,
    height: 80,
    marginTop: 10,
    marginBottom: 8,
    marginLeft: 20,
    borderRadius: 80,
    flexDirection: 'row',
  },
  {
    key: 'text31',
    width: dimWidth * 0.6,
    height: 30,
    marginTop: -86,
    marginBottom: 6,
    marginLeft: 120,
  },
  {
    key: 'text32',
    width: dimWidth * 0.6,
    height: 50,
    marginBottom: 6,
    marginLeft: 120,
  },
  {
    key: 'line3',
    width: dimWidth,
    height: 2,
    marginVertical: 6,
  },
  {
    key: 'image4',
    width: 80,
    height: 80,
    marginTop: 10,
    marginBottom: 8,
    marginLeft: 20,
    borderRadius: 80,
    flexDirection: 'row',
  },
  {
    key: 'text41',
    width: dimWidth * 0.6,
    height: 30,
    marginTop: -86,
    marginBottom: 6,
    marginLeft: 120,
  },
  {
    key: 'text42',
    width: dimWidth * 0.6,
    height: 50,
    marginBottom: 6,
    marginLeft: 120,
  },
  {
    key: 'line4',
    width: dimWidth,
    height: 2,
    marginVertical: 6,
  },
  {
    key: 'image5',
    width: 80,
    height: 80,
    marginTop: 10,
    marginBottom: 8,
    marginLeft: 20,
    borderRadius: 80,
    flexDirection: 'row',
  },
  {
    key: 'text51',
    width: dimWidth * 0.6,
    height: 30,
    marginTop: -86,
    marginBottom: 6,
    marginLeft: 120,
  },
  {
    key: 'text52',
    width: dimWidth * 0.6,
    height: 50,
    marginBottom: 6,
    marginLeft: 120,
  },
  {
    key: 'line5',
    width: dimWidth,
    height: 2,
    marginVertical: 6,
  },
  {
    key: 'image6',
    width: 80,
    height: 80,
    marginTop: 10,
    marginBottom: 8,
    marginLeft: 20,
    borderRadius: 80,
    flexDirection: 'row',
  },
  {
    key: 'text61',
    width: dimWidth * 0.6,
    height: 30,
    marginTop: -86,
    marginBottom: 6,
    marginLeft: 120,
  },
  {
    key: 'text62',
    width: dimWidth * 0.6,
    height: 50,
    marginBottom: 6,
    marginLeft: 120,
  },
  {
    key: 'line6',
    width: dimWidth,
    height: 2,
    marginVertical: 6,
  },
];

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = {
  setLoading,
  searchAllDoctors,
  searchDoctorBySpecialist,
  searchDoctorByName,
  getSpecialists,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchDoctorPage);
