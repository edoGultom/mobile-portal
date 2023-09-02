import React, { useEffect, useState } from 'react';
import { Image, PermissionsAndroid, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { IcEmptyImage } from '../../assets';
import { Button, Gap, Header, TextInput, Select, DatePickerFrm } from '../../components';
import { addPhotoKtp, submitFormSurat } from '../../redux/formSlice';
import { addLoading } from '../../redux/globalSlice';
import { getData, showMessage, useFormHook } from '../../utils';
import Moment from 'moment';
import 'moment/locale/id';

const FormUpload = ({ navigation }) => {
  const [photo, setPhoto] = useState('');
  const [userProfile, setUserProfile] = useState({});
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setDateSelected] = useState('');
  Moment.locale('id');

  const jenisKelamin = [
    {
      label: 'Pria',
      value: 'Pria',
    },
    {
      label: 'Wanita',
      value: 'Wanita',
    }
  ];
  const { photoKtpReducer } = useSelector(state => state);
  const dispatch = useDispatch();

  const [form, setForm] = useFormHook({
    nama_lengkap: '',
    tempat_lahir: '',
    tgl_lahir: '',
    jenis_kelamin: '',
    alamat: '',
    alamat_domisili: '',
    keterangan_tempat_tinggal: '',
    keterangan_keperluan_surat: '',
  });

  useEffect(() => {
    if (Platform.OS === 'android') {
      requestCameraPermission();
    }
  }, []);

  useEffect(() => {
    navigation.addListener('focus', () => {
      setPhoto('')
      getData('userProfile').then(res => {
        setUserProfile(res);
      });
    });
  }, [navigation]);

  const onSubmit = () => {
    if (photo.length < 1) {
      showMessage('Please select a file to continue!');
    } else {
      getData('token').then(res => {
        const token = res
        let updateForm = { ...form, tgl_lahir: Moment(form.tgl_lahir).format('YYYY-MM-DD') }
        const data = {
          updateForm,
          photoKtpReducer, //reducer upload
          token,
          userProfile,
          navigation
        };
        dispatch(addLoading(true));
        dispatch(submitFormSurat(data));
      });

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
          showMessage(' tidak memilih photo');
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
        // openCamera();
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
          showMessage(' tidak memilih photo');
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

  const toggleDatePicker = () => {
    setShowPicker(!showPicker)
  }

  return (

    <View style={styles.page}>
      <Header
        title="Form Registration"
        subtitle="Upload your document here"
        onBack={() => {
          navigation.goBack();
        }}
      />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.containerUp}>
          <TextInput
            label="Nama Lengkap"
            placeholder="Masukkan Nama Lengkap "
            value={form.nama_lengkap}
            onChangeText={value => setForm('nama_lengkap', value)}
          />
          <Gap height={16} />
          <TextInput
            label="Tempat Lahir"
            placeholder="Masukkan Tempat Lahir "
            value={form.tempat_lahir}
            onChangeText={value => setForm('tempat_lahir', value)}
          />
          <Gap height={16} />

          {
            showPicker && (
              <DatePickerFrm
                title="Pilih Tanggal"
                open={showPicker}
                mode="date"
                modal={showPicker}
                value={form.tgl_lahir}
                onConfirm={(date) => {
                  setForm('tgl_lahir', date)
                  setDateSelected(Moment(date).format('Do MMMM YYYY'))
                  toggleDatePicker(false)
                }}
                onCancel={() => {
                  toggleDatePicker(false)
                }}
              />
            )
          }

          <Pressable onPress={toggleDatePicker}>
            <TextInput
              label="Tanggal Lahir"
              placeholder={'Masukkan Tanggal Lahir '}
              value={selectedDate}
              editable={false}
              extraStyles={(selectedDate.length > 0) ? '#020202' : ''}
            />
          </Pressable>
          <Gap height={16} />
          <Select
            label="Jenis Kelamin"
            value={form.jenis_kelamin}
            data={jenisKelamin}
            placeholder='-Pilih Jenis Kelamin-'
            onSelectChange={value => setForm('jenis_kelamin', value)}
          />
          <Gap height={16} />
          <TextInput
            label="Alamat (Sesuai KTP)"
            placeholder="Masukkan Alamat "
            value={form.alamat}
            numberOfLines={3}
            onChangeText={value => setForm('alamat', value)}
          />
          <Gap height={16} />
          <TextInput
            label="Alamat Domisili"
            placeholder="Masukkan Alamat Domisili "
            numberOfLines={3}
            value={form.alamat_domisili}
            onChangeText={value => setForm('alamat_domisili', value)}
          />
          <Gap height={16} />
          <TextInput
            label="Keterangan Tempat Tingal"
            placeholder="Masukkan Keterangan Tempat Tingal "
            value={form.keterangan_tempat_tinggal}
            onChangeText={value => setForm('keterangan_tempat_tinggal', value)}
          />
          <Gap height={16} />
          <TextInput
            label="Keterangan Keperluan Surat"
            placeholder="Masukkan Keterangan Keperluan Surat "
            value={form.keterangan_keperluan_surat}
            onChangeText={value => setForm('keterangan_keperluan_surat', value)}
          />
          <Gap height={24} />

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
              onPress={openCamera}

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
            <Button text="Simpan" borderRadius={20} onPress={onSubmit} />
          </View>
        </View>
      </ScrollView>
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
    fontSize: 20,
    color: '#020202',
  },
  subtitle: {
    fontFamily: 'Poppins-Light',
    fontSize: 16,
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
