import React, {Component, useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  BackHandler,
  RefreshControl,
  Dimensions,
  StyleSheet,
  ToastAndroid,
  ScrollView,
  Image,
} from 'react-native';
import {connect} from 'react-redux';
import CardDoctor from '../../../components/home/doctor/card-doctor';
import {getDataDoctor, setLoading} from '../../../stores/action';
import axios from 'axios';
import {baseURL} from '../../../config';
import {specialistName} from '../../../assets/specialist/specialist';

// import SkeletonContent from 'react-native-skeleton-content';

import IconEntypo from 'react-native-vector-icons/Entypo';
import IconFontisto from 'react-native-vector-icons/Fontisto';
import Icon from 'react-native-vector-icons/Ionicons';
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconMI from 'react-native-vector-icons/MaterialIcons';

import Shortby from '../../../components/modals/doctors/modalSortBy';
import SpecialistBy from '../../../components/modals/doctors/modalSpecialist';
import FilterBottom from '../../../components/home/doctor/filter-bottom';
import FilterStack from '../../../navigation/activity/filterDokterStack';
import Search from '../../../assets/svg/Search';
import ArrowBack from '../../../assets/svg/ArrowBack'
// import AsyncStorage from '@react-native-async-storage/async-storage';

function SearchDoctorPage(props) {
  const [location, setLocation] = useState(props.myLocation);
  const [currentPage, setCurrentPage] = useState(0);

  const [show, setShow] = useState([]);
  const [showLoading, setLoading] = useState(true);
  const [loader, setLoad] = useState(false);

  const [name, setName] = useState('All');
  const [specialistData, setSpesialistData] = useState(specialistName());

  const [sortby, setsortby] = useState(false);
  // const [specialistBy, setSpecialistBy] = useState('All')
  const [toFar, setTofar] = useState(true);
  const [aToz, setAtoz] = useState(true);

  useEffect(() => {
    setLoading(true);
    setShow([]);
    setCurrentPage(0);
    _fetchDataDoctorPagination(name);
  }, [name]);

  useEffect(() => {
    if (!location && show) {
      show.sort((a, b) => {
        return a.doctorName.toLowerCase() > b.doctorName.toLowerCase();
      });
    }
  }, [show]);

  const _fetchDataDoctorPagination = async params => {
    // NOTE FOR LAT DAN LON
    // biasanya ada lat longnya yang kebalik dimasukkan
    // lat itu isinya yang pake minus (-)
    // kalo lon yang lebih panjang biasanya
    console.log(params, 'params ...', currentPage);
    if (params == 'All') {
      try {
        let {data} = await axios.post(
          `${baseURL}/api/v1/members/searchDoctor?page=${currentPage}`,
          {
            lat: location ? location.lat : -6.268809,
            lon: location ? location.lng : 106.974705,
            maxDistance: 1000000,
          },
          {timeout: 4000},
        );
        console.log(data,'ini datanya');
        if (currentPage == 0) {
          setShow(data.data);
        } else {
          setShow(show.concat(data.data));
        }
        setLoading(false);
        let nextPage = currentPage + 1;
        setCurrentPage(nextPage);
      } catch (error) {
        setLoading(false);
        // console.log(error)
        ToastAndroid.show(error.message, ToastAndroid.LONG);
      }
    } else {
      try {
        let {data} = await axios.post(
          `${baseURL}/api/v1/members/searchDoctorSpecialist?page=${currentPage}`,
          {
            lat: location ? location.lat : -6.268809,
            lon: location ? location.lng : 106.974705,
            maxDistance: 1000000,
            specialist: name,
          },
          {timeout: 4000},
        );
        if (data.data) {
          setShow(data.data);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        // console.log(error);
        ToastAndroid.show(error.message, ToastAndroid.LONG);
      }
    }
  };

  const _textChange = async params => {
    setShow([]);
    if (params === '') {
      setCurrentPage(0);
    }
    try {
      let {data, status} = await axios.get(
        `${baseURL}/api/v1/members/doctorByName?lat=${
          props.myLocation ? props.myLocation.lat : ''
        }&lon=${
          props.myLocation ? props.myLocation.lng : ''
        }&name=${params}&specialist=${name !== 'All' ? name : ''}`,
        {timeout: 4000},
      );
      if (status == 204) {
        setLoading(false);
        setShow([]);
      } else if (data.data.length) {
        let datawanted = data.data.map(el => {
          el.doctorID = el._id;
          return {
            photo: el.photo,
            doctorID: el.doctorID,
            title: el.title,
            doctorName: el.doctorName,
            gender: el.gender,
            specialist: el.specialist,
            estPrice: el.facility[0] ? el.facility[0].facilityEstPrice : '0',
            facilityID: {
              _id: el.facility[0] ? el.facility[0].facilityID : null,
              facilityName: el.facility[0] ? el.facility[0].facilityName : null,
            },
            distance: el.facility[0] ? el.facility[0].distance : null,
            location: el.facility[0]
              ? el.facility[0].location.coordinates
              : null,
          };
        });
        datawanted.sort((a, b) => {
          return a.distance > b.distance;
        });
        setShow(datawanted);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      // console.log(error)
    }
  };

  const onRefresh = React.useCallback(async () => {
    setName('All');
    setLoading(true);
    setShow([]);
    setCurrentPage(0);
    _fetchDataDoctorPagination('All');
  }, [loader]);

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

  BackHandler.addEventListener('hardwareBackPress', () => {
    return props.navigation.pop();
  });
  // console.log(show, 'ini show')
  return (
    <KeyboardAvoidingView
      style={styles.Container}
      behavior="height"
      enabled={false}>
      <View style={{height: 150}}>
        <ImageBackground
          source={require('../../../assets/background/RectangleHeader.png')}
          style={{flex: 1}}>
          <View style={{marginTop: 31, flex: 1}}>
            <TouchableOpacity onPress={() => props.navigation.pop()}>
              <View style={{flexDirection: 'row'}}>
                <ArrowBack />
                <Text
                  style={{
                    fontSize: 18,
                    color: '#ffff',
                    position: 'relative',
                    marginLeft: 10,
                    marginBottom: 10,
                  }}>
                  Pilih Dokter
                </Text>
              </View>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 15,
              }}>
              <View style={styles.searchBar}>
                <View style={{marginLeft: 20, marginTop: 12}}>
                  <Search />
                </View>

                <TextInput
                  autoFocus={
                    props.navigation.state.params
                      ? props.navigation.state.params.query === 'SearchFromHome'
                      : false
                  }
                  style={{
                    marginStart: 10,
                    fontSize: 14,
                    flex: 1,
                    color: '#A2A2A2',
                  }}
                  placeholder="cari dokter atau spesialis"
                  placeholderTextColor='#A2A2A2'
                  onChangeText={text => _textChange(text)}
                />
              </View>
              <View
                style={{
                  marginTop: 30,
                  marginRight: 10,
                }}>
                <Image
                  style={{
                    height: 20,
                    width: 20,
                  }}
                  source={require('../../../assets/png/ic_filter.png')}
                />
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
      <View style={{height: 60, margin: 15}}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity onPress={() => setName('All')}>
            <View
              style={{
                backgroundColor: name === 'All' ? '#005EA2' : null,
                borderWidth: name !== 'All' ? 1 : null,
                borderColor: name !== 'All' ? '#DDDDDD' : null,
                borderRadius: 30,
                height: 40,
                padding: 10,
                marginRight: 5,
                width: 50,
                alignItems: 'center'
              }}>
              <Text style={{color: '#DDDDDD'}}>All</Text>
            </View>
          </TouchableOpacity>
          {specialistData.map(item => {
            return (
              <TouchableOpacity
                onPress={() => setName(item.name)}
                key={item.id}>
                <View
                  style={{
                    backgroundColor: item.name === name ? '#005EA2' : null,
                    borderRadius: 30,
                    borderWidth: item.name !== name ? 1 : null,
                    borderColor: item.name !== name ? '#DDDDDD' : null,
                    height: 40,
                    padding: 10,
                    marginRight: 5,
                  }}>
                  <Text style={{color: '#DDDDDD'}}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
      {/* <SkeletonContent
        containerStyle={{flex: 1}}
        duration={1000}
        animationType={'shiver'}
        animationDirection={'diagonalDownRight'}
        isLoading={showLoading}
        layout={layoutSkeleton}
        boneColor={'#1F1F1F'}> */}
        <View style={{flex: 1}}>
          {show?.length > 0 ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'space-between',
                marginTop: -10,
              }}>
              <FlatList
                refreshControl={
                  <RefreshControl refreshing={loader} onRefresh={onRefresh} />
                }
                style={{flex: 1}}
                data={show}
                keyExtractor={(item, index) => String(index)}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() => {
                      props.navigation.navigate('DetailDoctor', {
                        data: item,
                        back: 'SearchDoctor',
                      });
                    }}>
                    <View style={{marginHorizontal: dimWidth * 0.03}}>
                      <CardDoctor data={item} myLocation={props.myLocation} />
                    </View>
                  </TouchableOpacity>
                )}
                onEndReached={() => {
                  if (show.length >= 5) {
                    _fetchDataDoctorPagination(name);
                  }
                }}
                onEndReachedThreshold={1}
              />
            </View>
          ) : (
            <ScrollView
              refreshControl={
                <RefreshControl refreshing={loader} onRefresh={onRefresh} />
              }>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 20,
                }}>
                <Text>There is no doctor nearby</Text>
              </View>
            </ScrollView>
          )}
          
        </View>
      {/* </SkeletonContent> */}

      {sortby && (
        <Shortby
          setVisible={() => setsortby(!sortby)}
          setFar={() => {
            show.sort((a, b) => {
              return a.distance > b.distance;
            });
          }}
          setClose={() => {
            show.sort((a, b) => {
              return a.distance < b.distance;
            });
          }}
          distanceActive={toFar}
          setSortby={() => setTofar(!toFar)}
          alfaActive={aToz}
          setAlfa={() => setAtoz(!aToz)}
          setAtoZ={() => {
            show.sort((a, b) => {
              return a.doctorName.toLowerCase() < b.doctorName.toLowerCase();
            });
          }}
          setZtoA={() => {
            show.sort((a, b) => {
              return a.doctorName.toLowerCase() > b.doctorName.toLowerCase();
            });
          }}
        />
      )}
      {/* {specialistBy && <SpecialistBy
        setVisible={() => setSpecialistBy(!specialistBy)}
        findDoctor={(params) => setName(params)}
      />} */}
    </KeyboardAvoidingView>
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

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = {
  getDataDoctor,
  setLoading,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchDoctorPage);
