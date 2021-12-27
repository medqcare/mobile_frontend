import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  ToastAndroid,
  ActivityIndicator,
  PermissionsAndroid,
  Image,
} from 'react-native';

import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';

import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  deleteDocument,
  getDocumentByPatient,
  renameDocument,
  uploadDocument,
} from '../../../stores/action';

import PictureModal from '../../../components/modals/profilePictureModal';
import DocumentOptionModal from '../../../components/modals/docOptionModal';
import RenameModal from '../../../components/modals/modalRename';
import ConfirmationModal from '../../../components/modals/ConfirmationModal';

import LottieLoader from 'lottie-react-native';

import Ic_Sort from '../../../assets/svg/ic_sort';
import Ic_Dokumen from '../../../assets/svg/ic_documen';
import Ic_Option from '../../../assets/svg/ic_option';
import * as DocumentPicker from 'expo-document-picker';

const dimHeight = Dimensions.get('window').height;
const dimWidth = Dimensions.get('window').width;

function DokumenList(props) {
  const [data, setData] = useState([]);
  const [modalAdd, setModalAdd] = useState(false);
  const [modalOption, setModalOption] = useState(false);
  const [modalRename, setModalRename] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);

  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedName, setSelectedName] = useState(null);
  const [selectedKey, setSelectedKey] = useState(null);
  const [selectedUrl, setfileUrl] = useState(null);
  const [modalLoad, setModalLoad] = useState(false);
  const patientID = props.patientID;

  useEffect(() => {
    _fetchData();
  }, [patientID]);

  useEffect(() => {}, [setSelectedName, setSelectedId, setSelectedKey]);

  const _fetchData = async () => {
    setLoading(true);
    let token = JSON.parse(await AsyncStorage.getItem('token')).token;
    getDocumentByPatient(token, patientID)
      .then(({ data }) => {
        setData(data.data);
      })
      .catch((err) => {
        ToastAndroid.show(
          `Please check your internet connection`,
          ToastAndroid.SHORT
        );
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const upload = async (data) => {
    let token = JSON.parse(await AsyncStorage.getItem('token')).token;
    uploadDocument(token, patientID, data)
      .then(({ data }) => {
        console.log(data);
        _fetchData();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setUploadLoading(false);
      });
  };

  const renameAction = async (newName) => {
    const token = JSON.parse(await AsyncStorage.getItem('token')).token;
    const payload = {
      documentid: selectedId,
      name: newName,
    };
    renameDocument(token, patientID, payload)
      .then(({ data }) => {
        _fetchData();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setModalLoad(false);
        setModalRename(false);
      });
  };

  const deleteAction = async () => {
    const token = JSON.parse(await AsyncStorage.getItem('token')).token;
    const payload = {
      documentid: selectedId,
      key: selectedKey,
    };
    deleteDocument(token, patientID, payload)
      .then(({ data }) => {
        console.log(data);
        _fetchData();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setModalLoad(false);
        setModalDelete(false);
      });
  };

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
      label: 'Ganti Nama',
      url: require('../../../assets/png/documentPage/rename.png'),
    },
    {
      label: 'Hapus',
      url: require('../../../assets/png/documentPage/delete.png'),
    },
  ];

  async function setSelectedValue(label) {
    switch (label) {
      case 'Kamera':
        // await props.navigation.navigate("ProfilePictureCamera", {
        //   destination: "DokumenMedisStack",
        // });
        break;

      case 'Galeri':
        let result = await DocumentPicker.getDocumentAsync({});
        console.log(result.uri);
        console.log(result);
        if (result.uri) {
          setUploadLoading(true);
          let uri = result.uri;
          let name =
            result.name +
            new Date().toLocaleDateString().split('/').join('') +
            new Date().toLocaleTimeString().split(':').join('');
          let type = result.mimeType;
          const data = new FormData();
          data.append('avatar', { uri, name, type });
          console.log(data);
          upload(data);
        }
        break;

      default:
        break;
    }
  }

  async function setSelectedAction(label) {
    switch (label) {
      case 'Unduh':
        downloadFile();
        break;

      case 'Ganti Nama':
        setModalRename(true);
        break;

      case 'Hapus':
        setModalDelete(true);
        break;

      default:
        break;
    }
  }

  const checkPermission = async () => {
    const result = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
    );
    return result;
  };

  const askPermission = async () => {
    const result = await PermissionsAndroid.request(
      'android.permission.WRITE_EXTERNAL_STORAGE'
    );
    return result;
  };

  const downloadFile = async () => {
    const permission = await checkPermission();
    if (!permission) {
      await askPermission();
    }
    let fileUri = FileSystem.documentDirectory + selectedName;
    ToastAndroid.show('Download Started', ToastAndroid.LONG);
    FileSystem.downloadAsync(selectedUrl, fileUri)
      .then(({ uri }) => {
        saveFile(uri);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const saveFile = async (uri) => {
    const asset = await MediaLibrary.createAssetAsync(uri);
    const album = await MediaLibrary.getAlbumAsync('Download');
    console.log(album);
    if (album == null) {
      await MediaLibrary.createAlbumAsync('Download', asset, false);
      ToastAndroid.show(
        'Download berhasil, check on your download folder',
        ToastAndroid.LONG
      );
    } else {
      await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
      ToastAndroid.show(
        'Download berhasil, check on your download folder',
        ToastAndroid.LONG
      );
    }
  };
  console.log(data);

  // const pdfBuffer = FileSystem.downloadAsync(selectedUrl)

  return (
    <View style={styles.container}>
      {data.length && !loading ? (
        <View style={styles.document}>
          <TouchableOpacity style={styles.textHeader}>
            <Text style={styles.textItem}>Terakhir diunggah </Text>
            <View style={{ marginTop: dimHeight * 0.005, paddingLeft: 10 }}>
              <Ic_Sort />
            </View>
          </TouchableOpacity>
          <SafeAreaView>
            <FlatList
              data={data}
              numColumns={2}
              keyExtractor={(item) => String(item._id)}
              renderItem={({ item }) => {
                return (
                  <View style={styles.cardDokumen}>
                    <TouchableOpacity
                      onPress={() =>
                        props.navigation.navigate('ShowDokumen', {
                          uri: item.fileUrl,
                          name: item.name,
                          backTo: 'ListDokumenMedis',
                        })
                      }
                      style={styles.imageDokumen}
                    />
                    {/* <Image style={{height: 50, width: 50}} source={{uri: ''}}>

                    </Image> */}
                    <TouchableOpacity
                      onPress={() => {
                        setSelectedId(item._id);
                        setSelectedName(item.name);
                        setSelectedKey(item.key);
                        setfileUrl(item.fileUrl);
                        setModalOption(true);
                      }}
                      style={styles.detailCard}
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
                        <Text style={styles.dokumentName}>{item.name}</Text>
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
        </View>
      ) : (
        <>
          {loading ? (
            <LottieLoader
              source={require('../../animation/loading.json')}
              autoPlay
              loop
            />
          ) : (
            <View style={{ ...styles.document, alignItems: 'center' }}>
              <Text style={styles.textItem}>Tidak ada dokumen</Text>
            </View>
          )}
        </>
      )}

      {!loading ? (
        <TouchableOpacity
          onPress={() => setModalAdd(true)}
          style={styles.buttonAdd}
          disabled={uploadLoading}
        >
          {uploadLoading ? (
            <LottieLoader
              source={require('../../../screens/animation/orange-pulse.json')}
              autoPlay
              loop
            />
          ) : (
            <Text style={{ ...styles.textItem, fontSize: 12 }}>
              Tambah Dokumen
            </Text>
          )}
        </TouchableOpacity>
      ) : null}
      <PictureModal
        modal={modalAdd}
        setModal={setModalAdd}
        selection={addDocumentOptions}
        setSelectedValue={setSelectedValue}
      />
      <DocumentOptionModal
        modal={modalOption}
        setModal={setModalOption}
        selection={documentAction}
        setSelectedValue={setSelectedAction}
      />
      <RenameModal
        modal={modalRename}
        optionLeftFunction={() => setModalRename(false)}
        optionLeftText={'Batal'}
        optionRightFunction={(newName) => {
          setModalLoad(true);
          renameAction(newName);
        }}
        nameBefore={selectedName}
        optionRightText={'Rename'}
        warning={'Masukkan Nama Baru'}
        load={modalLoad}
      />
      <ConfirmationModal
        modal={modalDelete}
        optionLeftFunction={() => setModalDelete(false)}
        optionLeftText={'Batal'}
        optionRightFunction={() => {
          setModalLoad(true);
          deleteAction();
        }}
        optionRightText={'Hapus'}
        warning={'Yakin ingin menghapus dokumen ini'}
        load={modalLoad}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: dimHeight * 0.02,
    height: dimHeight * 0.84,
    justifyContent: 'space-between',
  },
  textHeader: {
    flexDirection: 'row',
    marginBottom: dimHeight * 0.02,
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
  buttonAdd: {
    alignItems: 'center',
    alignSelf: 'center',
    width: dimWidth * 0.4,
    minHeight: dimHeight * 0.04,
    backgroundColor: '#005EA2',
    borderRadius: 25,
    padding: 10,
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
});

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DokumenList);
