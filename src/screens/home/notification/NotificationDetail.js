import React from 'react';
import { View, Text } from 'react-native';
import GreyHeader from '../../../components/headers/GreyHeader';

const NotificationDetail = (props) => {
  const notification = props.navigation.getParam('notification');
  // console.log(notification);
  return (
    <View style={{ flex: 1, backgroundColor: '#2f2f2f' }}>
      <GreyHeader
        title=""
        navigateBack="Notification"
        navigate={props.navigation.navigate}
      />
      <View style={{ paddingHorizontal: 12 }}>
        <View
          style={{
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              color: '#f8fafc',
              fontSize: 24,
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: 24,
            }}
          >
            {notification.title}
          </Text>
          <Text
            style={{
              color: '#f8fafc',
              textAlign: 'left',
              fontSize: 14,
              textAlign: 'center',
              letterSpacing: 2,
            }}
          >
            {notification.message}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default NotificationDetail;
