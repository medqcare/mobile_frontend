import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TextInput,
  BackHandler,
  ToastAndroid,
} from "react-native";
import { connect } from "react-redux";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import GreyHeader from "../../../components/headers/GreyHeader";
import { FontAwesome } from '@expo/vector-icons'; 
import VerticalLine from '../../../assets/svg/VerticalLine'
import { DataTable } from 'react-native-paper'
import { getSelectedDate } from "../../../helpers/todaysDate";
import Calendar from "../../../components/DrugCalendar";
import withZero from "../../../helpers/withZero";
import PictureModal from '../../../components/modals/profilePictureModal'
import ConfirmationModal from "../../../components/modals/ConfirmationModal";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { changeDrugNotes, deleteDrugImageUrl, } from '../../../stores/action'

const dimension = Dimensions.get('window')
const dimHeight = dimension.height
const dimWidth = dimension.width

function DrugDetail({navigation, userData, changeDrugNotes, deleteDrugImageUrl, drugReducer }){
    const { drugDetail } = navigation.state.params
    const { activeDrugs } = drugReducer
    const { reminders, notes, imageUrl, etiquette, dose, type, description, quantityTotal, drugQuantity, drugName } = drugDetail
    const [drugImage, setDrugImage] = useState(imageUrl)
    const [confirmationModal, setConfirmationModal] = useState(false)
    const [load, setLoad] = useState(false)
    const [drugReminders, setDrugReminders] = useState([])
    
    const [consumedDrugs, setConsumedDrugs] = useState([])
    const [skippedDrugs, setSkippedDrugs] = useState([])
    
    const [displayNotes, setDisplayNotes] = useState(notes)
    const [profilePictureModal, setProfilePictureModal] = useState(false);
    const duration = Math.ceil(quantityTotal / etiquette.length)

    useEffect(() => {
        setDate(new Date())
    }, [])

    const profileStatusSelection = [
        {
          label: 'Hapus',
          url: require('../../../assets/png/ic_trash.png'),
        },
        {
          label: 'Kamera',
          url: require('../../../assets/png/ic_kamera.png'),
        },
        {
          label: 'Galeri',
          url: require('../../../assets/png/ic_galeri.png'),
        },
    ];

    async function setSelectedValue(label) {
        switch (label) {
            case 'Kamera':
                await navigation.navigate('DrugPictureCamera', {
                    destination: 'DrugDetail',
                    drugDetail,
                    setDrugImage
                });
            break;
    
            case 'Galeri':
                await navigation.navigate('DrugPictureGallery', {
                    destination: 'DrugDetail',
                    drugDetail,
                    setDrugImage
                });
            break;
    
            case 'Hapus':
                setConfirmationModal(true);
            break;
    
            default:
            break;
        }
    }
    
    function setDate(date){
        const { todaysYear, todaysMonth, todaysDate } = getSelectedDate(date)
        const selectedDateReminders = []
        const consumed = []
        const skipped = []
        for(let i = 0; i < reminders.length; i++){
            const reminderYear = new Date(reminders[i].alarmTime).getFullYear()
            const reminderMonth = new Date(reminders[i].alarmTime).getMonth()
            const reminderDate = new Date(reminders[i].alarmTime).getDate()
            if(reminderYear === todaysYear && reminderMonth === todaysMonth && reminderDate === todaysDate) selectedDateReminders.push(reminders[i])
            if(reminders[i].status) consumed.push(reminders[i])
            else if (reminders[i].status === false) skipped.push(reminders[i])
        }
        setDrugReminders(selectedDateReminders)
        setConsumedDrugs(consumed)
        setSkippedDrugs(skipped)
    }

    async function changeNotes(){
        try {
            if(displayNotes !== notes){
                const drugID = drugDetail._id;
                await changeDrugNotes(drugID, displayNotes, activeDrugs)
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function deleteImage() {
        try {
            setLoad(true);
            const drugID = drugDetail._id;
            await deleteDrugImageUrl(drugID, activeDrugs);
            setLoad(false);
            setConfirmationModal(false);
            setDrugImage('')
        } catch (error) {
            console.log(error)
        }
    }

    BackHandler.addEventListener("hardwareBackPress", async () => {
        await changeNotes()
	    navigation.pop();
		return true;
	});

    return (
        <View style={styles.container}>
            <GreyHeader 
                title="Rincian Konsumsi Obat"
                navigate={navigation.navigate}
                navigateBack="Reminder"
                additionalFunction={changeNotes}
            />
            <ScrollView>

                {/* Top Container */}
                <View style={styles.topContainer}>
                    <View>
                            <View style={{ width: 150, height: 180}}>
                                <Image source={{uri: drugImage ? drugImage : 'https://www.royalcontainers.com/wp-content/uploads/2016/09/placeholder.png'}} style={styles.imageContainer}/>
                                <TouchableOpacity
                                    style={{ alignSelf: "flex-end", top: -20, right: -10, width: 40, }}
                                    onPress={() => setProfilePictureModal(true)}
                                >
                            <Image
                                source={require('../../../assets/png/ic_camera.png')}
                                style={{ width: 35, height: 35 }}
                                />
                            </TouchableOpacity>
                            </View>
                        <PictureModal
                            modal={profilePictureModal}
                            setModal={setProfilePictureModal}
                            selection={profileStatusSelection}
                            setSelectedValue={setSelectedValue}/>
                        <ConfirmationModal
                            modal={confirmationModal}
                            optionLeftFunction={() => {
                                setConfirmationModal(false);
                            }}
                            optionLeftText="Batal"
                            optionRightFunction={() => {
                                deleteImage();
                            }}
                            optionRightText="Hapus"
                            warning="Apakah anda yakin ingin menghapus foto anda?"
                            load={load}
                        />
                    </View>
                    <View style={styles.topDetailContainer}>
                       <View style={styles.centeredSection}>
                           <Text style={styles.upperCenteredSectionText}>Frekuensi</Text>
                           <Text style={styles.lowerCenteredSectionText}>{`${etiquette.length}x Sehari`}</Text>
                       </View>
                       <View style={styles.centeredSection}>
                           <Text style={styles.upperCenteredSectionText}>Dosis</Text>
                           <Text style={styles.lowerCenteredSectionText}>{dose} {type}</Text>
                       </View>
                       <View style={styles.centeredSection}>
                           <Text style={styles.upperCenteredSectionText}>Durasi</Text>
                           <Text style={styles.lowerCenteredSectionText}>{`${duration} Hari`}</Text>
                       </View>
                    </View>
                </View>

                {/* Top Lower Container */}
                <View style={styles.upperMiddleContainer}>
                    <Text style={styles.drugNameText}>{drugName} 200 mg {drugQuantity} {type ? type : ''}</Text>
                    <Text style={[{paddingTop: 20, color: 'rgba(221, 221, 221, 1)'}]}>Notes: </Text>
                    <View style={styles.notesContainer}>
                        <TextInput
                            style={styles.inputText}
                            multiline={true}
                            autoCapitalize={"sentences"}
                            autoFocus={false}
                            placeholder={"Add notes to help you drink your medicine properly"}
                            placeholderTextColor="#8b8b8b"
                            onChangeText={(text) =>
                                setDisplayNotes(text)
                            }
                            value={displayNotes}
                        />
                    </View>
                </View>

                {/* Middle Container */}
                <View style={styles.drugStatusDetailContainer}>
                    <View style={styles.centeredSection}>
                        <Text style={styles.upperCenteredSectionText}>{quantityTotal}</Text>
                        <Text style={styles.lowerCenteredSectionText}>TOTAL OBAT</Text>
                    </View>
                    <View style={styles.centeredSection}>
                        <Text style={styles.upperCenteredSectionText}>{skippedDrugs.length}</Text>
                        <Text style={styles.lowerCenteredSectionText}>TERLEWAT</Text>
                    </View>
                    <View style={styles.centeredSection}>
                        <Text style={styles.upperCenteredSectionText}>{consumedDrugs.length}</Text>
                        <Text style={styles.lowerCenteredSectionText}>TERMINUM</Text>
                    </View>
                </View>

                {/* Calendar */}
                <View style={styles.calendarContainer}>
                    <Calendar onDateSelected={setDate}/>
                </View>

                {/* Bottom Container */}
                {drugReminders.length > 0 ?
                    <DataTable style={styles.bottomContainer}>
                        {drugReminders.map((el, index) => {
                            let { statusChangedAt, status, alarmTime } = el

                            const datedAlarmTime = new Date(alarmTime)
                            const hours = datedAlarmTime.getHours()
                            const minutes = datedAlarmTime.getMinutes()
                            const displayTime = `${withZero(hours)}:${withZero(minutes)}`

                            return (
                                <View key={index}>
                                    <DataTable.Row style={{borderBottomWidth: 0 }}>
                                        <DataTable.Cell style={{justifyContent: 'center', flex: 0.3}}><FontAwesome name="circle" size={10} color="#B5B5B5" /></DataTable.Cell>
                                        <DataTable.Cell><Text style={{color: 'rgba(221, 221, 221, 1)'}}>{displayTime}</Text></DataTable.Cell>
                                    </DataTable.Row>
                                    <DataTable.Row style={{borderBottomWidth: 0}}>
                                        <DataTable.Cell style={{justifyContent: 'center', flex: 0.3}}><VerticalLine/></DataTable.Cell>
                                        <DataTable.Cell style={styles.statusContainer}>
                                            {status === null ?
                                                <Text style={{color: 'white'}}>-</Text> :
                                                status ? 
                                                    <Text style={{color: 'green'}}>DIMINUM</Text> :
                                                    <Text style={{color: 'red'}}>TERLEWAT</Text> 
                                            }
                                        </DataTable.Cell>
                                    </DataTable.Row>
                                </View>
                            )
                        })}
                    </DataTable> :
                    <View style={styles.noDataContainer}>
                        <Text style={styles.inputText}>Tidak ada data</Text>
                    </View>
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(31, 31, 31, 1)',
    },

    topContainer: {
        flexDirection: "row",
        paddingVertical: 20,
        alignItems: "center",
        marginHorizontal: 20
    },

    imageContainer: {
        height: 150,
        width: 150,
    },

    centeredSection: {
        alignItems: "center",
    },

    topDetailContainer: {
        flex: 1,
        flexDirection: "row",
        marginHorizontal: 20,
        justifyContent: "space-between",
    },

    upperCenteredSectionText: {
        color: 'rgba(221, 221, 221, 1)',
        fontSize: 13,
        fontWeight: '300'
    },

    lowerCenteredSectionText: {
        color: 'rgba(221, 221, 221, 1)',
        fontSize: 13,
        fontWeight: '300',
        marginTop: 5
    },

    bottomDetailText: {
        color: 'rgba(221, 221, 221, 1)',
        fontSize: 14,
        fontWeight: '500'
    },

    upperMiddleContainer: {
        marginHorizontal: 20

    },
    
    inputText: {
        color: "rgba(221, 221, 221, 1)",
        paddingVertical: 5,
    },

    drugNameText: {
        color: 'rgba(221, 221, 221, 1)',
        fontSize: 20,
        fontWeight: '500'
    },

    drugDescriptionText: {
        color: 'rgba(181, 181, 181, 1)',
        fontSize: 18,
        fontWeight: '400'
    },

    noDrugDescriptionText: {
        color: 'grey',
        fontSize: 18,
        fontWeight: '400'
    },

    notesContainer: {
        height: 80,
        borderWidth: 1,
        borderColor: 'rgba(71, 71, 71, 1)',
        paddingHorizontal: 20,
        borderRadius: 3,
    },

    drugStatusDetailContainer: {
        flexDirection: "row",
        alignSelf: 'stretch',
        paddingVertical: 20,
        marginTop: 20,
        backgroundColor: '#2F2F2F',
        justifyContent: "space-evenly"
    },

    calendarContainer: {
        alignItems: "center"
    },

    bottomContainer: {
        width: dimWidth * 0.5,
        marginTop: 10,
    },

    eachDrugStatusContainer: {
        flexDirection: "row",
        alignItems: "center",
    },

    icon: {
        alignItems: "center",
        backgroundColor: 'yellow',
    },

    statusContainer: {
        width: 500,
    },

    status: {
        paddingLeft: 7,
        backgroundColor: 'red',
    },

    noDataContainer: {
        alignItems: "center",
        justifyContent: 'center',
        marginTop: 20,
    }
})

const mapStateToProps = state => {
    return state
}

const mapDispatchToProps = {
    changeDrugNotes,
    deleteDrugImageUrl,
}

export default connect(mapStateToProps, mapDispatchToProps)(DrugDetail)