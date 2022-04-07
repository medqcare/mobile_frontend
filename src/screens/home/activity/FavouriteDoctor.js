import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, ImageBackground, TouchableOpacity, FlatList, BackHandler } from 'react-native'
import { connect } from 'react-redux';
import Header from '../../../components/headers/GradientHeader'

import Icon from 'react-native-vector-icons/Ionicons'
import IconAD from 'react-native-vector-icons/AntDesign'
import ArrowBack from '../../../assets/svg/ArrowBack'
import {addDoctorFavorite} from '../../../stores/action';
import ListFav from '../activity/ListFav'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Favourite = (props) => {
    // console.log(props, 'situ liat props nya ga ?')
    const { userData, isLoading, errror } = props.userDataReducer
    const [favorit, setfavorit] = useState(userData.doctorFavorites)
    
    BackHandler.addEventListener('hardwareBackPress', () => {
        return (props.navigation.navigate('Home'))
    })

    useEffect(() => {
        setfavorit(userData.doctorFavorites)
    },[userData])

    const deleteFromFavorite = async (id) => {
        const newData = favorit.filter(el => el._id !== id)
        const dataSend = {...userData, doctorFavorites: newData}
        props.addDoctorFavorite(dataSend)
        try {
            await AsyncStorage.setItem(
                'doctorFavorite',
                JSON.stringify(newData),
            );
        } catch (err) {
            console.log('err');
        }
        setfavorit(newData)
    }
    
    return (
        <View style={styles.container}>
            <Header title={'Dokter Favorit'} navigate={props.navigation.navigate}/>
            {favorit.length > 0 ?
                <FlatList
                data={favorit}
                keyExtractor={item => item._id + ''}
                renderItem={({ item }) => (
                    // <Text>{JSON.stringify(item, null, 2)}</Text>
                        <ListFav data={item} navigation={props.navigation} deleteFav={deleteFromFavorite} />
                    )}
                />
                :
                (
                    <View style={{ width: '100%', alignItems: 'center', padding: 20 }}>
                        <Text style={{color: '#DDDDDD'}}>Tidak ada dokter favorit</Text>
                    </View>
                )
            }
            {
        
      }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1F1F1F'
    }
})

const mapStateToProps = state => {
    return state;
};
const mapDispatchToProps = {
    addDoctorFavorite,
  };

export default connect(mapStateToProps, mapDispatchToProps)(Favourite)