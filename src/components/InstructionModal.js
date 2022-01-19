import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import { Modal, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import ArrowBack from '../assets/svg/ArrowBackNew';
import IconPointer from '../assets/svg/ic_pointer.';
import { setShowInstruction } from '../stores/action';

export default function InstructionModal({ visible, onFinishOrSkip }) {
  const [items, setItem] = React.useState([
    {
      text: 'Pencarian untuk Booking Dokter, lihat jadwal Dokter, dsb',
      style: {
        parent: {
          width: '100%',
          transform: [{ translateY: heightPercentageToDP('27%') }],
        },
        icon: {
          marginBottom: 8,
          alignSelf: 'flex-start',
          transform: [
            { rotateY: '180deg' },
            { translateX: widthPercentageToDP('-10%') },
          ],
        },
      },
    },
    {
      text: 'Kamu bisa melihat Dokter Favorit disini',
      style: {
        parent: {
          width: '80%',
          transform: [{ translateY: heightPercentageToDP('27%') }],
          alignSelf: 'flex-end',
        },
        icon: {
          marginBottom: 8,
          alignSelf: 'flex-start',
          transform: [{ translateX: widthPercentageToDP('50%') }],
        },
      },
    },
    {
      text: 'Setelah melakukan Booking Dokter, Kamu bisa melihatnya disini, terdapat pilihan Check-In untuk mendapatkan antrian',
      style: {
        parent: {
          width: '80%',
          transform: [{ translateY: heightPercentageToDP('45%') }],
        },
        icon: {
          marginBottom: 8,
          alignSelf: 'flex-start',
          transform: [
            { rotateY: '180deg' },
            { translateX: widthPercentageToDP('-10%') },
          ],
        },
      },
    },
    {
      text: 'Nomor antrian bisa Kamu lihat disini',
      style: {
        parent: {
          width: '80%',
          transform: [{ translateY: heightPercentageToDP('46%') }],
        },
        icon: {
          marginBottom: 8,
          alignSelf: 'flex-start',
          transform: [{ translateX: widthPercentageToDP('30%') }],
        },
      },
    },
    {
      text: 'Hasil pemeriksaan bisa Kamu lihat disini',
      style: {
        parent: {
          width: '80%',
          transform: [{ translateY: heightPercentageToDP('46%') }],
          alignSelf: 'flex-end',
        },
        icon: {
          marginBottom: 8,
          alignSelf: 'flex-end',
          transform: [{ translateX: widthPercentageToDP('-10%') }],
        },
      },
    },
    {
      text: 'Kamu bisa melihat profil dan menambahan anggota keluarga kamu disini',
      style: {
        parent: {
          width: '80%',
          transform: [{ translateY: heightPercentageToDP('6.5%') }],
          alignSelf: 'flex-end',
        },
        icon: {
          marginBottom: 8,
          alignSelf: 'flex-end',
          transform: [{ translateX: widthPercentageToDP('-2%') }],
        },
      },
    },

    {
      text: 'Beberapa fitur yang bisa Kamu akses untuk kemudahan dalam kesehatan, Selamat Datang!',
      style: {
        parent: {
          width: '100%',
          transform: [{ translateY: heightPercentageToDP('18%') }],
          alignSelf: 'center',
          flexDirection: 'column-reverse',
          justifyContent: 'space-between',
          height: '60%',
        },
        icon: {
          marginBottom: 8,
          alignSelf: 'center',
          transform: [{ rotateX: '180deg' }],
        },
      },
    },
  ]);
  const [index, setIndex] = React.useState(0);

  const onButtonRightPressHandler = async () => {
    if (index !== items.length - 1) {
      setIndex(index + 1);
    } else {
      if (typeof onFinishOrSkip === 'function') {
        setIndex(0);
        onFinishOrSkip();
      }
    }
  };

  const onButtonLeftPressHandler = async () => {
    if (index !== 0) {
      setIndex(index - 1);
    } else {
      if (typeof onFinishOrSkip === 'function') {
        setIndex(0);
        onFinishOrSkip();
      }
    }
  };

  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={styles.container}>
        <View style={items[index].style.parent}>
          {index === items.length - 1 && (
            <View
              style={{
                height: heightPercentageToDP('30%'),
                width: '100%',
                borderWidth: 1,
                borderColor: '#005EA2',
              }}
            ></View>
          )}
          <View style={items[index].style.icon}>
            <IconPointer />
          </View>
          <View
            style={{
              paddingHorizontal: 5,
              paddingVertical: 10,
              borderRadius: 8,
              backgroundColor: '#005EA2',
              marginBottom: 10,
            }}
          >
            <Text
              style={{ color: '#f8fafc', fontSize: 12, textAlign: 'center' }}
            >
              {items[index].text}
            </Text>
          </View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: '#028341',
                paddingVertical: 8,
                paddingHorizontal: 16,
                borderRadius: 8,
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={onButtonLeftPressHandler}
            >
              {index > 0 && (
                <View style={{ marginRight: 14 }}>
                  <ArrowBack />
                </View>
              )}
              <Text style={{ color: '#f8fafc', fontSize: 14 }}>
                {index === 0 ? 'Skip' : 'Prev'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: '#028341',
                paddingVertical: 8,
                paddingHorizontal: 16,
                borderRadius: 8,
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={onButtonRightPressHandler}
            >
              <Text style={{ color: '#f8fafc', marginRight: 12, fontSize: 14 }}>
                {index !== items.length - 1 ? 'Next' : 'Finish'}{' '}
                {`${index + 1}/${items.length}`}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 12,
  },
});
