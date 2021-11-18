import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import QRCode from 'react-native-qrcode-svg'

const bottomSheetMcheck = () => {
    const [tab, setTab] = useState(false)

    function changeTab(tab) {
        if (tab === 'mc') setTab(true)
        else setTab(false)
    }
    return (
        <View style={viewStyles.container}>
            <View style={viewStyles.tab}>
                <TouchableOpacity
                    onPress={() => changeTab('qr')}>
                    <Text style={textStyles.leftTab}>QrCode</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => changeTab('mc')}>
                    <Text style={textStyles.rightTab}>MCData</Text>
                </TouchableOpacity>
            </View>
            {
                tab ? (
                    <View>
                        <Text> Ini data Mc</Text>
                    </View>
                ) : (
                        <View>
                            <Text>Ini QR code</Text>
                            <QRCode
                                size={120}
                                value={JSON.stringify({
                                    data: 'ini datanya yang dikirim'
                                })}
                            />
                        </View>
                    )
            }
        </View>
    )
}

const viewStyles = StyleSheet.create({

    container: {
        padding: 15,
        paddingTop: 8,
        backgroundColor: '#1ed09d',
        width: '100%',
        height: '100%'
    },
    tab: {
        justifyContent: 'center',
        flexDirection: 'row'
    },
})

const textStyles = StyleSheet.create({
    tabtab: {
        borderWidth: 1,
        borderColor: 'grey',
        paddingHorizontal: 10,
        paddingVertical: 7,
        marginTop: 5,
        borderRadius: 5
    },
    leftTab: {
        borderWidth: 1,
        borderColor: 'grey',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5
    },
    rightTab: {
        borderWidth: 1,
        borderColor: 'grey',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5
    }
})
export default bottomSheetMcheck
