import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {Logo} from '../../assets';
import {getData} from '../../utils';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      // cek token di asyn storage
      getData('token').then(res => {
        if (res) {
          navigation.reset({index: 0, routes: [{name: 'MainApp'}]});
        } else {
          navigation.replace('SignIn');
        }
      });
    }, 2000);
  }, []);

  return (
    <View
      style={{
        backgroundColor: '#FBFBFB',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Logo />
      <View
        style={{
          height: 30,
        }}
      />
      <Text
        style={{
          fontSize: 32,
          color: '#808B97',
          fontFamily: 'Poppins-Medium',
        }}>
        Desa Beringin
      </Text>
    </View>
  );
};

export default SplashScreen;
