import React from 'react';
import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import ActiveCard from '../../../assets/svg/home-blue/activecard-blue';
import MedicalStats from '../../../assets/svg/home-blue/medicalstats-blue';

const ActivityAction = ({ navigation, data, darkMode }) => {
  return (
    <View style={style.container}>
      <TouchableOpacity
        style={style.content}
        onPress={() =>
          data ? navigation.navigate('Tagihan') : navigation.navigate('Sign')
        }
      >
        <Image
          style={style.image}
          source={darkMode ? require('../../../assets/png/ic_biayaNav.png') : require('../../../assets/png/iclight_tagihan.png')}
        />
        <Text
          style={{
            marginTop: 10,
            textAlign: 'center',
            color: darkMode ? 'white' : '#4B4B4B',
            fontSize: 12,
          }}
        >
          {' '}
          Tagihan{' '}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={style.content}
        onPress={() =>
          data
            ? navigation.navigate('RiwayatStack')
            : navigation.navigate('Sign')
        }
      >
        <Image
          style={style.image}
          source={darkMode ? require('../../../assets/png/ic_riwayatNav.png') : require('../../../assets/png/iclight_riwayat.png')}
        />
        <Text
          style={{
            marginTop: 10,
            textAlign: 'center',
            color:  darkMode ? 'white' : '#4B4B4B',
            fontSize: 12,
          }}
        >
          Riwayat{' '}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={style.content}
        onPress={() =>
          data
            ? navigation.navigate('DokumenMedisStack', { name: 'Hello World' })
            : navigation.navigate('Sign')
        }
      >
        <Image
          style={style.image}
          source={darkMode ? require('../../../assets/png/ic_statusNav.png') : require('../../../assets/png/iclight_dokumen.png')}
        />
        <View
          style={{
            width: 75,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              marginTop: 10,
              textAlign: 'center',
              color:  darkMode ? 'white' : '#4B4B4B',
              fontSize: 12,
            }}
          >
            Dokumen Medis
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={style.content}
        onPress={() =>
          data
            ? navigation.navigate('RujukanStack')
            : navigation.navigate('Sign')
        }
      >
        <Image
          style={style.image}
          source={darkMode ? require('../../../assets/png/ic_rujukanNav.png') : require('../../../assets/png/iclight_rujukan.png')}
        />
        <Text
          style={{
            marginTop: 10,
            textAlign: 'center',
            color:  darkMode ? 'white' : '#4B4B4B',
            fontSize: 12,
          }}
        >
          {' '}
          Rujukan{' '}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={style.content}
        onPress={() =>
          data ? navigation.navigate('Allergy') : navigation.navigate('Sign')
        }
      >
        <Image
          style={style.image}
          source={darkMode ? require('../../../assets/png/ic_alergiNav.png') : require('../../../assets/png/iclight_alergi.png')}
        />
        <Text
          style={{
            marginTop: 10,
            textAlign: 'center',
            color:  darkMode ? 'white' : '#4B4B4B',
            fontSize: 12,
          }}
        >
          {' '}
          Alergi
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={style.content}
        onPress={() =>
          data
            ? navigation.navigate('ReminderStack')
            : navigation.navigate('Sign')
        }
      >
        <Image
          style={style.image}
          source={darkMode ? require('../../../assets/png/Reminder.png') : require('../../../assets/png/iclight_pengingat.png')}
        />
        <Text
          style={{
            marginTop: 10,
            textAlign: 'center',
            color:  darkMode ? 'white' : '#4B4B4B',
            fontSize: 12,
          }}
        >
          {' '}
          Reminder{' '}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={style.content}
        onPress={() =>
          data
            ? navigation.navigate('PrescriptionStack')
            : navigation.navigate('Sign')
        }
      >
        <Image
          style={style.image}
          source={darkMode ? require('../../../assets/png/Resep.png') : require('../../../assets/png/iclight_resep.png')}
        />
        <Text
          style={{
            marginTop: 10,
            textAlign: 'center',
            color:  darkMode ? 'white' : '#4B4B4B',
            fontSize: 12,
          }}
        >
          {' '}
          Resep{' '}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={style.content}
        onPress={() => {
          navigation.navigate('HomeCareStack');
        }}
      >
        <Image
          style={style.image}
          source={darkMode ? require('../../../assets/png/ic_dokterNav.png') : require('../../../assets/png/iclight_homecare.png')}
        />
        <View
          style={{
            width: 70,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              marginTop: 10,
              textAlign: 'center',
              color:  darkMode ? 'white' : '#4B4B4B',
              fontSize: 12,
            }}
          >
            {' '}
            Home Care{' '}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const heightDim = Dimensions.get('screen').height;
const style = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingTop: 15,
  },
  rowContent: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  content: {
    flexDirection: 'column',
    alignItems: 'center',
    width: widthPercentageToDP('20%'),
    marginBottom: heightPercentageToDP('1.5%'),
  },
  image: {
    height: 50,
    width: 50,
  },
});

export default ActivityAction;
