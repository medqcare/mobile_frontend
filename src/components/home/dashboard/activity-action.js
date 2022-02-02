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

const ActivityAction = ({ navigation, data }) => {
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
          source={require('../../../assets/png/ic_biayaNav.png')}
        />
        <Text
          style={{
            marginTop: 10,
            textAlign: 'center',
            color: 'white',
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
          source={require('../../../assets/png/ic_riwayatNav.png')}
        />
        <Text
          style={{
            marginTop: 10,
            textAlign: 'center',
            color: 'white',
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
          source={require('../../../assets/png/ic_statusNav.png')}
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
              color: 'white',
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
          source={require('../../../assets/png/ic_rujukanNav.png')}
        />
        <Text
          style={{
            marginTop: 10,
            textAlign: 'center',
            color: 'white',
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
          source={require('../../../assets/png/ic_alergiNav.png')}
        />
        <Text
          style={{
            marginTop: 10,
            textAlign: 'center',
            color: 'white',
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
          source={require('../../../assets/png/Reminder.png')}
        />
        <Text
          style={{
            marginTop: 10,
            textAlign: 'center',
            color: 'white',
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
          source={require('../../../assets/png/Resep.png')}
        />
        <Text
          style={{
            marginTop: 10,
            textAlign: 'center',
            color: 'white',
            fontSize: 12,
          }}
        >
          {' '}
          Resep{' '}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={style.content} onPress={() => {}}>
        <Image
          style={style.image}
          source={require('../../../assets/png/ic_dokterNav.png')}
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
              color: 'white',
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
    marginBottom: heightPercentageToDP('3.5%'),
  },
  image: {
    height: 50,
    width: 50,
  },
});

export default ActivityAction;
