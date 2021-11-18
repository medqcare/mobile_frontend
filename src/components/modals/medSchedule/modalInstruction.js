import React, { useState, } from 'react'
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    TextInput,
} from 'react-native'
import Modal from 'react-native-modal'

const ModalInstruction = ({ setVisible, settingInstruction }) => {
    const [before, setBefore] = useState(false)
    const [after, setAfter] = useState(false)
    const [withMeals, setWithMeals] = useState(false)
    const [Instruction, setInstruction] = useState('')

    function instructionSet() {
        var newIntraction = null
        if (before) {
            newIntraction = "Before Meals"
        }
        if (after) {
            newIntraction = newIntraction ? newIntraction.concat(', ' + "After Meals") : "After Meals"
        }
        if (withMeals) {
            newIntraction = newIntraction ? newIntraction.concat(', ' + "With Meals") : "With Meals"
        }
        let set = newIntraction ? Instruction ? newIntraction.concat(', ' + Instruction) : newIntraction : Instruction
        settingInstruction(set)
    }

    return (
        <Modal
            isVisible={true}
            swipeDirection={'down'}
            onSwipeComplete={() => setVisible()}
            style={{
                justifyContent: 'flex-end',
                margin: 0,
            }}
        >
            <View style={viewStyle.container}>
                <View style={viewStyle.line} />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                    <TouchableOpacity style={[viewStyle.InstructionMeals, {
                        borderColor: before ? '#18A85D' : '#cdcdcd',
                    }]}
                        onPress={() => {
                            setBefore(!before)
                        }}>
                        <Text>Before meals</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[viewStyle.InstructionMeals, {
                        marginHorizontal: 5,
                        borderColor: after ? '#18A85D' : '#cdcdcd',
                    }]}
                        onPress={() => {
                            setAfter(!after)
                        }}>
                        <Text>After meals</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[viewStyle.InstructionMeals, {
                        borderColor: withMeals ? '#18A85D' : '#cdcdcd',
                    }]}
                        onPress={() => {
                            setWithMeals(!withMeals)
                        }}>
                        <Text>With meals</Text>
                    </TouchableOpacity>
                </View>
                <View style={viewStyle.inputBox}>
                    <TextInput
                        style={{ width: '100%', height: '100%', paddingHorizontal: 10 }}
                        onChangeText={text => setInstruction(text)}
                        placeholder={"Other Instruction"}
                        placeholderTextColor={'#808080'}
                        value={Instruction} />
                </View>
                <TouchableOpacity style={viewStyle.button}
                    onPress={() => {
                        instructionSet()
                        setVisible()
                    }}>
                    <Text style={{ color: '#FFF' }}>OK</Text>
                </TouchableOpacity>
            </View >
        </Modal>
    )
}

const viewStyle = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#FFF',
        alignItems: 'center',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    line: {
        width: '20%',
        height: 4,
        backgroundColor: '#cdcdcd',
        marginBottom: 10,
    },
    inputBox: {
        height: 50,
        width: '100%',
        borderColor: '#808080',
        borderWidth: 1,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        marginVertical: 10,
    },
    InstructionMeals: {
        flex: 1,
        padding: 10,
        borderWidth: 1,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginVertical: 10,
        backgroundColor: '#18A85D',
        borderRadius: 3,
    }
})

export default ModalInstruction