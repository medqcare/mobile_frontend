import React from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StatusBar,
    StyleSheet,
} from 'react-native'

import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import { 
    widthPercentageToDP as wp, 
    heightPercentageToDP as hp 
} from 'react-native-responsive-screen'

export default function GradientHeader({navigate, navigateTo, title}){
    const start = {
        x: 0, 
        y: 0
    }

    const end = {
        x: 1, 
        y: 0
    }

    const colors = ["#073B88",  "#048FBB"]
    
    navigateTo ? navigateTo = navigateTo : navigateTo = 'Home'
    title ? title = title : title = 'enter title here'

    return (
        <LinearGradient  
            start={start} 
            end={end} 
            colors={colors} 
            style={styles.container}
        >
            <StatusBar hidden/>
            <View style={styles.innerContainer}>
                <TouchableOpacity
                    onPress={() => navigate(navigateTo)}
                >
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
    )
}

const styles = StyleSheet.create({
    container: {
        height: hp('8%'),
    },

    innerContainer: {
        flex: 1, 
        position: 'relative',
        paddingTop: 16,
        flexDirection: 'row', 
        alignItems: 'center',
    },

    content: { 
        flexDirection: 'row', 
        marginBottom: 15
    },

    backArrow: { 
        paddingHorizontal: 17.64
    },

    text: { 
        fontSize: 20, 
        color: '#ffff', 
        position: 'relative',
    }
})