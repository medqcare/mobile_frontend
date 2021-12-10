import React from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StatusBar,
    StyleSheet,
    ImageBackground,
    Image
} from 'react-native'

import { LinearGradient } from 'expo-linear-gradient'
import ReminderBackButton from '../../assets/svg/ReminderBackButton'

export default function ReminderHeader({
    navigate,
    navigateBack = 'Home',
    navigateTo, 
    hidden = true,
    name = 'firstName'
}){

    const start = {
        x: 0, 
        y: 0
    }

    const end = {
        x: 0, 
        y: 1
    }

    const colors = ["rgba(196, 196, 196, 0)",  "#646161"]

    return (
        <ImageBackground 
            source={require('../../assets/png/ReminderBackground.png')} 
            resizeMode="cover" 
            style={styles.container}
        >
            <LinearGradient  
                start={start} 
                end={end} 
                colors={colors} 
                style={styles.container}
            >
                    <StatusBar 
                        barStyle="light-content"
                        translucent={true}
                        backgroundColor={'transparent'}
                        hidden={hidden}
                    />
                    
                        <View style={styles.innerContainer}>
                            <TouchableOpacity
                                onPress={() => navigate(navigateBack)}
                            >
                                <ReminderBackButton/>
                            </TouchableOpacity>
                            <View>
                                <Text style={styles.greetingText}>Halo {name}!</Text>
                                <Text style={styles.noteText}>Pengingat untuk obat anda</Text>
                            </View>
                        </View>
            </LinearGradient>
        </ImageBackground>
    )
}

const dimensions = Dimensions.get('window')
const dimHeight = dimensions.height
const dimWidth = dimensions.width

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: dimHeight * 0.21446,
        width: dimWidth,
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },

    innerContainer: {
        flex: 1,
        height: '100%',
        justifyContent: 'space-between',
        paddingLeft: dimWidth * 0.0578,
        paddingBottom: dimHeight * 0.0275,
        paddingTop: dimHeight * 0.0345 
    },

    greetingText: {
        color: '#DDDDDD',
        fontSize: 24,
        fontWeight: '600',
    },

    noteText: {
        color: '#DDDDDD',
        fontSize: 12,
        fontWeight: '400',
        paddingTop: dimHeight * 0.003676,

    },
})