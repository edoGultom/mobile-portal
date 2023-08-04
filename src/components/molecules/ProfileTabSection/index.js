import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import ItemListMenuProfile from '../ItemListMenuProfile';
import {useNavigation} from '@react-navigation/native';

const Account = () => {
  const navigation = useNavigation();
  const signOut = () => {
    AsyncStorage.multiRemove(['userProfile', 'token']).then(() => {
      navigation.reset({index: 0, routes: [{name: 'SignIn'}]});
    });
  };
  return (
    <View style={styles.containerAccount}>
      <ItemListMenuProfile
        text="Edit Profile"
        onPress={() => navigation.navigate('EditProfile')}
      />
      {/* <ItemListMenuProfile text="Home Address" />
      <ItemListMenuProfile text="Security" />
      <ItemListMenuProfile text="Payments" /> */}
      <ItemListMenuProfile text="SignOut" onPress={signOut} />
    </View>
  );
};

const Portal = () => {
  return (
    <View style={styles.containerPortalApp}>
      {/* <ItemListMenuProfile text="Rate App" />
      <ItemListMenuProfile text="Help Center" /> */}
      <ItemListMenuProfile text="Privacy & Policy" />
      <ItemListMenuProfile text="Terms & Conditions" />
    </View>
  );
};
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
const renderScene = SceneMap({
  1: Account,
  2: Portal,
});

const initialLayout = {width: Dimensions.get('window').width};

const ProfileTabSection = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: '1', title: 'Account'},
    {key: '2', title: 'Portal App'},
  ]);
  return (
    <TabView
      renderTabBar={renderTabBar}
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      style={styles.tabView}
    />
  );
};

export default ProfileTabSection;

const styles = StyleSheet.create({
  tabView: {backgroundColor: 'white'},
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
  containerAccount: {paddingTop: 8, paddingHorizontal: 24},
  containerPortalApp: {paddingTop: 8, paddingHorizontal: 24},
});
