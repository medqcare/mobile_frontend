import React from 'react';
import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import Stethoscope from '../../../assets/svg/home-blue/stethoscope-blue';
import DokFavorit from '../../../assets/svg/DokFavorit';
import Penunjang from '../../../assets/svg/Penunjang';
import Klinik from '../../../assets/svg/Klinik';

const heightDim = Dimensions.get('screen').height;

function MenuNavigator({ navigation, data, darkMode }) {
  return (
    <View style={darkMode ? style.container : style.containerLight}>
      <TouchableOpacity
        style={style.borderIcon}
        onPress={() => navigation.navigate('Doctor')}
      >
        <Stethoscope darkMode={darkMode}/>
        <Text style={{ marginTop: 10, fontSize: 12, color: darkMode ? '#B5B5B5' : '#ffffff' }}>
          Dokter
        </Text>
      </TouchableOpacity>
      <View
        style={{
          backgroundColor: darkMode ? '#0C6292' : '#40A1C9',
          height: '60%',
          width: 1,
        }}
      />
      <TouchableOpacity
        style={style.borderIcon}
        onPress={() =>
          navigation.navigate('PenunjangStack')
        }
      >
        <Penunjang darkMode={darkMode}/>
        <Text style={{ marginTop: 10, fontSize: 12, color: darkMode ? '#B5B5B5' : '#ffffff' }}>
          Penunjang
        </Text>
      </TouchableOpacity>

      <View
        style={{
          backgroundColor: darkMode ? '#0C6292' : '#40A1C9',
          height: '60%',
          width: 1,
        }}
      />
      <TouchableOpacity
        style={style.borderIcon}
        onPress={() => navigation.navigate('Hospital', { facility: 'Clinic' })}
      >
        {/* <Image
          navigation={navigation}
          source={require('../../../assets/png/ic_klinik.png')}
          style={{ width: 24, height: 24 }}
        /> */}
        <Klinik darkMode={darkMode}/>
        <Text style={{ marginTop: 10, fontSize: 12, color: darkMode ? '#B5B5B5' : '#ffffff' }}>
          Klinik
        </Text>
      </TouchableOpacity>

      <View
        style={{
          backgroundColor: darkMode ? '#0C6292' : '#40A1C9',
          height: '60%',
          width: 1,
        }}
      ></View>
      <TouchableOpacity
        style={style.borderIcon}
        onPress={() =>
          data ? navigation.navigate('Filter') : navigation.navigate('Sign')
        }
      >
        <DokFavorit darkMode={darkMode}/>
        <Text style={{ marginTop: 10, fontSize: 12, color: darkMode ? '#B5B5B5' : '#ffffff' }}>
          Favorit
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(17, 39, 82, 0.66)',
    width: '100%',
    paddingHorizontal: 10,
    height: heightDim * 0.11,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
    shadowOffset: {
      width: 4,
      height: 7,
    },
    borderRadius: 15,
    shadowOpacity: 0.61,
    shadowRadius: 9.11,
    zIndex: 99,
  },
  containerLight: {
    backgroundColor: 'rgba(17, 39, 82, 0.1)',
    width: '100%',
    paddingHorizontal: 10,
    height: heightDim * 0.11,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
    shadowOffset: {
      width: 4,
      height: 7,
    },
    borderRadius: 15,
    shadowOpacity: 0.61,
    shadowRadius: 9.11,
    zIndex: 99,
  },
  borderIcon: {
    flex: 1,
    maxHeight: heightDim * 0.08,
    padding: '2%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    zIndex: 100,
  },
});

const mapStateToProps = (state) => ({
  isLoading: state.isLoading,
});

module.exports = connect(mapStateToProps)(MenuNavigator);
