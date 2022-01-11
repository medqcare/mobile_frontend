import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Dimensions,
  StatusBar,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import SearchIcon from '../../../assets/svg/Search';
import DokumenList from './DokumenList';
import SelectPatient from '../../../components/modals/selectPatient';

const dimHeight = Dimensions.get('window').height;

function DokumenMedisList(props) {
  const [accountOwner, setAccountOwner] = useState(props.userData);
  const [modalPatient, setModalPatient] = useState(false);
  const [family, setFamily] = useState([]);
  const [patient, setPatient] = useState({
    patientID: props.userData._id,
    imageUrl: props.userData.imageUrl,
  });

  useEffect(() => {
    let _family = {
      ...props.userData,
    };
    delete _family.family;
    const temp = [_family];
    props.userData.family.forEach((el) => {
      temp.push(el);
    });
    setFamily(family.concat(temp));
  }, []);

  function setSelectedValue(data) {
    setPatient({
      patientID: data._id,
      imageUrl: data.imageUrl,
    });
  }

  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818',
  },
  header: {
    flexDirection: 'row',
    height: dimHeight * 0.12,
    paddingTop: dimHeight * 0.045,
    backgroundColor: '#2F2F2F',
  },
  arrow: {
    flex: 0.12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchArea: {
    flex: 0.88,
    borderColor: '#DDDDDD',
    borderWidth: 1,
    height: dimHeight * 0.05,
    padding: dimHeight * 0.01,
    margin: dimHeight * 0.01,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textinput: {
    marginStart: 10,
    fontSize: 14,
    flex: 1,
    color: '#A2A2A2',
  },
});

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DokumenMedisList);
