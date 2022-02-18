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
} from 'react-native';
import Checkbox from 'expo-checkbox';
import { connect } from 'react-redux';
import { formatNumberToRupiah } from '../../../helpers/formatRupiah';
import RightArrow from '../../../assets/svg/RightArrow';
import InformationIcon from '../../../assets/svg/information';
import ClearableSearchBar from '../../../components/headers/ClearableSearchBar';
import LottieLoader from 'lottie-react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { DUMMIES_TEST } from './dummyData';
import SearchBar from '../../../components/headers/SearchBar';

const dimHeight = Dimensions.get('window').height;
const dimWidth = Dimensions.get('window').width;


function PenunjangList(props) {
  const [speciments, setSpeciments] = useState([]);
  const [tests, setTests] = useState([]);
  const [filteredTests, setFilteredTests] = useState([]);
  const [selectedTests, setSelectedTests] = useState([]);
  const [search, setSearch] = useState('');
  const [specimentSelected, setSpecimentSelected] = useState({
    speciment_name: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingFilter, setIsLoadingFilter] = useState(false);
  const [isPreparation, setIsPreparation] = useState(true);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const PPN = totalPrice * (10 / 100);

  useEffect(() => {
    setTests(DUMMIES_TEST);
    setFilteredTests([]);
  }, []);

  useEffect(() => {
    if (search === '' && specimentSelected && isSearchActive) {
      const testsBySpeciment = tests.filter(
        (test) => test.speciment === specimentSelected.speciment_name
      );
      setFilteredTests(testsBySpeciment);
    }
  }, [search]);

  useEffect(() => {
    if (selectedTests.length !== 0) {
      setIsLoading(false);
      props.navigation.navigate('FindClinic', { tests: selectedTests });
    }
  }, [selectedTests]);

  useEffect(() => {
    if (specimentSelected.speciment_name) {
      const testsFilteredBySpecimentName = [];
      let newTotalPrice = 0;
      for (let i = 0; i < tests.length; i++) {
        const test = tests[i];

        if (test.selected === true) {
          newTotalPrice += test.price;
        }

        if (test.speciment === specimentSelected.speciment_name) {
          testsFilteredBySpecimentName.push(test);
        }
      }

      setTotalPrice(newTotalPrice);
      setFilteredTests(testsFilteredBySpecimentName);
      setIsLoadingFilter(false);
    }
  }, [specimentSelected]);

  useEffect(() => {
    if (speciments.length === 0 && tests.length !== 0) {
      let objectWithKeySpecimentName = {};
      for (let i = 0; i < tests.length; i++) {
        const { speciment } = tests[i];
        const test = tests[i];

        if (!objectWithKeySpecimentName[speciment]) {
          objectWithKeySpecimentName[speciment] = {
            speciment_name: speciment,
          };
        }
      }
      const speciments = Object.values(objectWithKeySpecimentName);
      setSpeciments(speciments);
    }
    setIsPreparation(false);
  }, [tests]);

  const toScreenClinic = () => {
    setIsLoading(true);
    const newSelectedTests = tests.filter((test) => test.selected === true);
    setSelectedTests(newSelectedTests);
  };

  const specimentStyleBehavior = (speciment) => ({
    container: {
      backgroundColor:
        speciment.speciment_name === specimentSelected.speciment_name
          ? '#212D3D'
          : '#2F2F2F',
      borderWidth: 1,
      borderColor:
        speciment.speciment_name === specimentSelected.speciment_name
          ? '#77BFF4'
          : 'transparent',
      padding: 10,
      borderRadius: 4,
      alignSelf: 'flex-start',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 6,
    },
    text: {
      color:
        speciment.speciment_name === specimentSelected.speciment_name
          ? '#77BFF4'
          : '#B5B5B5',
      fontSize: 12,
      textTransform: 'capitalize',
    },
  });

  const onSpecimentSelected = (speciment) => {
    // const testsFilteredBySpecimentName = [];
    // let newTotalPrice = 0;
    // for (let i = 0; i < tests.length; i++) {
    //   const test = tests[i];

    //   if (test.selected === true) {
    //     newTotalPrice += test.price;
    //   }

    //   if (test.speciment === speciment.speciment_name) {
    //     testsFilteredBySpecimentName.push(test);
    //   }
    // }
    setIsLoadingFilter(true);
    setSpecimentSelected(speciment);
    // setFilteredTests(testsFilteredBySpecimentName);
    // setTotalPrice(newTotalPrice);
  };

  const onTestSelected = (testId) => {
    let newTotalPrice = totalPrice;
    const newTestsFiltered = [];
    const newTests = tests.map((test) => {
      if (test.test_id === testId) {
        const isSelected = !!test.selected;

        if (isSelected === true) {
          test.selected = false;
          newTotalPrice -= test.price;
        } else {
          test.selected = true;
          newTotalPrice += test.price;
        }
      }
      if (test.speciment === specimentSelected.speciment_name) {
        newTestsFiltered.push(test);
      }
      return test;
    });
    setTotalPrice(newTotalPrice);
    setTests(newTests);
    if (search === '') {
      setFilteredTests(newTestsFiltered);
    }
  };

  const searchHandler = (text) => {
    const textLower = text.toLowerCase();
    if (text === '') {
      setSearch('');
      setFilteredTests([]);
    } else {
      const results = tests.filter((test) => {
        const testName = test.test_name.toLowerCase();
        return testName.startsWith(textLower);
      });
      setSearch(text);
      setFilteredTests(results);
    }
  };

  const renderItem = ({ item }) => {
    const { speciment_name } = item;
    const { container, text } = specimentStyleBehavior(item);
    return (
      <TouchableOpacity
        style={container}
        onPress={() => onSpecimentSelected(item)}
      >
        <Text style={text}>{speciment_name}</Text>
      </TouchableOpacity>
    );
  };

  const renderTests = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.specimentItemSection}
        onPress={() => onTestSelected(item.test_id)}
      >
        <Text style={styles.specimentItemText}>{item.test_name}</Text>
        <Checkbox
          value={item.selected}
          color={item.selected ? '#017EF9' : null}
          onValueChange={() => onTestSelected(item.test_id)}
          style={{ width: 16, height: 16 }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {isPreparation ? (
        <LottieLoader
          source={require('../../animation/loading.json')}
          autoPlay
          loop
        />
      ) : (
        <>
          <View>
            <StatusBar barStyle="light-content" />
			<SearchBar
				placeholder={'Cari layanan atau Lab test'}
				onChangeText={(text) => searchHandler(text)}
				// onFocus={() => setIsSearchActive(true)}
				// navigate={props.navigation.navigate}
			/>
            {/* <ClearableSearchBar
              placeholder="Cari test atau sampel"
              onChangeText={searchHandler}
              setSearch={setSearch}
              onFocus={() => setIsSearchActive(true)}
              navigate={props.navigation.navigate}
            /> */}

            {/* speciment */}
            {search === '' && speciments.length !== 0 ? (
              <View style={styles.specimentContainer}>
                <Text style={styles.title}>pilih kategori</Text>
                <View style={{ flexDirection: 'row' }}>
                  <FlatList
                    data={speciments}
                    renderItem={renderItem}
                    keyExtractor={(_, index) => `${index}-speciment`}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                  />
                </View>
              </View>
            ) : null}

            {/* test by speciment */}
            {filteredTests.length !== 0 ? (
              <>
                {isLoadingFilter ? (
                  <View
                    style={{
                      height: 250,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <ActivityIndicator color="white" size="large" />
                  </View>
                ) : (
                  <View>
                    <FlatList
                      data={filteredTests}
                      style={styles.specimentItemContainer}
                      renderItem={renderTests}
                      showsVerticalScrollIndicator={true}
                      persistentScrollbar={true}
                      keyExtractor={(item) => `${item.test_id}-test`}
                    ></FlatList>
                    <TouchableOpacity
                      style={{ paddingHorizontal: 12 }}
                      onPress={() => {
                        setTotalPrice(0);
                        setTests(
                          tests.map((el) => {
                            el.selected = false;
                            return el;
                          })
                        );
                      }}
                    >
                      <Text
                        style={{
                          textTransform: 'uppercase',
                          color: '#F04444',
                          fontSize: 12,
                        }}
                      >
                        clear all
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </>
            ) : null}
          </View>

          <View>
            {/* price preview */}
            {totalPrice !== 0 ? (
              <View style={styles.priceSection}>
                <ScrollView style={styles.topPriceContainer}>
                  <Text style={styles.costTitle}>Perkiraan Biaya</Text>
                  <View style={styles.costDetailSectionContainer}>
                    {tests.map((test) => {
                      if (!!test.selected) {
                        return (
                          <View
                            style={styles.costDetailSection}
                            key={`cost-${test.test_name}-${test.test_id}`}
                          >
                            <Text
                              style={styles.costText}
                            >{`Cek ${test.test_name} ${test.speciment}`}</Text>
                            <Text style={styles.costText}>
                              {formatNumberToRupiah(test.price)}
                            </Text>
                          </View>
                        );
                      }
                    })}
                    <View style={styles.costDetailSection}>
                      <Text style={{ color: '#B5B5B5' }}>{`PPN`}</Text>
                      <Text style={styles.costText}>
                        {formatNumberToRupiah(PPN)}
                      </Text>
                    </View>
                  </View>
                </ScrollView>
                <View style={styles.bottomPriceContainer}>
                  <View style={styles.informationContainer}>
                    <InformationIcon />
                    <Text
                      style={{
                        color: '#B5B5B5',
                        fontSize: 11,
                        marginLeft: 8,
                        fontStyle: 'italic',
                      }}
                      numberOfLines={2}
                    >
                      Harga akan berbeda di setiap tempat praktik
                    </Text>
                  </View>
                  <View style={styles.subTotalContainer}>
                    <Text style={styles.subTotalTitle}>Sub Total</Text>
                    <Text style={styles.subTotalPriceText}>
                      {formatNumberToRupiah(totalPrice + PPN)}
                    </Text>
                  </View>
                </View>
              </View>
            ) : null}
            {totalPrice !== 0 ? (
              <TouchableOpacity
                style={styles.buttonWithIcon}
                onPress={() => toScreenClinic()}
              >
                {isLoading ? (
                  <ActivityIndicator size={'small'} color="#FFF" />
                ) : (
                  <>
                    <Text style={styles.buttonWithIconLabel}>Lanjutkan</Text>
                    <RightArrow />
                  </>
                )}
              </TouchableOpacity>
            ) : null}
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F1F1F',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    paddingBottom: 14,
    justifyContent: 'space-between',
    backgroundColor: '#1F1F1F',
  },
  title: {
    color: '#DDDDDD',
    textTransform: 'uppercase',
    marginBottom: 14,
  },
  specimentContainer: {
    marginBottom: 12,
  },
  specimentItemContainer: {
    backgroundColor: '#2F2F2F',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 12,
    maxHeight: heightPercentageToDP('25%'),
    marginBottom: 12,
  },
  specimentItemSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#474747',
    paddingBottom: 12,
    marginBottom: 12,
  },
  specimentItemText: {
    fontSize: 12,
    color: '#DDDDDD',
    maxWidth: '70%',
  },
  itemSection: {
    marginBottom: 12,
    // maxHeight: 250,
  },
  priceSection: {
    marginBottom: 14,
  },
  topPriceContainer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#474747',
    borderRadius: 4,
    height: heightPercentageToDP('25%'),
    marginBottom: 12,
    backgroundColor: 'transparent',
  },
  costDetailSectionContainer: {
    paddingBottom: 18,
  },
  costDetailSection: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 12,
  },
  costText: {
    fontSize: 12,
    textTransform: 'capitalize',
    color: '#B5B5B5',
    maxWidth: '60%',
  },
  costTitle: {
    color: '#F37335',
    textTransform: 'uppercase',
    marginBottom: 10,
    fontSize: 12,
  },
  costInformationContainer: {},
  bottomPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  informationContainer: {
    alignItems: 'center',
    backgroundColor: '#3B340B',
    paddingVertical: 6,
    paddingHorizontal: 8,
    flexDirection: 'row',
    width: widthPercentageToDP('45%'),
    borderRadius: 4,
  },
  subTotalContainer: {
    alignSelf: 'flex-end',
  },
  subTotalTitle: {
    color: '#B5B5B5',
    fontSize: 10,
    textTransform: 'uppercase',
    marginBottom: 6,
    textAlign: 'right',
  },
  subTotalPriceText: {
    color: '#DDDDDD',
    fontSize: 16,
    textAlign: 'right',
  },
  buttonWithIcon: {
    minHeight: 48,
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#005EA2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    width: '100%',
  },
  buttonWithIconLabel: {
    color: '#DDDDDD',
    textTransform: 'capitalize',
    marginRight: 10,
    fontSize: 14,
  },
});

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(PenunjangList);
