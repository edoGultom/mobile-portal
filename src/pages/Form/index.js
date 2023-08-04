import React, {useEffect, useState} from 'react';
import {Button, Header, HomeProfile} from '../../components';
import {getData, showMessage} from '../../utils';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import {IcEmptyImage} from '../../assets';
import {launchImageLibrary} from 'react-native-image-picker';
import {addPhotoKtp} from '../../redux/formSlice';

const Form = ({navigation}) => {
  const [userProfile, setUserProfile] = useState({});
  const [photo, setPhoto] = useState('');

  useEffect(() => {
    getData('userProfile').then(res => {
      setUserProfile(res);
    });
  }, []);
  const onContinue = () => {
    navigation.navigate('FormDetail');
  };
  const choosePhoto = () => {
    launchImageLibrary(
      {
        quality: 0.5,
        maxHeight: 300,
        maxWidth: 300,
      },
      response => {
        if (response.didCancel || response.errorCode) {
          showMessage('Anda tidak memilih photo');
        } else {
          if (response.assets && response.assets?.length !== 0) {
            const source = {uri: response.assets[0].uri};
            const datImage = {
              uri: response.assets[0].uri,
              type: response.assets[0].type,
              name: response.assets[0].fileName,
              isUploadPhoto: true,
            };
            setPhoto(source);
            dispatch(addPhotoKtp(datImage));
          }
        }
      },
    );
  };
  return (
    <View style={styles.page}>
      <Header
        title="Form Registration"
        subtitle="Upload your document here"
        onBack={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.containerUp}>
        <Text style={styles.title}>Upload a photo e-KTP </Text>
        <Text style={styles.subtitle}>
          Regulation require you to upload a national identity card. Don't
          worry, your data will stay safe and private.
        </Text>
        <View style={styles.photo}>
          <View style={styles.borderPhoto}>
            <Pressable
              android_ripple={{
                color: 'rgb(224, 224, 224)',
                borderless: true,
                foreground: true,
              }}
              onPress={choosePhoto}
              style={{
                height: 75,
                width: 75,
                justifyContent: 'center',
                alignItems: 'center',
                elevation: 4,
              }}>
              {photo ? (
                <Image source={photo} style={styles.photoContainer} />
              ) : (
                <View style={styles.photoContainer}>
                  <IcEmptyImage />
                  <Text
                    style={{
                      color: '#808B97',
                      fontFamily: 'Poppins-Medium',
                      fontWeight: 500,
                      marginTop: 15,
                    }}>
                    Select File
                  </Text>
                </View>
              )}
            </Pressable>
          </View>
        </View>
      </View>
      <View style={styles.containerDown}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
            alignSelf: 'center',
          }}>
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: '#E2E7EC',
            }}
          />
          <View>
            <Text style={{width: 50, textAlign: 'center', color: '#808B97'}}>
              Or
            </Text>
          </View>
          <View style={{flex: 1, height: 1, backgroundColor: '#E2E7EC'}} />
        </View>
        <View
          style={{
            flex: 1,
            alignSelf: 'center',
            width: '100%',
            justifyContent: 'center',
            padding: 20,
          }}>
          <Button
            text="Open Camera & Take Photo"
            color="#FFF1C1"
            textColor="#FCC400"
            borderRadius={20}
          />
        </View>
        <View
          style={{
            flex: 1,
            alignSelf: 'center',
            width: '100%',
            justifyContent: 'center',
            padding: 20,
          }}>
          <Button text="Continue" borderRadius={20} onPress={onContinue} />
        </View>
      </View>
    </View>
  );
};
export default Form;
const styles = StyleSheet.create({
  containerUp: {
    marginTop: 20,
    padding: 20,
    flex: 3,
  },
  containerDown: {
    flex: 2,
  },
  borderOr: {
    marginTop: 40,
    color: '#808B97',
    fontFamily: 'Poppins-Medium',
    fontWeight: '700',
  },
  photo: {
    alignItems: 'center',
    marginTop: 15,
  },

  photoContainer: {
    width: 345,
    height: 175,
    borderRadius: 15,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
    // padding: 20,
  },
  borderPhoto: {
    borderWidth: 2,
    borderColor: '#78B7BB',
    width: 350,
    height: 180,
    borderRadius: 15,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F1F3',
  },
  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: 30,
    color: '#020202',
  },
  subtitle: {
    fontFamily: 'Poppins-Light',
    fontSize: 18,
    color: '#8D92A3',
  },
  header: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    // marginTop: 12,
  },
  headerTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 20,
    color: '#020202',
    marginHorizontal: 24,
  },
  page: {flex: 1, backgroundColor: 'white'},
});
