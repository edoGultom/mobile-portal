import { BE_API_HOST } from '@env';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Gap, Header, Select, TextInput } from '../../components';
import { getData, showMessage, storeData, useFormHook } from '../../utils';

const EditProfile = ({ navigation }) => {
  const [userProfile, setUserProfile] = useState({});

  const [form, setForm] = useFormHook({
    name: '',
    email: '',
    phone_number: '',
    address: '',
    kelurahan: '',
  });

  useEffect(() => {
    navigation.addListener('focus', () => {
      updateForm();
    });
  }, [navigation]);

  const updateForm = () => {
    getData('userProfile').then(res => {
      setUserProfile(res);
    });
  };

  const onSubmit = () => {
    let resultObj = {};
    Object.keys(form).map(obj => {
      if (form[obj]) {
        resultObj[obj] = form[obj];
      }
    });
    getData('token').then(resToken => {
      Axios.post(
        `${BE_API_HOST}/update-user/user?username=${userProfile.username}`,
        resultObj,
        {
          headers: {
            Authorization: resToken.value,
          },
        },
      )
        .then(res => {
          showMessage('Update Success', 'success');
          storeData('userProfile', res.data.data).then(() => {
            navigation.reset({ index: 0, routes: [{ name: 'MainApp' }] });
          });
        })
        .catch(err => {
          showMessage(
            `${err?.response?.data?.message} on Update Profile API` ||
            'Terjadi kesalahan di API Update Profile',
          );
        });
    });
  };
  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.page}>
        <Header
          title="Edit Profile"
          subTitle="Update your profile"
          onBack={() => navigation.goBack()}
        />
        <View style={styles.container}>
          <TextInput
            label="Full Name"
            placeholder="Type your full name"
            value={form.name}
            onChangeText={value => setForm('name', value)}
          />
          <Gap height={16} />
          <TextInput
            label="Email Address"
            placeholder="Type your email address"
            value={form.email}
            onChangeText={value => setForm('email', value)}
          />
          <Gap height={16} />
          <TextInput
            label="Address"
            placeholder="Type your address"
            value={form.address}
            onChangeText={value => setForm('address', value)}
          />

          <Gap height={16} />
          <TextInput
            label="Phone Number"
            placeholder="Type your phone number"
            value={form.phone_number}
            onChangeText={value => setForm('phone_number', value)}
          />
          <Gap height={16} />
          <Select
            label="Kelurahan"
            value={form.kelurahan}
            onSelectChange={value => setForm('kelurahan', value)}
          />
          <Gap height={24} />
          <Button text="Update" onPress={onSubmit} />
        </View>
      </View>
    </ScrollView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  scroll: { flexGrow: 1 },
  page: { flex: 1 },
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingVertical: 26,
    marginTop: 24,
    flex: 1,
  },
});
