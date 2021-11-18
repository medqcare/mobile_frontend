import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, ImageBackground, TouchableOpacity, FlatList, BackHandler } from 'react-native'
import { connect } from 'react-redux';

import Icon from 'react-native-vector-icons/Ionicons'
import IconAD from 'react-native-vector-icons/AntDesign'
import ArrowBack from '../../../assets/svg/ArrowBack'
import {addDoctorFavorite} from '../../../stores/action';
import ListFav from '../activity/ListFav'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Favourite = (props) => {
    // console.log(props, 'situ liat props nya ga ?')
    const [favorit, setfavorit] = useState(props.userData.doctorFavorites)
    
    BackHandler.addEventListener('hardwareBackPress', () => {
        return (props.navigation.navigate('Home'))
    })

    useEffect(() => {
        setfavorit(props.userData.doctorFavorites)
    },[props.userData])

    const deleteFromFavorite = async (id) => {
        const newData = favorit.filter(el => el._id !== id)
        const dataSend = {...props.userData, doctorFavorites: newData}
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
    
    console.log(favorit.length, 'fap')
    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../../assets/background/RectangleHeader.png')} style={{ height: 100, }}>
                <View style={{ flex: 1, marginTop: 32, flexDirection: 'row', alignItems: 'center', }}>
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate('Home')}>
                        <View style={{ flexDirection: 'row', }} >
                            <ArrowBack />
                            <Text style={{ fontSize: 20, color: '#ffff', position: 'relative', }}>Dokter Favorit</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
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
                        <Text style={{color: '#DDDDDD'}}>tidak ada dokter favorite</Text>
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