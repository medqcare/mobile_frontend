import React, { Component } from 'react'
import { Modal, StyleSheet, View, ActivityIndicator } from 'react-native'
import LottieLoader from 'lottie-react-native'

const Loader = (props) => {
    const {
        loading,
        ...attributes
    } = props

    return (
        <Modal
            transparent={true}
            animationType={'none'}
            visible={loading}
            onRequestClose={() => { console.log('Close Modal') }}
        >
            <View style={styles.modalBackground}>
                <LottieLoader
                    source={require('../screens/animation/loading.json')}
                    autoPlay
                    loop
                />
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#1F1F1F'
    },
})

export default Loader