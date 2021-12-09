import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Switch,
} from "react-native";
import { connect } from "react-redux";


const dimHeight = Dimensions.get("window").height;
const dimWidth = Dimensions.get("window").width;

function ReminderActiveList(props) {
    const data = [
        {
            information: 'Sebelum Makan',
            drugName: 'Paracetamol',
            drugQuantity: 10,
            type: 'Tablet',
            ettiquete: ['Morning', 'Afternoon', 'Night'],
            reminder: false
        },
        {
            information: 'Setelah Makan',
            drugName: 'Bodrex',
            drugQuantity: 20,
            type: 'Pil',
            ettiquete: ['Morning', 'Night'],
            reminder: true
        }
    ]
  
    return (
        data ? (  
            data.map((el, index) => {
                const [isEnabled, setIsEnabled] = useState(el.reminder);
                const toggleSwitch = () => setIsEnabled(previousState => !previousState);
                return (
                    <View style={styles.eachDrugContainer} key={index}>
                        <TouchableOpacity
                            style={styles.touchable}
                            onPress={() => console.log('See Detail', index)}
                        >
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
                            <View style={styles.drugSeparatorContainer}/>
                            <View style={styles.drugBottomContainer}>
                                <Text style={styles.darkerText}>Setel Pengingat</Text>
                                <Switch
                                    trackColor={{ false: '#767577', true: 'rgba(10, 88, 237, 1)' }}
                                    thumbColor={'#f4f3f4'}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={toggleSwitch}
                                    value={isEnabled}
                                />
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

	drugBottomContainer: {
		paddingTop: dimHeight * 0.01839,
		flexDirection: "row",
		width: '90%',
		justifyContent: "space-between",
	},

	textItem: {
		...textStyles.lighterText,
	}
});




const mapStateToProps = state => {
    return state
}

export default connect(mapStateToProps)(ReminderActiveList)