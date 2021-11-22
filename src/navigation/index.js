import React from 'react'
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs"
import { TouchableOpacity, Text, Image, View } from 'react-native'
import HomeStack from './home'
import LoadingStack from './switchNavigation'

const TabNavigator = createBottomTabNavigator({
  Home: {
    screen: HomeStack,
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor, focused }) => {
        return (<TouchableOpacity onPress={() => {
          navigation.navigate('Home', { date: new Date() })
        }} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Image source={ focused ? require('../assets/png/ic_home.png'): require('../assets/png/ic_home_inactive.png') } color={tintColor} style={{width: 18, height: 20}} />
          <Text  style={{ color: tintColor, fontSize: 12, marginTop: 5 }}>Home</Text>
        </TouchableOpacity>)

      }
    })
  },
  Card: {
    screen: LoadingStack,
    navigationOptions: ({ navigation, userData }) => ({
      tabBarIcon: ({ tintColor , focused}) => {
        return (
          <TouchableOpacity onPress={() => {
            userData ? navigation.navigate('Loading', { date: new Date(), data: 'CardStack' }) : navigation.navigate('Sign', {navigateTo: 'CardStack'})
            // navigation.navigate('Home')navigation.navigate('Loading', { date: new Date(), data: 'CardStack' })
          }} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            
            <Image source={focused ?  require('../assets/png/ic_kartu.png'): require('../assets/png/ic_kartu_inactive.png') } style={{width: 18, height: 20}} />
            <Text style={{ color: tintColor, fontSize: 12, marginTop: 5 }}>Kartu</Text>
          </TouchableOpacity>
        )
      },
      tabBarLabel: ({ tintColor }) => <TouchableOpacity onPress={() => navigation.navigate('Loading', { data: 'CardStack', date: new Date() })} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><Text>Card</Text></TouchableOpacity>
    })
  },
  // Activity: {
  //   screen: LoadingStack,
  //   navigationOptions: ({ navigation }) => ({
  //     tabBarIcon: ({ tintColor , focused}) => {
  //       // return <Ionicons name="ios-analytics" size={30} color={tintColor} />
  //       return (
  //         <TouchableOpacity onPress={() => {
  //           navigation.navigate('Home')
  //           navigation.navigate('Loading', { date: new Date(), data: 'ActivityStack' })
  //         }} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            
  //         <Image source={ focused ?  require('../assets/png/ic_chat.png') : require('../assets/png/ic_chat_inactive.png')} style={{width: 18, height: 20}} />
  //           <Text style={{  color: tintColor, fontSize: 12, marginTop: 5 }}>Activity</Text>
  //         </TouchableOpacity>
  //       )
  //     },
  //     tabBarLabel: ({ tintColor }) => <TouchableOpacity onPress={() => navigation.navigate('Loading', { date: new Date(), data: 'ActivityStack' })} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><Text>Activity</Text></TouchableOpacity>
  //   })
  // },
  Activity: {
    screen: LoadingStack,
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor , focused}) => {
        // return <Ionicons name="ios-analytics" size={30} color={tintColor} />
        return (
          <TouchableOpacity onPress={() => {
            navigation.navigate('Home')
            // navigation.navigate('Loading', { date: new Date(), data: 'ActivityStack' })
            navigation.navigate('Loading', { date: new Date(), data: 'Undefined' })
          }} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            
          <Image source={ focused ?  require('../assets/png/ic_chat.png') : require('../assets/png/ic_chat_inactive.png')} style={{width: 18, height: 20}} />
            <Text style={{  color: tintColor, fontSize: 12, marginTop: 5 }}>Chat</Text>
          </TouchableOpacity>
        )
      },
      tabBarLabel: ({ tintColor }) => <TouchableOpacity onPress={() => navigation.navigate('Loading', { date: new Date(), data: 'ActivityStack' })} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><Text>Activity</Text></TouchableOpacity>
    })
  },
  // Profile: {
  //   screen: LoadingStack,
  //   navigationOptions: ({ navigation }) => ({
  //     tabBarIcon: ({ tintColor , focused}) => {
  //       // return <Ionicons name="ios-baseball" size={30} color={tintColor} />
  //       return (
  //         <TouchableOpacity onPress={() => {
  //           navigation.navigate('Home')
  //           // navigation.navigate('Loading', { date: new Date(), data: 'ProfileStack' })
  //           navigation.navigate('Loading', { date: new Date(), data: 'Undefined' })
  //         }} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            
  //           <Image source={ focused ? require('../assets/png/ic_pengingat.png') : require('../assets/png/ic_pengingat_inactive.png') } style={{width: 18, height: 20}} />
  //           <Text style={{ color: tintColor, fontSize: 12, marginTop: 5 }}>Pengingat</Text>
  //         </TouchableOpacity>
  //       )
  //     },

  //     // tabBarVisible: false,

  //     tabBarLabel: ({ tintColor }) => <TouchableOpacity onPress={() => navigation.navigate('Loading', { date: new Date(), data: 'ProfileStack' })} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><Text>Pengingat</Text></TouchableOpacity>
  //   })
  // }
}, {
  tabBarOptions: {

    showIcon: true,
    activeTintColor: '#FBB632',
    inactiveTintColor: '#777777',
    style: {
      height:60,
      paddingTop: 2,
      backgroundColor: '#262626',
    },
    labelStyle: {
      fontSize: 12
    },
    showLabel: false
  },
  initialRouteName: "Home",
})


export default createAppContainer(TabNavigator)