import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {COLORS, SHADOWS, SIZES} from '../../../constants';

const Card = ({image, judul, isi, kategori, onPress}) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <View style={styles.container}>
        <Image source={image} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.judul}>
            {judul?.length > 45 ? `${judul?.substring(0, 45)} ...` : judul}
          </Text>
          <Text style={styles.isi}>
            {isi?.length > 80 ? `${isi.substring(0, 80)} ...` : isi}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 290,
    backgroundColor: '#FBFBFB',
    borderRadius: 8,
    // shadowColor: 'black',
    // shadowOffset: {width: 0, height: 7},
    // shadowOpacity: 0.5,
    // shadowRadius: 10,
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
    elevation: 14,
    overflow: 'hidden',
    marginRight: 24,
  },
  image: {width: 300, height: 140, resizeMode: 'cover'},
  content: {padding: 20},
  judul: {
    fontSize: SIZES.medium,
    fontFamily: 'Poppins-Medium',
    color: COLORS.primary,
  },
  isi: {
    fontSize: SIZES.small + 2,
    fontFamily: 'Poppins-Regular',
    color: COLORS.gray,
    marginTop: 3,
    // textTransform: 'capitalize',
  },
  // container: {
  //   flex: 1,
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   flexDirection: 'row',
  //   padding: SIZES.medium,
  //   borderRadius: SIZES.small,
  //   backgroundColor: '#FFF',
  //   ...SHADOWS.medium,
  //   shadowColor: COLORS.white,
  // },
  // logoContainer: {
  //   width: 50,
  //   height: 50,
  //   backgroundColor: COLORS.white,
  //   borderRadius: SIZES.medium,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // logoImage: {
  //   width: '70%',
  //   height: '70%',
  // },
  // textContainer: {
  //   flex: 1,
  //   marginHorizontal: SIZES.medium,
  // },
  // jobName: {
  //   fontSize: SIZES.medium,
  //   fontFamily: 'Poppins-Medium',
  //   color: COLORS.primary,
  // },
  // jobType: {
  //   fontSize: SIZES.small + 2,
  //   fontFamily: 'Poppins-Regular',
  //   color: COLORS.gray,
  //   marginTop: 3,
  //   textTransform: 'capitalize',
  // },
});
