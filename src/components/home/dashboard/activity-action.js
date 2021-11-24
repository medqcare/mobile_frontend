import React from 'react'
import { Image ,View, Text ,StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import ActiveCard from '../../../assets/svg/home-blue/activecard-blue'
import MedicalStats from '../../../assets/svg/home-blue/medicalstats-blue'


const ActivityAction = ({ navigation, data }) => {
return (

    <View style={style.container}>
      <View style={{flexDirection:'row',alignItems:'center',alignContent:'center',justifyContent:'space-between',width:'100%',marginBottom:40}}>
        
       <View style={{flexDirection:'column',height:60,justifyContent:'space-between'}}>
           <Image style={style.Image}source={require('../../../assets/png/ic_statusNav.png')} style={{width: 55, height: 55}} />
           <Text style={{marginTop:10,textAlign:'center',color:'white',fontSize:13}}> Biaya </Text>
       </View>

       <View style={{flexDirection:'column',height:60,justifyContent:'space-between'}}>
          <Image style={style.Image}source={require('../../../assets/png/ic_riwayatNav.png')} style={{width: 55, height: 55}} />
          <Text style={{marginTop:10,textAlign:'center', color:'white',fontSize:13}}>Riwayat </Text>
       </View>

       <View style={{flexDirection:'column',height:60,justifyContent:'space-between'}}>
          <Image style={style.Image}source={require('../../../assets/png/ic_biayaNav.png')} style={{width: 55, height: 55}} />
          <Text style={{ marginTop:10,textAlign:'center',color:'white',fontSize:13}}> Penunjang </Text>
       </View>

       <View style={{flexDirection:'column',height:60,justifyContent:'space-between'}}>
          <Image style={style.Image}source={require('../../../assets/png/ic_rujukanNav.png')} style={{width: 55, height: 55}} />
          <Text style={{marginTop:10, textAlign:'center', color:'white',fontSize:13}}> Rujukan </Text>
       </View>

      </View>

      <View style={{flexDirection:'row',alignItems:'center',alignContent:'center',justifyContent:'space-between',width:'100%',marginBottom:5}}>
      
      <TouchableOpacity onPress={() => data ? navigation.navigate('Allergy') : navigation.navigate('Sign')}>
         <View style={{flexDirection:'column',height:60,justifyContent:'space-between'}}>
            <Image style={style.Image}source={require('../../../assets/png/ic_alergiNav.png')} style={{width: 55, height: 55}} />
            <Text style={{ marginTop:10, textAlign:'center',color:'white',fontSize:13}}> Alergi</Text>
         </View>
      </TouchableOpacity>

      <View style={{flexDirection:'column',height:60,justifyContent:'space-between'}}>
         <Image style={style.Image}source={require('../../../assets/png/ic_examNav.png')} style={{width: 55, height: 55}} />
         <Text style={{ marginTop:10, textAlign:'center',color:'white',fontSize:13}}> Reminder </Text>
      </View>

      <View style={{flexDirection:'column',height:60,justifyContent:'space-between'}}>
         <Image style={style.Image}source={require('../../../assets/png/ic_resepNav.png')} style={{width: 55, height: 55}} />
         <Text style={{ marginTop:10,textAlign:'center',color:'white',fontSize:13}}> Resep </Text>
      </View>

      <TouchableOpacity onPress={() => {
         // navigation.navigate('Home')
         // navigation.navigate('Loading', { date: new Date(), data: 'Filter' })
      }}
         >
      <View style={{flexDirection:'column',height:60,justifyContent:'space-between'}}>
         <Image style={style.Image}source={require('../../../assets/png/ic_dokterNav.png')} style={{width: 55, height: 55}} />
        <View style={{width:50, alignItems:'center',justifyContent:'center'}}>
         <Text style={{ marginTop:10, textAlign:'center',color:'white',fontSize:13}}> Home Care </Text>
        </View>
      </View>
      </TouchableOpacity>

     </View>
    </View>

    
    )
}

const heightDim = Dimensions.get('screen').height
const style = StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexWrap:'wrap',
      marginBottom: 45,
      marginTop: -60,
      marginHorizontal: 5
    }
})

export default ActivityAction