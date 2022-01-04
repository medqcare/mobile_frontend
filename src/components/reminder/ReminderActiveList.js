import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ToastAndroid,
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
import { ActivityIndicator } from "react-native-paper";
import withZero from "../../helpers/withZero";
import { getSelectedDate } from "../../helpers/todaysDate";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from '@react-native-community/datetimepicker'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import * as Calendar from 'expo-calendar';

const dimHeight = Dimensions.get("window").height;
const dimWidth = Dimensions.get("window").width;

function ReminderActiveList({props, drugs }) {
    const [load, setLoad] = useState(true)
    const [content, setContent] = useState(null)
    const [loadChangeStatusTrue, setLoadChangeStatusTrue] = useState([false, false, false])
    const [loadChangeStatusFalse, setLoadChangeStatusFalse] = useState([false, false, false])
    const [loadToggle, setLoadToggle] = useState(false)

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('time');
    const [show, setShow] = useState(false);

    const [reminderID, setReminderID] = useState(null)
    const [currentIndex, setCurrentIndex] = useState(null)

    const [calendarID, setCalendarID] = useState(null)

    useEffect(() => {
		(async () => {
		  const { status } = await Calendar.requestCalendarPermissionsAsync();
		  if (status === 'granted') {
			const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
            const arrayOfCalendarNames = calendars.map(el => {
                return el.name
            })
			// console.log('Here are all your calendars:');
			// console.log(calendars);
            if(arrayOfCalendarNames.includes('Applimetis Parama Solusi')){
                ToastAndroid.show('Calendar already created', ToastAndroid.SHORT)
            } else {
                await createCalendar()
                ToastAndroid.show('Calendar created', ToastAndroid.SHORT)
            }
		  }
          const afterCreatedCalendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
          const medQCareCalendar = afterCreatedCalendars.find(el => el.name === 'Applimetis Parama Solusi')
          const medQCareID = medQCareCalendar.id
          setCalendarID(medQCareID)
        })();
	}, []);

    // Pertama kali dilakukan
    async function createCalendar() {
		const defaultCalendarSource =
		  Platform.OS === 'ios'
			? await getDefaultCalendarSource()
			: { isLocalAccount: true, name: 'MedQCare Calendar' };

        const options = {
            title: 'Drug Reminders',
            color: 'blue',
            entityType: Calendar.EntityTypes.EVENT,
            sourceId: defaultCalendarSource.id,
            source: defaultCalendarSource,
            name: 'Applimetis Parama Solusi',
            ownerAccount: 'personal',
            accessLevel: Calendar.CalendarAccessLevel.OWNER,
        }

		const newCalendarID = await Calendar.createCalendarAsync(options);
	}

    // Kedua dilakukan
    async function createAlarm(alarmTime, drugID, drugName, i){
		const startDate = new Date(alarmTime)
		const endDate = new Date(alarmTime)
		endDate.setMinutes(endDate.getMinutes() + 5)

		const details = {
			startDate,
			endDate,
			title: drugName,
			timeZone: "GMT-7",
			alarms:[ { 
				relativeOffset: 0,
				method: Calendar.AlarmMethod.ALERT,
			} ],
		}

		const newAlarm = await Calendar.createEventAsync(calendarID, details) 
        const createdAlarm = {
            alarmID : newAlarm,
            drugID
        }
        
        return createdAlarm
	}

	async function deleteCalendar(id){
		try {
			const deleted = await Calendar.deleteCalendarAsync(id)
			console.log(deleted)
		} catch (error) {
			console.log(error)
		}
	}

	async function deleteEvent(drugID){
		try {
            // await AsyncStorage.removeItem('alarmIDs')
            // await Calendar.deleteEventAsync('2122')
            const alarmIDs = JSON.parse(await AsyncStorage.getItem('alarmIDs'))

            const toBeDeleted = []
            const notDeleted = []
            for(let i = 0; i < alarmIDs.length; i++){
                if(alarmIDs[i].drugID === drugID) toBeDeleted.push(alarmIDs[i])
                else notDeleted.push(alarmIDs[i])
            }

            for(let i = 0; i < toBeDeleted.length; i ++){
                const deleted = await Calendar.deleteEventAsync(toBeDeleted[i].alarmID)
            }

            const stringified = JSON.stringify(notDeleted)
            
            if(!stringified) await AsyncStorage.removeItem('alarmIDs')
            else await AsyncStorage.setItem('alarmIDs', stringified)
		} catch (error) {
			console.log(error)
		}
	}

	

	async function openCalendar(id){
		const calendar = Calendar.openEventInCalendar(id)
	}

	async function getEvents(id){
		const event = await Calendar.getEventAsync(id)
		console.log(new Date(event.startDate).getMinutes())
		console.log(event)
	}

	async function getReminders(){
		try {
			const reminder = await Calendar.getReminderAsync("1")
			console.log(reminder)
			
		} catch (error) {
			console.log(error.message)
		}
	}

	


    const onChange = async (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        const token = JSON.parse(await AsyncStorage.getItem('token')).token
        await props.changeReminderAlarmTime(reminderID, currentDate, token)

        const newReminders= content[currentIndex].reminders.map(el => {
            if(el._id === reminderID){
                el.alarmTime = currentDate
            }
            return el
        })

        const newContent = content.map((el, idx) => {
            if(el._id === content[currentIndex]._id){
                el.reminders = newReminders
            }
            return el
        })

        setContent(newContent)
    };
    
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showTimepicker = (alarmTime, _id, _) => {
        setDate(alarmTime)
        setReminderID(_id)
        setCurrentIndex(_)
        showMode('time');
    };

    useEffect(() => {
        if(drugs.length > 0){
            setContent(drugs)
            setLoad(false)
        } else {
            setContent([])
            setLoad(false)
        }
    }, [])

    const toggleSwitch = async (index, section) => {
        try {
            setLoadToggle(true)
            const { reminders, reminder } = section
            const token = JSON.parse(await AsyncStorage.getItem('token')).token
            const drugID = section._id
            const drugName = section.drugName
            const change = await props.changeAlarmBoolean(drugID, token)
            ToastAndroid.show(change, ToastAndroid.SHORT)

            if(reminder){
                const deletedAlarm = deleteEvent(drugID)
            } else {
                const foundAlarmIDs = JSON.parse(await AsyncStorage.getItem('alarmIDs'))
                let alarmIDs = []
                
                if(foundAlarmIDs){
                    alarmIDs = [...foundAlarmIDs]
                }

                for(let i = 0; i < reminders.length; i++){
                    const alarmTime = reminders[i].alarmTime
                    const createdAlarm = await createAlarm(alarmTime, drugID, drugName, i)
                    alarmIDs.push(createdAlarm)
                }

                const stringified = JSON.stringify(alarmIDs)
                await AsyncStorage.setItem('alarmIDs', stringified)
            }

           
            const newArray = content.map((el, idx) => {
                const newObject = {
                    ...el,
                    reminder: index === idx ? !el.reminder : el.reminder
                }
                return newObject
            })
            setContent(newArray)
            setLoadToggle(false)
        } catch (error) {
            console.log(error)
        }
        
       
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

    const changeReminderStatus = async (status, reminderID, _, index,) => {
        if(status){
            const newLoad = loadChangeStatusTrue.map((el, idx) => {
                if(idx === index){
                    el = true
                }
                return el
            }) 
            setLoadChangeStatusTrue(newLoad)
        } else {
            const newLoad = loadChangeStatusFalse.map((el, idx) => {
                if(idx === index){
                    el = true
                }
                return el
            }) 
            setLoadChangeStatusFalse(newLoad)
        }
        const token = JSON.parse(await AsyncStorage.getItem('token')).token
        await props.changeReminderStatus(status, reminderID, token)

        const newReminders= content[_].reminders.map(el => {
            if(el._id === reminderID){
                el.status = status
                el.statusChangedAt = new Date()
            }
            return el
        })

        const newContent = content.map((el, idx) => {
            if(el._id === content[_]._id){
                el.reminders = newReminders
            }
            return el
        })

        setContent(newContent)
        if(status){
            const newLoad = loadChangeStatusTrue.map((el, idx) => {
                if(idx === index){
                    el = false
                }
                return el
            }) 
            setLoadChangeStatusTrue(newLoad)
        } else {
            const newLoad = loadChangeStatusFalse.map((el, idx) => {
                if(idx === index){
                    el = false
                }
                return el
            }) 
            setLoadChangeStatusFalse(newLoad)
        }
    }

    
					

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
                    <Text style={styles.drugNameText}>{section.drugName} {section.drugQuantity} {section.type}</Text>
                    {isActive ? 
                        <Animatable.View
                        animation={'wobble'}>
                            <TouchableOpacity
                            style={styles.detailContainer}
                                onPress={() => props.navigation.navigate('DrugDetail', {drugDetail: section})}
                                // onPress={() => console.log(section._id)}
                                // onPress={() => createAlarm(new Date())}
                                // onPress={() => getEvents("2036")}
                                // onPress={() => getReminders()}
                                // onPress={() => deleteCalendar("1")}
                                // onPress={() => deleteEvent("61d3bc4f8631aa42083ec865")}
                                // onPress={() => deleteEvent("61d3bc4f8631aa42083ec864")}
                                // onPress={() => createCalendar()}
                                // onPress={() => openCalendar('2306')}
                                // onPress={() => console.log(Calendar)}
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
                        <Text style={styles.lighterText}>{section.information}</Text>
                    </View>
                        {isActive ? null :
                            <View style={styles.ettiqueteContainter}>
                                <AntDesign 
                                    name="clockcircleo" 
                                    size={dimWidth * 0.035} 
                                    color="rgba(128, 128, 128, 1)" 
                                />
                                <Text style={styles.ettiqueteText}>Hari ini {section.ettiquete.length}x sehari</Text>
                            </View>
                        }
                </View>
                    <View style={styles.drugSeparatorContainer}/>
                
                    <View style={styles.drugBottomContainer}>
                        <Text style={styles.darkerText}>Setel pengingat</Text>
                        <ToggleSwitch
                            isOn={section.reminder}
                            onColor="rgba(10, 88, 237, 1)"
                            offColor="#767577"
                            size="medium"
                            animationSpeed={150}
                            onToggle={isOn => toggleSwitch(_, section)}
                            disabled={loadToggle}
                        />
                    </View>
            </View>
          </Animatable.View>
        );
    };

    const renderContent = (section, _, isActive) => {
        const { reminders } = section
        const { todaysYear, todaysMonth, todaysDate } = getSelectedDate(new Date())
        const todaysReminder = []
        for(let i = 0; i < reminders.length; i++){
            const reminderYear = new Date(reminders[i].alarmTime).getFullYear()
            const reminderMonth = new Date(reminders[i].alarmTime).getMonth()
            const reminderDate = new Date(reminders[i].alarmTime).getDate()
            if(reminderYear === todaysYear && reminderMonth === todaysMonth && reminderDate === todaysDate) todaysReminder.push(reminders[i])
        }
        return (
            <Animatable.View
                key={_}
                duration={400}
                style={styles.reminderContainer}
                transition="backgroundColor">
                    {todaysReminder.map((el, index) => {
                        const alarmTime = new Date(reminders[index].alarmTime)
                        const alarmHours = alarmTime.getHours()
                        const displayAlarmHours = `${withZero(alarmHours)}:00`
                        const status = el.status
                        return (
                            <View key={index}>
                                <View style={styles.reminderTimeContainer}>
                                    <View style={styles.reminderLowerContainer}>
                                        <TouchableOpacity 
                                            style={{flexDirection: "row", alignItems: "center"}}
                                            onPress={() => showTimepicker(alarmTime, el._id, _)}
                                        >
                                            <MaterialIcons name="access-alarm" size={24} color="rgba(128, 128, 128, 1)" />
                                            <Text style={styles.reminderTimeText}>{displayAlarmHours}</Text>
                                        </TouchableOpacity>

                                        {status === null ? 
                                            <View style={{flexDirection: "row"}}>
                                                <TouchableOpacity
                                                    onPress={() => changeReminderStatus(false, el._id, _, index)}
                                                    style={styles.skippedButton}
                                                    >
                                                        {loadChangeStatusFalse[index] ? 
                                                            <ActivityIndicator size={"small"} color={"red"} /> : 
                                                            <Text style={[styles.statusReminderButtonText, {fontSize: RFValue(11, dimHeight)}]}>TERLEWAT</Text>
                                                        }
                                                </TouchableOpacity>    
                                                <TouchableOpacity
                                                    onPress={() => changeReminderStatus(true, el._id, _, index)}
                                                    style={[styles.skippedButton, { marginLeft: dimWidth * 0.02431 }]}
                                                    >
                                                    {loadChangeStatusTrue[index] ? 
                                                        <ActivityIndicator size={"small"} color={"green"} /> : 
                                                        <Text style={[styles.statusReminderButtonText, {fontSize: RFValue(11, dimHeight)}]}>DIMINUM</Text>
                                                    }
                                                </TouchableOpacity>
                                            </View> :
                                            <View style={{flexDirection: "row", alignItems: "center"}}>
                                                {status ?
                                                    <>
                                                        <FontAwesome name="check" size={24} color="green" />
                                                        <Text style={[styles.statusReminderText, { color: 'green' }]}>DIMINUM</Text>
                                                    </>
                                                :
                                                    <>
                                                        <ReminderSkippedLogo/>
                                                        <Text style={[styles.statusReminderText, { color: 'red' }]}>TERLEWAT</Text>
                                                    </>
                                                }
                                            </View>
                                        }
                                    </View>
                                </View>
                            </View>
                        )
                    })}
                        <TouchableWithoutFeedback 
                            onPress={() => setSections(activeSections, true, _)}    
                        >
                            <View style={styles.closeButton}>
                                <Text style={styles.closeText}>Tutup</Text>
                                <MaterialIcons name="keyboard-arrow-up" size={30} color="rgba(243, 115, 53, 1)"/>
                            </View>
                        </TouchableWithoutFeedback>
            </Animatable.View>
        );
    };
  
    return (
        load ? <ActivityIndicator color="blue" size={'small'}/> :
        content.length > 0 ? 
        <>
            <Accordion
                activeSections={activeSections}
                sections={content}
                touchableComponent={TouchableWithoutFeedback}
                expandMultiple={true}
                renderHeader={renderHeader}
                renderContent={renderContent}
                duration={400}
                onChange={setSections}
                containerStyle={{alignItems: "center"}}
            /> 
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            )}
        </>
        : (
            <View style={styles.noDataContainer}>
                <Text style={styles.lighterText}>Belum Ada Pengingat</Text>
            </View>
        )
    );
}

