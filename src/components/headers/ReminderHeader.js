import React, { useState } from 'react'
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
import SelectPatient from '../../components/modals/selectPatient'


const dimensions = Dimensions.get('window')
const dimHeight = dimensions.height
const dimWidth = dimensions.width
const fontScale = dimensions.fontScale

export default function ReminderHeader({
    navigate,
    navigateBack = 'Home',
    navigateTo, 
    hidden = true,
    name = 'firstName',
    imageURL,
    family,
    setPatientID,
}){
    const [selectPatientModal, setSelectPatientModal] = useState(false)

    const widthBack = (dimWidth * 0.06945)
    const heightBack = (dimHeight * 0.03677)
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
                />
                
                <View style={styles.innerContainer}>
                    <TouchableOpacity
                        onPress={() => navigate(navigateBack)}
                    >
                        <ReminderBackButton width={widthBack} height={heightBack}/>
                    </TouchableOpacity>
                    <View style={styles.lowerInnerContainer}>
                        <View>
                            <Text style={styles.greetingText}>Halo {name}!</Text>
                            <Text style={styles.noteText}>Pengingat untuk obat Anda</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => setSelectPatientModal(true)}
                        >
                            <Image
                                source={{uri: imageURL ? imageURL : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRH_WRg1exMTZ0RdW3Rs76kCOb9ZKrXddtQL__kEBbrS2lRWL3r'}}
                                style={styles.imageContainer}
                            />
                            <SelectPatient
                                modal={selectPatientModal}
                                setModal={setSelectPatientModal}
                                title={'Siapa yang ingin anda check pengingatnya?'}
                                family={family}
                                setSelectedValue={setPatientID}
                                navigateTo={navigateTo}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>
        </ImageBackground>
    )
}

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
        paddingHorizontal: dimWidth * 0.0578,
        paddingBottom: dimHeight * 0.0275,
        paddingTop: dimHeight * 0.05,
    },

    lowerInnerContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
    },

    greetingText: {
        color: '#DDDDDD',
        fontSize: fontScale * 28,
        fontWeight: '600',
    },

    noteText: {
        color: '#DDDDDD',
        fontSize: fontScale * 14,
        fontWeight: '400',
        paddingTop: dimHeight * 0.003676,
    },

    imageContainer: {
        width: 55,
        height: 55,
        borderRadius: 150 / 2,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#2F2F2F"
    }
})