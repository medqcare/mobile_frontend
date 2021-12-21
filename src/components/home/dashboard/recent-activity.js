import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native';
import { FlatList } from 'react-navigation';
// import { connect } from 'react-redux';
import ActiveCard from '../../../assets/svg/home-blue/activecard-blue'
import MedicalStats from '../../../assets/svg/home-blue/medicalstats-blue'

// const mapStateToProps = state => ({
//   isLoading: state.isLoading
// })

// function t({ navigation }) {
// console.log(navigation,'ini navigationnya')
const RecentActivity = ({ navigation }) => {
  return (
    <View style={{ flexDirection: 'row', marginTop: 10 }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={[style.container],{marginRight: 10}}>
        <View style={style.borderIcon}>
          <TouchableOpacity style={style.clickArea}
            onPress={() => navigation.navigate('Appointment')}>
            <Image source={require('../../../assets/png/ic_aplist.png')} style={{width: 25, height: 25}} />
            <Text style={{fontSize:12, color:'#DDDDDD', marginTop: 8, textAlign: 'center' }}>Appointment</Text>
          </TouchableOpacity>
      </View>
      </View>

      <View style={[style.container],{marginRight: 10}}>
        <View style={style.borderIcon}>
          <TouchableOpacity style={style.clickArea} onPress={() => { navigation.navigate('ActivityStack') }}>
          <Image source={require('../../../assets/png/ic_antrian.png')} style={{width: 25, height: 25}} />
            <Text style={{ fontSize:12, color:'#DDDDDD', marginTop: 8, textAlign: 'center' }}>Antrian</Text>
          </TouchableOpacity>
      </View>
      </View>

      <View style={[style.container],{marginRight: 10}}>
        <View style={style.borderIcon}>
          <TouchableOpacity style={style.clickArea} onPress={() => { navigation.navigate('MedicalStats', {goback : 'Home'}) }}>
          <Image source={require('../../../assets/png/Medical.png')} style={{width: 26, height: 26}} />
            <Text style={{ fontSize:12, color:'#DDDDDD', marginTop: 8, textAlign: 'center' }}>Resume Medis</Text>
          </TouchableOpacity>
        </View>
      </View>
      </ScrollView>
      </View>
  )
}

const style = StyleSheet.create({
  container: {
    shadowOffset: {
      width: 4,
      height: 2,
    },
    borderRadius: 2,
    shadowOpacity: 0.21,
    shadowRadius: 9.11,
    elevation: 10,
  },
 
  borderIcon: {
    height: '75%',
    width: 110,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    paddingVertical: 15,
    backgroundColor: '#2F2F2F'
  },
  clickArea: {
    // backgroundColor: 'red',
    padding: '13%',
    alignItems: 'center',
  }
})

// module.exports = connect(mapStateToProps)(t);
export default RecentActivity