import React, { useState } from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  TextInput,
  FlatList,
} from 'react-native';
import Modal from 'react-native-modal';
import {
  BLACK_SECONDARY,
  BLUE_PRIMARY,
  BLUE_RADIO,
  GREY_BORDER_LINE,
  GREY_SECONDARY,
  WHITE_PRIMARY,
} from '../../values/color';
import { INTER_400, INTER_500, INTER_700 } from '../../values/font';
import Gap from '../Gap';
import RightArrow from '../../assets/svg/RightArrow';
import ArrowLeft from '../../assets/svg/ArrowBack';
import SearchIcon from '../../assets/svg/Search';
import keys from '../../stores/keys';
import { useDispatch } from 'react-redux';

const { SET_DOCTORS_LOADING } = keys.doctorKeys;

const EXPERIENCE_DICTIONARY = {
  LT_5: {
    text: 'Kurang dari 5 Tahun',
    max: 5,
  },
  '5_TO_12': {
    text: '5-12 Tahun',
    min: 5,
    max: 10,
  },
  '10_TO_12': {
    text: '10 - 20 Tahun',
    max: 20,
    min: 10,
  },
  GT_20: {
    text: 'Lebih dari 20 tahun',
    min: 20,
  },
};

const GENDER_DICTIONARY = {
  MALE: {
    text: 'Laki-Laki',
    value: 'male',
  },
  FEMALE: {
    text: 'Perempuan',
    value: 'female',
  },
};

const EXPERIENCES_KEYS = Object.keys(EXPERIENCE_DICTIONARY);

const GENDER_KEYS = Object.keys(GENDER_DICTIONARY);

