import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {checkImageUrl, getData} from '../../utils';
import {Gap, HomeProfile, HomeTabSection} from '../../components';
import Card from '../../components/molecules/Card';
import {FoodDummy1} from '../../assets';
import {useDispatch, useSelector} from 'react-redux';
import {getArticles} from '../../redux/homeSlice';
import {BE_API_HOST} from '@env';

const Home = ({navigation}) => {
  const {articles} = useSelector(state => state.homeReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    getData('token').then(resToken => {
      dispatch(getArticles(resToken.value));
    });
  }, []);
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={styles.page}>
        <HomeProfile />
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>News Update</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.homeContainer}>
                <Gap width={24} />
                {articles?.map(item => {
                  return (
                    <Card
                      key={item.id}
                      image={{uri: item.picturePathThumb}}
                      judul={item.judul}
                      kategori={item.kategori}
                      isi={item.isi}
                      onPress={() => navigation.navigate('CardDetail', item)}
                    />
                  );
                })}
              </View>
            </ScrollView>
          </View>
        </View>
        <View style={styles.tabContainer}>
          <HomeTabSection articles={articles} />
        </View>
        {/* <View style={styles.tabContainer}>
          <Text>sdsds</Text>
        </View> */}
      </View>
    </ScrollView>
  );
};
export default Home;
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
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
  page: {flex: 1},
  homeContainer: {flexDirection: 'row', marginVertical: 10},
  tabContainer: {flex: 1, marginVertical: 20},
});
