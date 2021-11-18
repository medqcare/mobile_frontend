import React, { useState } from 'react'
import {
    View, TouchableOpacity, Text,
    StyleSheet
} from 'react-native'
import Modal from 'react-native-modal'

import IconFA from 'react-native-vector-icons/FontAwesome5'


const ModalSortBy = (props) => {
    const { setVisible,
        setFar,
        setClose,
        distanceActive,
        setSortby,
        alfaActive,
        setAlfa,
        setAtoZ,
        setZtoA } = props
    const [modal, setModal] = useState(true)
    return (
        <Modal
            isVisible={modal}
            swipeDirection={'down'}
            onSwipeComplete={() => setVisible()}
            style={{
                justifyContent: 'flex-end',
                margin: 0,
            }}
        >
            <View style={{
                padding: 20, backgroundColor: '#FFF', height: '25%', borderTopLeftRadius: 10, borderTopRightRadius: 10, alignItems: 'center',
            }}>
                <View style={{ width: '20%', height: 4, backgroundColor: '#cdcdcd' }} />
                {distanceActive ? (
                    <TouchableOpacity
                        onPress={() => {
                            setClose()
                            setSortby()
                        }}
                        style={{ flexDirection: 'row', flexGrow: 1, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 0.5 }}>
                        <Text style={{ flex: 5, fontSize: 16 }}> Close to Far</Text>
                        <IconFA style={{ flex: 1 }} name='sort-amount-down' size={30} />
                    </TouchableOpacity>
                ) : (
                        <TouchableOpacity
                            onPress={() => {
                                setFar()
                                setSortby()
                            }}
                            style={{ flexDirection: 'row', flexGrow: 1, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 0.5 }}>
                            <Text style={{ flex: 5, fontSize: 16 }}> Far to Close</Text>
                            <IconFA style={{ flex: 1 }} name='sort-amount-up' size={30} />
                        </TouchableOpacity>
                    )
                }
                {alfaActive ? (
                    <TouchableOpacity
                        onPress={() => {
                            setAtoZ()
                            setAlfa()
                        }}
                        style={{ flexDirection: 'row', flexGrow: 1, justifyContent: 'center', alignItems: 'center', }}>
                        <Text style={{ flex: 5 }}> A to Z</Text>
                        <IconFA style={{ flex: 1 }} name='sort-alpha-down' size={30} />
                    </TouchableOpacity>
                ) : (
                        <TouchableOpacity
                            onPress={() => {
                                setZtoA()
                                setAlfa()
                            }}
                            style={{ flexDirection: 'row', flexGrow: 1, justifyContent: 'center', alignItems: 'center', }}>
                            <Text style={{ flex: 5 }}> Z to A</Text>
                            <IconFA style={{ flex: 1 }} name='sort-alpha-up' size={30} />
                        </TouchableOpacity>
                    )}
            </View>
        </Modal>
    )
}

const viewStyle = StyleSheet.create({
    inputBox: {
        height: 50,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        marginVertical: 10,
    },
})

const textStyle = StyleSheet.create({
})

export default ModalSortBy