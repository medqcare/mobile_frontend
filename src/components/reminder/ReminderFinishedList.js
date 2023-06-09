import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { fullMonthFormat, getFormattedDate } from "../../helpers/dateFormat";
import { AntDesign } from '@expo/vector-icons';

const dimHeight = Dimensions.get("window").height;
const dimWidth = Dimensions.get("window").width;

function ReminderFinishedList({props, drugs}) {
    const { finishedDrugs, isLoading, error } = props.drugReducer
    
    const data = finishedDrugs.length > 0 ? finishedDrugs.map(el => {
        el.finishedAt = new Date(el.finishedAt)
        return el
    }) : null

    if(data) {
        data.sort((a, b) => b.finishedAt - a.finishedAt)
    }
  
    return (
        data ? (  
            data.map((el, index) => {
                const localDate = el.finishedAt.toLocaleString('id-ID')
                const formattedDate = getFormattedDate(localDate, true)
                const displayDate = fullMonthFormat(formattedDate)
                return (
                    <View style={styles.eachDrugContainer} key={index}>
                        <TouchableOpacity
                            style={styles.touchable}
                            onPress={() => props.navigation.navigate('DrugDetail', {drugDetail: el})}
                        >
                            <View style={styles.drugTopContainer}>
                                <AntDesign 
                                    name="exclamationcircle" 
                                    size={dimWidth * 0.035} 
                                    color="rgba(128, 128, 128, 1)" 
                                />
                                <Text style={styles.finishedText}>Telah selesai pada {displayDate}</Text>
                            </View>
                            <View style={styles.drugSeparatorContainer}/>
                            <View style={styles.drugBottomContainer}>
                                <Text style={styles.drugNameText}>{el.drugName} {el.drugQuantity} {el.type}</Text>
                                <View style={styles.etiquetteContainter}>
                                    <AntDesign 
                                        name="clockcircleo" 
                                        size={dimWidth * 0.035} 
                                        color="rgba(128, 128, 128, 1)" 
                                    />
                                    <Text style={styles.etiquetteText}>{el.etiquette.length}x sehari</Text>
                                </View>
                                <Text style={{...styles.italicDarkerText, paddingTop: dimHeight * 0.01471}}>{el.information}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )
            })
        ) : (
            <View style={styles.noDataContainer}>
                <Text style={styles.lighterText}>Belum ada obat yang selesai</Text>
            </View>
        )
    );
}

const textStyles = {
	darkerText : {
		color: 'rgba(181, 181, 181, 1)', 
	},

	lighterText: {
		color: "rgba(221, 221, 221, 1)"
	},

    italicDarkerText: {
        color: "rgba(181, 181, 181, 1)",
        fontStyle: 'italic'
    }
}

const styles = StyleSheet.create({
	eachDrugContainer: {
		paddingTop: dimHeight * 0.015,
        alignSelf: "center"
	},

	touchable: {
		backgroundColor: '#2F2F2F',
		width: dimWidth * 0.9,
		paddingTop: dimHeight * 0.0246,
		paddingBottom: dimHeight * 0.0209,
		justifyContent: "center",
		alignItems: "center"
	},

    drugTopContainer: {
        flexDirection: "row",
        width: '90%',
        alignSelf: "center",
        paddingBottom: dimHeight * 0.021447,
    },

    finishedText: {
        ...textStyles.italicDarkerText,
        paddingLeft: dimWidth * 0.02315
    },

    drugSeparatorContainer: {
		backgroundColor: '#474747',
		height: dimHeight * 0.0015,
		width: '100%',
	},

    drugBottomContainer: {
		width: '90%',
		paddingTop: dimHeight * 0.01962,
	},

	drugNameText: {
		...textStyles.lighterText,
		fontWeight: '500',
		fontSize: 16
	},

    etiquetteContainter: {
        flexDirection: "row",
		paddingTop: dimHeight * 0.01471,
    },

	etiquetteText: {
		...textStyles.darkerText,
        paddingLeft: dimWidth * 0.02315
	},

    noDataContainer: {
        paddingTop: dimHeight * 0.015,
        justifyContent: "center",
        alignItems: "center"
    },

	darkerText : {
		...textStyles.darkerText, 
	},

	lighterText: {
		...textStyles.lighterText,
	},

    italicDarkerText: {
        ...textStyles.italicDarkerText
    }
});

const mapStateToProps = state => {
    return state
}

export default connect(mapStateToProps)(ReminderFinishedList)