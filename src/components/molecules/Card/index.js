import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { COLORS, SHADOWS, SIZES } from '../../../constants';

const Card = ({ image, judul, isi, kategori, onPress }) => {
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
    backgroundColor: COLORS.lightWhite,
    // backgroundColor: 'red',
    borderRadius: 8,
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
    elevation: 14,
    overflow: 'hidden',
    // marginRight: 24,
    paddingBottom: 20
  },
  image: { width: 300, height: 140, resizeMode: 'cover' },
  content: { padding: 20 },
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
  },
});
