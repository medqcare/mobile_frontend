import React from 'react';
import Modal from 'react-native-modal';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from 'react-native';
import VectorPlus from '../../assets/svg/VectorPlus';

export default function SelectPatient({
  modal,
  setModal,
  title,
  accountOwner,
  family,
  setSelectedValue,
  navigateTo,
}) {
  function smallLengthText(string) {
    let result = '';
    for (let i = 0; i < string.length; i++) {
      if (i === 9) {
        result += '...';
        return result;
      } else {
        result += string[i];
      }
    }
    return result;
  }

  function fullName(object) {
    return object.lastName
      ? object.firstName + ' ' + object.lastName
      : object.firstName;
  }

  return (
    <Modal
      isVisible={modal}
      swipeDirection={'down'}
      style={styles.modal}
      animationType="slide"
      onBackdropPress={() => setModal(false)}
      onSwipeComplete={() => setModal(false)}
      onRequestClose={() => setModal(false)}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.toogle} />
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.patient}>
          {family.map((lang, itemIndex) => {
            return (
              <View key={itemIndex}>
                <TouchableOpacity
                  style={styles.touchable}
                  onPress={() => {
                    setSelectedValue(lang);
                    setModal(false);
                  }}
                >
                  <View>
                    <Image
                      style={styles.photo}
                      source={
                        lang.imgageUrl
                          ? { uri: lang.imageUrl }
                          : {
                              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRH_WRg1exMTZ0RdW3Rs76kCOb9ZKrXddtQL__kEBbrS2lRWL3r',
                            }
                      }
                    />
                    <Text style={styles.name}>
                      {smallLengthText(fullName(lang))}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
        <TouchableOpacity
          style={styles.buttonAdd}
          onPress={() => navigateTo('AddFamilyForm')}
        >
          <View style={styles.vectorPlus}>
            <VectorPlus />
          </View>
          <Text style={styles.addTitle}>Tambah Keluarga</Text>
        </TouchableOpacity>
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
  title: {
    color: 'white',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 20,
  },
  patient: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 20,
  },

  touchable: {
    marginLeft: 35,
  },

  photo: {
    width: 65,
    height: 65,
    borderRadius: 99,
  },

  name: {
    marginTop: 15,
    color: '#DDDDDD',
  },

  vector: {
    marginVertical: 20,
  },

  buttonAdd: {
    padding: (20, 0, 30),
    flexDirection: 'row',
    justifyContent: 'center',
  },

  vectorPlus: {
    marginTop: 5,
    marginRight: 5,
  },

  addTitle: {
    color: '#4398D1',
  },
});
