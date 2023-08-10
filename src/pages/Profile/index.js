import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { ProfileTabSection } from '../../components';
import { getData } from '../../utils';
import { BE_API_HOST } from '@env';

const Profile = ({ navigation }) => {
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    navigation.addListener('focus', () => {
      getData('userProfile').then(res => {
        setUserProfile(res);
      });
    });
  }, [navigation]);

  return (
    <View style={styles.page}>
      <View style={styles.profileDetail}>
        <View style={styles.photo}>
          <View style={styles.borderPhoto}>
            <Image
              source={{
                uri: `${BE_API_HOST}/lihat-file/profile?path=${userProfile.profile_photo_path}`,
              }}
              style={styles.photoContainer}
            />
          </View>
        </View>
        <Text style={styles.name}>{userProfile.name}</Text>
        <Text style={styles.email}>{userProfile.email}</Text>
      </View>

      <View style={styles.tabSaction}>
        <ProfileTabSection />
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  profileDetail: {
    backgroundColor: 'white',
    paddingBottom: 26,
  },
  name: {
    fontFamily: 'Poippins-Medium',
    fontSize: 18,
    color: '#020202',
    textAlign: 'center',
  },
  email: {
    fontFamily: 'Poippins-Regular',
    fontSize: 14,
    color: '#8D92A3',
    textAlign: 'center',
  },
  page: {
    flex: 1,
  },
  photo: {
    alignItems: 'center',
    marginTop: 26,
    marginBottom: 16,
  },
  addPhoto: {
    fontSize: 14,
    fontFamily: 'Poppins-Light',
    color: '#8D92A3',
    textAlign: 'center',
  },
  photoContainer: {
    width: 90,
    height: 90,
    borderRadius: 90,
    backgroundColor: '#F0F0F0',
    padding: 24,
  },
  borderPhoto: {
    borderWidth: 1,
    borderColor: '#8D92A3',
    width: 110,
    height: 110,
    borderRadius: 110,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabSaction: {
    flex: 1,
    marginTop: 24,
  },
});
