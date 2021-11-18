import React, {useState, useEffect} from 'react';
import Modal from 'react-native-modal';
import {
  View, 
  StyleSheet, 
  Text, 
  Image, 
  TouchableOpacity, 
  Dimensions,
  ScrollView,
  SafeAreaView,
  TouchableHighlight,
  TouchableWithoutFeedback,

} from 'react-native'

// import SvgUri from 'react-native-svg-uri';

export default function SelectPatient({modal, setModal, patient, setPatient, family, title, setSelectedValue } ){

    return (
        <Modal
            isVisible={modal}
            swipeDirection={'down'}
            style={styles.modal}
            animationType="slide"
            onSwipeComplete={() => setModal(false)}
            onRequestClose={() => setModal(false)}
        >
            <View style={styles.container}>
            <View style={styles.header}>
              <View style={styles.toogle} />
              <Text style={styles.title}>
                {title}
              </Text>
            </View>
            <View style={styles.patient}>
              <Text style={styles.titleP}>MySelf</Text>
              <TouchableOpacity
                onPress={() => {
                  setSelectedValue(patient.firstName, patient._id)
                  setModal(false);
                }}>
                <View style={styles.cardName}>
                  <View style={styles.familyName}>
                    <Image
                      style={styles.photo}
                      source={{
                        uri:
                          'https://www.mbrsg.ae/MBRSG/media/Images/no-image-icon-6.png',
                      }}
                    />
                    <Text style={styles.name}>
                      {patient.firstName}
                    </Text>
                  </View>
                  <View style={styles.vector}>
                    {/* <SvgUri
                      width="10"
                      height="10"
                      source={require('../../assets/svg/Vector.svg')}
                    /> */}
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.patient}>
              <Text style={styles.titleP}>
                My Family ({family.length - 1})
              </Text>
              <SafeAreaView>
                <ScrollView>
                  <TouchableHighlight>
                    <TouchableWithoutFeedback>
                      <View>
                        {family.map((lang, itemIndex) => {
                          return (
                            <View key={itemIndex}>
                              {itemIndex !== 0 ? (
                                <TouchableOpacity
                                  onPress={() => {
                                   setSelectedValue(lang.firstName, lang._id)
                                    setModal(false);
                                  }}>
                                  <View style={styles.cardName}>
                                    <View style={styles.familyName}>
                                      <Image
                                        style={styles.photo}
                                        source={{
                                          uri:
                                            'https://www.mbrsg.ae/MBRSG/media/Images/no-image-icon-6.png',
                                        }}
                                      />
                                      <Text style={styles.name}>
                                        {lang.lastName
                                          ? lang.firstName + ' ' + lang.lastName
                                          : lang.firstName}
                                      </Text>
                                    </View>
                                    <View style={styles.vector}>
                                      {/* <SvgUri
                                        width="10"
                                        height="10"
                                        source={require('../../assets/svg/Vector.svg')}
                                      /> */}
                                    </View>
                                  </View>
                                </TouchableOpacity>
                              ) : null}
                            </View>
                          );
                        })}

                        <View style={styles.buttonAdd}>
                          <View style={styles.vectorPlus}>
                            {/* <SvgUri
                              width="10"
                              height="10"
                              source={require('../../assets/svg/VectorPlus.svg')}
                            /> */}
                          </View>
                          <Text style={styles.addTitle}>
                            Tambah Keluarga
                          </Text>
                        </View>
                      </View>
                    </TouchableWithoutFeedback>
                  </TouchableHighlight>
                </ScrollView>
              </SafeAreaView>
            </View>
          </View>
        </Modal>

    )
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
        marginHorizontal: 15,
        marginBottom: 20,
      },
      titleP: {
        color: 'white',
        fontSize: 12,
      },
      cardName: {
        marginTop: 10,
        borderColor: '#757575',
        borderWidth: 1,
        borderRadius: 3,
        minHeight: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
      },
      familyName: {
        flexDirection: 'row',
      },
      photo: {
        marginVertical: 7,
        width: 35,
        height: 35,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#4fe39b',
      },
      name: {
        marginTop: 15,
        marginLeft: 15,
        color: '#DDDDDD',
      },
      vector: {
        marginVertical: 20,
      },
      buttonAdd: {
        marginTop: 20,
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
})