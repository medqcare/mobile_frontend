import React, { useEffect, useState } from 'react';
import {
    View, 
    Modal,
    StyleSheet, 
    Text, 
    Dimensions,
    TouchableOpacity, 
    ActivityIndicator,
    TextInput
} from 'react-native'

export default function RenameModal({modal, optionLeftFunction, optionLeftText, optionRightFunction, optionRightText, warning, nameBefore, load}){
    const [value, setValue] = useState('')
    useEffect(() => {
        setValue(nameBefore)
    },[nameBefore])
    
    return  (
        <Modal 
            transparent={true}
            animationType={'slide'}
            visible={modal}
        >
            <View style={styles.container}>
                <View style={styles.base}>
                    <View style={styles.confirmationCard}>
                        <View style={styles.warning}>
                            <Text style={styles.warningText}>{warning}</Text>
                        </View>
                        <View style={{width: '100%', paddingHorizontal: 20}}>
                            <TextInput 
                                value={value}
                                style={{borderWidth: 1, borderColor: '#fff', width: '100%', color: '#fff', padding: 10, borderRadius: 5}}
                                onChangeText={(text) => setValue(text)}
                            />
                        </View>
                        <View style={styles.option}>
                            <TouchableOpacity
                                style={styles.optionButtonCancel}
                                onPress={optionLeftFunction}
                            >
                                <Text style={styles.optionTextCancel}>{optionLeftText}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.optionButtonConfirm}
                                onPress={() => {
                                    optionRightFunction(value)
                                }}
                                disabled={load}
                            >
                            {load ? (
                                <ActivityIndicator size={"small"} color="#FFF" style={styles.optionTextConfirm} />
                                ) : (
                                    <Text style={styles.optionTextConfirm}>{optionRightText}</Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
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
        alignItems: 'center',
    },
    base: {
        width: _width * 0.7,
        height: _height * 0.23,
    },
    confirmationCard: {
        width: '100%',
        backgroundColor: '#2F2F2F',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 13,
    },
    warning: {
        width: '100%',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    warningText: {
        color: '#DDDDDD',
        fontWeight: 'bold'
    },
    option: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingTop: 15,
        paddingBottom: 25,
        paddingHorizontal: 20
    },
    optionButtonCancel: {
        flex: 0.35,
        alignItems: 'flex-end'
    },
    optionButtonConfirm: {
        flex: 0.35,
        alignItems: 'flex-end'
    },
    optionTextCancel: {
        color: '#B5B5B5',
    },
    optionTextConfirm: {
        color: '#EA2E05',
    }
})
