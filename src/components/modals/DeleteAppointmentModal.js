import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
export default function DeleteAppointmentModal({
  isVisible = false,
  setIsVisible,
  onButtonCancelPress,
  darkMode
}) {
  return (
    <Modal
    onBackdropPress={() => setIsVisible(false)}
      isVisible={isVisible}
      swipeDirection={'down'}
      onSwipeComplete={() => {
        if (typeof setIsVisible === 'function') {
          setIsVisible(false);
        }
      }}
      style={{
        justifyContent: 'flex-end',
        margin: 0,
      }}
      animationType="slide"
      onRequestClose={() => setIsVisible(false)}
      transparent
    >
      <View style={darkMode ? viewModalDelete.container : viewModalDelete.containerLight}>
        <View style={viewModalDelete.header}>
          <View style={viewModalDelete.toogle} />
          <Text style={darkMode ? viewModalDelete.title : viewModalDelete.titleLight}>Batalkan Konsultasi</Text>
        </View>
        <View style={viewModalDelete.header}>
          <Text style={darkMode ? viewModalDelete.subtitle : viewModalDelete.subtitleLight}>
            Apakah anda yakin ingin membatalkan konsultasi ini?
          </Text>
        </View>
        <View style={viewModalDelete.option}>
          <TouchableOpacity
            onPress={() => {
              setIsVisible(false);
            }}
          >
            <View style={darkMode ? viewModalDelete.lanjutkan : viewModalDelete.lanjutkanLight}>
              <Text style={darkMode ? viewModalDelete.name : viewModalDelete.nameLight}>Lanjutkan Konsultasi</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (typeof onButtonCancelPress === 'function') {
                onButtonCancelPress();
              }
            }}
          >
            <View style={darkMode ? viewModalDelete.cardName : viewModalDelete.cardNameLight}>
              <Text style={darkMode ? viewModalDelete.name : viewModalDelete.batalkan}>Batalkan Janji</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const viewModalDelete = StyleSheet.create({
  container: {
    maxHeight: '100%',
    backgroundColor: '#2F2F2F',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  containerLight: {
    maxHeight: '100%',
    backgroundColor: '#ffffff',
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
  title: {
    color: 'white',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 20,
  },
  titleLight: {
    color: '#4B4B4B',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold'
  },
  option: {
    marginHorizontal: 15,
    marginBottom: 20,
  },
  titleP: {
    color: 'white',
    fontSize: 14,
  },
  subtitle: {
    color: '#B5B5B5',
    fontSize: 12,
  },
  subtitleLight: {
    color: '#212121',
    fontSize: 12,
  },
  cardName: {
    marginTop: 10,
    borderColor: '#757575',
    borderWidth: 1,
    borderRadius: 3,
    minHeight: 50,
    justifyContent: 'center',
  },
  cardNameLight: {
    marginTop: 10,
    borderColor: '#E8E8E8',
    borderWidth: 1,
    borderRadius: 3,
    minHeight: 50,
    justifyContent: 'center',
  },
  lanjutkan: {
    marginTop: 10,
    backgroundColor: '#005EA2',
    borderRadius: 3,
    minHeight: 50,
    justifyContent: 'center',
  },
  lanjutkanLight: {
    marginTop: 10,
    backgroundColor: '#1090C5',
    borderRadius: 3,
    minHeight: 50,
    justifyContent: 'center',
  },
  name: {
    color: '#DDDDDD',
    textAlign: 'center',
  },
  nameLight: {
    color: '#ffffff',
    textAlign: 'center',
  },
  batalkan: {
    color: '#4B4B4B',
    textAlign: 'center',
  },
  buttonAdd: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  addTitle: {
    color: '#4398D1',
  },
});
