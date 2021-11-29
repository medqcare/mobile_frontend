import React from 'react'
import { Image ,View, Text ,StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import ActiveCard from '../../../assets/svg/home-blue/activecard-blue'
import MedicalStats from '../../../assets/svg/home-blue/medicalstats-blue'


const ActivityAction = ({ navigation, data }) => {
return (

    <View style={style.container}>
      <View style={style.rowContent}>
        
       <TouchableOpacity style={style.content} onPress={() => navigation.navigate('Tagihan')}>
           <Image style={style.image}source={require('../../../assets/png/ic_statusNav.png')}/>
           <Text style={{marginTop:10,textAlign:'center',color:'white',fontSize:13}}> Tagihan </Text>
       </TouchableOpacity>

       <TouchableOpacity style={style.content} onPress={() => navigation.navigate('RiwayatStack')}>
          <Image style={style.image}source={require('../../../assets/png/ic_riwayatNav.png')}/>
          <Text style={{marginTop:10,textAlign:'center', color:'white',fontSize:13}}>Riwayat </Text>
       </TouchableOpacity>

       <TouchableOpacity style={style.content}>
         <Image style={style.image}source={require('../../../assets/png/ic_biayaNav.png')}/>
        <View style={{width:60, alignItems:'center',justifyContent:'center'}}>
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
         <Image style={style.image}source={require('../../../assets/png/ic_examNav.png')}/>
         <Text style={{ marginTop:10, textAlign:'center',color:'white',fontSize:13}}> Reminder </Text>
      </TouchableOpacity>

      <TouchableOpacity style={style.content}>
         <Image style={style.image}source={require('../../../assets/png/ic_resepNav.png')}/>
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
      marginTop: -60,
      marginHorizontal: -20
    },
    rowContent: {
      flexDirection:'row',
      alignItems:'center',
      alignContent:'center',
      justifyContent:'space-between',
      width:'100%',
      marginBottom:10
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