import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ProfileDummy } from '../../../assets';
import { getData } from '../../../utils';
import { BE_API_HOST } from '@env';
import { COLORS, SIZES } from '../../../constants';

const HomeProfile = () => {
  const [photo, setPhoto] = useState(ProfileDummy);
  const [username, setUsername] = useState('');

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
      <View>
        <Text style={styles.appName}>Hello {username} </Text>
        <Text style={styles.desc}>Welcome to portal app</Text>
      </View>

      <View style={styles.imageContainer}>
        <Image source={photo} style={styles.image} resizeMode='cover' />
      </View>
    </View>
  );
};

export default HomeProfile;

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 22,
    paddingBottom: 20,
    backgroundColor: 'white',
  },
  appName: {
    fontSize: 22,
    fontFamily: 'Poppins-Medium',
    color: '#020202',
  },
  desc: {
    fontSize: 14,
    color: '#8D92A3',
    fontFamily: 'Poppins-Light',
  },
  image: { width: '100%', height: '100%', borderRadius: 8 },
  imageContainer: {
    width: 50,
    height: 50,
    backgroundColor: 'white',
    borderRadius: SIZES.small / 1.25,
    justifyContent: "center",
    alignItems: "center",
  },
});
