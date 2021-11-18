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
  ImageBackground
} from 'react-native'

export default function SetsModal({modal,setModal,selection,iconLeft,iconMid,iconRight} ){

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
                    <View style={styles.toogle}/>
                    <Text style={styles.title}>
                        {iconLeft}
                    </Text>
                </View>
                <View style={styles.profile}>
                    <Text style={styles.profileP} >
                        {iconMid}
                    </Text>
                    <SafeAreaView>
                        <ScrollView>
                            <TouchableHighlight>
                                <TouchableWithoutFeedback>
                                    <View style={{flexDirection:'row',alignItems:'center',alignContent:'center',justifyContent:'space-between',width:'100%',marginBottom:40}}>
                                        {selection.map((item,index)=>{
                                            return(
                                                <View key={index}> 
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            setSelectedLabel(item.label || item)
                                                            setSelectedValue(item.value || item, changeKey)
                                                            setModal(false)
                                                        }}                
                                                    >
                                                    <View style={styles.cardName}>
                                                        <View style={styles.profileName}>
                                                            <Image
                                                                source={item.url}
                                                                style={{marginTop:10,width:30,height:30}}    
                                                            >
                                                                  
                                                            </Image>
                                                            <Text style={styles.name}> {item.label || item} </Text>                  
                                                        </View>
                                                    </View>
                                                    </TouchableOpacity>
                                                </View>
                                            )
                                        })}
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
        justifyContent : 'flex-end',
        margin: 0
    },
    container: {
        maxHeight: '100%',
        backgroundColor: '#2F2F2F',
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
    title: {
        marginTop:10,
        color:'white',
        fontSize:12
    },
    subtitle: {
        color:'white',
        fontSize:12,
        marginLeft:5
    },
    cardName: {
        marginTop:10,
        borderColor: '#757575',
        borderWidth:1,
        borderRadius: 3,
        minHeight:50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    profileName: {
        flexDirection:'row'
    },
    name: {
        marginTop: 15,
        marginLeft:6,
        color:'#DDDDDD'
    },
    profile: {
        marginHorizontal: 15,
        marginBottom: 20,
      },

    profileP: {
        color: 'white',
        fontSize: 12,
      },
})
