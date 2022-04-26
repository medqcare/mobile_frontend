import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import CloseButton from '../../assets/svg/CloseButton';
import { dateWithDDMMMYYYYFormat } from '../../helpers/dateFormat';
import {
  BLACK_SECONDARY,
  BLACK_THIRD,
  WHITE_PRIMARY,
  WHITE_SECONDARY,
} from '../../values/color';
import { INTER_400, INTER_700 } from '../../values/font';
import Gap from '../Gap';
const NotificationCard = ({
  onCardPress,
  onButtonClosePress,
  notification,
}) => {
  return (
    <TouchableOpacity
      style={{
        borderRadius: 4,
        backgroundColor: BLACK_SECONDARY,
        paddingHorizontal: 12,
        paddingVertical: 12,
      }}

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
            <Text style={{ color: '#A1A1A1', fontSize: 12 }}>
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
            color: WHITE_PRIMARY,
            fontSize: 16,
            fontFamily: INTER_700,
          }}
          numberOfLines={2}
        >
          {`${notification.title}`}
        </Text>
        <Gap height={4} />
        <Text
          style={{
            color: WHITE_SECONDARY,
            fontSize: 14,
            fontFamily: INTER_400,
          }}
          numberOfLines={3}
        >
          {notification.message}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default NotificationCard;
