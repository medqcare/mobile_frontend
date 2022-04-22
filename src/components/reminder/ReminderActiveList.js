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
import { useDispatch } from "react-redux";
import keys from "../../stores/keys";
import ConfirmationModal from "../modals/ConfirmationModal";

const { 
    SET_DRUGS,
    SET_ACTIVE_DRUGS,
    SET_FINISHED_DRUGS,
    SET_DRUGS_LOADING,
    SET_DRUGS_ERROR,
    DELETE_DRUGS
} = keys.drugKeys

const dimHeight = Dimensions.get("window").height;
const dimWidth = Dimensions.get("window").width;

function ReminderActiveList({props, selectedPatient, updateFinishStatusFunction, }) {
    const { activeDrugs, finishedDrugs, isLoading } = props.drugReducer
    const dispatch = useDispatch()
    const [content, setContent] = useState(activeDrugs)
    const [load, setLoad] = useState(false)
    const [confirmationModalLoad, setConfirmationModalLoad] = useState(false)
    const [confirmationModal, setConfirmationModal] = useState(false)
    const [selectedSection, setSelectedSection] = useState(null)
    const [loadChangeStatusTrue, setLoadChangeStatusTrue] = useState([false, false, false])
    const [loadChangeStatusFalse, setLoadChangeStatusFalse] = useState([false, false, false])
    const [loadToggle, setLoadToggle] = useState(false)

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('time');
    const [show, setShow] = useState(false);

    const [currentIndex, setCurrentIndex] = useState(null)
    const [alarmIndex, setAlarmIndex] = useState(0)
    const [drugID, setDrugID] = useState(null)
    const [currentReminderID, setcurrentReminderID] = useState(null)

    const [calendarID, setCalendarID] = useState(null)

    useEffect(() => {
		(async () => {
		  const { status } = await Calendar.requestCalendarPermissionsAsync();
		  if (status === 'granted') {
			const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
            const arrayOfCalendarNames = calendars.map(el => {
                return el.name
            })
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
    async function createAlarm(alarmTime, drugID, drugName, reminderID, etiquetteIndex, i){
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
            reminderID,
            drugID,
            etiquetteIndex,
            startDate,
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

	async function deleteEvent(reminderID){
		try {
            const deleted = await Calendar.deleteEventAsync(reminderID)
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

    async function updateEvent(eventID, alarmTime){
        try {
            const startDate = new Date(alarmTime)
            const endDate = new Date(alarmTime)
            endDate.setMinutes(endDate.getMinutes() + 5)

            const details = {
                startDate,
                endDate,
                timeZone: "GMT-7",
                alarms:[ { 
                    relativeOffset: 0,
                    method: Calendar.AlarmMethod.ALERT,
                } ],
            }

            const updatedEvent = await Calendar.updateEventAsync(eventID, details)
        } catch (error) {
            console.log(error)
        }
    }

    const onChange = async (event, selectedDate) => {
        try {
            const currentDate = selectedDate || date;
            setShow(Platform.OS === 'ios');
            setDate(currentDate);

            const newReminders= activeDrugs[currentIndex].reminders.map(el => {
                if(el._id === currentReminderID){
                    el.alarmTime = currentDate
                }
                return el
            })

            const newContent = activeDrugs.map((el, idx) => {
                if(el._id === activeDrugs[currentIndex]._id){
                    el.reminders = newReminders
                }
                return el
            })
            dispatch({
                type: SET_ACTIVE_DRUGS,
                payload: newContent
            })
            setContent(newContent)
            ToastAndroid.show('Successfully updated alarm time', ToastAndroid.SHORT)

            const token = JSON.parse(await AsyncStorage.getItem('token')).token
            const alarmIDs = JSON.parse(await AsyncStorage.getItem('alarmIDs'))
            const currentIndexDrugAlarmIDs = alarmIDs.filter(el => el.etiquetteIndex === alarmIndex && el.drugID === drugID)
            const hours = currentDate.getHours()
            const minutes = currentDate.getMinutes()

            if(currentIndexDrugAlarmIDs.length === 0){
                const currentIndexReminder = activeDrugs[currentIndex].reminders
                for(let i = 0; i < currentIndexReminder.length; i++){
                    if(currentIndexReminder[i].etiquetteIndex === alarmIndex){
                        const alarmTime = new Date(currentIndexReminder[i].alarmTime)
                        const { _id } = currentIndexReminder[i]
                        alarmTime.setHours(hours)
                        alarmTime.setMinutes(minutes)
                        await props.changeReminderAlarmTime(_id, alarmTime, token)
                    }
                }

            } else {
                for(let i = 0; i < currentIndexDrugAlarmIDs.length; i++){
                    const alarmTime = new Date(currentIndexDrugAlarmIDs[i].startDate)
                    const { reminderID } = currentIndexDrugAlarmIDs[i]
                    alarmTime.setHours(hours)
                    alarmTime.setMinutes(minutes)
                    await updateEvent(currentIndexDrugAlarmIDs[i].alarmID, alarmTime)
                    await props.changeReminderAlarmTime(reminderID, alarmTime, token)
                }
            }
        } catch (error) {
            console.log(error)
        }
        
    };
    
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showTimepicker = (alarmTime, _, index, drugID, _id) => {
        setcurrentReminderID(_id)
        setDrugID(drugID)
        setAlarmIndex(index)
        setDate(alarmTime)
        setCurrentIndex(_)
        showMode('time');
    };

    // useEffect(() => {
    //     setLoad(true)
    //     let unMounted = false

    //     if(!unMounted){
    //         if(activeDrugs.length > 0){
    //             setContent(activeDrugs)
    //             setLoad(false)
    //         } else {
    //             setContent([])
    //             setLoad(false)
    //         }
    //     }

    //     return () => {
    //         setLoad(false)
    //         unMounted = true
    //     }
    // }, [activeDrugs])

    useEffect(() => {
        setLoad(true)
        let unMounted = false

        if(!unMounted){
            setLoad(false)
        }

        return () => {
            setLoad(false)
            unMounted = true
        }

    }, [])

    const toggleSwitch = async (index, section) => {
        try {
            setLoadToggle(true)
            const { reminders, reminder, etiquette } = section
            const etiquetteLength = etiquette.length
            const drugID = section._id
            const drugName = section.drugName
            await props.changeAlarmBoolean(drugID)

            const foundAlarmIDs = JSON.parse(await AsyncStorage.getItem('alarmIDs'))
            if(reminder && foundAlarmIDs){

                const toBeDeleted = []
                const notDeleted = []
                for(let i = 0; i < foundAlarmIDs.length; i++){
                    if(foundAlarmIDs[i].drugID === drugID) toBeDeleted.push(foundAlarmIDs[i])
                    else notDeleted.push(foundAlarmIDs[i])
                }

                for(let i = 0; i < toBeDeleted.length; i ++){
                    const deleted = await deleteEvent(toBeDeleted[i].alarmID)
                }

                const stringified = JSON.stringify(notDeleted)
                
                if(!stringified) await AsyncStorage.removeItem('alarmIDs')
                else await AsyncStorage.setItem('alarmIDs', stringified)

            } else {
                let alarmIDs = []
                
                if(foundAlarmIDs){
                    alarmIDs = [...foundAlarmIDs]
                }

                for(let i = 0; i < reminders.length; i++){
                    const alarmTime = reminders[i].alarmTime
                    const reminderID = reminders[i]._id
                    const etiquetteIndex = reminders[i].etiquetteIndex
                    const createdAlarm = await createAlarm(alarmTime, drugID, drugName, reminderID, etiquetteIndex, i)
                    alarmIDs.push(createdAlarm)
                }

                const stringified = JSON.stringify(alarmIDs)
                await AsyncStorage.setItem('alarmIDs', stringified)
            }

           
            const newArray = activeDrugs.map((el, idx) => {
                const newObject = {
                    ...el,
                    reminder: index === idx ? !el.reminder : el.reminder
                }
                return newObject
            })
            dispatch({
                type: SET_ACTIVE_DRUGS,
                payload: newArray
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

        const newReminders= activeDrugs[_].reminders.map(el => {
            if(el._id === reminderID){
                el.status = status
                el.statusChangedAt = new Date()
            }
            return el
        })

        const newContent = activeDrugs.map((el, idx) => {
            if(el._id === activeDrugs[_]._id){
                el.reminders = newReminders
            }
            return el
        })
        dispatch({
            type: SET_ACTIVE_DRUGS,
            payload: newContent
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

    async function updateFinishStatus(){
        try {
            const drugID = selectedSection._id
            const finishedDrug = {
                ...selectedSection,
                finishedAt : new Date(),
                isFinished : true
            }

            await updateFinishStatusFunction(drugID, activeDrugs, finishedDrug, finishedDrugs)

            setConfirmationModal(false);
            setConfirmationModalLoad(false)
        } catch (error) {
            console.log(error)
        }
    }

    const renderHeader = (section, _, isActive,) => {
        const { drugName, drugQuantity, type, information, etiquette, reminder } = section
        return (
          <Animatable.View
            key={_}
            duration={400}
            style={styles.eachDrugContainer}
            transition="backgroundColor"
        >
            <View style={styles.touchable}>
                <View style={styles.drugTopContainer}>
                    <Text style={styles.drugNameText}>{drugName} {drugQuantity} {type}</Text>
                    {isActive ? 
                        <Animatable.View
                        animation={'wobble'}>
                            <TouchableOpacity
                            style={styles.detailContainer}
                                onPress={() => props.navigation.navigate('DrugDetail', { drugDetail: section })}
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
                        <Text style={styles.lighterText}>{information}</Text>
                    </View>
                        {isActive ? null :
                            <View style={styles.etiquetteContainter}>
                                <AntDesign 
                                    name="clockcircleo" 
                                    size={dimWidth * 0.035} 
                                    color="rgba(128, 128, 128, 1)" 
                                />
                                <Text style={styles.etiquetteText}>Hari ini {etiquette.length}x sehari</Text>
                            </View>
                        }
                </View>
                    <View style={styles.drugSeparatorContainer}/>
                
                    <View style={styles.drugBottomContainer}>
                        <Text style={styles.darkerText}>Setel pengingat</Text>
                        <ToggleSwitch
                            isOn={reminder}
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
        const { reminders, _id } = section
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
                        const alarmTime = new Date(el.alarmTime)
                        const alarmHours = alarmTime.getHours()
                        const alarmMinutes = alarmTime.getMinutes()
                        const displayAlarmHours = `${withZero(alarmHours)}:${withZero(alarmMinutes)}`
                        const status = el.status
                        return (
                            <View key={index}>
                                <View style={styles.reminderTimeContainer}>
                                    <View style={styles.reminderLowerContainer}>
                                        <TouchableOpacity 
                                            style={{flexDirection: "row", alignItems: "center"}}
                                            onPress={() => showTimepicker(alarmTime, _, index, _id, el._id)}
                                        >
                                            <MaterialIcons name="access-alarm" size={24} color="rgba(128, 128, 128, 1)" />
                                            <Text style={styles.reminderTimeText}>{displayAlarmHours}</Text>
                                        </TouchableOpacity>

                                        {status === null ? 
                                            <View style={{flexDirection: "row"}}>
                                                <TouchableOpacity
                                                    onPress={() => changeReminderStatus(false, el._id, _, index,)}
                                                    style={styles.skippedButton}
                                                    >
                                                        {loadChangeStatusFalse[index] ? 
                                                            <ActivityIndicator size={"small"} color={"red"} /> : 
                                                            <Text style={[
                                                                styles.statusReminderButtonText,
                                                                {fontSize: RFValue(12, dimHeight)}
                                                            ]}>TERLEWAT</Text>
                                                        }
                                                </TouchableOpacity>    
                                                <TouchableOpacity
                                                    onPress={() => changeReminderStatus(true, el._id, _, index)}
                                                    style={[styles.skippedButton, { marginLeft: dimWidth * 0.02431 }]}
                                                    >
                                                    {loadChangeStatusTrue[index] ? 
                                                        <ActivityIndicator size={"small"} color={"green"} /> : 
                                                        <Text style={[
                                                            styles.statusReminderButtonText, 
                                                            {fontSize: RFValue(12, dimHeight)}
                                                        ]}>DIMINUM</Text>
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
                        <View style={styles.bottomContentContainer}>
                            <TouchableWithoutFeedback 
                                onPress={() => setSections(activeSections, true, _)}    
                            >
                                <View style={{flexDirection: "row", alignItems: "center"}}>
                                    <Text style={styles.closeText}>Tutup</Text>
                                    <MaterialIcons name="keyboard-arrow-up" size={30} color="rgba(243, 115, 53, 1)"/>
                                </View>
                            </TouchableWithoutFeedback>

                            <TouchableWithoutFeedback 
                                onPress={() => {
                                    setSelectedSection(section)
                                    setConfirmationModal(true)
                                }}    
                            >
                                <View style={{flexDirection: "row", alignItems: "center"}}>
                                    <Text style={styles.finishText}>Selesaikan obat</Text>
                                    <MaterialIcons name="done" size={24} color="green" />
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
            </Animatable.View>
        );
    };
  
    return (
        load ? <ActivityIndicator color="blue" size={'small'}/> :
        activeDrugs?.length > 0 ? 
        <>
            <Accordion
                activeSections={activeSections}
                sections={activeDrugs}
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
            <ConfirmationModal
                load={confirmationModalLoad}
                modal={confirmationModal}
                warning={'Anda akan menghapus obat dari list obat aktif. Pastikan semua obat sudah anda tandai sebagai diminum atau terlewat'}
                optionLeftText={'BATAL'}
                optionRightText={'SELESAIKAN'}
                optionLeftFunction={() => setConfirmationModal(false)}
                optionRightFunction={async () => {
                    updateFinishStatus()
                }}
            />
        </>
        : (
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
	},

    redText: {
        color: 'rgba(243, 115, 53, 1)'
    }, 

    greenText: {
        color: 'green'
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
        maxWidth: dimWidth * 0.6886574,
	},

    detailContainer: {
        paddingHorizontal: dimWidth * 0.03646,
        paddingVertical: dimHeight * 0.003656,
    },

    etiquetteContainter: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: dimWidth * 0.02315
    },

	etiquetteText: {
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
                scaleX: dimWidth * 0.0031
            }, 
            { 
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
	
    bottomContentContainer: {
        flexDirection: "row",
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "space-between",
        paddingBottom: dimHeight * 0.01829,
        paddingTop: dimHeight * 0.01219,
        width: "90%",
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
    },

    finishText: {
        paddingRight: dimWidth * 0.02431,
        ...textStyles.greenText
    }
});


export default ReminderActiveList