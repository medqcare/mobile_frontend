import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
} from "react-native";
import PlusSign from '../../assets/svg/PlusSign'
import MinusSign from '../../assets/svg/MinusSign'

const dimension = Dimensions.get("window")
const dimHeight = dimension.height
const dimWidth = dimension.width

export default function QuantitySelector({drugData, setDrugData}){

    function increment(){
        const newValue = drugData.drugQuantity + 1
        setDrugData({
            ...drugData,
            drugQuantity: newValue,
            quantityTotal: newValue
        })
    }

    function decrement(){
        if(drugData.drugQuantity > 1){
            const newValue = drugData.drugQuantity - 1
            setDrugData({
                ...drugData,
                drugQuantity: newValue,
                quantityTotal: newValue
            })
        } else {
            ToastAndroid.show('Jumlah obat tidak bisa dibawah 1', ToastAndroid.SHORT)
        }
    }

    function onChangeNumber(number){
        if(number > 1){
            setDrugData({...drugData, quantityTotal: number, drugQuantity: number})
        } else {
            ToastAndroid.show('Jumlah obat tidak bisa dibawah 1', ToastAndroid.SHORT)
        }
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => decrement()}
                disabled={drugData.quantityTotal ? false : true}
            >
                <MinusSign propSize={24}/>
            </TouchableOpacity>

            <View style={styles.numberContainer}>
                <TextInput
                    autoFocus={false}
                    placeholder={''}
                    keyboardType={'numeric'}
                    placeholderTextColor="#8b8b8b" 
                    onChangeText={number => onChangeNumber(number)}
                    style={[styles.numberText]}
                    value={(drugData.drugQuantity).toString()}
                    textAlign="center"
                >
                </TextInput>
            </View>

            <TouchableOpacity onPress={() => increment()}>
                <PlusSign propSize={24}/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: 'center'
    },

    numberContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#545454',
        paddingVertical: dimHeight * 0.00502,
        paddingHorizontal: dimWidth * 0.02952,
        marginHorizontal: dimWidth * 0.00984,
    },

    numberText: {
        color: '#DDDDDD',
    },
})