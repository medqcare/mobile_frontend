import React from 'react';
import {
    View, 
    Modal,
    StyleSheet, 
    Dimensions,
    Image,
    TouchableOpacity
} from 'react-native'
import ButtonClose from '../../assets/svg/CloseButton'

export default function FullImageModal({modal, setModal, imageUrl}){
    return  (
        <Modal 
            transparent={true}
            animationType={'slide'}
            visible={modal}
            onRequestClose={() => setModal(false)}
        >
            <View style={styles.container}>
                <TouchableOpacity 
                    style={styles.buttonClose}
                    onPress={() => setModal(false)}
                >
                    <ButtonClose/>
                </TouchableOpacity>
                <Image 
                    source={{uri: imageUrl}}
                    style={styles.profilePicture}
                />
            </View>
        </Modal>
    )
}

const size = Dimensions.get('screen').width

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ('rgba(0,0,0,0.4)'),
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonClose: {
        alignSelf: 'flex-start',
        paddingBottom: 50,
        paddingLeft: 10
    },

    profilePicture: { 
        width: size,
        height: size,
    },
})
