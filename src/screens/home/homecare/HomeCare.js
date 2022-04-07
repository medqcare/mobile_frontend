import React from 'react';
import { StyleSheet, View, BackHandler } from 'react-native';
import WebView from 'react-native-webview';
import GradientHeader from '../../../components/headers/GradientHeader';

export default function HomeCare(props) {
  const URL = 'https://goldencarenusantara.com';

  BackHandler.addEventListener('hardwareBackPress', () => {
    return props.navigation.pop();
  });

  return (
    <View style={styles.container}>
      <GradientHeader title="Home Care" navigate={props.navigation.navigate} />
      <WebView source={{ uri: URL }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F1F1F',
  },
});
