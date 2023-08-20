import React, { useEffect, useState } from 'react';
import { FlatList, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { IcEmptyImage } from '../../assets';
import { Button, Fab, Gap, Header, ItemList, ModalShow } from '../../components';
import { COLORS, SIZES } from '../../constants';
import { getPengaduan, pengaduanAction } from '../../redux/pengaduanSlice';
import { getData, showMessage, useFormHook } from '../../utils';
import { BE_API_HOST } from '@env';

const Pengaduan = ({ navigation }) => {
  const { pengaduanReducer } = useSelector(state => state);

  const [isModalForm, setModalForm] = useState(false);
  const [isModalDetail, setModalDetail] = useState(false);
  const [dataSelected, setSelected] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    getData('token').then(res => {
      const tokenApi = `${res.value}`;
      dispatch(getPengaduan(tokenApi));
    });
  }, []);

  const toggleModal = () => {
    setModalForm(!isModalForm);
  };

  const FormPengaduan = () => {
    const [form, setForm] = useFormHook({
      isi: '',
      subjek: '',
      file: {}
    });
    const onSubmit = () => {
      if (form.isi.length < 1 || form.subjek.length < 1) {
        setModalForm(!isModalForm);
        showMessage('Silahkan isi form');
      } else {
        getData('token').then(res => {
          const token = res
          const obj = {
            token,
            form,
            navigation,
          };

          setModalForm(!isModalForm);
          dispatch(pengaduanAction(obj));
          setForm('reset')
        });

      }

    };
    const choosePhoto = () => {
      launchImageLibrary(
        {
          quality: 0.9,
          // maxHeight: 500,
          // maxWidth: 500,
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
              setForm('file', datImage);
            }
          }
        },
      );
    };
    return (
      <ModalShow show={isModalForm} setModal={setModalForm}>
        <Text style={styles.label}>Pengaduan</Text>
        <TextInput
          placeholder='Masukkan Subjek'
          value={form.subjek}
          style={styles.subjek}
          onChangeText={value => setForm('subjek', value)}
        />
        <Gap height={10} />
        <TextInput
          key={2}
          multiline={true}
          numberOfLines={3}
          textAlignVertical="top"
          placeholder='Masukkan Isi'
          value={form.isi}
          style={styles.isi}
          onChangeText={value => setForm('isi', value)}
        />
        <Gap height={10} />
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
              {form?.file?.uri ? (
                <Image source={{ uri: `${form.file.uri}` }} style={styles.photoKtp} />
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
        <Gap height={10} />
        <Button
          text="Kirim"
          onPress={onSubmit}
        />
      </ModalShow>
    )
  }
  const DetailPengaduan = (id) => {
    return (
      <ModalShow show={isModalDetail} setModal={setModalDetail}>
        <View style={{ padding: 10 }}>
          <Text style={styles.label}>Keterangan Pengaduan </Text>
          <Text>{dataSelected.isi}</Text>
        </View>
        <View style={{ alignSelf: 'center', borderRadius: 5 }}>
          <Image
            source={{
              uri: `http://127.0.0.1:8091/api/lihat-file/by-id?id=29`,
            }}
            style={styles.image}
          />

        </View>
      </ModalShow>
    )
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite, }}>
      <Header
        title="Pengaduan"
        subtitle="Silahkan tambah pengaduan Anda disini"
      />
      <ScrollView index={1} showsVerticalScrollIndicator={false}>
        <View style={styles.page}>
          {
            pengaduanReducer.listPengaduan.length > 0 ?
              (
                <FlatList
                  data={pengaduanReducer.listPengaduan}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <ItemList
                      key={item}
                      type="pengaduan"
                      judul={item.subjek}
                      kategori={item.isi}
                      date={item.tgl_pengaduan}
                      items={item}
                      onPress={() => {
                        setModalDetail(!isModalDetail)
                        setSelected(item)
                      }
                      }
                    />
                  )}
                  keyExtractor={item => item}
                  contentContainerStyle={{ columnGap: SIZES.medium }}
                  vertical
                />
              ) :
              (
                <Text style={{ justifyContent: 'center', alignSelf: 'center' }}>Data Tidak Ditemukan</Text>
              )
          }
        </View>
      </ScrollView>
      <Fab
        style={styles.floatinBtn}
        onPress={toggleModal}
      />
      {/* <DetailPengaduan />
       */}
      {/* MODAL FORM */}
      {isModalForm && (
        <FormPengaduan />
      )}
      {isModalDetail && (
        <DetailPengaduan />
      )}
    </SafeAreaView>
  );
};
export default Pengaduan;

const styles = StyleSheet.create({
  photoKtp: {
    width: undefined,
    height: '100%',
    aspectRatio: 1,
    alignSelf: 'center',
  },
  photo: {
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 8,
    overflow: 'hidden',
    marginVertical: 12,
    marginHorizontal: 12,
  },
  photoContainer: {
    width: 345,
    height: 175,
    borderRadius: 15,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  borderPhoto: {
    borderWidth: 2,
    borderColor: '#78B7BB',
    width: 350,
    height: 180,
    borderRadius: 10,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F1F3',
  },
  textInput: {
    alignSelf: "stretch",
    marginHorizontal: 12,
    marginBottom: 12,
    padding: 12,
    borderRadius: 12,
    backgroundColor: "grey",
    color: "white",
    textAlign: "center",
  },
  label: { fontSize: 16, fontFamily: 'Poppins-Regular', color: '#020202' },
  isi: { borderWidth: 1, borderColor: '#020202', borderRadius: 8, padding: 10 },
  subjek: { borderWidth: 1, borderColor: '#020202', borderRadius: 8, padding: 5 },

  page: {
    flex: 1,
    marginTop: 10
  },
  floatinBtn: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    margin: 20
  },
});
