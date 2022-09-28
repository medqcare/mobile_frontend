import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

import CloseButton from '../../assets/svg/CloseButton';
import { dateWithDDMMMYYYYFormat } from '../../helpers/dateFormat';
import {
  BLACK_SECONDARY,
  BLACK_THIRD,
  GREY_BORDER_LINE,
  WHITE_PRIMARY,
  WHITE_SECONDARY,
} from '../../values/color';
import { INTER_400, INTER_700 } from '../../values/font';
import Gap from '../Gap';
function NotificationCard ({
  onCardPress,
  onButtonClosePress,
  notification,
  darkMode
}) {
  const { isViewed } = notification

  function getStyles(isView){
    let result
    if (darkMode) {
      isView ? result = styles.containerViewed : result = styles.container
    } else {
      isView ? result = styles.containerLightViewed : result = styles.containerLight
    }
    return result
  }


  return (
    <TouchableOpacity
      style={getStyles(isViewed)}

      onPress={() => {
        if (typeof onCardPress === 'function') {
          onCardPress()
        }
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          shadowColor: BLACK_THIRD,
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.23,
          shadowRadius: 2.62,

          elevation: 4,
        }}
      >
        <View style={{ width: '85%' }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 2,
            }}
          >
            <Text style={{ color: '#A1A1A1', fontSize: 12, fontWeight: isViewed ? 'normal' : 'bold' }}>
              {dateWithDDMMMYYYYFormat(new Date(notification.createdAt))}
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={onButtonClosePress}>
          <CloseButton color="#888888" />
        </TouchableOpacity>
      </View>
      <Gap height={4} />
      <View>
        <Text
          style={{
            color: darkMode ? WHITE_PRIMARY : "#4B4B4B",
            fontSize: 16,
            fontFamily: INTER_700,
            fontWeight: isViewed ? 'normal' : 'bold'
          }}
          numberOfLines={2}
        >
          {`${notification.title}`}
        </Text>
        <Gap height={4} />
        <Text
          style={{
            color: darkMode ? WHITE_SECONDARY : "#4B4B4B",
            fontSize: 14,
            fontFamily: INTER_400,
            fontWeight: isViewed ? 'normal' : 'bold'
          }}
          numberOfLines={3}
        >
          {notification.message}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    backgroundColor: GREY_BORDER_LINE,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  containerViewed: {
    borderRadius: 4,
    backgroundColor: BLACK_SECONDARY,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  containerLight: {
    borderRadius: 4,
    backgroundColor: "#E8E8E8",
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  containerLightViewed: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    paddingHorizontal: 12,
    paddingVertical: 12,
  }
})

export default NotificationCard;
