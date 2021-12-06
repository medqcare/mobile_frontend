import React from 'react';
import Modal from 'react-native-modal';
import {
  View, 
  StyleSheet, 
  Text, 
  Image, 
  TouchableOpacity, 
} from 'react-native'

export default function docOptionModal({modal,setModal,selection, setSelectedValue} ){

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
                    <View style={styles.toogle}/>
                </View>
                    <View style={styles.innerContainer}>
                        {selection.map((item,index)=>{
                            return(
                                <View key={index}> 
                                    <TouchableOpacity
                                        onPress={() => {
                                            setSelectedValue(item.label)
                                            setModal(false)
                                        }}                
                                    >
                                    <View style={styles.touchable}>
                                        <Image
                                            source={item.url}
                                            style={styles.picture}    
                                        >
                                        </Image>
                                        <Text style={styles.labelText}> 
                                            {item.label} 
                                        </Text>                  
                                    </View>
                                    </TouchableOpacity>
                                </View>
                            )
                        })}
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

    innerContainer: {
        marginHorizontal: 25,
        marginBottom: 20,
    },

    touchable: {
        borderRadius: 3,
        minHeight:50,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10
    },

    picture: {
        marginTop: 5,
        // width: 45,
        // height: 45
    },

    labelText: {
        marginLeft: 20,
        color:'#DDDDDD'
    },
})
