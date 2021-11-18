import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SectionList,
    SafeAreaView,
    ScrollView,
    ImageBackground,
} from 'react-native'
import { connect } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { changeLogin, Logout } from '../../stores/action'

import Item from '../../components/profile/setting/setting-item'
import Title from '../../components/profile/setting/setting-tittle'
import ArrowBack from '../../assets/svg/ArrowBack'

import Icon from 'react-native-vector-icons/Ionicons'
import { BackHandler } from 'react-native'

const mpaDispatchToprops = {
    changeLogin,
    Logout
}
const mapStateToProps = state => {
    return state
}

const setting = (props) => {
    const [list, setList] = useState()
    const DATA = [
        {
            title: 'Account',
            data: [
                {
                    name: 'Edit Profile',
                    icon: 'edit'
                },
                {
                    name: 'Delete Account',
                    icon: 'deleteuser'
                }
            ]
        },
        {
            title: 'Menu',
            data: [
                {
                    name: 'Allergies',
                    icon : 'tool'
                },
                {
                    name: 'Medication Schedule',
                    icon : 'form'
                },
            ]
        }
        // {
        //     title: 'Application',
        //     data: ['help', 'term and condition', 'about', 'contact', 'random',]
        // }
    ]

    const logout = async () => {
        // await props.changeLogin()

        AsyncStorage.removeItem('token')
            .then(async function () {
                props.Logout(props.navigation.navigate('Sign'))
            })
            .catch(err => {
                console.log(err);
            })
    }

    BackHandler.addEventListener('hardwareBackPress', () => {
        return props.navigation.navigate('ProfileSwitch')
    })
    return (
        <View style={{ flex: 1 }}>
            <ImageBackground source={require('../../assets/png/Background-Pattern.png')} style={{ height: 85, }}>
                <View style={{ flex: 1, marginTop: 32, flexDirection: 'row', alignItems: 'center', }}>
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate('ProfileSwitch')}>
                        <View style={{ flexDirection: 'row', }} >
                            <ArrowBack />
                            <Text style={{ fontSize: 20, color: '#ffff', fontWeight: 'bold', position: 'relative', }}>Setting</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
            <View style={{ flex: 1 }}>
                <SectionList
                    scrollEnabled={true}
                    sections={DATA}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ item }) => <Item data={item} navigation={props.navigation} />}
                    renderSectionHeader={({ section: { title } }) => (
                        <Title data={title} />
                    )}
                    style={style.sectionList}
                />
            </View>

            <View style={{ alignItems: 'center' }}>
                <TouchableOpacity
                    onPress={() => {
                        // console.log('mau logout nih')
                        logout()
                    }}
                    style={style.button}>
                    <Text style={style.buttonText}>Log Out</Text>
                </TouchableOpacity>
                <Text style={style.version}>Version 0.0.1</Text>
            </View>
        </View>
    )
}
const style = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#e9e9',
        minHeight: '100%',
        alignItems: 'center',
        // borderWidth: 1,
    },
    button: {
        backgroundColor: '#FFF',
        borderWidth: 2,
        borderColor: '#33691E',
        width: '90%',
        height: 40,
        borderRadius: 15,
        marginTop: 20,
        // marginBottom: 35,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'flex-end',
    },
    buttonText: {
        color: '#33691E',
        fontWeight: 'bold',
        fontSize: 18
    },
    menu: {
        backgroundColor: 'white',
        width: '100%',
        height: 55,
        paddingLeft: 15,
        justifyContent: 'center'
    },
    menuWarper: {
        marginTop: 15,
        marginBottom: 15,
        width: '100%',
    },
    sectionList: {
        width: '100%'
    },
    version: {
        fontSize: 15,
        color: '#33691E',
        paddingBottom: 20,
    }
})

export default connect(mapStateToProps, mpaDispatchToprops)(setting)
