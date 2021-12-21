import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Switch,
} from "react-native";
import { AntDesign, MaterialIcons, FontAwesome  } from '@expo/vector-icons';
import ToggleSwitch from 'toggle-switch-react-native'
import * as Animatable from 'react-native-animatable';

import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
  } from 'react-native-reanimated';

import Accordion from 'react-native-collapsible/Accordion';
import ReminderSkippedLogo from '../../assets/svg/ReminderSkippedLogo'

const dimHeight = Dimensions.get("window").height;
const dimWidth = Dimensions.get("window").width;

function ReminderActiveList({props, prescriptions}) {
    const { reminderDetails } = props.userData
    const CONTENT = prescriptions.length > 0 ? prescriptions.map(el => {
        const {
            dose,
            drugID,
            drugName,
            drugQuantity,
            ettiquete,
            expiredDate,
            finishedAt,
            information,
            isFinished,
            patientID,
            price,
            quantityTotal,
            reminder,
            uidDrug,
            _id
        } = el

        const newObject = {
            header: {
                information,
                drugName,
                drugQuantity,
                type: 'Tablet',
                ettiquete,
                reminder,
                imageUrl: 'https://d2qjkwm11akmwu.cloudfront.net/products/25c2c4a4-0241-403c-a9c0-67b51923ba4d_product_image_url.webp',
            },
            expanded: {
                ettiquete: filter('status', _id),
                alarmTime: filter('alarmTime', _id)
            }
        }
        return newObject
    }) : null

    function filter(key, _id){
        if(key === 'alarmTime'){
            const alarmTime = []
            for(let i = 0; i < reminderDetails?.length; i++){
                if(reminderDetails[i].prescriptionID === _id) alarmTime.push(reminderDetails[i].alarmTime)
            }
            return alarmTime
        } else {
            const status = []
            for(let i = 0; i < reminderDetails?.length; i++){
                if(reminderDetails[i].prescriptionID === _id) status.push(reminderDetails[i].status)
            }
            return status
        }

    }

    const [reminders, setReminders] = useState(CONTENT ? CONTENT.map(el => {
        return el.header.reminder
    }) : null)
    const toggleSwitch = (index) => {
        const newArray = reminders.map((el, idx) => {
            if(index === idx){
                el = !el
            }
            return el
        })
        setReminders(newArray)
    }

    const [activeSections, setActiveSections] = useState([]);
    const setSections = (sections, isClose, index) => {
        if(isClose){
            const newSections = sections.filter(el => {
                return el !== index
            })
            setActiveSections(newSections)
        } else {
            setActiveSections(sections.includes(undefined) ? [] : sections);
        }
    }; 

    const renderHeader = (section, _, isActive,) => {
        return (
          <Animatable.View
            key={_}
            duration={400}
            style={styles.eachDrugContainer}
            transition="backgroundColor"
        >
            <View
                style={styles.touchable}
            >
                <View style={styles.drugTopContainer}>
                    <Text style={styles.drugNameText}>{section.header.drugName} {section.header.drugQuantity} {section.header.type}</Text>
                    {isActive ? 
                        <Animatable.View
                        animation={'wobble'}>
                            <TouchableOpacity
                            style={styles.detailContainer}
                                onPress={() => props.navigation.navigate('DrugDetail', {drugDetail: section})}
                            >
                                    <Text style={styles.lighterText}>Detail</Text>
                            </TouchableOpacity>
                        </Animatable.View>
                    :
                        <Animatable.View
                            animation={'swing'}>
                            <MaterialIcons 
                                name="keyboard-arrow-down" 
                                size={dimWidth * 0.05} 
                                color="#B5B5B5" 
                            />
                        </Animatable.View>
                    }
                </View>
                <View style={styles.drugMiddleContainer}>
                    <View style={styles.informationContainer}>
                        <Text style={styles.lighterText}>{section.header.information}</Text>
                    </View>
                        {isActive ? null :
                            <View style={styles.ettiqueteContainter}>
                                <AntDesign 
                                    name="clockcircleo" 
                                    size={dimWidth * 0.035} 
                                    color="rgba(128, 128, 128, 1)" 
                                />
                            </View>
                        }
                </View>
                    <View style={styles.drugSeparatorContainer}/>
                
                    <View style={styles.drugBottomContainer}>
                        <Text style={styles.darkerText}>Setel pengingat</Text>
                        <ToggleSwitch
                            isOn={reminders[_]}
                            onColor="rgba(10, 88, 237, 1)"
                            offColor="#767577"
                            size="medium"
                            animationSpeed={150}
                            onToggle={isOn => toggleSwitch(_)}
                        />
                    </View>
            </View>
          </Animatable.View>
        );
    };

    const renderContent = (section, _, isActive) => {
        const { ettiquete, alarmTime } = section.expanded
        return (
            <Animatable.View
                key={_}
                duration={400}
                style={styles.reminderContainer}
                transition="backgroundColor">
                    {ettiquete.map((el, index) => {
                        return (
                            <View key={index}>
                                <View style={styles.reminderTimeContainer}>
                                    <View style={styles.reminderLowerContainer}>
                                        <View style={{flexDirection: "row"}}>
                                            <MaterialIcons name="access-alarm" size={24} color="rgba(128, 128, 128, 1)" />
                                            <Text style={styles.reminderTimeText}>{alarmTime[index]}</Text>
                                        </View>
                                            {el === null ? 
                                                <View style={{flexDirection: "row", justifyContent: "space-between", width: 170, }}>
                                                    <TouchableOpacity
                                                        style={{padding: 11, borderWidth: 1, borderColor: 'rgba(156, 156, 156, 1)', borderRadius: 20}}
                                                    >
                                                        <Text style={{color: 'rgba(119, 191, 244, 1)'}}>TERLEWAT</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity
                                                        style={{padding: 11, borderWidth: 1, borderColor: 'rgba(156, 156, 156, 1)', borderRadius: 20}}
                                                    >
                                                        <Text style={{color: 'rgba(119, 191, 244, 1)'}}>DIMINUM</Text>
                                                    </TouchableOpacity>
                                                </View> :
                                                <View style={{flexDirection: "row", alignItems: "center"}}>
                                                    {el ?
                                                        <>
                                                            <ReminderSkippedLogo/>
                                                            <Text style={{color: 'red', paddingLeft: 5}}>TERLEWAT</Text>
                                                        </>
                                                    :
                                                        <>
                                                            <FontAwesome name="check" size={24} color="green" />
                                                            <Text style={{color: 'green', paddingLeft: 5}}>DIMINUM</Text>
                                                        </>
                                                    }
                                                </View>
                                            }
                                    </View>
                                </View>
                            </View>
                            <View style={styles.drugSeparatorContainer}/>
                            <View style={styles.drugBottomContainer}>
                                <Text style={styles.darkerText}>Setel pengingat</Text>
                                <Switch
                                    trackColor={{ false: '#767577', true: 'rgba(10, 88, 237, 1)' }}
                                    thumbColor={'#f4f3f4'}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={toggleSwitch}
                                    value={isEnabled}
                                    style={styles.reminderSwitch}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                )
            })
        ) : (
            <View style={styles.noDataContainer}>
                <Text style={styles.lighterText}>Belum Ada Pengingat</Text>
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

    detailContainer: {
        paddingHorizontal: 15,
        paddingVertical: 3,
    },

    ettiqueteContainter: {
        flexDirection: "row",
		paddingTop: dimHeight * 0.01471,
    },

	ettiqueteText: {
		...textStyles.darkerText,
        paddingLeft: dimWidth * 0.02315
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
        alignItems: "center",
	},
    
    reminderSwitch: { 
        transform: [
            { 
                // scaleX: 1.5
                scaleX: dimWidth * 0.0031
            }, 
            { 
                // scaleY: 1.5 
                scaleY: dimHeight * 0.0015 
            }
        ],
        height: dimHeight * 0.002451,
    },

    noDataContainer: {
        paddingTop: dimHeight * 0.015
    },

    lighterText: {
		...textStyles.lighterText,
	},
});


export default ReminderActiveList