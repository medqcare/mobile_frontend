import React, { useState } from 'react'
import {
    View,
    Text,
    Modal,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    BackHandler
} from 'react-native'
import { connect } from 'react-redux'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { baseURL } from '../../config'
import { Logout } from '../../stores/action'
import SettingModals from '../../components/modals/setModal'
import RadioForm from 'react-native-radio-form'

const DeletePage = (props) => {
    const [modalW, setmodalW] = useState(false)
    const [modalS, setmodalS] = useState(false)
    const [modalF, setmodalF] = useState(false)
    const [message, setMessage] = useState('')

    const mockData = [
        {
            label: 'Yes, I don`t need it anymore',
            value: 'Yes, I don`t need it anymore'
        },
        {
            label: 'Yes, I only delete for a few moments',
            value: 'Yes, I only delete for a few moments'
        },
        {
            label: 'Yes, My needs have been fulfilled',
            value: 'Yes, My needs have been fulfilled'
        },
        {
            label: 'No reason',
            value: 'No reason'
        }
    ];

    async function suspend() {
        let token = await AsyncStorage.getItem('token');
        return new Promise(async (resolve, reject) => {
            try {
                let { data, status } = await axios({
                    method: 'POST',
                    url: `${baseURL}/api/v1/members/suspend`,
                    headers: { Authorization: JSON.parse(token).token },
                    data: { userID: props.userData.userID._id },
                })
                setmodalS(true)
            } catch (error) {
                setMessage(error.message)
                setmodalF(true)
                console.log(error.message, '-------------')
                // reject(error);
            }
        })
    }

    const logout = async () => {
        AsyncStorage.removeItem('token')
            .then(async function () {
                props.Logout(props.navigation.navigate('Sign'))
            })
            .catch(err => {
                console.log(err);
            })
    }

    BackHandler.addEventListener("hardwareBackPress", () => {
        props.navigation.navigate('Setting')
        return true
    })
    return (
        <View style={styles.modalBackground}>
            <View>
                <Text style={{ fontSize: 20, paddingVertical: 10 }}>Confirmation</Text>
                <Text style={{ color: '#9D9D9D', fontSize: 16 }}>Are you sure want to delete this account, could you give your reason?</Text>
                <View>
                    <RadioForm
                        style={{fontSize:16, color: '#9D9D9D'}}
                        dataSource={mockData}
                        itemShowKey="label"
                        itemRealKey="value"
                        circleSize={22}
                        outerColor={'#9D9D9D'}
                        innerColor={'#9D9D9D'}
                        // initial={0}
                        formHorizontal={false}
                        labelHorizontal={true}
                        onPress={(item) => console.log(item.value)}
                    />
                </View>
            </View>
            <TouchableOpacity
                onPress={() => setmodalW(true)}
                style={{
                    backgroundColor: 'red',
                    borderRadius: 15,
                    height: Dimensions.get('screen').width * 0.13,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                <Text style={{ color: '#FFF', fontSize: 16 }}>Delete Account</Text>
            </TouchableOpacity>

            {
                modalS &&
                <SettingModals
                    _visible={modalS}
                    _navigationRight={() => {
                        logout()
                        setmodalS(false)
                    }}
                    _textRight={'OK'}
                    _message={'Suspend Account Success'}
                    _iconId={'success'}
                />
            }
            {
                modalW &&
                <SettingModals
                    _visible={modalW}
                    _navigationRight={() => {
                        props.navigation.navigate('Setting')
                        setmodalW(false)
                    }}
                    _textRight={'Cancel'}
                    _navigationLeft={() => {
                        setmodalW(false)
                        suspend()
                    }}
                    _textLeft={'Yes'}
                    _message={'Are you sure want to delete this account ?'}
                    _iconId={'warning'}
                />
            }
            {
                modalF &&
                <SettingModals
                    _visible={modalF}
                    _navigationRight={() => setmodalF(false)}
                    _textRight={'OK'}
                    _message={message}
                    _iconId={'failed'}
                />
            }
        </View>
    )
}

const widthScreen = Dimensions.get('screen').width

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 20,
    },
})

const mpaDispatchToprops = {
    Logout
}
const mapStateToProps = state => {
    return state
}


export default connect(mapStateToProps, mpaDispatchToprops)(DeletePage)