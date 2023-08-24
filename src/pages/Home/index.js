import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Dimensions, FlatList, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { HScrollView } from 'react-native-head-tab-view';
import { SceneMap, TabBar } from 'react-native-tab-view';
import { CollapsibleHeaderTabView } from 'react-native-tab-view-collapsible-header';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Gap, HomeProfile, ItemList } from '../../components';
import { COLORS, SIZES } from '../../constants';
import { getArticles, getArticlesByType } from '../../redux/homeSlice';
import { getData } from '../../utils';

const Kegiatan = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  useEffect(() => {
    getData('token').then(res => {
      console.log(res, 'token')
      dispatch(getArticlesByType({ token: res.value, type: 'kegiatan' }));
    });
  }, []);

  const { kegiatan } = useSelector(state => state.homeReducer);

  return (
    <HScrollView index={1} showsVerticalScrollIndicator={false}>
      <View style={styles.containerKegiatan}>
        {kegiatan ? (
          <FlatList
            nestedScrollEnabled={true}
            data={kegiatan}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <ItemList
                key={item.id}
                type="kegiatan"
                judul={item.judul}
                kategori={item.kategori}
                date={item.tanggal_posting}
                image={{ uri: item.picturePathThumb }}
                onPress={() => navigation.navigate('NewsDetail', item)}
              />
            )}
            keyExtractor={item => item.job_id}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            vertical
          />
        ) : (
          <View
            style={{
              flex: 3,
              alignContent: 'flex-start',
              alignSelf: 'center',
              justifyContent: 'flex-start',
              paddingVertical: 20
            }}>
            <Text
              style={{
                color: '#8D92A3',
                fontSize: 11,
              }}>
              Data Tidak Ditemukan
            </Text>
          </View>
        )}
      </View>
    </HScrollView>

  );
};
const Popular = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  useEffect(() => {
    getData('token').then(res => {
      dispatch(getArticlesByType({ token: res.value, type: 'popular' }));
    });
  }, []);

  const { popular } = useSelector(state => state.homeReducer);
  return (
    <HScrollView index={0} showsVerticalScrollIndicator={false}>
      <View style={styles.containerPopular}>
        {popular ? (
          <FlatList
            nestedScrollEnabled={true}
            data={popular}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <ItemList
                key={item.id}
                type="popular"
                judul={item.judul}
                kategori={item.kategori}
                date={item.tanggal_posting}
                image={{ uri: item.picturePathThumb }}
                onPress={() => navigation.navigate('NewsDetail', item)}
              />
            )}
            keyExtractor={item => item.job_id}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            vertical
          />
        ) : (
          <View
            style={{
              // backgroundColor: 'red',
              flex: 3,
              alignContent: 'flex-start',
              alignSelf: 'center',
              justifyContent: 'flex-start',
              paddingVertical: 20
            }}>
            <Text
              style={{
                color: '#8D92A3',
                fontSize: 11,
              }}>
              Data Tidak Ditemukan
            </Text>
          </View>
        )}
      </View>
    </HScrollView>
  );
};
const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={styles.indicator}
    style={styles.tabBarStyle}
    tabStyle={styles.tabStyle}
    renderLabel={({ route, focused }) => (
      <Text style={styles.tabText(focused)}>{route.title}</Text>
    )}
  />
);
const initialLayout = { width: Dimensions.get('window').width };
const Header = () => {
  const { articles } = useSelector(state => state.homeReducer);
  const navigation = useNavigation();
  return (
    <View>
      <HomeProfile />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>News Update</Text>
          <View style={styles.homeContainer}>
            {(articles?.length > 0) ? (
              <FlatList
                data={articles}
                renderItem={({ item }) => (
                  <Card
                    key={item.id}
                    image={{ uri: item.picturePathThumb }}
                    judul={item.judul}
                    kategori={item.kategori}
                    isi={item.isi}
                    onPress={() => navigation.navigate('NewsDetail', item)}
                  />
                )}
                keyExtractor={(item) => item.id}
                // contentContainerStyle={{ columnGap: SIZES.small }}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            ) : (
              <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center', paddingVertical: 20 }}>
                <Text style={{
                  color: '#8D92A3',
                  fontSize: 11,
                }}>Data Tidak Ditemukan</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  )
}
export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    getData('token').then(resToken => {
      dispatch(getArticles(resToken.value));
    });
  }, []);

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: '1', title: 'Popular' },
    { key: '2', title: 'Kegiatan' },
  ]);

  const renderScene = SceneMap({
    1: Popular,
    2: Kegiatan,
  });

  return (
    <CollapsibleHeaderTabView
      // makeHeaderHeight={() => 200}
      renderScrollHeader={() => <Header style={{ height: 200 }} />}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      renderTabBar={renderTabBar}
    />
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  indicator: {
    backgroundColor: '#020202',
    height: 3,
    width: '0.2%',
  },
  tabBarStyle: {
    backgroundColor: 'white',
    elevation: 0,
    shadowOpacity: 0,
    borderBottomColor: '#FBFBFB',
    borderBottomWidth: 1,
    marginTop: 24
  },
  container: {
    marginTop: 16,
  },
  header: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  headerTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 20,
    color: '#020202',
    marginHorizontal: 17,
  },
  tabStyle: { width: 'auto' },
  tabText: focused => ({
    fontFamily: 'Poppins-Medium',
    color: focused ? '#020202' : '#8D92A3',
  }),
  homeContainer: { flex: 1, flexDirection: 'row' },
  containerPopular: { flex: 1 },
  containerKegiatan: { flex: 1 },

});