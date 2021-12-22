import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Alert,
} from 'react-native';
import Header from '../../../components/headers/GradientHeader';
import PictureModal from '../../../components/modals/profilePictureModal';
import DocumentOptionModal from '../../../components/modals/docOptionModal';
import { FontAwesome } from '@expo/vector-icons';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import Ic_Dokumen from '../../../assets/svg/ic_documen';
import Ic_Option from '../../../assets/svg/ic_option';
import axios from 'axios';
import { connect } from 'react-redux';
import { baseURL } from '../../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const dimHeight = Dimensions.get('window').height;
const dimWidth = Dimensions.get('window').width;

function RujukanList(props) {
  const [modalAdd, setModalAdd] = useState(false);
  const [modalOption, setModalOption] = useState(false);
  const [referenceFiles, setRefencesFiles] = useState([]);
  const [selectedReferenceFile, setSelectedReferenceFile] = useState();

  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem('token');
      const { data } = await axios({
        method: 'POST',
        url: `${baseURL}/api/v1/members/getMedicalResume`,
        headers: {
          Authorization: JSON.parse(token).token,
        },
        data: {
          patientID: props.userData._id,
        },
      });
      const { data: medicalResumes } = data;
      const newReferenceFiles = medicalResumes.filter((element) => {
        return !!element.referral;
      });
      setRefencesFiles(newReferenceFiles);
    })();
  }, []);

  const addDocumentOptions = [
    {
      label: 'Kamera',
      url: require('../../../assets/png/ic_kamera.png'),
    },
    {
      label: 'Galeri',
      url: require('../../../assets/png/ic_galeri.png'),
    },
  ];

  const documentAction = [
    {
      label: 'Detail',
      url: require('../../../assets/png/documentPage/detail.png'),
    },
    {
      label: 'Unduh',
      url: require('../../../assets/png/documentPage/unduh.png'),
    },
    {
      label: 'Share',
      url: require('../../../assets/png/documentPage/ic_share.png'),
    },
  ];

  const shareFileHandler = async () => {
    const { title, base64 } = selectedReferenceFile.referral;
    const fileUri = FileSystem.documentDirectory + title + '.pdf';
    await FileSystem.writeAsStringAsync(fileUri, base64, {
      encoding: FileSystem.EncodingType.Base64,
    });
    const isAvailable = await Sharing.isAvailableAsync();

    if (!isAvailable) {
      Alert.alert("Uh oh, sharing isn't available on your platform");
      return;
    }

    await Sharing.shareAsync(fileUri);
  };

  async function setSelectedValue(label) {
    switch (label) {
      case 'Kamera':
        await props.navigation.navigate('ProfilePictureCamera', {
          destination: 'DokumenMedisStack',
        });
        break;

      case 'Galeri':
        await props.navigation.navigate('ProfilePictureGallery', {
          destination: 'DokumenMedisStack',
        });
        break;

      default:
        break;
    }
  }

  function setSelectedAction(label) {
    switch (label) {
      case 'Share': {
        (async () => {
          await shareFileHandler();
        })();
      }

      case 'Detail': {
        props.navigation.navigate('ShowDokumen', {
          name: selectedReferenceFile.referral.title,
          base64:
            'data:application/pdf;base64,' +
            selectedReferenceFile.referral.base64,
          backTo: 'ListRujukan',
        });
      }

      default: {
        break;
      }
    }
  }

  return (
    <View style={styles.container}>
      <Header title="Rujukan" navigate={props.navigation.navigate} />
      <View style={styles.content}>
        <SafeAreaView style={styles.document}>
          <FlatList
            data={referenceFiles}
            numColumns={2}
            keyExtractor={(item, idx) => String(idx)}
            renderItem={({ item, index }) => {
              return (
                <View style={styles.cardDokumen}>
                  <TouchableOpacity
                    style={styles.imageDokumen}
                    onPress={() =>
                      props.navigation.navigate('ShowDokumen', {
                        name: item.referral.title,
                        base64:
                          'data:application/pdf;base64,' + item.referral.base64,
                        backTo: 'ListRujukan',
                      })
                    }
                  />
                  <TouchableOpacity
                    style={styles.detailCard}
                    onPress={() => {
                      setModalOption(true);
                      setSelectedReferenceFile(item);
                    }}
                  >
                    <View style={styles.iconDoc}>
                      <Ic_Dokumen />
                    </View>
                    <View
                      style={{
                        maxWidth: dimWidth * 0.25,
                        justifyContent: 'center',
                      }}
                    >
                      <Text style={styles.dokumentName}>
                        {item.referral.title}
                      </Text>
                    </View>
                    <View style={styles.iconOption}>
                      <Ic_Option />
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </SafeAreaView>
        <TouchableOpacity
          style={styles.buttonAdd}
          onPress={() => setModalAdd(true)}
        >
          <Text style={styles.textButton}>Minta Rujukan</Text>
        </TouchableOpacity>
      </View>
      <PictureModal
        modal={modalAdd}
        setModal={setModalAdd}
        selection={addDocumentOptions}
        setSelectedValue={setSelectedValue}
      ></PictureModal>
      <DocumentOptionModal
        modal={modalOption}
        setModal={setModalOption}
        selection={documentAction}
        setSelectedValue={setSelectedAction}
      ></DocumentOptionModal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818',
  },
  content: {
    height: dimHeight * 0.88,
    justifyContent: 'space-between',
    padding: 20,
  },
  buttonAdd: {
    alignItems: 'center',
    alignSelf: 'center',
    width: dimWidth * 0.4,
    backgroundColor: '#005EA2',
    borderRadius: 25,
    padding: 10,
  },
  borderImage: {
    height: 55,
    width: 55,
    borderRadius: 55,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#33E204',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: 'transparent',
  },
  document: {
    width: '100%',
    height: '100%',
    paddingBottom: dimHeight * 0.04,
  },
  cardDokumen: {
    height: dimHeight * 0.2,
    width: dimWidth * 0.48,
  },
  textItem: {
    color: '#B5B5B5',
  },
  dokumentName: {
    color: '#B5B5B5',
    fontSize: 11,
    textAlign: 'center',
  },
  detailCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxWidth: dimWidth * 0.4,
    paddingVertical: 10,
  },
  imageDokumen: {
    height: dimHeight * 0.12,
    width: dimWidth * 0.4,
    backgroundColor: '#C4C4C4',
    borderRadius: 10,
  },
  iconDoc: {
    paddingTop: dimHeight * 0.005,
  },
  iconOption: {
    paddingTop: dimHeight * 0.008,
  },
  textItem: {
    color: '#B5B5B5',
  },
  textButton: {
    color: '#B5B5B5',
    fontSize: 12,
  },
});

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(RujukanList);
