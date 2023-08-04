import React from 'react';
import {ActivityIndicator} from 'react-native';
import LottieView from 'lottie-react-native';
import {StyleSheet, View, Text, StatusBar} from 'react-native';

export default function Loading() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* <ActivityIndicator size="large" color="#78B7BB" /> */}
        <LottieView
          source={require('../../../assets/Ilustration/loading.json')}
          style={styles.animation}
          autoPlay
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  animation: {
    width: 100,
    height: 100,
  },
  container: {
    position: 'absolute',
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: 100,
    height: 100,
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    // marginTop: 5
  },
});
