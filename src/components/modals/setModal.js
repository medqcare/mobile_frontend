import React from 'react'
import { Modal, View, StyleSheet, Text, Image, TouchableOpacity, Dimensions } from 'react-native'

//icon
import IconF from 'react-native-vector-icons/Feather'
const Setmodal = (props) => {
    console.log(props._visible)
    const {
        _visible,
        _iconId,
        _message,
        _navigationLeft,
        _navigationRight,
        _navigationBottom,
        _textRight,
        _textLeft,
        _textBottom,
    } = props

    const iconWanted = [{
        id: 'success',
        iconName: 'check-circle',
        color: '#33E204',
    },
    {
        id: 'failed',
        iconName: 'x-circle',
        color: '#D30303',
    },
    {
        id: 'warning',
        iconName: 'alert-circle',
        color: '#EEB300',
    }]

    return (
        <Modal
            transparent={true}
            animationType={'none'}
            visible={_visible}
        >
            <View style={styles.container}>
                {
                    iconWanted.map((item, index) => {
                        if (item.id == _iconId) {
                            return (
                                <View key={index} style={styles.base}>
                                    <View style={{
                                        ...styles.top,
                                        backgroundColor: `${item.color}`,
                                    }}>
                                        <IconF name={item.iconName}
                                            color={'#FFF'}
                                            size={40} />
                                    </View>
                                    <View style={styles.bottom}>
                                        <View style={styles.massageCon}>
                                            <Text style={textStyle.message}>{_message}</Text>
                                        </View>
                                        <View style={{
                                            ...styles.buttonCon,
                                            borderTopColor: '#C2C2C2',
                                        }}>
                                            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'flex-end' }}>
                                                {_textLeft &&
                                                    <TouchableOpacity
                                                        style={styles.button}
                                                        onPress={() => {
                                                            _navigationLeft()
                                                        }}>
                                                        <Text style={textStyle.button}>{_textLeft}</Text>
                                                    </TouchableOpacity>
                                                }
                                                {_textRight &&
                                                    <TouchableOpacity
                                                        style={{ ...styles.button, ...styles.buttonRight }}
                                                        onPress={() => {
                                                            _navigationRight()
                                                        }}>
                                                        <Text style={textStyle.button}>{_textRight}</Text>
                                                    </TouchableOpacity>
                                                }
                                            </View>
                                            {_textBottom &&
                                                <TouchableOpacity
                                                    style={{ ...styles.button, width: '100%', borderTopWidth: 1, borderColor: '#C2C2C2' }}
                                                    onPress={() => {
                                                        _navigationBottom()
                                                    }}>
                                                    <Text style={textStyle.button}>{_textBottom}</Text>
                                                </TouchableOpacity>
                                            }
                                        </View>
                                    </View>
                                </View>
                            )
                        }
                    })
                }
            </View>
        </Modal>
    )
}

const _width = Dimensions.get('screen').width
const _height = Dimensions.get('screen').height

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ('rgba(0,0,0,0.4)'),
        justifyContent: 'center',
        alignItems: 'center'
    },
    base: {
        width: _width * 0.8,
        height: _height * 0.23,
    },
    top: {
        width: '100%',
        height: '28%',
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottom: {
        width: '100%',
        // height: '80%',
        backgroundColor: '#e9e9e9',
        borderBottomStartRadius: 10,
        borderBottomEndRadius: 10,
        justifyContent: 'space-between',
    },
    image: {
        width: 40,
        height: 40,
    },
    massageCon: {
        width: '100%',
        height: '55%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    buttonCon: {
        width: '100%',
        borderTopWidth: 1,
        // justifyContent: 'flex-end'
    },
    button: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
    },
    buttonRight: {
        borderLeftColor: '#C2C2C2',
        borderLeftWidth: 1,
    }
})

const textStyle = StyleSheet.create({
    button: {
        fontSize: 16,
        color: '#9D9D9D',
        fontWeight: 'bold'
    },
    message: {
        fontSize: 16,
    }
})

export default Setmodal