import React, {useState, useEffect} from 'react';
import Modal from 'react-native-modal';
import {
  View, 
  StyleSheet, 
  Text, 
  TextInput,
  TouchableOpacity, 
  ScrollView,
  SafeAreaView,
  TouchableHighlight,
  TouchableWithoutFeedback,

} from 'react-native'
import RadioForm from 'react-native-radio-form';


export default function SelectModalAllergies({ modal, setModal, selection, title, subtitle, placeholder, setSelectedValue, inputAlergies, setInputAlergies, load, addAlergies, setSelectedLabel, changeKey} ){
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
                        {title || 'Tambah Alergi'}
                    </Text>
                </View>
                <View style={styles.lowerContainer}>
                    <View style={styles.allergyTypes}>
                        <View>
                            <Text style={styles.subtitle}>
                                {subtitle || 'Tipe Alergi'}
                            </Text>
                        </View>
                        <View style={{paddingLeft: 10}}>
                            <RadioForm
                                style={styles.radioForm}
                                dataSource={selection}
                                itemShowKey="label"
                                itemRealKey="value"
                                innerColor='#FDFDFF'
                                color='#fff'
                                outerColor='#145DDD'
                                circleSize={16}
                                initial={0}
                                formHorizontal={true}
                                labelHorizontal={true}
                                onPress={(item) => {
                                    setSelectedValue(item.value)
                                }}
                            />
                        </View>

                        {/* <Text style={styles.titleP}>
                            {placeholder || 'Cth: Udang,kacang,Dingin'}
                        </Text> */}
                    </View>
                    <View style={styles.inputTextArea}>
                        <TextInput
                            style={styles.inputText}
                            autoCapitalize={'none'}
                            autoFocus={false}
                            placeholder={placeholder || 'Cth: Udang,kacang,Dingin'}
                            keyboardType={'sentences'}
                            placeholderTextColor="#DDDDDD" 
                            onChangeText={text => {
                                setInputAlergies(text)
                            }}
                            value={inputAlergies}
                        />
                    </View>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <TouchableOpacity 
                            onPress={() => { 
                                setModal(false) 
                                addAlergies()
                            }} 
                            style={styles.button}>
                            {
                                load ? <ActivityIndicator size={'small'} color='#FFF'/> :
                                <Text style={{ fontSize: 18, color: '#FFF' }}>Simpan Data</Text>
                            }
                        </TouchableOpacity>
                    </View>
                       
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
        color: '#DDDDDD',
        fontSize: 13,
        textAlign: 'center',
        marginTop: 20,
      },
      lowerContainer: {
        marginHorizontal: 15,
        marginBottom: 20,
        flexDirection: 'column'
      },
      subtitle: {
        color: '#B5B5B5',
        fontSize: 12,
        justifyContent: 'center',
        alignItems: 'center'
      },
      allergyTypes: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 15
      },
      radioForm: {
        color: '#DDDDDD',
      },
      inputTextArea: {
        height: 150,
        borderWidth: 1,
        paddingHorizontal: 20,
        borderRadius: 3,
        backgroundColor: '#2F2F2F',
        borderColor: '#545454'
    },

        inputText: {
            color: '#DDDDDD'
        },
        button: {
            height: 50,
            width: '85%',
            backgroundColor: '#005ea2',
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 10,
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