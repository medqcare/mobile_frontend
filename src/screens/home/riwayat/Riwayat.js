import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  BackHandler,
  Dimensions,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import { connect } from 'react-redux';
import ArrowBack from '../../../assets/svg/ArrowBack';
import Header from '../../../components/headers/GradientHeader';

import Pemesanan from './Pemesanan';
import Transaksi from './Transaksi';
// import ResumeMedis from "./ResumeMedis";

function RiwayatPage(props) {
  const [page, setPage] = useState('Daftar Janji');
  const tipeRiwayat = ['Daftar Janji', 'Transaksi'];

  BackHandler.addEventListener('hardwareBackPress', () => {
    return props.navigation.pop();
  });

  return (
    <KeyboardAvoidingView
      style={styles.Container}
      behavior="height"
      enabled={false}
    >
      <StatusBar hidden />

      <Header title={'Riwayat ' + page} navigate={props.navigation.navigate} />

      <View style={{ height: 40, margin: 20 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {tipeRiwayat.map((item) => {
            return (
              <TouchableOpacity onPress={() => setPage(item)} key={item}>
                <View
                  style={{
                    backgroundColor: item === page ? '#005EA2' : null,
                    borderRadius: 30,
                    borderWidth: item !== page ? 0.8 : null,
                    borderColor: item !== page ? '#474747' : null,
                    height: 40,
                    padding: 10,
                    marginRight: 5,
                  }}
                >
                  <Text style={{ color: '#B5B5B5' }}>{item}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {page === 'Daftar Janji' && <Pemesanan {...props} />}
      {page === 'Transaksi' && <Transaksi {...props} />}
      {/* { page === 'Resume Medis' && <ResumeMedis navigation={props.navigation}/> } */}
    </KeyboardAvoidingView>
  );
}

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

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(RiwayatPage);
