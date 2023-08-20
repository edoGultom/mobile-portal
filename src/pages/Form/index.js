import { BE_API_HOST } from '@env';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { useDispatch } from 'react-redux';
import { IcLetter } from '../../assets';
import { Button, Gap, Header } from '../../components';
import { addLoading } from '../../redux/globalSlice';
import { getData } from '../../utils';

export default function Form({ navigation }) {
  const [isUsul, setIsUsul] = useState(false);
  const [statusUsul, setStatusUsul] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    navigation.addListener('focus', () => {
      dispatch(addLoading(true))
      getData('userProfile').then(res => {
        getData('token').then(resToken => {
          Axios.get(`${BE_API_HOST}/pengusulan-surat/cek-surat?userId=${res.id}`, {
            headers: {
              Authorization: resToken.value,
            },
          })
            .then(res => {
              dispatch(addLoading(false));
              setIsUsul(res.data.status)
              setStatusUsul(res.data.pesan)
            })
            .catch(err => {
              console.log('Err: ', err);
              showMessage(err?.response?.data.message, 'danger');

            })
        });
      });
    });


  }, [navigation]);

  return (
    <View style={styles.page}>
      <Header
        title="Pengusulan Surat"
        subtitle="Pilih jenis surat yang akan kamu usulkan"

      />
      <View style={styles.container}>
        <View style={{ flex: 3 }}>
          <IcLetter />
        </View>
        <Gap height={12} />
        <View style={{ flex: 1 }}>

          {
            !isUsul ? (
              <View style={styles.buttonContainer}>
                <Button
                  text="Surat Domisili"
                  onPress={() => navigation.navigate('FormUpload')}
                />
              </View>

            ) : (
              <View style={styles.containerInfo}>
                <Text style={styles.labelInfo}>{statusUsul}</Text>
              </View>

            )
          }
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  containerInfo: {
    width: '100%',
  },
  labelInfo: {
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#FFF1C1',
    color: '#E7B405',
    borderRadius: 5,
    alignItems: 'center',
    alignSelf: 'center'
  },
  container: {
    backgroundColor: '#FBFBFB',
    paddingTop: 24,
    paddingVertical: 20,
    marginTop: 10,
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
