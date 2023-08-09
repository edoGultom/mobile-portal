// import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import {CollapsibleHeaderTabView} from 'react-native-tab-view-collapsible-header';
import {useDispatch, useSelector} from 'react-redux';
import {getArticlesByType} from '../../../redux/homeSlice';
import {getData} from '../../../utils';
import {Gap} from '../../atoms';
import Card from '../Card';
import ItemList from '../ItemList';
import {useNavigation} from '@react-navigation/native';
import {SIZES} from '../../../constants';

const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={styles.indicator}
    style={styles.tabBarStyle}
    tabStyle={styles.tabStyle}
    renderLabel={({route, focused}) => (
      <Text style={styles.tabText(focused)}>{route.title}</Text>
    )}
  />
);
const Kegiatan = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  useEffect(() => {
    getData('token').then(res => {
      dispatch(getArticlesByType({token: res.value, type: 'kegiatan'}));
    });
  }, []);

  const {kegiatan} = useSelector(state => state.homeReducer);
  return (
    <View style={styles.containerKegiatan}>
      {kegiatan ? (
        <FlatList
          data={kegiatan}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <ItemList
              key={item.id}
              type="kegiatan"
              judul={item.judul}
              kategori={item.kategori}
              date={item.tanggal_posting}
              image={{uri: item.picturePathThumb}}
              onPress={() => navigation.navigate('NewsDetail', item)}
            />
          )}
          keyExtractor={item => item.job_id}
          contentContainerStyle={{columnGap: SIZES.medium}}
          vertical
        />
      ) : (
        <View
          style={{
            // backgroundColor: 'red',
            flex: 3,
            alignContent: 'center',
            alignSelf: 'center',
            justifyContent: 'center',
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
  );
};
const Popular = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  useEffect(() => {
    getData('token').then(res => {
      dispatch(getArticlesByType({token: res.value, type: 'popular'}));
    });
  }, []);

  const {popular} = useSelector(state => state.homeReducer);
  return (
    <View style={styles.containerPopular}>
      {popular ? (
        <FlatList
          data={popular}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <ItemList
              key={item.id}
              type="popular"
              judul={item.judul}
              kategori={item.kategori}
              date={item.tanggal_posting}
              image={{uri: item.picturePathThumb}}
              onPress={() => navigation.navigate('NewsDetail', item)}
            />
          )}
          keyExtractor={item => item.job_id}
          contentContainerStyle={{columnGap: SIZES.medium}}
          vertical
        />
      ) : (
        <View
          style={{
            // backgroundColor: 'red',
            flex: 3,
            alignContent: 'center',
            alignSelf: 'center',
            justifyContent: 'center',
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
  );
};
const initialLayout = {width: Dimensions.get('window').width};
const renderScene = SceneMap({
  1: Popular,
  2: Kegiatan,
});
const HomeTabSection = ({articles}) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: '1', title: 'Popular'},
    {key: '2', title: 'Kegiatan'},
  ]);
  return (
    <TabView
      renderTabBar={renderTabBar}
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      style={styles.tabView}
      scrollEnable={true}
    />
  );
};

export default HomeTabSection;

const styles = StyleSheet.create({
  tabView: {backgroundColor: '#FBFBFB'},
  indicator: {
    backgroundColor: '#020202',
    height: 3,
    width: '0.2%',
  },
  tabBarStyle: {
    backgroundColor: 'white',
    elevation: 0,
    shadowOpacity: 0,
    borderBottomColor: '#F2F2F2',
    borderBottomWidth: 1,
  },
  tabStyle: {width: 'auto'},
  tabText: focused => ({
    fontFamily: 'Poppins-Medium',
    color: focused ? '#020202' : '#8D92A3',
  }),
  containerPopular: {flex: 1, paddingTop: 8, paddingHorizontal: 24},
  containerKegiatan: {flex: 1, paddingTop: 8, paddingHorizontal: 24},
  cardContainer: {flexDirection: 'row', marginVertical: 24},
  foodCardContainer: {flexDirection: 'row', marginVertical: 24},
});