export default function ModalFilterDoctor({
  isVisible = false,
  onBackButtonPress,
  specialists = [],
  searchSpecialistHandler,
  searchByFilter,
  onCancel,
  close,
  darkMode
}) {
  const dispatch = useDispatch();
  const [selectedSpecialist, setSelectedSpecialist] = useState();
  const [selectedKeyExperience, setSelectedKeyExperience] = useState();
  const [selectedKeyGender, setSelectedKeyGender] = useState();
  const [listSpecialistsIsActive, setListSpecialistIsActive] = useState(false);

  const resetFilterHandler = () => {
    setSelectedKeyExperience();
    setSelectedKeyGender();
    setSelectedSpecialist();
  };

  const selectSpecialistHandler = (specialist) => {
    setSelectedSpecialist(specialist);
    setListSpecialistIsActive(false);
  };

  const onChangeTextInputSpecialistHandler = (keyword) => {
    if (typeof searchSpecialistHandler === 'function') {
      searchSpecialistHandler({
        search: keyword,
      });
    }
  };

  const onPressButtonApplyFilterHandler = async (keyword) => {
    const resultFilter = {};

    // if (selectedKeyExperience) {
    //   let { max, min } = EXPERIENCE_DICTIONARY[selectedKeyExperience];

    //   if (min) {
    //     resultFilter.minExperience = min;
    //   }

    //   if (max) {
    //     resultFilter.maxEperience = max;
    //   }
    // }

    if (selectedKeyGender) {
      resultFilter.gender = GENDER_DICTIONARY[selectedKeyGender].value;
    }

    if (selectedSpecialist) {
      resultFilter.specialist = selectedSpecialist.name;
    }

    if (typeof close === 'function') {
      close();
    }

    dispatch({
      type: SET_DOCTORS_LOADING,
      payload: true,
    });

    setTimeout(async () => {
      await searchByFilter(null, resultFilter);
    }, 1000);
  };

  const onPressButtonCancelHandler = async () => {
    if (typeof onCancel === 'function') {
      onCancel();
    }
  };

  const renderGender = (key, index) => {
    const { text } = GENDER_DICTIONARY[key];
    const isActive = key == selectedKeyGender;
    return (
      <View key={key} style={{ marginRight: 18 }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingVertical: 1,
          }}
          onPress={() => {
            setSelectedKeyGender(key);
          }}
        >
          <View style={[styles.radio, isActive ? styles.radioActive : null]}>
            {isActive ? (
              <View
                style={{
                  width: 8,
                  height: 8,
                  backgroundColor: WHITE_PRIMARY,
                  borderRadius: 99,
                }}
              ></View>
            ) : null}
          </View>
          <Gap width={18} />
          <Text style={darkMode ? styles.radioLabel : styles.radioLabelLight}>{text}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderExperiences = (key, index) => {
    const { text } = EXPERIENCE_DICTIONARY[key];
    const isActive = selectedKeyExperience === key;
    return (
      <View key={key}>
        <TouchableOpacity
          style={styles.rowItemCenter}
          onPress={() => {
            setSelectedKeyExperience(key);
          }}
          key={key}
        >
          <View
            style={[
              styles.radioRectangle,
              isActive
                ? styles.radioRectangleActive
                : styles.radioRectangleInActive,
            ]}
          >
            {isActive ? (
              <Text style={{ color: WHITE_PRIMARY, fontSize: 10 }}>
                &#10003;
              </Text>
            ) : null}
          </View>
          <Gap width={19.5} />
          <Text style={darkMode ? styles.radioLabel : styles.radioLabelLight}>{text}</Text>
        </TouchableOpacity>
        {EXPERIENCES_KEYS.length - 1 !== index ? <Gap height={16} /> : null}
      </View>
    );
  };

  const renderSpecialists = ({ item: specialist, index }) => {
    const lastIndex = specialists.length - 1 === index;
    return (
      <>
        <TouchableOpacity
          style={{
            paddingBottom: lastIndex === false ? 21 : null,
            borderBottomWidth: lastIndex === false ? 1 : null,
            borderBottomColor: lastIndex === false ? '#3E3D3D' : null,
          }}
          onPress={() => selectSpecialistHandler(specialist)}
        >
          <Text
            style={{
              color: darkMode ? WHITE_PRIMARY : "#4B4B4B",
              fontFamily: INTER_400,
              fontSize: 13,
            }}
          >
            {specialist.name}
          </Text>
        </TouchableOpacity>
        {specialists.length - 1 !== index ? <Gap height={18} /> : null}
      </>
    );
  };

  return (
    <Modal
      onBackdropPress={onBackButtonPress}
      isVisible={isVisible}
      animationIn={'fadeInUp'}
      animationOut={'fadeOutDown'}
      onBackButtonPress={() => {
        if (listSpecialistsIsActive === true) {
          setListSpecialistIsActive(false);
          return;
        }

        if (typeof onBackButtonPress === 'function') {
          onBackButtonPress();
        }
        resetFilterHandler();
      }}
      style={styles.modal}
    >
      <View style={darkMode ? styles.wrapper : styles.wrapperLight}>
        <>
          <View style={styles.toggleModal}></View>
          <Gap height={28} />
          {listSpecialistsIsActive === false ? (
            <View>
              <View>
                <View style={styles.row}>
                  <Text style={darkMode ? styles.modalTextTitle : styles.modalTextTitleLight}>Filter Dokter</Text>
                  <TouchableOpacity
                    style={styles.buttonResetFilter}
                    onPress={resetFilterHandler}
                  >
                    <Text style={styles.buttonResetFilterText}>
                      Hapus Filter
                    </Text>
                  </TouchableOpacity>
                </View>
                <Gap height={35} />
                <View style={[styles.sectionFilter]}>
                  <TouchableOpacity
                    style={styles.row}
                    onPress={() => {
                      setListSpecialistIsActive(true);
                    }}
                  >
                    <Text style={darkMode ? styles.filterTextTitle : styles.filterTextTitleLight}>
                      {selectedSpecialist == null
                        ? 'Pilih Spesialisasi'
                        : `Spesialis ${selectedSpecialist.name}`}
                    </Text>
                    <RightArrow darkMode={darkMode}/>
                  </TouchableOpacity>
                </View>
                <Gap height={25} />
                <View style={[styles.sectionFilter]}>
                  <Text style={darkMode ? styles.filterTextTitle : styles.filterTextTitleLight}>Jenis Kelamin</Text>
                  <Gap height={17}></Gap>
                  <View style={[styles.row, { justifyContent: 'flex-start' }]}>
                    {GENDER_KEYS.map(renderGender)}
                  </View>
                </View>
                <Gap height={25} />
                <View style={[styles.sectionFilter]}>
                  <Text style={darkMode ? styles.filterTextTitle : styles.filterTextTitleLight}>Pengalaman</Text>
                  <Gap height={16} />
                  <View>{EXPERIENCES_KEYS.map(renderExperiences)}</View>
                </View>
              </View>
              <Gap height={32} />
              <View style={[styles.row]}>
                <TouchableOpacity style={styles.buttonCancelFilter} onPress={onPressButtonCancelHandler}>
                  <Text style={darkMode ? styles.buttonTextLabel : styles.buttonTextLabelLight}>Batal</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonApplyFilter}
                  onPress={onPressButtonApplyFilterHandler}
                >
                  <Text style={styles.buttonTextLabel}>Terapkan</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={{ justifyContent: 'space-between' }}>
              <View style={[styles.row]}>
                <TouchableOpacity
                  onPress={() => setListSpecialistIsActive(false)}
                >
                  <ArrowLeft darkMode={darkMode}/>
                </TouchableOpacity>
                <Gap width={13.64} />
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    flex: 1,
                    paddingLeft: 25,
                    paddingVertical: 10,
                    borderWidth: 1,
                    borderColor: '#6895AB',
                    borderRadius: 99,
                  }}
                >
                  <SearchIcon darkMode={darkMode}/>
                  <Gap width={9.4} />
                  <TextInput
                    placeholder="Cari spesialisasi"
                    placeholderTextColor={darkMode ? WHITE_PRIMARY : "#4B4B4B"}
                    style={{
                      flex: 1,
                      paddingVertical: 4,
                      color: darkMode ? WHITE_PRIMARY : "#4B4B4B",
                      fontFamily: INTER_400,
                    }}
                    onChangeText={onChangeTextInputSpecialistHandler}
                  />
                </View>
              </View>
              <Gap height={24} />
              <FlatList
                data={specialists}
                keyExtractor={(item) => item._id}
                renderItem={renderSpecialists}
                style={{ height: '80%' }}
              />
            </View>
          )}
        </>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    flex: 1,
    margin: 0,
    maxHeight: '100%',
  },
  wrapper: {
    backgroundColor: BLACK_SECONDARY,
    paddingHorizontal: 12,
    paddingTop: 18,
    paddingBottom: 24,
    justifyContent: 'space-between',
    borderTopLeftRadius: 20.8,
    borderTopRightRadius: 20.8,
    flex: 0.8,
  },
  wrapperLight: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 12,
    paddingTop: 18,
    paddingBottom: 24,
    justifyContent: 'space-between',
    borderTopLeftRadius: 20.8,
    borderTopRightRadius: 20.8,
    flex: 0.8,
  },
  toggleModal: {
    width: 55,
    borderWidth: 2,
    borderColor: GREY_SECONDARY,
    borderRadius: 2,
    alignSelf: 'center',
  },
  modalTextTitle: {
    color: WHITE_PRIMARY,
    fontFamily: INTER_400,
    fontSize: 16,
  },
  modalTextTitleLight: {
    color: "#4B4B4B",
    fontFamily: INTER_400,
    fontSize: 16,
  },
  buttonResetFilter: {
    paddingVertical: 5,
    paddingHorizontal: 8,
    alignItems: 'center',
    backgroundColor: '#3F3F3F',
    alignSelf: 'flex-start',
    borderRadius: 4,
  },
  buttonResetFilterText: {
    fontFamily: INTER_500,
    color: WHITE_PRIMARY,
    fontSize: 11,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  filterTextTitle: {
    color: WHITE_PRIMARY,
    fontFamily: INTER_700,
    fontWeight: 'bold',
    fontSize: 14,
  },
  filterTextTitleLight: {
    color: "#4B4B4B",
    fontFamily: INTER_700,
    fontWeight: 'bold',
    fontSize: 14,
  },
  sectionFilter: {
    paddingBottom: 19,
    borderBottomWidth: 1,
    borderBottomColor: '#505050',
  },
  radio: {
    width: 16,
    height: 16,
    borderRadius: 99,
    borderColor: GREY_SECONDARY,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioActive: {
    backgroundColor: BLUE_RADIO,
  },
  radioLabel: {
    color: WHITE_PRIMARY,
    fontFamily: INTER_400,
    fontSize: 15,
  },
  radioLabelLight: {
    color: "#4B4B4B",
    fontFamily: INTER_400,
    fontSize: 15,
  },
  radioRectangle: {
    width: 17,
    height: 17,
    borderRadius: 1.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioRectangleActive: {
    backgroundColor: BLUE_RADIO,
  },
  radioRectangleInActive: {
    borderWidth: 0.7,
    borderColor: WHITE_PRIMARY,
  },
  buttonApplyFilter: {
    paddingVertical: 13,
    paddingHorizontal: 46,
    backgroundColor: BLUE_PRIMARY,
    borderRadius: 4,
    alignItems: 'center',
    minWidth: 163,
  },
  buttonCancelFilter: {
    paddingVertical: 13,
    paddingHorizontal: 46,
    alignItems: 'center',
    borderColor: GREY_BORDER_LINE,
    borderRadius: 4,
    borderWidth: 1,
    minWidth: 163,
  },
  buttonTextLabel: {
    color: WHITE_PRIMARY,
    fontSize: 14,
    fontFamily: INTER_500,
  },
  buttonTextLabelLight: {
    color: "#4B4B4B",
    fontSize: 14,
    fontFamily: INTER_500,
  },
  rowItemCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
