import React, { useDebugValue, useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { connect, useSelector } from 'react-redux';
import capitalFirst from '../../../helpers/capitalFirst'; // for proper case full name
import PictureModal from '../../modals/profilePictureModal'; // modal for profile picture options
import ConfirmationModal from '../../modals/ConfirmationModal';
import { deleteProfileImage } from '../../../stores/action';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FullImageModal from '../../modals/FullImageModal';
// import {
//   readDirectoryAsync,
//   cacheDirectory,
//   getInfoAsync,
// } from 'expo-file-system';

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = {
  deleteProfileImage,
};

const profileInfo = (props) => {
  const { data: userData, darkMode } = props
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [fullImageModal, setFullImageModal] = useState(false);

  // Load
  const [load, setLoad] = useState(false);

  // Profile Picture
  const [profilePictureModal, setProfilePictureModal] = useState(false);
  const profileStatusSelection = [
    {
      label: 'Hapus',
      url: require('../../../assets/png/ic_trash.png'),
    },
    {
      label: 'Kamera',
      url: require('../../../assets/png/ic_kamera.png'),
    },
    {
      label: 'Galeri',
      url: require('../../../assets/png/ic_galeri.png'),
    },
  ];

  function fullName() {
    return userData
      ? userData?.lastName
        ? userData?.firstName + ' ' + userData?.lastName
        : userData?.firstName
      : '';
  }

  async function deleteProfilePicture() {
    setLoad(true);
    const patientId = userData._id;
    let token = await AsyncStorage.getItem('token');
    token = JSON.parse(token).token;
    await props.deleteProfileImage(patientId, userData);
    setLoad(false);
    setConfirmationModal(false);
  }

  async function setSelectedValue(label) {
    switch (label) {
      case 'Kamera':
        await props.navigation.navigate('ProfilePictureCamera', {
          destination: props.destination,
          patientData: userData
        });
        break;

      case 'Galeri':
        await props.navigation.navigate('ProfilePictureGallery', {
          destination: props.destination,
          patientData: userData
        });
        break;

      case 'Hapus':
        setConfirmationModal(true);
        break;

      default:
        break;
    }
  }

  // Function to access cache storage. Not working yet
  // async function fileSystem() {
  //   try {
  //     // // Document
  //     // const document = documentDirectory
  //     // const docs = await readDirectoryAsync(document)
  //     // console.log(docs)

  //     // Cached

  //     // console.log(res)
  //     // console.log(deleted)
  //     const res = cacheDirectory;
  //     const cached = await readDirectoryAsync(res);
  //     // console.log(cached)
  //     // const content = await getContentUriAsync('file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540rayendrasabandar%252FClient-Expo/ExponentAsset-b3263095df30cb7db78c613e73f9499a.ttf')
  //     // console.log(content)
  //     const detail = await getInfoAsync(res + 'ImagePicker');
  //     // const deleted = await deleteAsync(res + 'ExponentAsset-b3263095df30cb7db78c613e73f9499a.ttf')

  //     console.log(detail);
  //     // const read = await readAsStringAsync('content://host.exp.exponent.FileSystemFileProvider/cached_expo_files/ExperienceData/%2540rayendrasabandar%252FClient-Expo/ExponentAsset-b3263095df30cb7db78c613e73f9499a.ttf')
  //     // console.log(read, 'asdfasdfadsf')
  //     // console.log('read');
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  
  return (
    <View style={darkMode ? styles.container : styles.containerLight}>
      <View style={styles.profilePicture}>
        <TouchableOpacity
          onPress={() => setFullImageModal(!fullImageModal)}
          // onPress={() => fileSystem()}
        >
          <Image
            key={new Date().getTime()}
            // source={{ uri: userData?.imageUrl ? userData?.imageUrl : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRH_WRg1exMTZ0RdW3Rs76kCOb9ZKrXddtQL__kEBbrS2lRWL3r'}}
            source={{
              uri: userData?.imageUrl
                ? userData.imageUrl
                : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRH_WRg1exMTZ0RdW3Rs76kCOb9ZKrXddtQL__kEBbrS2lRWL3r',
            }}
            style={styles.userImage}
          />
        </TouchableOpacity>

        <FullImageModal
          modal={fullImageModal}
          setModal={setFullImageModal}
          imageUrl={userData.imageUrl}
        />

        <TouchableOpacity
          style={{ marginTop: -17, zIndex: 1, marginLeft: 30 }}
          onPress={() => setProfilePictureModal(true)}
        >
          <Image
            source={require('../../../assets/png/ic_camera.png')}
            style={{ width: 28, height: 30 }}
          />
        </TouchableOpacity>

        <PictureModal
          modal={profilePictureModal}
          setModal={setProfilePictureModal}
          selection={profileStatusSelection}
          setSelectedValue={setSelectedValue}
        ></PictureModal>
        <ConfirmationModal
          modal={confirmationModal}
          optionLeftFunction={() => {
            setConfirmationModal(false);
          }}
          optionLeftText="Batal"
          optionRightFunction={() => {
            deleteProfilePicture();
          }}
          optionRightText="Hapus"
          warning="Apakah anda yakin ingin menghapus foto anda?"
          load={load}
        />
      </View>

      <View style={styles.profileData}>
        <View style={styles.fullName}>
          <Text style={darkMode ? styles.fullNameText : styles.fullNameTextLight}>{fullName()}</Text>
        </View>
        <View style={styles.phoneNumber}>
          <Text style={darkMode ? styles.phoneNumberText : styles.phoneNumberTextLight}>{userData?.phoneNumber}</Text>
        </View>
        <View style={darkMode ? styles.verified : styles.verifiedLight}>
          <View style={darkMode ? styles.innerVerified : styles.innerVerifiedLight}>
            <Text style={darkMode ? styles.verifiedText : styles.verifiedTextLight}>Sudah Terverifikasi</Text>
            <View style={styles.verifiedLogo}>
              {
                darkMode ? 
                <Image source={require('../../../assets/png/VerifiedLogo.png')} />
                : <Image source={require('../../../assets/png/ic_check.png')} />
              }
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
    height: hp('14%'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#2F2F2F',
    paddingLeft: 20,
    paddingVertical: 20,
  },
  containerLight: {
    width: wp('100%'),
    height: hp('14%'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#ffffff',
    paddingLeft: 20,
    paddingVertical: 20,
  },

  profilePicture: {
    // flex: 0.1,
    flexDirection: 'column',
    position: 'absolute',
    marginLeft: 15,
  },

  userImage: {
    width: 55,
    height: 55,
    borderRadius: 150 / 2,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#4BE395',
  },

  profileData: {
    justifyContent: 'space-around',
    paddingLeft: 70,
  },

  fullName: {},

  fullNameText: {
    color: '#DDDDDD',
    fontSize: 16,
    textTransform: 'capitalize',
  },

  fullNameTextLight: {
    color: '#333333',
    fontSize: 16,
    textTransform: 'capitalize',
  },

  phoneNumber: {
    paddingVertical: 10,
  },

  phoneNumberText: {
    color: '#B5B5B5',
    fontSize: 14,
  },

  phoneNumberTextLight: {
    color: '#5A5A5A',
    fontSize: 14,
  },

  verified: {
    backgroundColor: '#3C3C3C',
    alignSelf: 'flex-start',
  },

  verifiedLight: {
    alignSelf: 'flex-start',
  },

  innerVerified: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },

  innerVerifiedLight: {
    flexDirection: 'row',
  },

  verifiedText: {
    color: '#B5B5B5',
    fontSize: 14,
    alignSelf: 'flex-start',
  },

  verifiedTextLight: {
    color: '#4F4F4F',
    fontSize: 14,
    alignSelf: 'flex-start',
  },

  verifiedLogo: {
    paddingLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(profileInfo);
