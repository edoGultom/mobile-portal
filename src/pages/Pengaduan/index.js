import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Button, Fab, Gap, Header, ItemList, ModalShow } from '../../components';
import { COLORS, SIZES } from '../../constants';
import { getData, showMessage, useFormHook } from '../../utils';
import { getPengaduan, pengaduanAction } from '../../redux/pengaduanSlice';
import { addLoading } from '../../redux/globalSlice';
import { useDispatch, useSelector } from 'react-redux';

const Pengaduan = ({ navigation }) => {
  const { pengaduanReducer } = useSelector(state => state);
  const [isModalForm, setModalForm] = useState(false);
  const [isModalDetail, setModalDetail] = useState(false);

  const dispatch = useDispatch();
  const [form, setForm] = useFormHook({
    isi: '',
    subjek: '',
  });

  useEffect(() => {
    getData('token').then(res => {
      const tokenApi = `${res.value}`;
      dispatch(getPengaduan(tokenApi));
    });
  }, []);

  const toggleModal = () => {
    setModalForm(!isModalForm);
    setForm('reset')
  };
  // console.log(pengaduanReducer.listPengaduan)


  const onSubmit = () => {
    if (form.isi.length < 1 || form.subjek.length < 1) {
      setModalForm(!isModalForm);
      showMessage('Please select a file to continue!');
    } else {
      getData('token').then(res => {
        const token = res
        const obj = {
          token,
          form,
          navigation
        };
        setModalForm(!isModalForm);
        dispatch(addLoading(true));
        dispatch(pengaduanAction(obj));
        setForm('reset')
      });

    }

  };

  const FormPengaduan = () => (
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
        multiline={true}
        numberOfLines={4}
        textAlignVertical="top"
        placeholder='Masukkan Isi'
        value={form.isi}
        style={styles.isi}
        onChangeText={value => setForm('isi', value)}
      />
      <Gap height={10} />
      <Button
        text="Kirim"
        onPress={onSubmit}
      />
    </ModalShow>
  )
  const DetailPengaduan = () => (
    <ModalShow show={isModalDetail} setModal={setModalDetail}>
      <Text>Detail</Text>
    </ModalShow>
  )

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite, }}>
      <Header
        title="List Pengaduan "
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
                      // image={{ uri: item.picturePathThumb }}
                      onPress={() => setModalDetail(!isModalDetail)}
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
      <DetailPengaduan />
      <FormPengaduan />
    </SafeAreaView>
  );
};
export default Pengaduan;

const styles = StyleSheet.create({
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

  },
  floatinBtn: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    margin: 20
  },
});
