import React from 'react';
import Modal from 'react-native-modal';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default function SetsModal({
  modal,
  setModal,
  selection,
  setSelectedValue,
  darkMode
}) {
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
      <View style={darkMode ? styles.container : styles.containerLight}>
        <View style={styles.header}>
          <View style={styles.toogle} />
        </View>
        <View style={styles.innerContainer}>
          {selection.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setSelectedValue(item.label);
                  setModal(false);
                }}
                key={index}
                style={{ alignItems: 'center' }}
              >
                <Image source={item.url} style={styles.picture}></Image>
                <Text style={darkMode ? styles.labelText : styles.labelTextLight }>{item.label}</Text>
              </TouchableOpacity>
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

  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 50,
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
    marginBottom: 12,
    width: 45,
    height: 45,
  },

  labelText: {
    color: '#DDDDDD',
  },
  labelTextLight: {
    color: '#212121',
  },
});
