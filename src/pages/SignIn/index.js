import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { IlSignIn } from '../../assets';
import { Button, Gap, Header, TextInput } from '../../components';
import { signInAction } from '../../redux/signInSlice';
// import {API_HOST} from '../../config';
import { getData, useFormHook } from '../../utils';

const SignIn = ({ navigation }) => {
  const dispatch = useDispatch();

  //grouping form menjadi satu object
  const [form, setForm] = useFormHook({
    username: '',
    password: '',
  });
  const onSubmit = () => {
    const obj = {
      form,
      navigation: navigation,
    };
    dispatch(signInAction(obj));
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.page}>
        <Header title="Sign In" subtitle="Silahkan masuk " />
        <View style={styles.container}>
          <IlSignIn />
          <TextInput
            label="Username"
            placeholder="Type your username"
            value={form.username}
            onChangeText={value => setForm('username', value)}
          />
          <Gap height={16} />
          <TextInput
            label="Password"
            placeholder="Type your password"
            value={form.password}
            onChangeText={value => setForm('password', value)}
            secureTextEntry
          />
          <Gap height={24} />

          <Button text="Sign In" onPress={onSubmit} />

          <Gap height={12} />

          <Button
            text="Create New Account"
            color="#8D92A3"
            textColor="white"
            onPress={() => navigation.navigate('SignUp')}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  container: {
    backgroundColor: '#FBFBFB',
    paddingTop: 5,
    paddingHorizontal: 24,
    paddingVertical: 20,
    marginTop: 10,
    flex: 1,
  },
});
