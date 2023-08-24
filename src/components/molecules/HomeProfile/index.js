import { BE_API_HOST } from '@env';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { IcNotifOff, ProfileDummy } from '../../../assets';
import { SIZES } from '../../../constants';
import { getData } from '../../../utils';

const HomeProfile = () => {
  const [photo, setPhoto] = useState(ProfileDummy);
  const [username, setUsername] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    getData('userProfile').then(res => {
      setPhoto({
        uri: `${BE_API_HOST}/lihat-file/profile?path=${res.profile_photo_path}`,
      });
      setUsername(res.username);
    });
  }, []);
  return (
    <View style={styles.profileContainer}>
      <View >
        <Text style={styles.appName}>Hello {username} </Text>
        <Text style={styles.desc}>Welcome to portal app</Text>
      </View>
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', gap: 10 }}>
        <Pressable
          android_ripple={{
            color: '#CFD2CF',
            borderless: false,
            foreground: true,
          }}
          style={styles.back}
          onPress={() => navigation.navigate('Notif')}
        >
          <IcNotifOff />
        </Pressable>
        <View style={styles.imageContainer}>
          <Image source={photo} style={styles.image} resizeMode='cover' />
        </View>
      </View>
    </View>
  );
};

export default HomeProfile;

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingTop: 22,
    paddingBottom: 20,
    backgroundColor: 'white',
  },
  appName: {
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
    color: '#020202',
  },
  desc: {
    fontSize: 12,
    color: '#8D92A3',
    fontFamily: 'Poppins-Light',
  },
  image: { width: '100%', height: '100%', borderRadius: 8 },
  imageContainer: {
    width: 35,
    height: 35,
    backgroundColor: 'white',
    borderRadius: SIZES.small / 1.25,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: 'row',
  },
});
