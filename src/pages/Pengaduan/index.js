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
  const [photos, setPhotos] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    navigation.addListener('focus', () => {
      getData('token').then(res => {
        const tokenApi = `${res.value}`;
        dispatch(getPengaduan(tokenApi));
      });
    });
  }, [navigation]);

  const toggleModal = () => {
    setModalForm(!isModalForm);
    setPhotos([])
  };

  const choosePhoto = () => {
    launchImageLibrary(
      {
        // quality: 0.9,
        quality: 1.0,
        selectionLimit: 3,
        mediaType: 'photo',
      },
      response => {
        if (response.didCancel || response.errorCode) {
          showMessage('Anda tidak memilih photo');
        } else {
          if (response.assets && response.assets?.length !== 0) {

            let results = [];
            let temp = [];
            response.assets.forEach(imageInfo => {
              let checkFiles = checkPhoto(imageInfo.fileSize);
              if (checkFiles.length === 0) {
                results.push(imageInfo)
              }
            });


            if (response.assets.length > 1) {
              // multi images. ***it doesn't work!!!***
              setPhotos([...results, ...photos]); // a list
            } else {
              //image only 1  **it works!**
              setPhotos(results); // a list 
            }
          }
        }
      },
    );
  };
  const checkPhoto = (size) => {
    return photos.filter(item => {
      return item.fileSize === size
    })
  };

  const FormPengaduan = () => {
    const [form, setForm] = useFormHook({
      isi: '',
      subjek: '',
    });

    const onSubmit = () => {
      if (form.isi.length < 1 || form.subjek.length < 1) {
        setModalForm(!isModalForm);
        showMessage('Silahkan isi form!');
      } else {
        getData('token').then(res => {
          const token = res

          const obj = {
            token,
            form,
            photos,
            navigation,
          };

          setModalForm(!isModalForm);
          dispatch(pengaduanAction(obj));
          setForm('reset')
        });

      }

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
                height: 110,
                justifyContent: 'space-around',
                alignItems: 'start',
                elevation: 4,
              }}>

              <View style={styles.photoContainer}>
                <IcEmptyImage />
                <Text
                  style={{
                    color: '#808B97',
                    fontFamily: 'Poppins-Medium',
                    fontWeight: 500,
                    marginTop: 10,
                  }}>
                  Select Files
                </Text>
              </View>
            </Pressable>
          </View>
        </View>
        <Gap height={10} />
        {
          photos.length > 0 && (
            <View style={{ height: 'auto' }}>
              <ScrollView>
                <View style={{ paddingHorizontal: 16, flexDirection: 'row' }}>
                  <FlatList
                    showsHorizontalScrollIndicator={false}
                    data={photos}
                    renderItem={({ item }) =>
                    (
                      <Image source={{ uri: `${item.uri}` }} style={styles.photoKtp} />
                    )}
                    keyExtractor={item => item.uri}
                    horizontal
                    contentContainerStyle={{ columnGap: SIZES.medium }}
                  />
                </View>
              </ScrollView>
              <Gap height={10} />
            </View>
          )
        }
        <Button
          text="Kirim"
          onPress={onSubmit}
        />
      </ModalShow>
    )
  }
  const DetailPengaduan = (id) => {
    const [form, setForm] = useFormHook({
      balasan: '',
    });
    console.log(dataSelected.tanggapan)
    return (
      <ModalShow show={isModalDetail} setModal={setModalDetail}>
        <View style={{ padding: 10 }}>
          <Text style={styles.label}>Tanggapan</Text>
          <Text>{dataSelected.isi}</Text>

        </View>
        <View style={{ alignSelf: 'center', borderRadius: 5 }}>
          {/* {
            dataSelected.tanggapan.length > 0 ?
              (

                <FlatList
                  data={dataSelected.tanggapan}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => <Text>{item.userData.userName}</Text>}
                />
              ) :
              (
                <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }}>
                  <Text style={{
                    color: '#8D92A3',
                    fontSize: 11,
                  }}>Data Tidak Ditemukan</Text>
                </View>
              )
          } */}
          {
            (dataSelected.idFile !== "") && (
              <Image
                source={{
                  uri: `${dataSelected.picturePath}`,
                }}
                style={styles.imageDetail}
              />
            )
          }
          {/* <TextInput
            placeholder='Balas'
            value={form.balasan}
            style={styles.balasan}
            onChangeText={value => setForm('balasan', value)}
          /> */}
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
      {/* <ScrollView index={1} showsVerticalScrollIndicator={false}> */}
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
              <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }}>
                <Text style={{
                  color: '#8D92A3',
                  fontSize: 11,
                }}>Data Tidak Ditemukan</Text>
              </View>
            )
        }
      </View>
      {/* </ScrollView> */}
      <Fab
        style={styles.floatinBtn}
        onPress={toggleModal}
      />
      {/* <DetailPengaduan />
       */}
      {/* MODAL FORM */}
      {/* {isModalForm && ( */}
      <FormPengaduan />
      {/* )} */}
      {isModalDetail && (
        <DetailPengaduan />
      )}
    </SafeAreaView>
  );
};
export default Pengaduan;

const styles = StyleSheet.create({
  photoKtp: {
    width: 50,
    height: 50,
    // aspectRatio: 1,
    alignSelf: 'center',
    borderRadius: 5
  },
  photo: {
    alignItems: 'center',
  },
  imageDetail: {
    width: 100,
    height: 100,
    borderRadius: 8,
    overflow: 'hidden',
    marginVertical: 12,
    marginHorizontal: 12,
  },
  photoContainer: {
    width: 'auto',
    height: 90,
    borderRadius: 15,
    backgroundColor: 'red',
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  borderPhoto: {
    borderWidth: 2,
    borderColor: '#78B7BB',
    width: '100%',
    height: 130,
    borderRadius: 10,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 16
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
  balasan: { borderWidth: 1, borderColor: '#020202', borderRadius: 8 },

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
