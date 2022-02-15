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
  ToastAndroid,
  ScrollView,
  StatusBar,
  Platform,
} from 'react-native';
import { connect } from 'react-redux';
import CardDoctor from '../../../components/home/doctor/card-doctor';
import { getDataDoctor, setLoading } from '../../../stores/action';
import axios from 'axios';
import { baseURL } from '../../../config';
import { specialistName } from '../../../assets/specialist/specialist';
import SearchBar from '../../../components/headers/SearchBar';

import Shortby from '../../../components/modals/doctors/modalSortBy';
import ArrowBack from '../../../assets/svg/ArrowBack';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { ActivityIndicator } from 'react-native-paper';
import LottieLoader from 'lottie-react-native';

function SearchDoctorPage(props) {
  // const [searchFromHome, setSearchFromHome] = useState(true)
  const [location, setLocation] = useState(props.myLocation);
  const [availableLocations, setAvalaibleLocations] = useState([])
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

//   useEffect(() => {
//     if (!location && show) {
//       show.sort((a, b) => {
//         return a.doctorName.toLowerCase() > b.doctorName.toLowerCase();
//       });
//     }
//   }, [show]);

	const _fetchDataDoctorPagination = async (params) => {
		console.log(params, 'params ...', currentPage);
		if (params == 'All') {
			try {
				let { data } = await axios.post(
					`${baseURL}/api/v1/members/searchDoctor?page=${currentPage}`,
					{
						lat: location ? location.lat : -6.268809,
						lon: location ? location.lng : 106.974705,
						maxDistance: 1000000,
					},
					{ timeout: 4000 }
				);
				if (currentPage == 0) {
					setShow(data.data);
					setAvalaibleLocations(data.data);
				} else {
					setShow(show.concat(data.data));
					setAvalaibleLocations(availableLocations.concat(data.data));
				}
				setLoading(false);
				let nextPage = currentPage + 1;
				setCurrentPage(nextPage);
			} catch (error) {
				setLoading(false);
				ToastAndroid.show(error.message, ToastAndroid.LONG);
			}
		} else {
			try {
				let { data } = await axios.post(
				`${baseURL}/api/v1/members/searchDoctorSpecialist?page=${currentPage}`,
				{
					// lat: location ? location.lat : -6.268809,
					// lon: location ? location.lng : 106.974705,
					maxDistance: 1000000,
					specialist: name,
				},
				{ timeout: 4000 }
				);
				
				if (data.data) {
					if (currentPage == 0) {
						setShow(data.data);
						setAvalaibleLocations(data.data);
					} else {
						setShow(show.concat(data.data));
						setAvalaibleLocations(availableLocations.concat(data.data));
					}
				}

				setLoading(false);
			} catch (error) {
				setLoading(false);
				ToastAndroid.show(error.message, ToastAndroid.LONG);
			}
		}
	};


	const _textChange = async (params) => {
		setShow([]);
		setAvalaibleLocations([])
		setCurrentPage(0);
		if (params === '') {
			setCurrentPage(0);
		}
		setLoading(true);
		try {
			let { data, status } = await axios({
				method: 'POST',
				url: `${baseURL}/api/v1/members/searchDoctor?page=0`,
				data: {
					lat: location ? location.lat : -6.268809,
            		lon: location ? location.lng : 106.974705,
					maxDistance: 1000000,
					name: params,
					specialist: name !== 'All' ? name : ''
				}
			})
			// let { data, status } = await axios.get(
			// 	`${baseURL}/api/v1/members/doctorByName?lat=${
			// 	props.myLocation ? props.myLocation.lat : ''
			// 	}&lon=${
			// 	props.myLocation ? props.myLocation.lng : ''
			// 	}&name=${params}&specialist=${name !== 'All' ? name : ''}`,
			// 	{ timeout: 4000 }
			// );
			if (status == 204) {
				console.log(data)
				setLoading(false);
				setShow([]);
			} else if (data.data.length) {
				// let datawanted = data.data.map((el) => {
				//   el.doctorID = el._id;
				//   return {
				//     photo: el.photo,
				//     doctorID: el.doctorID,
				//     title: el.title,
				//     doctorName: el.doctorName,
				//     gender: el.gender,
				//     specialist: el.specialist,
				//     estPrice: el.facility[0] ? el.facility[0].facilityEstPrice : '0',
				//     facilityID: {
				//       _id: el.facility[0] ? el.facility[0].facilityID : null,
				//       facilityName: el.facility[0] ? el.facility[0].facilityName : null,
				//     },
				//     distance: el.facility[0] ? el.facility[0].distance : null,
				//     location: el.facility[0]
				//       ? el.facility[0].location.coordinates
				//       : null,
				//   };
				// });
				// datawanted.sort((a, b) => {
				//   return a.distance > b.distance;
				// });
				// if(availableLocations.length > 0){
				// 	console.log('harusnya ditambahin di sini')
				// 	setAvalaibleLocations(availableLocations.concat(data.data));
				// 	setLoading(false);
				// } else {
					setShow(data.data);
					setAvalaibleLocations(data.data)
					setLoading(false);
				// }
			} else {
				setLoading(false);
			}
		} catch (error) {
			setLoading(false);
		}
	};

	console.log(availableLocations.length, 'length dari available locations')


  const onRefresh = React.useCallback(async () => {
    setName('All');
    setLoading(true);
    setShow([]);
    setCurrentPage(0);
    _fetchDataDoctorPagination('All');
  }, [loader]);

  BackHandler.addEventListener('hardwareBackPress', () => {
    return props.navigation.pop();
  });
  return (
    <KeyboardAvoidingView
      style={styles.Container}
      behavior="height"
      enabled={false}
    >
      <View style={{ height: heightPercentageToDP('18%') }}>
        <ImageBackground
          source={require('../../../assets/background/RectangleHeader.png')}
          style={{
            flex: 1,
            paddingTop: heightPercentageToDP('5%'),
          }}
        >
          <View style={{ marginHorizontal: 20, flex: 1 }}>
            <TouchableOpacity onPress={() => props.navigation.pop()}>
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
            <SearchBar
              placeholder={'cari dokter atau spesialis'}
              onChangeText={(text) => _textChange(text)}
            />
          </View>
        </ImageBackground>
      </View>
      <View style={{ height: 60, margin: 15 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity onPress={() => setName('All')}>
            <View
              style={{
                backgroundColor: name === 'All' ? '#005EA2' : null,
                borderWidth: name !== 'All' ? 1 : null,
                borderColor: name !== 'All' ? '#515151' : null,
                borderRadius: 30,
                height: 40,
                padding: 10,
                marginRight: 5,
                width: 50,
                alignItems: 'center',
              }}
            >
              <Text style={{ color: '#DDDDDD' }}>All</Text>
            </View>
          </TouchableOpacity>
          {specialistData.map((item) => {
            return (
              <TouchableOpacity
                onPress={() => setName(item.name)}
                key={item.id}
              >
                <View
                  style={{
                    backgroundColor: item.name === name ? '#005EA2' : null,
                    borderRadius: 30,
                    borderWidth: item.name !== name ? 1 : null,
                    borderColor: item.name !== name ? '#515151' : null,
                    height: 40,
                    padding: 10,
                    marginRight: 5,
                  }}
                >
                  <Text style={{ color: '#DDDDDD' }}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
      {showLoading ? (
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
            {show?.length > 0 ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'space-between',
                  marginTop: -10,
                }}
              >
                <FlatList
                  refreshControl={
                    <RefreshControl refreshing={loader} onRefresh={onRefresh} />
                  }
                  style={{ flex: 1 }}
                  data={availableLocations}
                  keyExtractor={(item, index) => String(index)}
                  renderItem={({ item }) => {
					const { distance, doctors } = item
					return (
						doctors.map(el => {
							return (
								<TouchableOpacity
									key={el._id}
									onPress={() => {
										props.navigation.navigate('DetailDoctor', {
											data: el,
											back: 'SearchDoctor',
											distance
										});
									}}
								>
									<View style={{ marginHorizontal: dimWidth * 0.03 }}>
										<CardDoctor data={el} myLocation={props.myLocation} distance={distance} />
									</View>
								</TouchableOpacity>
							)
						})
                    )
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
                  <Text style={{ color: '#fff' }}>
                    Tidak ada dokter terdekat
                  </Text>
                </View>
              </ScrollView>
            )}
          </View>
        </>
      )}

      {/* {sortby && (
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
      )} */}
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
  getDataDoctor,
  setLoading,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchDoctorPage);
