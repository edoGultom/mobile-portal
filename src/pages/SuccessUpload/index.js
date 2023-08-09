import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { IlSuccessUpload } from '../../assets/Ilustration';
import { Button, Gap } from '../../components';

const SuccessUpload = ({ navigation }) => {
  return (
    <View style={styles.page}>
      <View style={{
        flex: 3,
      }}>
        <IlSuccessUpload />
      </View>
      <View style={{
        flex: 2,
      }}>
        <View style={{
          flex: 2,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 20
        }}>
          <Text style={styles.title}>Upload Berhasil </Text>
          <Gap height={6} />
          <Text style={styles.subTitle}>Surat Keterangan Domisili sedang diproses</Text>
          <Gap height={30} />

          <View style={styles.buttonContainer}>
            <Button
              text="Lanjutkan"
              onPress={() =>
                navigation.reset({ index: 0, routes: [{ name: 'MainApp' }] })
              }
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default SuccessUpload;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
    color: '#020202',
  },
  subTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Light',
    color: '#8D92A3',
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 80,
  },
});
