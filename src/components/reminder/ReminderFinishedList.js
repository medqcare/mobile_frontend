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


const dimHeight = Dimensions.get("window").height;
const dimWidth = Dimensions.get("window").width;

function ReminderFinishedList(props) {
    const data = [
        {
            information: 'Setelah Makan',
            drugName: 'Marjan',
            drugQuantity: 20,
            type: 'Pil',
            ettiquete: ['Morning', 'Night'],
            isFinished: true,
            finishedAt: new Date(2020, 11, 15)
        },
        {
            information: 'Sebelum Makan',
            drugName: 'Madu',
            drugQuantity: 10,
            type: 'Tablet',
            ettiquete: ['Morning', 'Afternoon', 'Night'],
            isFinished: true,
            finishedAt: new Date(2018, 7, 31)
        }
    ]
  
    return (
        data ? (  
            data.map((el, index) => {
                const date = new Date()
                const options = {year: 'numeric', month: 'long', day: 'numeric' }
                const formattedDate = date.toLocaleDateString('id-ID', options)
                console.log(formattedDate);
                return (
                    <View style={styles.eachDrugContainer} key={index}>
                        <TouchableOpacity
                            style={styles.touchable}
                            onPress={() => console.log('See Detail', index)}
                        >
                        <Text style={styles.textItem}>{formattedDate}</Text>
                        <View style={styles.drugSeparatorContainer}/>
                            <View style={styles.drugTopContainer}>
                                <View style={styles.informationContainer}>
                                    <Text style={styles.textItem}>{el.information}</Text>
                                </View>
                                <Image
                                    source={require('../../../assets/png/ArrowDown.png')}
                                />
                            </View>
                            <View style={styles.drugMiddleContainer}>
                                <Text style={styles.drugNameText}>{el.drugName} {el.drugQuantity} {el.type}</Text>
                                <Text style={styles.ettiqueteText}>Hari ini {el.ettiquete.length}x sekali</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )
            })
        ) : (
            <Text style={styles.textItem}>Belum Ada Reminder</Text>
        )
    );
}

const textStyles = {
	darkerText : {
		color: 'rgba(181, 181, 181, 1)', 
	},

	lighterText: {
		color: "rgba(221, 221, 221, 1)"
	}
}

const styles = StyleSheet.create({
	eachDrugContainer: {
		paddingTop: dimHeight * 0.015
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
		flexDirection: 'row',
		width: '90%',
		justifyContent: "space-between",
	},

	informationContainer: {
		backgroundColor: 'rgba(31, 31, 31, 1)',
		paddingHorizontal: dimWidth * 0.0139,
		paddingVertical: dimHeight * 0.00491 
	},

	drugMiddleContainer: {
		width: '90%',
		paddingTop: dimHeight * 0.01962,
		paddingBottom: dimHeight * 0.02942
	},

	drugNameText: {
		...textStyles.lighterText,
		fontWeight: '500',
		fontSize: 16
	},

	ettiqueteText: {
		paddingTop: dimHeight * 0.01471,
		...textStyles.darkerText
	},

	darkerText : {
		...textStyles.darkerText, 
	},

	drugSeparatorContainer: {
		backgroundColor: '#474747',
		height: dimHeight * 0.0015,
		width: '100%',
	},

	textItem: {
		...textStyles.lighterText,
	}
});




const mapStateToProps = state => {
    return state
}

export default connect(mapStateToProps)(ReminderFinishedList)