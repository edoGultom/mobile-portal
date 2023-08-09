import React, { useEffect, useState } from 'react';
import { Button, Header, HomeProfile } from '../../components';
import { getData, showMessage } from '../../utils';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { IcEmptyImage } from '../../assets';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { addPhotoKtp } from '../../redux/formSlice';
import { useDispatch } from 'react-redux';
import { PermissionsAndroid } from 'react-native';

const FormUpload = ({ navigation }) => {
  const [photo, setPhoto] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    navigation.addListener('focus', () => {
      setPhoto('')
    });
  }, [navigation]);

  const onContinue = () => {
    if (photo.length < 1) {
      showMessage('Please select a file to continue!');
    } else {
      navigation.navigate('SuccessUpload');
    }
  };
  const openCamera = () => {
    launchCamera(
      {
        quality: 0.5,
        maxHeight: 300,
        maxWidth: 300,
        mediaType: 'photo',
        saveToPhotos: true,
        includeBase64: true,
      },
      response => {
        if (response.didCancel || response.errorCode) {
          showMessage('Anda tidak memilih photo');
        } else {
          if (response.assets && response.assets?.length !== 0) {
            const source = { uri: response.assets[0].uri };
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
  }
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "App Camera Permission",
          message: "App needs access to your camera ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        openCamera();
      } else {
        showMessage('Access Camera denied');
      }
    } catch (err) {
      // console.warn(err);
      showMessage(err);
    }
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
            const source = { uri: response.assets[0].uri };
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
                foreground: true,
              }}
              onPress={choosePhoto}
              style={{
                width: 345,
                height: 175,
                justifyContent: 'center',
                alignItems: 'center',
                elevation: 4,
              }}>
              {photo ? (
                <Image source={photo} style={styles.photoKtp} />
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
            <Text style={{ width: 50, textAlign: 'center', color: '#808B97' }}>
              Or
            </Text>
          </View>
          <View style={{ flex: 1, height: 1, backgroundColor: '#E2E7EC' }} />
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
            textColor="#DEAC02"
            borderRadius={20}
            onPress={requestCameraPermission}

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
          <Button text="Upload Photo" borderRadius={20} onPress={onContinue} />
        </View>
      </View>
    </View>
  );
};
export default FormUpload;
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
  photoKtp: {
    width: undefined,
    height: '100%',
    aspectRatio: 1,
    alignSelf: 'center',
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
  page: { flex: 1, backgroundColor: 'white' },
});
