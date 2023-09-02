// import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { BottomNavigator } from '../components';
import {
  Pengaduan,
  EditProfile,
  Form,
  FormUpload,
  Home,
  NewsDetail,
  Notif,
  Profile,
  SignIn,
  SignUp,
  SignUpAddress,
  SplashScreen,
  FormAduan,
  SuccessSignUp,
} from '../pages';
import SuccessUpload from '../pages/SuccessUpload';

// const Stack = createNativeStackNavigator();
const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const MainApp = () => {
  return (
    <Tab.Navigator tabBar={props => <BottomNavigator {...props} />}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Form"
        component={Form}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Pengaduan"
        component={Pengaduan}
        options={{ headerShown: false, tabBarHideOnKeyboard: true }}
      />
      {/* <Tab.Screen
        name="Notif"
        component={Notif}
        options={{ headerShown: false }}
      /> */}
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};
const Router = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUpAddress"
        component={SignUpAddress}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SuccessSignUp"
        component={SuccessSignUp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NewsDetail"
        component={NewsDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="FormUpload"
        component={FormUpload}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FormAduan"
        component={FormAduan}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="SuccessUpload"
        component={SuccessUpload}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Notif"
        component={Notif}
        options={{ headerShown: false }}
      />

      {/* bottom Navigation */}
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{ headerShown: false }}
      />
      {/* end bottom navigation */}
    </Stack.Navigator>
  );
};

export default Router;
