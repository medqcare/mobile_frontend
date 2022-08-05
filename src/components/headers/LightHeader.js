import React from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StatusBar,
    StyleSheet,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons, Feather } from '@expo/vector-icons'
import { 
    widthPercentageToDP as wp, 
    heightPercentageToDP as hp 
} from 'react-native-responsive-screen'




export default function LightHeader({
    navigate,
    navigateBack = 'Home',
    navigateTo, 
    title = 'Enter Title Here', 
    edit = false,
    hidden = true,
    additionalFunction,
    params
}){
    async function callAllFunction(){
        await additionalFunction()
        navigate(navigateBack)
    }

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#005EA2', '#009292']} start={{x: 1, y: 0}} end={{x: 0, y: 0}} style={styles.linearGradient}>
            <View style={styles.touchableContent}>
                <TouchableOpacity
                    onPress={() => additionalFunction ? callAllFunction() : navigate(navigateBack)}>
                    <View style={styles.content} >
                        <Ionicons 
                                name="arrow-back" 
                                color="#fff" 
                                size={25} 
                                style={styles.backArrow} 
                        />
                        <Text style={styles.text}>{title}</Text>
                    </View>
                </TouchableOpacity>
             </View>
             </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
    linearGradient: {
        flex: 1,
        height: hp('10%'),
        paddingTop: hp('5%'),
        width: '100%'
    },
    touchableContent: {
        flexDirection: 'row'
    },
    content: {
        flexDirection: 'row', 
        marginBottom: 10
    },
    backArrow: { 
        paddingHorizontal: 17.64
    },

    text: {
        color: '#DDDDDD',
        fontSize: 18
    },

    edit: {
        paddingRight: 20
    }

})