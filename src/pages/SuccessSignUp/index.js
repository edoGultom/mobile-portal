import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {IlSuccessSignUp} from '../../assets/Ilustration';
import {Button, Gap} from '../../components';

const SuccessSignUp = ({navigation}) => {
  return (
    <View style={styles.page}>
      <IlSuccessSignUp />

      <Gap height={30} />

      <Text style={styles.title}>Yeay! Completed</Text>

      <Gap height={6} />

      <Text style={styles.subTitle}>Now you are able to login</Text>
      <Text style={styles.subTitle}>some articles for today's reading</Text>

      <Gap height={30} />

      <View style={styles.buttonContainer}>
        <Button
          text="Continue"
          onPress={() =>
            navigation.reset({index: 0, routes: [{name: 'MainApp'}]})
          }
        />
      </View>
    </View>
  );
};

export default SuccessSignUp;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
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
