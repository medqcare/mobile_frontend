import React, { Component, useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
  KeyboardAvoidingView,
  ClippingRectangle,
  Image,
  BackHandler,
  RefreshControl,
  ToastAndroid,
} from 'react-native';
import { connect } from 'react-redux';
import CardHospital from '../../../components/home/hospital/card-hospital';
import { getDataHospital } from '../../../stores/action';

import axios from 'axios';

import IconEntypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/Ionicons';
import latLongToKM from '../../../helpers/latlongToKM'
import Search from '../../../assets/svg/Search';
import ArrowBack from '../../../assets/svg/ArrowBack'

import { baseURL } from '../../../config';
// import AsyncStorage from '@react-native-async-storage/async-storage';

function SearchDoctorPage(props) {
  // console.log(props.navigation.state.params.facility,'ini params')
  let mainFac = props.navigation.state.params.facility
  const [loader, setLoad] = useState(false)
  const [currentPage, setCurrentPage] = useState(0);
  const [location, setLocation] = useState(props.myLocation);
  const [show, setShow] = useState([]);
  const [showLoading, setLoading] = useState(true);
  const [search, setSearch] = useState([]);

  useEffect(() => {
    fetchHospitalPagination();
  }, []);


  const fetchHospitalPagination = async () => {
    try {
      console.log("====================");
      console.log(location.lat, location.lng);
      let { data } = await axios({
        method: 'POST',
        url: `${baseURL}/api/v1/members/searchFacilityType/${mainFac}`,
        data: {
          lat: location ? location.lat : -6.268809,
          lon: location ? location.lng : 106.974705,
          maxDistance: 100000,
        },
      }, { timeout: 4000 });
      setShow(data.data);
      setLoading(false);
      // let nextPage = currentPage + 1;
      // setCurrentPage(nextPage);
    } catch (error) {
      setLoading(false);
      console.log(error, 'error');
    }
  };

  const _textChange = async facility => {
    setLoading(true);
    setShow([]);
    try {
      let { data, status } = await axios.get(
        `${baseURL}/api/v1/members/facilityByName?facilityName=${facility}&facilityMainType=${mainFac}`, { timeout: 4000 }
      );
      if (status == 204) {
        setLoading(false);
      } else {
        console.log('===========================');
        data.data.sort((a, b) => {
          let distanceA = latLongToKM(a.location.coordinates[1], a.location.coordinates[0], location.lat, location.lng).toFixed(1)
          let distanceB = latLongToKM(b.location.coordinates[1], b.location.coordinates[0], location.lat, location.lng).toFixed(1)
          return distanceA - distanceB
        })
        setShow(data.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      ToastAndroid.show(error.message, ToastAndroid.LONG)
    }
  };

  const onRefresh = React.useCallback(() => {
    fetchHospitalPagination()
  }, [loader]);

  BackHandler.addEventListener("hardwareBackPress", () => {
    return props.navigation.navigate('Home')
  })
  // console.log(show, 'show')
  return (
    <KeyboardAvoidingView
      style={styles.Container}
      behavior="height"
      enabled={false}>
      <View style={{ height: 150 }}>
        <ImageBackground
          source={require('../../../assets/background/RectangleHeader.png')}
          style={{ flex: 1 }}>
          <View style={{ marginTop: 31, flex: 1, }}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Home')}
              style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
              <ArrowBack
              />
              <Text
                style={{
                  fontSize: 18,
                  color: '#ffff',
                  position: 'relative',
                  marginLeft: 10, 
                  marginBottom: 10
                }}>
                Daftar Klinik
                </Text>
            </TouchableOpacity>
            <View style={{flexDirection: 'row', justifyContent:'space-between', marginHorizontal: 15, marginTop: -10}}>
              <View style={styles.searchBar}>
                <View style={{marginLeft: 20, marginTop:12}}>
                  <Search />
                </View>
                <TextInput
                  style={{ marginStart: 10, fontSize: 14, flex: 1, color: '#A2A2A2' }}
                  placeholder="Search Facility"
                  // onEndEditing={text => _textChange(text.nativeEvent.text)}
                  onChangeText={text => _textChange(text)}
                />
              </View>
              <View style={{
                marginTop: 30,
                marginRight: 10
              }}>
              <Image 
              style={{
                height: 20,
                width: 20
              }}
              source={require('../../../assets/png/ic_filter.png')}
              />
            </View>
            </View>
          </View>
        </ImageBackground>
      </View>

      <View style={{ flex: 4.8, backgroundColor: '#121212' }}>
        {showLoading ? <ActivityIndicator size="large" color="#0000ff" /> :
          show?.length > 0 ? (
            <FlatList
              refreshControl={
                <RefreshControl refreshing={loader} onRefresh={onRefresh} />
              }
              data={show}
              keyExtractor={(item, index) => String(index)}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate('DetailHospital', { data: item })
                  }>
                  <View>
                    <CardHospital data={item} />
                    {/* <Text style={{backgroundColor:'#F1D5CC', marginVertical:10}}>{JSON.stringify(item, null, 2)}</Text> */}
                  </View>
                </TouchableOpacity>
              )}
              // onEndReached={() => fetchHospitalPagination()}
              onEndReachedThreshold={1}
            />
          ) : (
              <View style={{ flex: 1, padding: 20, alignItems: 'center' }}>
                <Text style={{color: '#DDDDDD'}}>There is no facility nearby</Text>
              </View>
            )
        }

        {search === false && (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#FFF',
              flex: 1,
            }}>
            <Image
              source={{ uri: 'https://i.imgur.com/FPC6uwX.jpg' }}
              style={{ height: '30%', width: '40%' }}
            />
          </View>
        )}
      </View>
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
    height: '100%',
    backgroundColor: '#fff',
  },

  Icon: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: dimWidth * 0.2,
    marginBottom: '10%',
  },
  HeaderBar: {
    height: dimHeight * 0.12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3c9d9b',
    // padding:10
  },
  SearchBar: {
    padding: 10,
    minWidth: '100%',
  },
  NearestBar: {
    marginBottom: '1%',
    flexDirection: 'row',
    // width: "100%",
    backgroundColor: '#Fff',
    alignItems: 'center',
    paddingTop: 10,
    paddingHorizontal: 20,
    // height: "7.5%"
    flex: 0.2,
  },
  Category: {
    borderStyle: 'solid',
    borderWidth: 0.7,
    borderColor: 'gray',
    backgroundColor: '#fff',
    minHeight: dimHeight * 0.1,
    marginBottom: dimHeight * 0.02,
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
    width: '90%'
  },
  headerImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
});

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = {
  getDataHospital,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchDoctorPage);
