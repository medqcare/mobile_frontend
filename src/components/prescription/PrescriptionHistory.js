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

function PrescriptionHistory({props, prescriptions}) {
    const [content, setContent] = useState(prescriptions)
    return (
        content ? (  
            content.map((el, index) => {
                
                return (
                    <View style={styles.eachDrugContainer} key={index}>
                        
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

    ettiqueteContainter: {
        flexDirection: "row",
		paddingTop: dimHeight * 0.01471,
    },

	ettiqueteText: {
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

export default connect(mapStateToProps)(PrescriptionHistory)