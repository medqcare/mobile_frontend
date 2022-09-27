import React from 'react';
import Modal from 'react-native-modal';
import {
  View, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  ScrollView,
  SafeAreaView,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from 'react-native'
import { heightPercentageToDP } from 'react-native-responsive-screen';


export default function SelectModal({ modal, setModal, selection, title, subtitle, setSelectedValue, setSelectedLabel, changeKey, changeInnerKey, darkMode} ){
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
        <View style={darkMode ? styles.container : styles.containerLight}>
          <View style={styles.header}>
            <View style={darkMode ? styles.toogle : styles.toogleLight} />
            <Text style={darkMode ? styles.title : styles.titleLight}>{title}</Text>
          </View>
          <View style={styles.subtitleContainer}>
            <Text style={darkMode ? styles.subtitleText : styles.subtitleTextLight}>{subtitle}</Text>
          </View>
          {/* <SafeAreaView> */}
          <ScrollView
            style={{paddingHorizontal: 12}}
          >
            <TouchableHighlight>
              <TouchableWithoutFeedback>
                <View>
                  {selection.map((item, index) => {
                    const label = item.name || null;
                    const value =
                      changeInnerKey === 'city' ? item.name : item.id;
                    const coordinates = item.longitude
                      ? [item.longitude, item.latitude]
                      : null;
                    return (
                      // <View key={index}>
                      <TouchableOpacity
                        onPress={() => {
                          setSelectedLabel(label);
                          setSelectedValue(
                            value,
                            changeKey,
                            changeInnerKey,
                            label,
                            coordinates
                          );
                          setModal(false);
                        }}
                        key={index}
                      >
                        <View style={darkMode ? styles.selectionContainer : styles.selectionContainerLight}>
                          <View style={styles.selectionTextContainer}>
                            <Text style={darkMode ? styles.selectionText : styles.selectionTextLight}> {label}</Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                      // </View>
                    );
                  })}
                </View>
              </TouchableWithoutFeedback>
            </TouchableHighlight>
          </ScrollView>
          {/* </SafeAreaView> */}
        </View>
      </Modal>
    );

}    

const styles = StyleSheet.create({
    modal: {
        justifyContent : 'flex-end',
        margin: 0,
        flex: 1
    },
    container: {
        maxHeight: '100%',
        backgroundColor: '#2F2F2F',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    containerLight: {
        maxHeight: '100%',
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    header: {
        marginTop:20,
        flexDirection:'row',
        justifyContent:'center',
        marginBottom:20
    },
    toogle: {
        position:'absolute',
        borderWidth:2,
        width:50,
        borderColor: '#6C6C6C',
        alignContent: 'center',
        marginBottom:20
    },
    toogleLight: {
        position:'absolute',
        borderWidth:2,
        width:50,
        borderColor: '#E0E0E0',
        alignContent: 'center',
        marginBottom:20
    },
    title: {
        marginTop:10,
        color:'white',
        fontSize:12
    },
    titleLight: {
        marginTop:10,
        color:'#212121',
        fontSize:12
    },
    subtitleContainer: {
        marginHorizontal: 15,
        marginBottom: 20,
    },
    subtitleText: {
        color: 'white',
        fontSize: 12,
    },
    subtitleTextLight: {
        color: '#212121',
        fontSize: 12,
    },
    
    selectionContainer: {
        marginVertical:10,
        borderColor: '#757575',
        borderWidth:1,
        borderRadius: 3,
        minHeight:50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    selectionContainerLight: {
        marginVertical:10,
        borderColor: '#E0E0E0',
        borderWidth:1,
        borderRadius: 3,
        minHeight:50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    selectionTextContainer: {
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    selectionText: {
        color:'#DDDDDD'
    },
    selectionTextLight: {
        color:'#212121'
    },
   
   
})