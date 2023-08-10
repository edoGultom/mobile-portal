import React from 'react';
import { StyleSheet, View, ScrollView, ActivityIndicator } from 'react-native';
// import {ScrollView} from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Gap, Header, Select, TextInput } from '../../components';
// import {signUpAction} from '../../redux/action';
import { useFormHook } from '../../utils';
import { addLoading } from '../../redux/globalSlice';
import { IlSignUp } from '../../assets';
import { signUpAction } from '../../redux/signUpSlice';

const SignUpAddress = ({ navigation }) => {
  const [form, setForm] = useFormHook({
    phone_number: '',
    address: '',
    kelurahan: '',
  });

  // destructering reducer dengan mengeassign ke masing masing reducer
  const { signUpReducer, photoReducer } = useSelector(state => state);
  const dispatch = useDispatch();
  const onSubmit = () => {
    const data = {
      ...signUpReducer,
      ...form,
      navigation, //navigation
      photoReducer, //reducer upload
    };
    dispatch(addLoading(true));
    dispatch(signUpAction(data));
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.page}>
        <Header
          title="Address"
          subtitle="Make sure it’s valid"
          onBack={() => navigation.goBack()}
        />

        <View style={styles.container}>
          <IlSignUp />

          <TextInput
            label="Phone No."
            placeholder="Type your phone number"
            value={form.phoneNumber}
            onChangeText={value => setForm('phoneNumber', value)}
          />
          <Gap height={16} />
          <TextInput
            label="Address"
            placeholder="Type your address"
            value={form.address}
            onChangeText={value => setForm('address', value)}
          />
          <Gap height={16} />
          <Select
            label="Kelurahan"
            value={form.kelurahan}
            onSelectChange={value => setForm('kelurahan', value)}
          />
          <Gap height={24} />
          <Button text="Daftar Sekarang" onPress={onSubmit} />
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUpAddress;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  container: {
    backgroundColor: 'white',
    paddingTop: 26,
    paddingHorizontal: 24,
    paddingVertical: 26,
    marginTop: 24,
    flex: 1,
  },
  addPhoto: {
    fontSize: 14,
    fontFamily: 'Poppins-Light',
    color: '#8D92A3',
    textAlign: 'center',
  },
  photoContainer: {
    width: 90,
    height: 90,
    borderRadius: 90,
    backgroundColor: '#F0F0F0',
    padding: 24,
  },
  borderPhoto: {
    borderWidth: 1,
    borderColor: '#8D92A3',
    width: 110,
    height: 110,
    borderRadius: 110,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photo: {
    alignItems: 'center',
    marginTop: 26,
    marginBottom: 16,
  },
});
