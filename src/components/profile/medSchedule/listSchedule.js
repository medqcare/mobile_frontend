import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Switch
} from 'react-native'

import { connect } from 'react-redux'
import createLocal from '../../../worker/createLocalOnly'
import stop from '../../../helpers/notifStopper'
import IconFA5 from 'react-native-vector-icons/FontAwesome5'
import AsyncStorage from '@react-native-async-storage/async-storage'

const ListSchedule = (props) => {
    var data = props.data
    console.log(data, "INI DATA DARI LIST SCHEDULE");
    const [isEnabled, setIsEnabled] = useState(data.notif);
    const toggleSwitch = async () => {
        setIsEnabled(previousState => !previousState)
        if (!isEnabled) {
            console.log('masuk karena benar');
            let schedule = await AsyncStorage.getItem('ScheduleObat')
            let newSchedule = []
            newSchedule = JSON.parse(schedule)
            data.notif = true
            newSchedule.push(data)
            deleteSchedule(newSchedule)
            createLocal(data)
        } else {
            console.log('masuk karena salah');
            let schedule = await AsyncStorage.getItem('ScheduleObat')
            let newSchedule = []
            newSchedule = JSON.parse(schedule)
            data.notif = false
            newSchedule.push(data)
            stop(data)
            deleteSchedule(newSchedule)
        }

    }

    async function deleteSchedule(params) {

        var filtered = params.filter(function (value, index1, arr) { return index1 !== props.idx; })
        console.log(data)
        console.log('---------------')
        console.log(filtered)
        try {
            console.log('masuk try')
            await AsyncStorage.setItem('ScheduleObat', JSON.stringify(filtered))
            console.log(await AsyncStorage.getItem('ScheduleObat'))
        } catch (error) {
            console.log(error)
            ToastAndroid.show('Error save data schedule', ToastAndroid.LONG)
        }
    }
    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.8}
            onPress={() => {
                props.navigation.navigate('detailSchedule', { scheduleDrug: data, index: props.idx })
            }}>
            <View style={styles.detailSchedule}>
                <View style={styles.drug}>
                    <View style={{
                        width: 60,
                        height: '100%',
                        backgroundColor: '#FFF',
                        overflow: 'hidden',
                        padding: 5,
                        borderTopLeftRadius: 3,
                        alignItems: 'center'
                    }}>
                        <IconFA5 name={'capsules'} size={20} />
                    </View>
                    <View style={styles.medicineDetail}>
                        <Text style={textStyle.drugName}>{data.drugName.toUpperCase()}</Text>
                        <Text style={textStyle.dose}>Dose : {data.dose}</Text>
                    </View>
                    <Switch
                        trackColor={{ false: "#767577", true: "#f4f3f4" }}
                        thumbColor={isEnabled ? "#3AD584" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>
                <View style={styles.drug}>
                    <View style={{
                        height: '100%',
                        width: 60,
                        backgroundColor: '#FFF',
                        overflow: 'hidden',
                        padding: 5,
                        alignItems: 'center'
                    }}>
                        <IconFA5 name={'info-circle'} size={20} />
                    </View>
                    <View style={styles.medicineDetail}>
                        <Text style={textStyle.drugName}>Instruction </Text>
                        <Text style={textStyle.dose}>{data.otherInstruction}</Text>
                    </View>
                </View>
                <View style={styles.drug}>
                    <View style={{
                        height: '100%',
                        width: 60,
                        backgroundColor: '#FFF',
                        overflow: 'hidden',
                        paddingVertical: 5,
                        borderBottomLeftRadius: 6,
                        alignItems: 'center'
                    }}>
                        <IconFA5 name={'clock'} size={20} />
                    </View>
                    <View style={styles.medicineDetail}>
                        <Text style={textStyle.drugName}>{data.schedule.length} Times/day</Text>
                        <View style={{flexDirection: 'row'}}>
                            {data.schedule.map((el, idx) => {
                                return (
                                    <View style={styles.listTime} key={idx}>
                                        <Text style={textStyle.clock}>{String(el.jam).length == 1 ? "0"+el.jam : el.jam} : {String(el.menit).length == 1 ? "0"+el.menit : el.menit}</Text>
                                    </View>
                                )
                            })}
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        minHeight: 200,
        flexDirection: 'row',
        backgroundColor: '#EEEEEE',
        padding: 10,
    },
    listTime: {
        backgroundColor: 'rgba(238,238,238, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginRight: 5,
        marginTop: 5,
        borderRadius: 3,
    },
    detailSchedule: {
        flex: 5,
        borderTopLeftRadius: 3,
        borderBottomLeftRadius: 6,
        borderTopRightRadius: 6,
        borderBottomRightRadius: 3,
        backgroundColor: '#44E28B',
    },
    drug: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    medicineDetail: {
        flex: 5,
        paddingHorizontal: 5
    },

    drugName: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        flexDirection: 'row'
    },
})

const textStyle = StyleSheet.create({
    clock: {
        color: '#FFF',
    },
    drugName: {
        fontSize: 16,
        color: '#FFF',
        fontWeight: 'bold',
    },
    dose: {
        fontSize: 14,
        color: '#EEE',
    },
})

const mapStateToProps = state => {
    return state
}

const mapDispatchToProps = {

}
export default connect(mapStateToProps, mapDispatchToProps)(ListSchedule)
