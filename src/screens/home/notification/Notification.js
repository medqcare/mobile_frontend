import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import {
	StyleSheet,
	Text,
	View,
	Dimensions,
	Image,
	TouchableOpacity,
	ScrollView,
	ActivityIndicator
} from "react-native";
import { connect } from "react-redux";
import GradientHeader from "../../../components/headers/GradientHeader";
import EmptyNotificationLogo from '../../../assets/svg/EmptyNotificationLogo'
import SelectPatient from '../../../components/modals/selectPatient';

const dimension = Dimensions.get('window')
const dimHeight = dimension.height
const dimWidth = dimension.width

function Notification({navigation}){
    const data = null
    return (
        <View style={{flex: 1}}>
            <GradientHeader
                title="Notifikasi"
                navigate={navigation.navigate}
            />
            <View style={styles.container}>
                {data ? (
                    <View><Text>Ada data</Text></View>
                ): 
                    <View style={styles.noDataContainer}>
                        <EmptyNotificationLogo/>
                        <Text style={[textStyles.ligthText, styles.noNotificationText]}>Belum ada Notifikasi</Text>
                    </View>
                }
                <View style={styles.bottomContainer}>
                    <TouchableOpacity 
                        style={styles.backToHomeButton}
                        onPress={() => navigation.navigate('Home')}
                        >
                        <Text style={textStyles.ligthText}>Kembali ke Home</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const textStyles = StyleSheet.create({
    ligthText: {
        color: '#DDDDDD'
    }
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1F1F1F',
        justifyContent: "space-between"
    },

    noDataContainer: {
        marginTop: 100,
        justifyContent: "center",
        alignItems: "center",
    },

    noNotificationText: {
        paddingTop: 20
    },

    bottomContainer: {
        justifyContent: "center", 
        alignItems: "center",
        marginBottom: 20
    },

    backToHomeButton: {
        paddingVertical: 20,
        paddingHorizontal: 50,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: '#545454'
    }
})

const mapStateToProps = state => {
    return state
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Notification)