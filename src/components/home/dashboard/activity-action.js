import React from 'react'
import { Image ,View, Text ,StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import ActiveCard from '../../../assets/svg/home-blue/activecard-blue'
import MedicalStats from '../../../assets/svg/home-blue/medicalstats-blue'


const ActivityAction = ({ navigation, data }) => {
return (

    <View style={style.container}>
      <View style={style.rowContent}>
        
       <TouchableOpacity style={style.content} onPress={() => data ? navigation.navigate('Tagihan') : navigation.navigate('Sign')}>
           <Image style={style.image}source={require('../../../assets/png/ic_biayaNav.png')}/>
           <Text style={{marginTop:10,textAlign:'center',color:'white',fontSize:13}}> Tagihan </Text>
       </TouchableOpacity>

       <TouchableOpacity style={style.content} onPress={() => data ? navigation.navigate('RiwayatStack') : navigation.navigate('Sign')}>
          <Image style={style.image}source={require('../../../assets/png/ic_riwayatNav.png')}/>
          <Text style={{marginTop:10,textAlign:'center', color:'white',fontSize:13}}>Riwayat </Text>
       </TouchableOpacity>

       <TouchableOpacity style={style.content}>
         <Image style={style.image}source={require('../../../assets/png/ic_statusNav.png')}/>
        <View style={{width:75, alignItems:'center',justifyContent:'center'}}>
         <Text style={{ marginTop:10, textAlign:'center',color:'white',fontSize:13}}> Dokumen Medis </Text>
        </View>
      </TouchableOpacity>

       <TouchableOpacity style={style.content}>
          <Image style={style.image}source={require('../../../assets/png/ic_rujukanNav.png')}/>
          <Text style={{marginTop:10, textAlign:'center', color:'white',fontSize:13}}> Rujukan </Text>
       </TouchableOpacity>

      </View>

      <View style={style.rowContent}>
      
      <TouchableOpacity style={style.content} onPress={() => data ? navigation.navigate('Allergy') : navigation.navigate('Sign')}>
            <Image style={style.image}source={require('../../../assets/png/ic_alergiNav.png')}/>
            <Text style={{ marginTop:10, textAlign:'center',color:'white',fontSize:13}}> Alergi</Text>
      </TouchableOpacity>

      <TouchableOpacity style={style.content}>
         <Image style={style.image}source={require('../../../assets/png/Reminder.png')}/>
         <Text style={{ marginTop:10, textAlign:'center',color:'white',fontSize:13}}> Reminder </Text>
      </TouchableOpacity>

      <TouchableOpacity style={style.content}>
         <Image style={style.image}source={require('../../../assets/png/Resep.png')}/>
         <Text style={{ marginTop:10,textAlign:'center',color:'white',fontSize:13}}> Resep </Text>
      </TouchableOpacity>

      <TouchableOpacity style={style.content} onPress={() => {}}>
         <Image style={style.image}source={require('../../../assets/png/ic_dokterNav.png')}/>
        <View style={{width:70, alignItems:'center',justifyContent:'center'}}>
         <Text style={{ marginTop:10, textAlign:'center',color:'white',fontSize:13}}> Home Care </Text>
        </View>
      </TouchableOpacity>

     </View>
    </View>

    
    )
}

const heightDim = Dimensions.get('screen').height
const style = StyleSheet.create({
    container: {
      marginTop: -heightDim * 0.06,
      marginHorizontal: -20
    },
    rowContent: {
      flexDirection:'row',
      alignItems:'center',
      alignContent:'center',
      justifyContent:'space-between',
      width:'100%',
      // marginBottom:5
    },
    content: {
      flexDirection:'column',
      height: 100,
      width: '25%',
      alignItems: 'center',
    },
    image: {
      height: 50,
      width: 50
    }
})

export default ActivityAction