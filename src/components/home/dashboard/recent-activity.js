import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';

const heightDim = Dimensions.get('screen').height;
const widthDim = Dimensions.get('screen').width;

const RecentActivity = ({ navigation, darkMode }) => {
  return (
    <View
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 1 }}
    >
      <TouchableOpacity
        style={darkMode ? style.container : style.containerLight}
        onPress={() => navigation.navigate('Appointment')}
      >
        <Image
          source={darkMode ? require('../../../assets/png/ic_aplist.png') : require('../../../assets/png/ic_daftarJanji.png')}
          style={{ width: 25, height: 25 }}
        />
        <Text
          style={{
            fontSize: 12,
            color: darkMode ? '#DDDDDD' : '#4B4B4B',
            marginTop: 8,
            textAlign: 'center',
          }}
        >
          Daftar Janji
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={darkMode ? style.container : style.containerLight}
        onPress={() => {
          navigation.navigate('ActivityStack');
        }}
      >
        <Image
          source={darkMode ? require('../../../assets/png/ic_antrian.png') : require('../../../assets/png/ic_home_antrian.png')}
          style={{ width: 25, height: 25 }}
        />
        <Text
          style={{
            fontSize: 12,
            color: darkMode ? '#DDDDDD' : '#4B4B4B',
            marginTop: 8,
            textAlign: 'center',
          }}
        >
          Antrian
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={darkMode ? style.container : style.containerLight}
        onPress={() => {
          navigation.navigate('MedicalStats', { goback: 'Home' });
        }}
      >
        <Image
          source={darkMode ? require('../../../assets/png/Medical.png') : require('../../../assets/png/ic_resumeMedis.png')}
          style={{ width: 26, height: 26 }}
        />
        <Text
          style={{
            fontSize: 12,
            color: darkMode ? '#DDDDDD' : '#4B4B4B',
            marginTop: 8,
            textAlign: 'center',
          }}
        >
          Resume Medis
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    shadowOffset: {
      width: 4,
      height: 2,
    },
    borderRadius: 2,
    shadowOpacity: 0.21,
    shadowRadius: 9.11,
    elevation: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    paddingVertical: 15,
    backgroundColor: '#2F2F2F',
    width: widthPercentageToDP('28%'),
    height: heightDim * 0.1,
  },
  containerLight: {
    shadowOffset: {
      width: 4,
      height: 2,
    },
    borderRadius: 2,
    shadowOpacity: 0.21,
    shadowRadius: 9.11,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    paddingVertical: 15,
    backgroundColor: '#fff',
    width: widthPercentageToDP('28%'),
    height: heightDim * 0.1,
  },

  borderIcon: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    paddingVertical: 15,
    backgroundColor: '#2F2F2F',
  },
  clickArea: {
    padding: widthDim * 0.01,
    alignItems: 'center',
  },
});

// module.exports = connect(mapStateToProps)(t);
export default RecentActivity;
