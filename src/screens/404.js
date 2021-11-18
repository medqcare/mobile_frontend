import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

const registerHospital = ({navigation}) => {
  return (
    <LinearGradient
      useAngle={true}
      angle={170}
      locations={[0.04, 1]}
      colors={['#243555', '#00514B']}
      style={{width: '100%', height: '80%', flex: 1}}>
      <View
        style={{
          height: '70%',
          marginTop: '50%',
          marginBottom: '10%',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Image
          style={{height: 200, width: 200}}
          source={require('../assets/png/UnderConstruction.png')}
        />
        <TouchableOpacity style={{width: '50%'}}
          onPress={() => navigation.pop()}
        >
          <View
            style={{
              height: 40,
              padding: 10,
              alignItems: 'center',
              borderColor: '#1FC6BC',
              borderWidth: 1,
              borderRadius: 20,
            }}>
            <Text style={{color: '#00FFEC'}}>Kembali</Text>
          </View>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: '#f4f4f4',
    minHeight: '100%',
    alignItems: 'center',
  },
});

export default registerHospital;
