import React, { useState } from 'react';
import Modal from 'react-native-modal';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';

export default function ModalUploadDocument({
  modal,
  setModal,
  selection,
  setSelectedValue,
}) {
  const [types, setTypes] = useState(['resep', 'radiologi', 'laboratorium']);
  const [typeSelected, setTypeSelected] = useState(null);

  const typeStyleBehavior = (type) => ({
    container: {
      backgroundColor: type === typeSelected ? '#212D3D' : '#d1d5db',
      borderWidth: 1,
      borderColor: type === typeSelected ? '#77BFF4' : '#6b7280',
      paddingHorizontal: 14,
      paddingVertical: 8,
      borderRadius: 99,
      alignSelf: 'flex-start',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 8,
      marginBottom: 8,
    },
    text: {
      color: type === typeSelected ? '#77BFF4' : '#2F2F2F',
      fontSize: 12,
      textTransform: 'capitalize',
    },
  });

  const renderType = ({ item, index }) => {
    const { container, text } = typeStyleBehavior(item);
    return (
      <TouchableOpacity
        style={container}
        onPress={() => setTypeSelected(item)}
        key={`${index}-select-type`}
      >
        <Text style={text}>{item}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <Modal
      isVisible={modal}
      swipeDirection={'down'}
      style={styles.modal}
      animationType="slide"
      onSwipeComplete={() => setModal(false)}
      onRequestClose={() => setModal(false)}
      onBackdropPress={() => setModal(false)}
      onBackButtonPress={() => setModal(false)}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.toogle} />
        </View>
        <View
          style={{
            marginVertical: 12,
            width: '100%',
            paddingLeft: 12,
          }}
        >
          <View style={{}}>
            <Text style={{ marginBottom: 12, color: '#f8fafc' }}>
              Pilih Tipe Dokumen <Text style={{ color: '#ef4444' }}>*</Text>
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {types.map((item, index) => renderType({ item, index }))}
            </View>
          </View>
        </View>
        <View style={styles.innerContainer}>
          {selection.map((item, index) => {
            return (
              <View key={index}>
                <TouchableOpacity
                  onPress={() => {
                    if (!typeSelected) {
                      ToastAndroid.show(
                        'Silahkan pilih tipe dokumen',
                        ToastAndroid.LONG
                      );
                    } else {
                      setSelectedValue(item.label, typeSelected);
                      setModal(false);
                    }
                  }}
                >
                  <View style={styles.touchable}>
                    <Image source={item.url} style={styles.picture}></Image>
                    <Text style={styles.labelText}>{item.label}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },

  container: {
    maxHeight: '100%',
    backgroundColor: '#2F2F2F',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  header: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },

  toogle: {
    position: 'absolute',
    borderWidth: 2,
    width: 50,
    borderColor: '#6C6C6C',
    alignContent: 'center',
    marginBottom: 20,
  },

  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginBottom: 20,
  },

  touchable: {
    borderRadius: 3,
    minHeight: 90,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 10,
  },

  picture: {
    marginTop: 5,
    width: 45,
    height: 45,
  },

  labelText: {
    marginLeft: 13,
    color: '#DDDDDD',
  },
});
