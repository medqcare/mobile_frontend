import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  BackHandler,
  Image
} from 'react-native';
import { connect, useDispatch } from 'react-redux';

import ProfileInfo from '../../components/profile/dashboard/profile-info';

import { logout, deleteUserData } from '../../stores/action';
import { SafeAreaView } from 'react-navigation';
import GreyHeader from '../../components/headers/GreyHeader';
import LightHeader from '../../components/headers/LightHeader';
import ToggleSwitch from 'toggle-switch-react-native'
import { setDarkMode } from '../../stores/action';

const mapDispatchToProps = {
  logout,
  deleteUserData
};

const mapStateToProps = (state) => {
  return state;
};

const profile = (props) => {
  const dispatch = useDispatch()
  const { userData, isLoading, error, darkMode } = props.userDataReducer
  const { email } = userData.userID;
  const [loadToggle, setLoadToggle] = useState(false)

  BackHandler.addEventListener('hardwareBackPress', () => {
    props.navigation.navigate('Home');
    return true;
  });

  const logoutButton = async () => {
    props.logout(props.navigation);
    props.deleteUserData(props.navigation)
  };

  const onVerifyPasswordSuccessful = () => {
    props.navigation.navigate('ChangePasswordForm', {
      email,
      destination: 'ProfileStack',
    });
  };

  const switchToogle = () => {
    darkMode ? dispatch(setDarkMode(false)) : dispatch(setDarkMode(true))
  }

  return (
    <SafeAreaView style={styles.container}>
      {
        darkMode ? (
          <GreyHeader
            navigate={props.navigation.navigate}
            navigateTo={'Home'}
            title="Profil Saya"
          />
        ) : (
          <LightHeader 
            navigate={props.navigation.navigate}
            navigateTo={'Home'}
            title="Profil Saya"
          />
        )
      }
      
      <ProfileInfo navigation={props.navigation} destination="ProfileStack" data={userData} darkMode={darkMode}/>
      <View style={darkMode ? styles.body : styles.bodyLight}>
        <View style={styles.menu}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('ProfileDetail')}
            style={darkMode ? styles.upperMenu : styles.upperMenuLight}
          >
            <Text style={darkMode ? styles.menuText : styles.menuTextLight}>Profil Saya</Text>
            {
              darkMode ? 
              <Image source={require('../../assets/png/ArrowMenu.png')} /> :
              <Image source={require('../../assets/png/ArrowMenuLight.png')} />
            }
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('AddFamily')}
            style={darkMode ? styles.upperMenu : styles.upperMenuLight}
          >
            <Text style={darkMode ? styles.menuText : styles.menuTextLight}>Daftar Keluarga</Text>
            {
              darkMode ? 
              <Image source={require('../../assets/png/ArrowMenu.png')} /> :
              <Image source={require('../../assets/png/ArrowMenuLight.png')} />
            }
          </TouchableOpacity>
          {/* <TouchableOpacity
              style={styles.upperMenu}
              >
              <Text style={darkMode ? styles.menuText : styles.menuTextLight}>Aktifitas</Text>
              <Image
                  source={require('../../assets/png/ArrowMenu.png')}
              />
          </TouchableOpacity>
          <TouchableOpacity
              style={styles.upperMenu}
            >
              <Text style={darkMode ? styles.menuText : styles.menuTextLight}>Transaksi</Text>
              <Image
                  source={require('../../assets/png/ArrowMenu.png')}
              />        
          </TouchableOpacity> */}
          <TouchableOpacity
            style={darkMode ? styles.upperMenu : styles.upperMenuLight}
            onPress={() =>
              props.navigation.navigate('VerifyPassword', {
                onSuccess: onVerifyPasswordSuccessful,
              })
            }
          >
            <Text style={darkMode ? styles.menuText : styles.menuTextLight}>Ubah Kata Sandi </Text>
            {
              darkMode ? 
              <Image source={require('../../assets/png/ArrowMenu.png')} /> :
              <Image source={require('../../assets/png/ArrowMenuLight.png')} />
            }
          </TouchableOpacity>
          <TouchableOpacity
            style={darkMode ? styles.bottomMenu : styles.bottomMenuLight}
          >
            <Text style={darkMode ? styles.menuText : styles.menuTextLight}>Ganti Tema </Text>
            <ToggleSwitch
                isOn={darkMode}
                onColor="rgba(10, 88, 237, 1)"
                offColor="#767577"
                size="medium"
                animationSpeed={150}
                onToggle={isOn => switchToogle()}
                // disabled={loadToggle}
            />
          </TouchableOpacity>
          {/* <TouchableOpacity
                style={styles.bottomMenu}
                >
                <Text style={darkMode ? styles.menuText : styles.menuTextLight}>Metode Pembayaran</Text>
                <Image
                    source={require('../../assets/png/ArrowMenu.png')}
                />
            </TouchableOpacity> */}
        </View>
        {
          darkMode ? <View style={styles.separator} /> : null
        }
        <View style={styles.logoutMenu}>
          <TouchableOpacity
            onPress={() => logoutButton()}
            style={styles.logout}
          >
            <Text style={styles.logoutText}>Keluar</Text>
            <Image source={require('../../assets/png/LogoutLogo.png')} />
          </TouchableOpacity>
        </View>
        <View style={styles.bottomInfo}>
          <Image
            // style={styles.bottomLogoMedQCare}
            style={{ width: 120, height: 30, resizeMode: 'center' }}
            source={require('../../assets/png/MedQCareLogo.png')}
          />
          <Text style={styles.bottomVersionText}>Version 1.0.0</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  body: {
    flex: 1, 
    backgroundColor: '#1F1F1F', 
    width: '100%'
  },

  bodyLight: {
    flex: 1, 
    backgroundColor: '#FFFFFF', 
    width: '100%',
    borderTopColor: '#F6F6F6',
    borderTopWidth: 3
  },

  header: {
    flexDirection: 'row',
    height: 60,
    width: '100%',
    backgroundColor: '#2F2F2F',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingTop: 20,
  },

  headerLeft: {
    flexDirection: 'row',
    width: '40%',
    height: '50%',
  },

  headerText: {
    color: '#DDDDDD',
    fontSize: 18,
  },

  menu: {
    width: '100%',
    paddingHorizontal: 25,
  },

  upperMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 17,
    paddingTop: 20,
  },

  upperMenuLight: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingBottom: 15,
    borderBottomColor: '#F2F2F2',
    borderBottomWidth: 1
  },

  bottomMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingBottom: 17,
  },

  bottomMenuLight: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingBottom: 15,
    borderBottomColor: '#F2F2F2',
    borderBottomWidth: 1
  },

  menuText: {
    fontSize: 14,
    color: '#DDDDDD',
  },

  menuTextLight: {
    fontSize: 14,
    color: '#212121',
  },

  separator: {
    width: '100%',
    height: 16,
    backgroundColor: '#2F2F2F',
  },

  logoutMenu: {
    width: '100%',
    paddingHorizontal: 25,
  },

  logout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 30,
  },

  logoutText: {
    fontSize: 16,
    color: '#FD6B6B',
  },

  bottomInfo: {
    width: '100%',
    paddingBottom: 15,
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'absolute',
    bottom: 0,
  },

  bottomLogoMedQCare: {
    height: 20,
    width: 66,
  },

  bottomVersionText: {
    color: '#B5B5B5',
    fontSize: 12,
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(profile);
