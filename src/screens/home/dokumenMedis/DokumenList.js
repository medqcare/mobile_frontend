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
  StatusBar,
  PermissionsAndroid,
  Image,
  TextInput,
} from 'react-native';

import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

import { Ionicons } from '@expo/vector-icons';
import SearchIcon from '../../../assets/svg/Search';
import SelectPatient from '../../../components/modals/selectPatient';
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
import { dateWithDDMMMYYYYFormat } from '../../../helpers/dateFormat';
import ModalUploadDocument from '../../../components/modals/ModalUploadDocument';
import { CardDocument } from '../../../components/document/CardDocument';
import getFullName from '../../../helpers/getFullName';
import { ActivityIndicator } from 'react-native-paper';
import getToken from '../../../helpers/localStorage/token';
import axios from 'axios';
import { baseURL } from '../../../config';

const dimHeight = Dimensions.get('window').height;
const dimWidth = Dimensions.get('window').width;

function DokumenList(props) {
  const { types: DEFAULT_TYPES, allowUploadDocument } =
    props.navigation.state.params;
  const DEFAULT_TYPE_SELECTED = 'semua';
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
  const [searchIsFocus, setSearchIsFocus] = useState(false);
  const [search, setSearch] = useState('');
  const [types, setTypes] = useState([DEFAULT_TYPE_SELECTED, ...DEFAULT_TYPES]);
  const [typeSelected, setTypeSelected] = useState(DEFAULT_TYPE_SELECTED);
  const [pageNumber, setPageNumber] = useState(1);
  const [accountOwner, setAccountOwner] = useState(props.userData);
  const [modalPatient, setModalPatient] = useState(false);
  const [family, setFamily] = useState([]);
  const [patient, setPatient] = useState({
    ...props.userData,
  });
  const [loadingPagination, setLoadingPagination] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    let _family = {
      ...props.userData,
    };
    delete _family.family;
    const temp = [_family];
    props.userData.family.forEach((el) => {
      temp.push(el);
    });
    setFamily(family.concat(temp));
  }, []);

  useEffect(async () => {
    if (searchIsFocus) {
      return;
    }

    const tokenString = await AsyncStorage.getItem('token');
    const { token } = JSON.parse(tokenString);
    const patientId = patient._id;
    if (pageNumber === 1) {
      await _fetchData();
    } else {
      await fetchDocumentsWithPagination(
        token,
        patientId,
        typeSelected,
        pageNumber
      );
    }
  }, [patient, pageNumber, typeSelected]);

  useEffect(async () => {
    if (search === '') {
      return;
    }

    if (searchIsFocus === false) {
      return;
    }

    const patientId = patient._id;
    await fetchBySearchQuery(search, patientId);
  }, [search]);

  const _fetchData = async () => {
    let type =
      typeSelected === DEFAULT_TYPE_SELECTED
        ? DEFAULT_TYPES.join(',')
        : typeSelected;

    setLoading(true);
    try {
      const tokenString = await AsyncStorage.getItem('token');
      const { token } = JSON.parse(tokenString);
      const patientId = patient._id;
      const { data: response } = await getDocumentByPatient(
        token,
        patientId,
        type,
        pageNumber
      );
      setData(response.data);
      setTotalPages(response.totalPages);
    } catch (error) {
      ToastAndroid.show(
        `Please check your internet connection`,
        ToastAndroid.SHORT
      );
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchDocumentsWithPagination = async () => {
    let type =
      typeSelected === DEFAULT_TYPE_SELECTED
        ? 'resep,laboratorium,radiologi'
        : typeSelected;
    try {
      setLoadingPagination(true);
      const tokenString = await AsyncStorage.getItem('token');
      const { token } = JSON.parse(tokenString);
      const patientId = patient._id;
      const { data: response } = await getDocumentByPatient(
        token,
        patientId,
        type,
        pageNumber
      );
      const documents = response.data;
      if (documents.length > 0) {
        setData(data.concat(documents));
      }
    } catch (error) {
      ToastAndroid.show('Gagal memuat documents', ToastAndroid.LONG);
    } finally {
      setLoadingPagination(false);
    }
  };

  const fetchBySearchQuery = async (search, patientId) => {
    let token = await AsyncStorage.getItem('token');
    token = JSON.parse(token).token;

    try {
      setLoading(true);
      const { data: response } = await axios({
        method: 'GET',
        url: baseURL + `/api/v1/members/getDocumentByPatient?search=${search}`,
        headers: {
          Authorization: token,
          patientid: patientId,
          type: DEFAULT_TYPES.join(','),
        },
      });
      setData(response.data);
    } catch (error) {
      ToastAndroid.show('Gagal memuat dokumen, silahkan coba kembali');
    } finally {
      setLoading(false);
    }
  };

  const upload = async (data) => {
    let token = JSON.parse(await AsyncStorage.getItem('token')).token;
    uploadDocument(token, patient._id, data)
      .then(({ data }) => {
        console.log(data);
        setPageNumber(1);
        setUploadLoading(false);
        return _fetchData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const renameAction = async (newName) => {
    const token = JSON.parse(await AsyncStorage.getItem('token')).token;
    const payload = {
      documentid: selectedId,
      name: newName,
    };
    renameDocument(token, patient._id, payload)
      .then(({ data }) => {
        setPageNumber(1);
        setModalRename(false);
        return _fetchData();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setModalLoad(false);
      });
  };

  const deleteAction = async () => {
    const token = JSON.parse(await AsyncStorage.getItem('token')).token;
    const payload = {
      documentid: selectedId,
      key: selectedKey,
    };
    deleteDocument(token, patient._id, payload)
      .then(({ data }) => {
        console.log(data);
        setPageNumber(1);
        setModalDelete(false);
        return _fetchData();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setModalLoad(false);
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
      label: 'Share',
      url: require('../../../assets/png/documentPage/ic_share.png'),
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

  async function setSelectedValue(label, typeDoc) {
    switch (label) {
      case 'Kamera':
        // await props.navigation.navigate("ProfilePictureCamera", {
        //   destination: "DokumenMedisStack",
        // });
        break;

      case 'Galeri':
        let result = await DocumentPicker.getDocumentAsync({});
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
          // DEFAULT
          data.append('type', typeDoc);
          data.append(
            'createdBy',
            JSON.stringify({
              type: 'patient',
              name: getFullName(patient),
            })
          );
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

      case 'Share':
        shareFileHandler();
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

  const shareFileHandler = () => {
    (async () => {
      const permission = await checkPermission();
      if (!permission) {
        await askPermission();
      }

      let fileUri = FileSystem.documentDirectory + selectedName;
      const { uri } = await FileSystem.downloadAsync(selectedUrl, fileUri);
      await Sharing.shareAsync(uri);
    })();
  };

  const saveFile = async (uri) => {
    const asset = await MediaLibrary.createAssetAsync(uri);
    const album = await MediaLibrary.getAlbumAsync('Download');
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

  const onOptionPressedHandler = (item) => {
    setSelectedId(item._id);
    setSelectedName(item.name);
    setSelectedKey(item.key);
    setfileUrl(item.fileUrl);
    setModalOption(true);
  };

  const typeStyleBehavior = (type) => {
    return {
      container: {
        backgroundColor: type === typeSelected ? '#212D3D' : '#2F2F2F',
        borderWidth: 1,
        borderColor: type === typeSelected ? '#77BFF4' : 'transparent',
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 99,
        alignSelf: 'flex-start',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
      },
      text: {
        color: type === typeSelected ? '#77BFF4' : '#B5B5B5',
        fontSize: 12,
        textTransform: 'capitalize',
      },
    };
  };

  const renderType = ({ item }) => {
    const { container, text } = typeStyleBehavior(item);
    return (
      <TouchableOpacity
        style={container}
        onPress={() => {
          setTypeSelected(item);
          setPageNumber(1);
        }}
      >
        <Text style={text}>{item}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor={'transparent'}
      />
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => props.navigation.pop()}
          style={styles.arrow}
        >
          <Ionicons
            name="arrow-back"
            color="#fff"
            size={25}
            style={styles.backArrow}
          />
        </TouchableOpacity>
        <View style={styles.searchArea}>
          <View>
            <SearchIcon />
          </View>
          <TextInput
            style={styles.textinput}
            placeholder="Cari Dokumen"
            placeholderTextColor="#A2A2A2"
            onFocus={() => {
              setData([]);
              setSearchIsFocus(true);
            }}
            onChangeText={(text) => {
              if (text === '') {
                setSearchIsFocus(false);
                setPageNumber(1);
                _fetchData()
                return;
              }
              setSearchIsFocus(true);
              setSearch(text);
            }}
          />
          <TouchableOpacity onPress={() => setModalPatient(true)}>
            <Image
              style={{
                height: dimHeight * 0.04,
                width: dimHeight * 0.04,
                borderRadius: dimHeight * 0.04,
              }}
              source={{
                uri: patient.imageUrl
                  ? `${patient?.imageUrl}`
                  : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRH_WRg1exMTZ0RdW3Rs76kCOb9ZKrXddtQL__kEBbrS2lRWL3r',
              }}
            />
          </TouchableOpacity>
        </View>
      </View>

      <>
        <View
          style={{
            marginVertical: 12,
            width: '100%',
            paddingLeft: 12,
          }}
        >
          <View style={{ flexDirection: 'row' }}>
            <FlatList
              data={types}
              renderItem={renderType}
              keyExtractor={(_, index) => `${index}-type`}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>
        <View style={styles.docsContainer}>
          {data.length && !loading ? (
            <View style={styles.document}>
              <TouchableOpacity style={styles.textHeader}>
                <Text style={styles.textItem}>Terakhir diunggah </Text>
                <View style={{ marginTop: dimHeight * 0.005, paddingLeft: 10 }}>
                  <Ic_Sort />
                </View>
              </TouchableOpacity>
              <View>
                <FlatList
                  data={data}
                  keyExtractor={(item) => String(item._id)}
                  renderItem={({ item }) => {
                    return (
                      <CardDocument
                        item={item}
                        onOptionPressedHandler={onOptionPressedHandler}
                        {...props}
                        backTo={'ListDokumenMedis'}
                      />
                    );
                  }}
                  ListFooterComponent={() => {
                    return (
                      <View
                        style={{
                          padding: 10,
                          justifyContent: 'center',
                          alignItems: 'center',
                          flexDirection: 'row',
                        }}
                      >
                        {loadingPagination && (
                          <ActivityIndicator color="#005EA2" size={'small'} />
                        )}
                      </View>
                    );
                  }}
                  onEndReached={() => {
                    if (pageNumber !== totalPages) {
                      setPageNumber(pageNumber + 1);
                    }
                  }}
                  onEndReachedThreshold={0.5}
                />
              </View>
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
                <View
                  style={{
                    ...styles.document,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text style={styles.textItem}>Tidak ada dokumen</Text>
                </View>
              )}
            </>
          )}

          {loading === false &&
          searchIsFocus === false &&
          allowUploadDocument ? (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                height: '10%',
                width: '100%',
              }}
            >
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
            </View>
          ) : null}
          <ModalUploadDocument
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
      </>

      <SelectPatient
        modal={modalPatient}
        setModal={setModalPatient}
        accountOwner={accountOwner}
        family={family}
        title="Pilih Patient"
        setSelectedValue={(patient) => {
          setPatient(patient);
          setPageNumber(1);
          setLoadingPagination(false);
        }}
        navigateTo={(screen) => props.navigation.navigate(screen)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  docsContainer: {
    // padding: dimHeight * 0.02,
    // height: dimHeight * 0.84,
    justifyContent: 'space-between',
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#181818',
  },
  header: {
    flexDirection: 'row',
    height: dimHeight * 0.12,
    paddingTop: dimHeight * 0.045,
    backgroundColor: '#2F2F2F',
  },
  arrow: {
    flex: 0.12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchArea: {
    flex: 0.88,
    borderColor: '#DDDDDD',
    borderWidth: 1,
    height: dimHeight * 0.05,
    padding: dimHeight * 0.01,
    margin: dimHeight * 0.01,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textinput: {
    marginStart: 10,
    fontSize: 14,
    flex: 1,
    color: '#A2A2A2',
    width: '100%',
  },
  textHeader: {
    flexDirection: 'row',
    marginBottom: dimHeight * 0.02,
  },
  document: {
    // paddingBottom: dimHeight * 0.04,
    paddingLeft: 12,
    height: '85%',
  },
  cardDokumen: {
    height: dimHeight * 0.2,
    width: dimWidth * 0.48,
  },
  textItem: {
    color: '#B5B5B5',
  },
  dokumentName: {
    color: '#DDDDDD',
    fontSize: 12,
    fontWeight: 'bold',
  },
  buttonAdd: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#005EA2',
    borderRadius: 25,
    padding: 10,
    minWidth: '20%',
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
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
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
