import React, { useState } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, ScrollView, FlatList, TextInput } from 'react-native'
import Modal from 'react-native-modal'

import IconII from 'react-native-vector-icons/Ionicons'
// import IconFeather from 'react-native-vector-icons/dist/Feather';

const ModalSpecialistDoctor = ({ setVisible, findDoctor }) => {

    const listData = require("../../../assets/specialist/specialist")
    const [data, setData] = useState(listData.specialistName)
    const [show, setShow] = useState(data)

    function searchSpecialist(name) {
        setShow(data.filter(el => el.name.includes(name)))
        console.log(show, 'ini show')
    }

    return (
        <Modal
            isVisible={true}
            // swipeDirection={'down'}
            // onSwipeComplete={() => setVisible()}
            style={{
                justifyContent: 'flex-end',
                margin: 0,
            }}
        >
            <View style={{
                padding: 8, backgroundColor: '#FFF', height: '100%', alignItems: 'center',
            }}>
                <View style={viewStyle.searchBar}>
                    <TextInput
                        style={{ marginStart: 10, fontSize: 16, flex: 1, }}
                        placeholder='Search specialist'
                        onChangeText={text => searchSpecialist(text)}
                    />
                    {/* <IconFeather name="search" size={30} color="#CACACA" style={{ padding: 10 }} /> */}
                </View>
                <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, flexGrow: 1 }} >
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                    }}>
                        <TouchableOpacity
                            activeOpacity={0.6}
                            onPress={() => {
                                findDoctor("All")
                                setVisible()
                            }}
                            style={{
                                alignItems: 'center', width: '49.3%', backgroundColor: '#FFF', borderRadius: 6, padding: 8, marginVertical: 2, borderWidth: 0.5, borderColor: '#4fe39b'
                            }}>
                            <View style={{ width: 45, alignItems: 'center' }}>
                                <IconII name={'logo-android'} size={40} color='#4fe39b' />
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, }}>
                                <Text style={{ textAlign: 'center', color: '#9D9D9D' }}>All</Text>
                            </View>
                        </TouchableOpacity>
                        {show.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    key={index}
                                    activeOpacity={0.6}
                                    onPress={() => {
                                        console.log(item, "klik")
                                        findDoctor(item.name)
                                        setVisible()
                                    }}
                                    style={{
                                        alignItems: 'center', width: '49.3%', backgroundColor: '#FFF', borderRadius: 6, padding: 8, marginVertical: 2, borderWidth: 0.5, borderColor: '#4fe39b'
                                    }}>
                                    <View style={{ width: 45, alignItems: 'center' }}>
                                        <IconII name={'logo-android'} size={40} color='#4fe39b' />
                                    </View>
                                    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, }}>
                                        <Text style={{ textAlign: 'center', color: '#9D9D9D' }}>{item.name}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                    {/* <Text>{JSON.stringify(data, null, 2)}</Text> */}
                </ScrollView>
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
    buttonCicle: {
        padding: 5,
    },
    number: {
        flex: 1,
        alignItems: 'center',
        marginHorizontal: 10,
    },
    searchBar: {
        borderColor: '#4fe39b',
        borderWidth: 1,
        marginBottom: 5,
        borderRadius: 6,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        minWidth: '100%',
    },
})

const textStyle = StyleSheet.create({
    number: {
        fontSize: 16
    },
})

export default ModalSpecialistDoctor