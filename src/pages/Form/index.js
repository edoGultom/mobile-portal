import Axios from 'axios';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { Button, Gap, Header, ItemList } from '../../components';
import { IcLetter, IlSuccessSignUp } from '../../assets';
import { BE_API_HOST } from '@env';
import { showMessage } from 'react-native-flash-message';
import { getData } from '../../utils';

export default function Form({ navigation }) {
  // const id = route.params;
  const [isUsul, setIsUsul] = useState(false);

  useEffect(() => {
    navigation.addListener('focus', () => {
      onCheckUsulan();
    });
  }, [navigation]);

  const onCheckUsulan = () => {
    getData('token').then(resToken =>
      Axios.get(`${BE_API_HOST}/pengusulan-surat/cek-surat?userId=${userProfile.id}`, photoForUpload, {
        headers: {
          Authorization: resToken.value,
        },
      })
        .then(res => {
          console.log('success', res.data);
          setIsUsul(res.data.status)
        })
        .catch(err => {
          console.log('Err: ', err);
          showMessage(err?.response?.data.message, 'danger');

        }),
    );
  };
  console.log(isUsul)
  return (
    <View style={styles.page}>
      <Header
        title="Pengusulan Surat"
        subtitle="Pilih jenis surat yang akan kamu usulkan"
        onBack={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.container}>
        <View style={{ flex: 3 }}>
          <IcLetter />
        </View>
        <Gap height={12} />
        <View style={{ flex: 1 }}>
          <View style={styles.buttonContainer}>
            <Button
              text="Surat Domisili"
              onPress={() => navigation.navigate('FormUpload')}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  container: {
    backgroundColor: '#FBFBFB',
    paddingTop: 24,
    paddingVertical: 20,
    marginTop: 24,
    flex: 3,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
    color: '#020202'
  },
  subTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Light',
    color: '#8D92A3'
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 80
  }
});
