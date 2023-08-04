import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ProfileDummy} from '../../../assets';
import {getData} from '../../../utils';
import {BE_API_HOST} from '@env';

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
        <Text style={styles.appName}>Welcome,</Text>
        <Text style={styles.desc}>{username}</Text>
      </View>

      <Image source={photo} style={styles.profile} />
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
  profile: {width: 50, height: 50, borderRadius: 8},
});
