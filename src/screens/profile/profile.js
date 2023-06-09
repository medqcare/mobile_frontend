import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  BackHandler,
  Image,
} from 'react-native';
import { connect } from 'react-redux';

import ProfileInfo from '../../components/profile/dashboard/profile-info';

import { logout, deleteUserData } from '../../stores/action';
import { SafeAreaView } from 'react-navigation';
import GreyHeader from '../../components/headers/GreyHeader';

const mapDispatchToProps = {
  logout,
  deleteUserData
};

const mapStateToProps = (state) => {
  return state;
};

const profile = (props) => {
  const { userData, isLoading, error } = props.userDataReducer
  const { email } = userData.userID;

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

  return (
    <SafeAreaView style={styles.container}>
      <GreyHeader
        navigate={props.navigation.navigate}
        navigateTo={'Home'}
        title="Profil Saya"
      />
      <ProfileInfo navigation={props.navigation} destination="ProfileStack" data={userData}/>
      <View style={{ flex: 1, backgroundColor: '#1F1F1F', width: '100%' }}>
        <View style={styles.menu}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('ProfileDetail')}
            style={styles.upperMenu}
          >
            <Text style={styles.menuText}>Profil Saya</Text>
            <Image source={require('../../assets/png/ArrowMenu.png')} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('AddFamily')}
            style={styles.upperMenu}
          >
            <Text style={styles.menuText}>Daftar Keluarga</Text>
            <Image source={require('../../assets/png/ArrowMenu.png')} />
          </TouchableOpacity>
          {/* <TouchableOpacity
                        style={styles.upperMenu}
                    >
                        <Text style={styles.menuText}>Aktifitas</Text>
                        <Image
                            source={require('../../assets/png/ArrowMenu.png')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.upperMenu}
                    >
                        <Text style={styles.menuText}>Transaksi</Text>
                        <Image
                            source={require('../../assets/png/ArrowMenu.png')}
                        />
                    </TouchableOpacity> */}
          <TouchableOpacity
            style={styles.bottomMenu}
            onPress={() =>
              props.navigation.navigate('VerifyPassword', {
                onSuccess: onVerifyPasswordSuccessful,
              })
            }
          >
            <Text style={styles.menuText}>Ubah Kata Sandi </Text>
            <Image source={require('../../assets/png/ArrowMenu.png')} />
          </TouchableOpacity>
          {/* <TouchableOpacity
                        style={styles.bottomMenu}
                    >
                        <Text style={styles.menuText}>Metode Pembayaran</Text>
                        <Image
                            source={require('../../assets/png/ArrowMenu.png')}
                        />
                    </TouchableOpacity> */}
        </View>
        <View style={styles.separator} />
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
    paddingTop: 30,
  },

  bottomMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 30,
  },

  menuText: {
    fontSize: 14,
    color: '#DDDDDD',
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
  },
});

// const viewStyles = StyleSheet.create({
//     outer: {
//         flex: 1,
//         alignItems: 'center',
//         // backgroundColor: '#FF0000',
//         // minHeight: hp('100%'),
//         // width: wp('100%'),
//     },
//     box: {
//         width: wp('90%'),
//         maxHeight: hp('25%'),
//         padding: 25,
//         // backgroundColor: '#3C9D9B',
//         borderRadius: 9,
//         justifyContent: 'flex-start',
//     },
//     bottom: {
//         maxWidth: wp('100%'),
//         height: hp('8%'),
//         // padding: 10,
//         // backgroundColor: '#AFD0E3',
//         justifyContent: 'center',
//         borderBottomColor: '#CDCDCD',
//         borderBottomWidth: 2,
//     },
//     list: {
//         width: wp('100%'),
//         // minHeight: hp('100%'),
//         // backgroundColor: '#692ADB',
//         padding: 10,
//     },
//     settingBox: {
//         position: 'absolute',
//         width: 40,
//         height: 40,
//         top: hp('4%'),
//         right: wp('5%'),
//         zIndex: 10,
//         backgroundColor: '#FFF',
//         alignItems: 'center',
//         justifyContent: 'center',
//         borderRadius: 6,
//         shadowColor: "#000",
//         shadowOffset: {
//             width: 1,
//             height: 3,
//         },
//         shadowOpacity: 0.29,
//         shadowRadius: 4.65,
//         elevation: 7
//     }
// })
// const textStyle = StyleSheet.create({

// })
// const style = StyleSheet.create({
//     title: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         color: '#5C5C5C'
//     },
//     setting: {
//         padding: 10,
//     },
//     profileOption: {
//         marginHorizontal: 10,
//     },
//     viewProfileOption: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         width: wp('90%'),
//         // backgroundColor:'#00FFD0'
//     },
//     optionLogo: {
//         marginHorizontal: 10
//     },
//     chevronRight: {
//         alignSelf: 'flex-end',
//         justifyContent: 'flex-end',
//         marginHorizontal: 10
//     }
// })

export default connect(mapStateToProps, mapDispatchToProps)(profile);
