import React from 'react'
import { View, Text, Image, StyleSheet, ImageBackground, TouchableOpacity} from 'react-native'
import { connect } from 'react-redux';
import QRCode from 'react-native-qrcode-svg'
import Icon from 'react-native-vector-icons/Ionicons';
import ArrowBack from '../../../assets/svg/ArrowBack'
// import { TouchableOpacity } from 'react-native-gesture-handler';
// import navigation from '../../../navigation';


const mapStateToProps = state => {
  return state
}

const ScanQR = (props) => {
  // console.log(props, ' - ini props')
  return (
    <>
    <ImageBackground source={require('../../../assets/png/Background-Pattern.png')} style={{height:85}}>
      <View style={{marginTop:30, flex:1, flexDirection:'row', alignItems:'center', }}>
        <TouchableOpacity
          onPress = {() => props.navigation.navigate('Home')}>
          <View style={{flexDirection:'row',}} >
            <ArrowBack />
            <Text style={{fontSize: 20, color:'#ffff', fontWeight:'bold',  position:'relative',}}>Back</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ImageBackground>
    <View style={styles.container}>
      <QRCode
        size={200}
        value={JSON.stringify({
          flag: 'medqcare',
          data: 'ini datanya yang dikirim'
        })} />
      <Text style={styles.textQR}>Your QR</Text>
    </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: "100%"
  },
  textQR:{
    fontWeight:"bold",
    fontSize:20,
    marginTop:'10%'
  }
})
export default connect(mapStateToProps)(ScanQR)