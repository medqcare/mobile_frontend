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

const RecentActivity = ({ navigation }) => {
  return (
    <View
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ flexDirection: 'row', justifyContent: 'space-between' }}
    >
      <TouchableOpacity
        style={style.container}
        onPress={() => navigation.navigate('Appointment')}
      >
        <Image
          source={require('../../../assets/png/ic_aplist.png')}
          style={{ width: 25, height: 25 }}
        />
        <Text
          style={{
            fontSize: 12,
            color: '#DDDDDD',
            marginTop: 8,
            textAlign: 'center',
          }}
        >
          Appointment
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={style.container}
        onPress={() => {
          navigation.navigate('ActivityStack');
        }}
      >
        <Image
          source={require('../../../assets/png/ic_antrian.png')}
          style={{ width: 25, height: 25 }}
        />
        <Text
          style={{
            fontSize: 12,
            color: '#DDDDDD',
            marginTop: 8,
            textAlign: 'center',
          }}
        >
          Antrian
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={style.container}
        onPress={() => {
          navigation.navigate('MedicalStats', { goback: 'Home' });
        }}
      >
        <Image
          source={require('../../../assets/png/Medical.png')}
          style={{ width: 26, height: 26 }}
        />
        <Text
          style={{
            fontSize: 12,
            color: '#DDDDDD',
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
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    paddingVertical: 15,
    backgroundColor: '#2F2F2F',
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