// dimWidth = 411.42857142857144
// dimHeight = 820.5714285714286

const textStyles = {
	darkerText : {
		color: 'rgba(181, 181, 181, 1)', 
	},

	lighterText: {
		color: "rgba(221, 221, 221, 1)"
	},

    redText: {
        color: 'rgba(243, 115, 53, 1)'
    }
}

const styles = StyleSheet.create({
	eachDrugContainer: {
		paddingTop: dimHeight * 0.015,
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
		paddingBottom: dimHeight * 0.02942,
        flexDirection: "row"
	},

	drugNameText: {
		...textStyles.lighterText,
		fontWeight: '500',
	},

    detailContainer: {
        paddingHorizontal: dimWidth * 0.03646,
        paddingVertical: dimHeight * 0.003656,
    },

    ettiqueteContainter: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: dimWidth * 0.02315
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
        height: dimHeight * 0.029,
    },

    reminderContainer: {
        backgroundColor: '#2F2F2F',
        width: dimWidth * 0.9,
    },

    reminderTimeContainer: {
        width: '90%',
        justifyContent: "center",
        alignSelf: "center",
        height: dimHeight * 0.078,
		borderBottomWidth: 1,
		borderBottomColor: 'rgba(71, 71, 71, 1)',
	},

    reminderLowerContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
        alignItems: "center"
	},

	reminderTimeText: {
		color: 'rgba(181, 181, 181, 1)',
		fontWeight: '500',
		paddingLeft: dimWidth * 0.01216
	},

    skippedButton: {
        paddingHorizontal: dimWidth * 0.02431,
        paddingVertical: dimHeight * 0.01219, 
        borderWidth: 1, 
        borderColor: 'rgba(156, 156, 156, 1)', 
        borderRadius: 20, 
        // width: 90, 
        width: dimWidth * 0.231, 
        justifyContent: "center", 
        alignItems: "center",
    },

    statusReminderButtonText: {
        color: 'rgba(119, 191, 244, 1)',
    },

    statusReminderText: {
        paddingLeft: dimWidth * 0.01216,
    },
	
    closeButton: {
        flexDirection: "row",
		width: '90%',
        alignSelf: "center",
        alignItems: "center",
        paddingBottom: dimHeight * 0.01829,
        paddingTop: dimHeight * 0.01219
    },

    noDataContainer: {
        paddingTop: dimHeight * 0.015,
        justifyContent: "center",
        alignItems: "center"
    },

    lighterText: {
		...textStyles.lighterText,
	},

    closeText: {
        paddingRight: dimWidth * 0.02431,
        ...textStyles.redText
    }
});


export default ReminderActiveList