import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  BackHandler,
  FlatList,
  RefreshControl,
} from 'react-native';

import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage'
import ListSchedule from '../../../components/profile/medSchedule/listSchedule';
import Icon from 'react-native-vector-icons/Ionicons';
import ArrowBack from '../../../assets/svg/ArrowBack'
  

const schedule = (props) => {
    const [schedule, setSchedule] = useState(null)
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true)
        getStorage()
        setRefreshing(false)
    }, [refreshing]);

    useEffect(() => {
        getStorage()
    }, [])
    
    async function getStorage() {
        let temp = await AsyncStorage.getItem('ScheduleObat')
        console.log(temp, 'ini temp')
        if (temp) {
            setSchedule(JSON.parse(temp))
        }
    }
    
    BackHandler.addEventListener('hardwareBackPress', () => {
        return (props.navigation.navigate('Setting'))
    })

    return (
        <View style={viewStyle.container}>
            <ImageBackground source={require('../../../assets/png/Background-Pattern.png')} style={{ height: 85, }}>
                <View style={{ flex: 1, marginTop: 32, flexDirection: 'row', alignItems: 'center', }}>
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate('Setting')}>
                        <View style={{ flexDirection: 'row', }} >
                            <ArrowBack />
                            <Text style={{ fontSize: 20, color: '#ffff', fontWeight: 'bold', position: 'relative', }}>Medication Schedule</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
            {schedule && schedule.length ? <View style={{ flex: 1 }}>
                <FlatList
                    data={schedule}
                    keyExtractor={(item, index) => index + ''}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                    renderItem={({item, index}) => {
                        return (
                            <ListSchedule data={item} navigation={props.navigation} idx={index} />
                        )
                    }} />
            </View> : <View style={viewStyle.empty}>
                    <Text>No Schedule</Text>
                </View>}
            <View style={viewStyle.add}>
                <TouchableOpacity style={viewStyle.button}
                    onPress={() => props.navigation.navigate('addSchedule')}>
                    <Text style={textStyle.add}> + </Text>
                </TouchableOpacity>
            </View>
        </View>
  );
};

const viewStyle = StyleSheet.create({
    container: {
        backgroundColor: '#EEEEEE',
        flex: 1,
    },
    empty: {
        flex: 1,
        alignItems: 'center',
        padding: 20
    },
    add: {
        padding: 10,
    },
    button: {
        width: '100%',
        height: 50,
        padding: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 6,
        backgroundColor: '#3AD584',
        borderColor: '#18A85D',
        justifyContent: 'center',
    }
})
const textStyle = StyleSheet.create({
  add: {
    color: '#FFF',
    fontSize: 18,
  },
});

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(schedule)
