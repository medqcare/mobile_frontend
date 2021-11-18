import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  ShadowPropTypesIOS,
} from 'react-native';
import {connect} from 'react-redux';
import formatRP from '../../../helpers/rupiah';
import latLongToKM from '../../../helpers/latlongToKM';
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconAD from 'react-native-vector-icons/AntDesign';
import RatingStar from '../../../assets/svg/RatingStar';
import OptionButton from '../../../assets/svg/OptionButton'
import Modal from 'react-native-modal';

const ListFavDoctor = ({data, navigation, deleteFav}) => {
  console.log(data, 'Ini props nya yaa');
  // console.log(navigation, 'ini navigation nya !')
  const [send, setSend] = useState({
    doctorID: data._id,
  });
  const [modalKonfirmasi, setModalKonfirmasi] = useState(false)

  return (
    <View style={{flex: 1}}>
      <View style={styles.Container} >
        <View style={styles.Photo}>
          <Image
            style={{width: 50, height: 50, borderRadius: 50}}
            source={{
              uri: !data.photo
                ? 'https://image.freepik.com/free-vector/doctor-character-background_1270-84.jpg'
                : data.photo,
            }}
          />
        </View>
        <View style={styles.DetailDokter}>
          <Text style={{fontSize: 16, color: '#DDDDDD'}}>
            {data.title} {data.doctorName}
          </Text>
          <Text style={{...styles.TextContent, textTransform: 'capitalize', marginVertical: 5}}>
            {data.specialist}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 15,
            }}>
            <View style={{marginRight: 12}}>
              <RatingStar />
            </View>
            <Text style={{color: '#B2B2B2', marginRight: 15}}>4.7/5</Text>
            <View
              style={{
                backgroundColor: '#11BF66',
                height: 10,
                width: 10,
                borderRadius: 10,
                marginRight: 8,
              }}
            />
            <Text style={{color: '#B2B2B2'}}>Online</Text>
          </View>
          { data.facility &&
            data.facility[0].facilityEstPrice && (
            <View>
              <View style={{flexDirection: 'row', alignItems: 'center'}} />
              <Text style={{...styles.TextContent, color: '#DDDDDD'}}>
                {formatRP(data.facility[0].facilityEstPrice, 'IDR ')}
              </Text>
            </View>
          )}

          {/* {data.phoneNumber && <Text>{data.facility[0] ? data.facility[0].facilityName : ''}</Text>} */}
        </View>
        <View style={{flexDirection: 'column', justifyContent: 'space-between'}}>
            <View style={{alignItems: 'flex-end'}}>
                <TouchableOpacity
                    onPress={() => setModalKonfirmasi(true)}
                >
                <OptionButton />
                </TouchableOpacity>
            </View>
            <TouchableOpacity 
                onPress={() =>
                    navigation.navigate('DetailDoctor', {data: send, back: 'Filter'})}      
            >
            <View style={{width: 100, height: 35, backgroundColor: '#005EA2', borderRadius: 5, alignItems: 'center'}}>
                <Text style={{color: '#DDDDDD', fontSize: 12, marginTop: 8 }}>Buat Janji</Text>
            </View>
            </TouchableOpacity>
        </View>
      </View>
      {
        //   Hapus Favorite
        <Modal
        isVisible={modalKonfirmasi}
        swipeDirection={'down'}
        onSwipeComplete={() => setModalKonfirmasi(false)}
        style={{
          justifyContent: 'flex-end',
          margin: 0,
        }}
        animationType="slide"
        >
        <View style={viewModalP.container}>
          <View style={viewModalP.header}>
            <View style={viewModalP.toogle} />
          </View>
          <View style={viewModalP.patient}>
            <TouchableOpacity
              onPress={() => {
                setModalKonfirmasi(false);
                deleteFav(data._id)
                }}
              >
              <View>
                  <Text style={viewModalP.name}>
                    Hapus Dari Favorit
                  </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    // shadowColor: 'black',
    // shadowOpacity: 0.5,
    // marginBottom: Dimensions.get('screen').height * 0.01,
    // backgroundColor: '#FFFFFF',
    minWidth: 300,
    // alignItems: 'center',
    justifyContent: 'flex-start',
    // display: 'flex',
    flexDirection: 'row',
    // minHeight: minHeight,
    // maxHeight: Dimensions.get('screen').height * 0.20,
    // borderRadius: 6,
    paddingTop: 15,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 5,
    borderBottomColor: '#2F2F2F',
  },
  Photo: {
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
    height: 55,
    width: 55,
    overflow: 'hidden',
    padding: 5,
    borderWidth: 1,
    borderColor: '#33E204',
  },
  DetailDokter: {
    flex: 4,
  },
  TextContent: {
    fontSize: 12,
    color: '#DDDDDD',
  },
});

const viewModalP = StyleSheet.create({
    container: {
      maxHeight: '100%',
      backgroundColor: '#2F2F2F',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    header: {
      marginTop: 20,
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 20,
    },
    toogle: {
      position: 'absolute',
      borderWidth: 2,
      width: 50,
      borderColor: '#6C6C6C',
      alignContent: 'center',
      marginBottom: 20,
    },
    title: {
      color: 'white',
      fontSize: 13,
      textAlign: 'center',
      marginTop: 20,
    },
    patient: {
      marginHorizontal: 15,
      marginBottom: 20,
    },
    titleP: {
      color: 'white',
      fontSize: 12,
    },
    cardName: {
      marginTop: 10,
      borderColor: '#757575',
      borderWidth: 1,
      borderRadius: 3,
      minHeight: 50,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
    },
    familyName: {
      flexDirection: 'row',
    },
    photo: {
      marginVertical: 7,
      width: 35,
      height: 35,
      borderRadius: 50,
      borderWidth: 1,
      borderColor: '#4fe39b',
    },
    name: {
      marginTop: 15,
      marginLeft: 15,
      color: '#DDDDDD',
    },
    vector: {
      marginVertical: 20,
    },
    buttonAdd: {
      marginTop: 20,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    vectorPlus: {
      marginTop: 5,
      marginRight: 5,
    },
    addTitle: {
      color: '#4398D1',
    },
  });

export default ListFavDoctor;
