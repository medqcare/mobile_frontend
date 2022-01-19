import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  ToastAndroid,
  StatusBar,
  TextInput,
  Image,
} from 'react-native';
import { getDocumentByPatient, setLoading } from '../../../stores/action';
import PictureModal from '../../../components/modals/profilePictureModal';
import DocumentOptionModal from '../../../components/modals/docOptionModal';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieLoader from 'lottie-react-native';
import { Ionicons } from '@expo/vector-icons';
import SearchIcon from '../../../assets/svg/Search';
import SelectPatient from '../../../components/modals/selectPatient';
import { CardDocument } from '../../../components/document/CardDocument';
import FilterList from '../../../components/FilterList';
const dimHeight = Dimensions.get('window').height;
const dimWidth = Dimensions.get('window').width;

function RujukanList(props) {
  const [modalAdd, setModalAdd] = useState(false);
  const [modalOption, setModalOption] = useState(false);
  const [modalSelectPatient, setModalSelectPatient] = useState(false);
  const [docs, setDocs] = useState([]);
  const [docsFiltered, setDocsFiltered] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [family, setFamily] = useState([]);
  const [patient, setPatient] = useState({
    _id: props.userData._id,
    imageUrl: props.userData.imageUrl,
  });
  const [types, setTypes] = useState(['rujukan', 'surat sakit']);
  const [typeSelected, setTypeSelected] = useState('rujukan');
  const [searchIsFocus, setIsFocusSearch] = useState(false);

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

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const tokenString = await AsyncStorage.getItem('token');
        const { token } = JSON.parse(tokenString);
        let type = 'rujukan,surat sakit';
        const { data: response } = await getDocumentByPatient(
          token,
          patient._id,
          type
        );
        const { data: docs } = response;
        const defaultDocs = docs.filter(
          (element) => element.type === 'rujukan'
        );
        setDocs(docs);
        setDocsFiltered(defaultDocs);
      } catch (error) {
        console.log(error.message, 'this is error from rujukan');
      } finally {
        setIsLoading(false);
      }
    })();
  }, [patient]);

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
      label: 'Share',
      url: require('../../../assets/png/documentPage/ic_share.png'),
    },
  ];

  const shareFileHandler = async () => {
    try {
      let fileUri = FileSystem.documentDirectory + selectedDoc.name;
      const { uri } = await FileSystem.downloadAsync(
        selectedDoc.fileUrl,
        fileUri
      );
      const isAvailable = await Sharing.isAvailableAsync();

      if (!isAvailable) {
        ToastAndroid.show(
          "Uh oh, sharing isn't available on your platform",
          ToastAndroid.LONG
        );
        return;
      }
      ToastAndroid.show('Process...', ToastAndroid.SHORT);
      await Sharing.shareAsync(uri);
    } catch (error) {
      console.log(error);
      ToastAndroid.show('Cancel...', ToastAndroid.SHORT);
    }
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
        break;
      }

      case 'Detail': {
        // props.navigation.navigate('ShowDokumen', {
        //   name: selectedReferenceFile.referral.title,
        //   base64:
        //     'data:application/pdf;base64,' +
        //     selectedReferenceFile.referral.base64,
        //   backTo: 'ListRujukan',
        // });
        break;
      }

      default: {
        break;
      }
    }
  }

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
          <Ionicons name="arrow-back" color="#fff" size={25} />
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
              setDocsFiltered([]);
              setIsFocusSearch(true);
            }}
            onChangeText={(text) => {
              if (text === '') {
                setDocsFiltered(docs.filter((el) => el.type === typeSelected));
                setIsFocusSearch(false);
                return;
              }
              setIsFocusSearch(true);
              const filteredBySearch = docs.filter((doc) =>
                doc.name.toLowerCase().startsWith(text.toLocaleLowerCase())
              );
              setDocsFiltered(filteredBySearch);
            }}
          />
          <TouchableOpacity onPress={() => setModalSelectPatient(true)}>
            <Image
              style={{
                height: dimHeight * 0.04,
                width: dimHeight * 0.04,
                borderRadius: dimHeight * 0.04,
              }}
              source={{
                uri: patient.imageUrl
                  ? `${patient.imageUrl}`
                  : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRH_WRg1exMTZ0RdW3Rs76kCOb9ZKrXddtQL__kEBbrS2lRWL3r',
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
      {searchIsFocus === false && (
        <View
          style={{
            flexDirection: 'row',
            marginBottom: 12,
            paddingLeft: 12,
          }}
        >
          <FilterList
            items={types}
            itemSelected={typeSelected}
            setItemSelected={setTypeSelected}
            onItemSelected={(item) => {
              setTypeSelected(item);
              const newFilteredDocs = docs.filter(
                (element) => element.type === item
              );
              setDocsFiltered(newFilteredDocs);
            }}
          />
        </View>
      )}
      {isLoading ? (
        <LottieLoader
          source={require('../../animation/loading.json')}
          autoPlay
          loop
        />
      ) : (
        <View style={styles.content}>
          {docsFiltered.length > 0 ? (
            <>
              <View style={styles.document}>
                <FlatList
                  data={docsFiltered}
                  keyExtractor={(_, idx) => String(idx)}
                  renderItem={({ item, index }) => {
                    return (
                      <CardDocument
                        item={item}
                        {...props}
                        backTo={'ListRujukan'}
                        onOptionPressedHandler={() => {
                          setSelectedDoc(item);
                          setModalOption(true);
                        }}
                      />
                      // <View style={styles.cardDokumen}>
                      //   <TouchableOpacity
                      //     style={styles.imageDokumen}
                      //     onPress={() =>
                      //       props.navigation.navigate('ShowDokumen', {
                      //         name: item.referral.title,
                      //         base64:
                      //           'data:application/pdf;base64,' +
                      //           item.referral.base64,
                      //         backTo: 'ListRujukan',
                      //       })
                      //     }
                      //   />
                      //   <TouchableOpacity
                      //     style={styles.detailCard}
                      //     onPress={() => {
                      //       setModalOption(true);
                      //       setSelectedReferenceFile(item);
                      //     }}
                      //   >
                      //     <View style={styles.iconDoc}>
                      //       <Ic_Dokumen />
                      //     </View>
                      //     <View
                      //       style={{
                      //         maxWidth: dimWidth * 0.25,
                      //         justifyContent: 'center',
                      //       }}
                      //     >
                      //       <Text style={styles.dokumentName}>
                      //         {item.referral.title}
                      //       </Text>
                      //     </View>
                      //     <View style={styles.iconOption}>
                      //       <Ic_Option />
                      //     </View>
                      //   </TouchableOpacity>
                      // </View>
                    );
                  }}
                />
              </View>
            </>
          ) : (
            <View style={{ display: "flex", height: "80%", alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{ color: '#fff' }}>
                Tidak ada surat {typeSelected}
              </Text>
            </View>
          )}
        </View>
      )}
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
      <SelectPatient
        modal={modalSelectPatient}
        setModal={setModalSelectPatient}
        accountOwner={props.userData}
        family={family}
        title="Pilih Patient"
        setSelectedValue={setPatient}
        navigateTo={(screen) => props.navigation.navigate(screen)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818',
  },
  header: {
    flexDirection: 'row',
    height: dimHeight * 0.12,
    paddingTop: dimHeight * 0.045,
    backgroundColor: '#2F2F2F',
    marginBottom: 12,
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
  },
  content: {
    height: dimHeight * 0.88,
    justifyContent: 'space-between',
    // padding: 20,
    paddingLeft: 12,
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
