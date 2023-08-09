import Axios from 'axios';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Button, Gap, Header, ItemList } from '../../components';
import { IcLetter, IlSuccessSignUp } from '../../assets';

export default function Form({ route, navigation }) {
  // const id = route.params;
  return (
    <View style={styles.page}>
      <Header
        title="Pengusulan Surat"
        subtitle="Pilih jenis surat yang akan kamu usulkan"
        onBack={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.container}>
        <View style={{ flex: 3 }}>
          <IcLetter />
        </View>
        <Gap height={12} />
        <View style={{ flex: 1 }}>
          <View style={styles.buttonContainer}>
            <Button
              text="Surat Domisili"
              onPress={() => navigation.replace('FormUpload')}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  container: {
    backgroundColor: '#FBFBFB',
    paddingTop: 24,
    paddingVertical: 20,
    marginTop: 24,
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
