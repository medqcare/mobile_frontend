import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';

import IconInformation from '../../assets/svg/IconInformation';
import CloseButton from '../../assets/svg/CloseButton';
import { dateWithDDMMMYYYYFormat } from '../../helpers/dateFormat';
const NotificationCard = ({
  onButtonDetailPress,
  onButtonClosePress,
  notification,
}) => {
  return (
    <View
      style={{
        borderRadius: 4,
        backgroundColor: '#2F2F2F',
        paddingHorizontal: 12,
        paddingVertical: 14,
        justifyContent: 'space-between',
        height: heightPercentageToDP('15%'),
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          height: '50%',
          justifyContent: 'space-between',
          marginBottom: 24,
        }}
      >
        <IconInformation />
        <View style={{ width: '85%', marginLeft: 6 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 2,
            }}
          >
            <Text style={{ color: '#A1A1A1', fontSize: 12 }}>
              Book Appointment
            </Text>
            <View
              style={{
                height: 3,
                width: 3,
                borderRadius: 100,
                backgroundColor: '#B5B5B5',
                marginHorizontal: 8,
              }}
            ></View>
            <Text style={{ color: '#A1A1A1', fontSize: 12 }}>
              {dateWithDDMMMYYYYFormat(new Date(notification.createdAt))}
            </Text>
          </View>
          <Text style={{ color: '#DDDDDD' }} numberOfLines={2}>
            {`${notification.title}`}
          </Text>
        </View>
        <TouchableOpacity onPress={onButtonClosePress}>
          <CloseButton color="#888888" />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'flex-end',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity onPress={onButtonDetailPress}>
          <Text style={{ color: '#F37335' }}>Lihat detail</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NotificationCard;
