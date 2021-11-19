import React from 'react';
import Modal from 'react-native-modal';
import {
  View, 
  StyleSheet, 
  Text, 
  TextInput,
  TouchableOpacity, 

} from 'react-native'
import RadioForm from 'react-native-simple-radio-button'



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
                                radio_props={selection}
                                initial={0}
                                formHorizontal={true}
                                labelHorizontal={true}
                                animation={''}
                                labelColor={'#fff'}
                                labelStyle={{ paddingRight:10, fontSize: 14, color: '#DDDDDD'}}
                                style={styles.radioForm}
                                buttonOuterSize={20}
                                onPress={(item) => {
                                    setSelectedValue(item)
                                }}
                            />
                        </View>
                    </View>
                    <View style={styles.inputTextArea}>
                        <TextInput
                            style={styles.inputText}
                            autoCapitalize={'none'}
                            autoFocus={false}
                            placeholder={placeholder || 'Cth: Udang,kacang,Dingin'}
                            keyboardType={'default'}
                            placeholderTextColor="#8b8b8b" 
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
    paddingLeft: 15,
    paddingBottom: 8
  },
  radioForm: {
    color: '#DDDDDD',
  },
  inputTextArea: {
    height: 150,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingTop: 14,
    borderRadius: 3,
    backgroundColor: '#2F2F2F',
    borderColor: '#545454'
  },
  inputText: {
    color: '#DDDDDD',
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
})