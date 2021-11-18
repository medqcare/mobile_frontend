import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  BackHandler,
  ToastAndroid,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import {setAlergie, getAlergie, deleteAlergie} from '../../stores/action';
import {connect} from 'react-redux';
import SetModals from '../../components/modals/setModal';
import LottieLoader from 'lottie-react-native';
import {LinearGradient} from 'expo-linear-gradient';
import SelectPatient from '../../components/modals/selectPatient';
import SelectModalAllergies from '../../components/modals/modalPickerAllergies';
import ArrowBack from '../../assets/svg/ArrowBack'
import ConfirmationModal from '../../components/modals/ConfirmationModal'

const Allergies = props => {
  const [Load, setLoad] = useState(false);
  const [inputAlergies, setInputAlergies] = useState('');
  const allergieTypeSelection = [
    {
      label: 'Cuaca',
      value: 'Cuaca',
    },
    {
      label: 'Obat',
      value: 'Obat',
    },
    {
      label: 'Makanan',
      value: 'Makanan',
    },
  ];
  const [type, setType] = useState('Cuaca');
  const [allergies, setAlergies] = useState([]);
  const [modalW, setModalW] = useState(false);
  const [idAlergie, setId] = useState(null);
  const [idUser, setIduser] = useState({firstName: null, _id: null});
  const [family, setFamily] = useState([]);
  const [modalPatient, setModalPatient] = useState(false);
  const [modalAllergyTypes, setModalAllergyTypes] = useState(false);

  async function addAlergies(data) {
    let token = await AsyncStorage.getItem('token');
    if (inputAlergies && type) {
      props
        .setAlergie(
          idUser._id,
          {alergie: inputAlergies, alergieType: type},
          JSON.parse(token).token,
        )
        .then(backData => {
          _fetchDataAlergi();
          setInputAlergies('');
          setType('Cuaca');
        });
    } else {
      ToastAndroid.show(
        'please fill in allergy and type of allergy',
        ToastAndroid.LONG,
      );
    }
  }

  function getFamily() {
    let dataUser = {
      _id: props.userData._id,
      firstName: props.userData.lastName
        ? props.userData.firstName + ' ' + props.userData.lastName
        : props.userData.firstName,
    };
    const temp = [dataUser];
    props.userData.family.forEach(el => {
      temp.push({
        _id: el._id,
        firstName: el.lastName
          ? el.firstName + ' ' + el.lastName
          : el.firstName,
      });
    });
    setIduser(temp[0]);
    setFamily(temp);
  }

  BackHandler.addEventListener('hardwareBackPress', () => {
    return props.navigation.pop();
  });

  async function _fetchDataAlergi() {
    setAlergies([]);
    setLoad(true);
    let token = await AsyncStorage.getItem('token');
    let tempt = [];
    props
      .getAlergie(idUser._id, JSON.parse(token).token)
      .then(allAlergi => {
        // console.log(allAlergi, 'then yang ke 2');
        allAlergi.data.map((el, idx) => {
          return el.status == 'Active' ? tempt.push(el) : null;
        });
        setAlergies(tempt);
        setLoad(false);
      })
      .catch(error => {
        console.log(error);
        setLoad(false);
      });
  }

  async function _DeleteAlergi(_idAlergie) {
    let token = await AsyncStorage.getItem('token');
    props.deleteAlergie(_idAlergie, JSON.parse(token).token).then(backData => {
      // console.log('delete', backData);
      _fetchDataAlergi();
    });
  }

  useEffect(() => {
    getFamily();
  }, []);
  useEffect(() => {
    if (idUser._id) {
      _fetchDataAlergi();
    }
  }, [idUser]);

  const [patient, setPatient] = useState({
    _id: props.userData._id,
    firstName: props.userData.lastName
      ? props.userData.firstName + ' ' + props.userData.lastName
      : props.userData.firstName,
  });
  function setSelectedValue(firstName, _id) {
    setIduser({firstName, _id});
  }

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#073B88', '#048FBB']}
        style={styles.content}>
        <View
          style={{
            flex: 1,
            marginTop: 32,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => props.navigation.navigate('Home')}>
            <View style={{flexDirection: 'row', marginBottom: 15}}>
              <ArrowBack
              />
              <Text
                style={{fontSize: 20, color: '#ffff', position: 'relative'}}>
                Alergi Pasien
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Name box */}
      <View style={styles.boxContainer}>
        <TouchableOpacity
          onPress={() => setModalPatient(true)}
          style={{...styles.box, height: 50}}>
          <Text style={styles.inputText}>{idUser.firstName}</Text>
          <Image source={require('../../assets/png/ArrowDown.png')} />
        </TouchableOpacity>

        <SelectPatient
          modal={modalPatient}
          setModal={setModalPatient}
          patient={patient}
          setPatient={setPatient}
          family={family}
          title="Siapa yang ingin anda check?"
          setSelectedValue={setSelectedValue}
        />
      </View>
      {Load ? (
        <View style={{flex: 1, width: '100%', backgroundColor: '#1F1F1F'}}>
          <LottieLoader
            source={require('../animation/loading.json')}
            autoPlay
            loop
          />
        </View>
      ) : (
        <>
          {/* Lower View */}

          {allergies.length ? (
            // Allergy Box
            <View style={styles.allergieBoxContainer}>
              <View style={styles.lowerBox}>
                <View style={styles.allergiesTextContainerTop}>
                  <Text style={styles.allergiesTextTop}>Alergi</Text>
                  <Text style={styles.allergiesTextTop}>Tipe</Text>
                </View>

                {allergies.map((el, i) => {
                  return (
                    <TouchableOpacity
                      style={{flexDirection: 'row', width: '100%'}}
                      key={i}
                      onLongPress={() => {
                        setModalW(true);
                        setId(el._id);
                      }}>
                      <View style={styles.allergiesTextContainer} key={i}>
                        <Text style={styles.allergiesText}>{el.alergie}</Text>
                        <Text style={styles.allergiesText}>
                          {el.alergieType}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Add Allergy Button */}
              <View style={styles.addAlergiesContainer}>
                <TouchableOpacity
                  onPress={() => {
                    setModalAllergyTypes(true);
                  }}
                  style={styles.button}>
                  {Load ? (
                    <ActivityIndicator size={'small'} color="#FFF" />
                  ) : (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        source={require('../../assets/png/PlusSign.png')}
                      />
                      <Text
                        style={{
                          fontSize: 18,
                          color: '#FFF',
                          paddingLeft: 15,
                          color: '#4398D1',
                        }}>
                        Tambah Alergi
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
                <SelectModalAllergies
                  modal={modalAllergyTypes}
                  setModal={setModalAllergyTypes}
                  selection={allergieTypeSelection}
                  setSelectedValue={setType}
                  inputAlergies={inputAlergies}
                  setInputAlergies={setInputAlergies}
                  load={Load}
                  addAlergies={addAlergies}
                />
              </View>
            </View>
          ) : (
            <View style={{flex: 1, alignItems: 'center'}}>
              <Text style={{padding: 10, color: '#fff'}}>No allergies</Text>
              <View style={styles.addAlergiesContainer}>
                <TouchableOpacity
                  onPress={() => {
                    setModalAllergyTypes(true);
                  }}
                  style={styles.button}>
                  {Load ? (
                    <ActivityIndicator size={'small'} color="#FFF" />
                  ) : (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        source={require('../../assets/png/PlusSign.png')}
                      />
                      <Text
                        style={{
                          fontSize: 18,
                          color: '#FFF',
                          paddingLeft: 15,
                          color: '#4398D1',
                        }}>
                        Tambah Alergi
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
                <SelectModalAllergies
                  modal={modalAllergyTypes}
                  setModal={setModalAllergyTypes}
                  selection={allergieTypeSelection}
                  setSelectedValue={setType}
                  inputAlergies={inputAlergies}
                  setInputAlergies={setInputAlergies}
                  load={Load}
                  addAlergies={addAlergies}
                />
              </View>
            </View>
          )}
          <ConfirmationModal
            modal={modalW}
            optionLeftFunction={() => {
                setModalW(false)
            }}
            optionLeftText={'BATAL'}
            optionRightFunction={() => {
                _DeleteAlergi(idAlergie)
                setModalW(false)
            }}
            optionRightText={'HAPUS'}
            warning={'Yakin ingin menghapus alergi?'}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F1F1F',
  },
  boxContainer: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    shadowColor: '#C2C2C2',
    shadowOffset: {height: 5, width: 5},
    shadowOpacity: 0.61,
    shadowRadius: 9.11,
    elevation: 9,
    width: '100%',
  },
  box: {
    width: '100%',
    borderWidth: 1,
    paddingHorizontal: 20,
    borderRadius: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#2F2F2F',
  },
  allergieBoxContainer: {
    padding: 10,
    flexDirection: 'column',
    shadowColor: '#C2C2C2',
    shadowOffset: {height: 5, width: 5},
    shadowOpacity: 0.61,
    shadowRadius: 9.11,
    elevation: 9,
    width: '100%',
  },
  lowerBox: {
    width: '100%',
    borderWidth: 1,
    paddingBottom: 25,
    paddingHorizontal: 15,
    borderRadius: 3,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2F2F2F',
  },
  inputBox: {
    flex: 1,
  },
  alergie: {
    flexDirection: 'row',
    borderColor: '#3a5756',
    borderWidth: 0.2,
    width: '90%',
    height: 60,
    margin: 8,
    padding: 8,
    marginBottom: 0,
    borderRadius: 3,
    alignSelf: 'center',
    alignItems: 'center',
  },
  allergiesTextContainerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: 20,
    paddingBottom: 5,
  },

  allergiesTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: 15,
  },
  allergiesTextTop: {
    color: '#A87F0B',
  },
  allergiesText: {
    color: '#DDDDDD',
  },
  addAlergiesContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    height: 50,
    width: '85%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  picker: {
    height: 60,
    borderColor: '#3a5756',
    borderWidth: 0.2,
    paddingHorizontal: 8,
    paddingVertical: 10,
    width: '90%',
    margin: 8,
    marginBottom: 0,
    borderRadius: 3,
    alignSelf: 'center',
    justifyContent: 'center',
  },

  header: {
    paddingTop: StatusBar.currentHeight,
    height: StatusBar.currentHeight + 50,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'tomato',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 5,
  },
  content: {
    height: 70,
  },
  inputText: {
    color: '#DDDDDD',
  },
});

const mapDispatchToProps = {
  setAlergie,
  getAlergie,
  deleteAlergie,
};

const mapStateToProps = state => {
  return state;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Allergies);
