const { View, Text, FlatList, ScrollView, SafeAreaView } = require('react-native');
import React, { useEffect, useState } from 'react';
import { getData, showMessage } from '../../utils';
import { useDispatch } from 'react-redux';
import { addLoading } from '../../redux/globalSlice';
import { BE_API_HOST } from '@env';
import Axios from 'axios';
import { Header, ItemList } from '../../components';
import { COLORS, SIZES } from '../../constants';

const Notif = ({ navigation }) => {
  const [allData, setAllData] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    navigation.addListener('focus', () => {
      dispatch(addLoading(true))
      getData('userProfile').then(res => {
        getData('token').then(resToken => {
          Axios.get(`${BE_API_HOST}/pengusulan-surat/notification?userId=${res.id}`, {
            headers: {
              Authorization: resToken.value,
            },
          })
            .then(res => {
              dispatch(addLoading(false));
              setAllData(res.data)
            })
            .catch(err => {
              console.log('Err: ', err);
              showMessage(err?.response?.data.message, 'danger');

            })
        });
      });
    });
  }, []);
  return (
    <>
      <Header
        title="Notification"
        subtitle="Informasi status pengurusan surat"
      />
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite, }}>
        {allData.status ? (
          <FlatList
            data={allData.data}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <ItemList
                key={item.id}
                type="notification"
                judul={item.jenis_surat}
                date={item.tanggal}
                status={item.status}
                onPress={() => navigation.navigate('NewsDetail', item)}
              />
            )}
            keyExtractor={item => item.id}
            contentContainerStyle={{ columnGap: SIZES.medium }}
          />
        ) : (
          <View
            style={{
              flex: 1,
              alignContent: 'center',
              alignSelf: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: '#8D92A3',
                fontSize: 11,
              }}>
              {allData.pesan}
            </Text>
          </View>
        )}
      </SafeAreaView>
    </>
  );
};
export default Notif;
