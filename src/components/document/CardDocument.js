import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import Ic_Dokumen from '../../assets/svg/ic_documen';
import Ic_Option from '../../assets/svg/ic_option';
import { dateWithDDMMMYYYYFormat } from '../../helpers/dateFormat';

const dimHeight = Dimensions.get('window').height;
const dimWidth = Dimensions.get('window').width;

export function CardDocument({
  item,
  onOptionPressedHandler,
  backTo,
  ...props
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        width: '100%',
        marginBottom: 12,
        paddingBottom: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#545454',
      }}
    >
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate('ShowDokumen', {
            uri: item.fileUrl,
            name: item.name,
            backTo: backTo,
          })
        }
        style={styles.imageDokumen}
      >
        <Image
          style={{ height: 50, width: 50 }}
          source={require('../../assets/png/pdf.png')}
        />
      </TouchableOpacity>
      <View
        style={{
          justifyContent: 'space-between',
          width: '50%',
        }}
      >
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate('ShowDokumen', {
              uri: item.fileUrl,
              name: item.name,
              backTo: 'ListDokumenMedis',
            })
          }
        >
          <Text style={styles.dokumentName} numberOfLines={4}>
            {item.name}
          </Text>
          <Text
            style={{
              color: '#b5b5b5',
              fontSize: 12,
              marginTop: 4,
            }}
          >
            dr. Corrie James Sp.JP, FIHA
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Text style={{ color: '#b5b5b5', fontSize: 10 }}>
            {item.createdAt
              ? `Diterima ${dateWithDDMMMYYYYFormat(new Date(item.createdAt))}`
              : null}
          </Text>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              width: 20,
              height: 15,
            }}
            onPress={() => onOptionPressedHandler(item)}
          >
            <Ic_Option />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  dokumentName: {
    color: '#DDDDDD',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
