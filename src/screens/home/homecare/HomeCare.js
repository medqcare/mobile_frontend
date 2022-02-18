import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeArewaView, StyleSheet, Platform, Text, View } from 'react-native';
import WebView from 'react-native-webview';
import GradientHeader from '../../../components/headers/GradientHeader';

export default function HomeCare(props) {
  const URL = 'https://goldencarenusantara.com';
  return (
    <View style={styles.container}>
      <GradientHeader title="Home Care" navigate={props.navigation.navigate} />
      <WebView source={{ uri: URL }}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F1F1F',
  },
});
