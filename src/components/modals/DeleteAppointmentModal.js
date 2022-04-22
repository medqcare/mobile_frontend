import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
export default function DeleteAppointmentModal({
  isVisible = false,
  setIsVisible,
  onButtonCancelPress,
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
      <View style={viewModalDelete.container}>
        <View style={viewModalDelete.header}>
          <View style={viewModalDelete.toogle} />
          <Text style={viewModalDelete.title}>Batalkan Konsultasi</Text>
        </View>
        <View style={viewModalDelete.header}>
          <Text style={viewModalDelete.subtitle}>
            Apakah anda yakin ingin membatalkan konsultasi ini?
          </Text>
        </View>
        <View style={viewModalDelete.option}>
          <TouchableOpacity
            onPress={() => {
              setIsVisible(false);
            }}
          >
            <View style={viewModalDelete.lanjutkan}>
              <Text style={viewModalDelete.name}>Lanjutkan Konsultasi</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (typeof onButtonCancelPress === 'function') {
                onButtonCancelPress();
              }
            }}
          >
            <View style={viewModalDelete.cardName}>
              <Text style={viewModalDelete.name}>Batalkan Janji</Text>
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
  cardName: {
    marginTop: 10,
    borderColor: '#757575',
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
  name: {
    color: '#DDDDDD',
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
