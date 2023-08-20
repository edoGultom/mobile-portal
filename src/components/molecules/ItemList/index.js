import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

const ItemList = ({
  image,
  judul,
  kategori,
  onPress,
  items,
  type,
  date,
  status,
}) => {
  const renderContent = () => {
    switch (type) {
      case 'pengaduan':
        return (
          <>
            <View style={styles.content}>
              <Text style={styles.title}>
                {judul?.length > 35 ? `${judul.substring(0, 35)} ...` : judul}
              </Text>
              <Text style={styles.date}> {items.isi?.length > 35 ? `${items.isi.substring(0, 35)} ...` : items.isi}</Text>
            </View>
            <View style={{ flexDirection: 'column' }}>
              <Text style={{ color: items.status === 'Tolak' ? '#D9435E' : '#1ABC9C' }}>{items.status}</Text>
              <Text style={styles.date}>{date}</Text>
            </View>
          </>
        );
      case 'kegiatan':
        return (
          <>
            <View style={styles.content}>
              <Text style={styles.title}>
                {judul?.length > 23 ? `${judul.substring(0, 23)} ...` : judul}
              </Text>
              <Text style={styles.date}>{date}</Text>
            </View>
            <Text>{kategori}</Text>
          </>
        );
      case 'popular':
        return (
          <>
            <View style={styles.content}>
              <Text style={styles.title}>
                {judul?.length > 23 ? `${judul.substring(0, 23)} ...` : judul}
              </Text>
              <Text style={styles.date}>{date}</Text>
            </View>
            <Text>{kategori}</Text>
          </>
        );

      case 'notification':
        return (
          <>
            <View style={styles.content}>
              <Text style={styles.title}>{judul}</Text>
              <View style={styles.row}>
                <Text style={styles.price}>{date}</Text>
              </View>
            </View>
            <View>
              <Text style={styles.status(status)}>{status}</Text>
            </View>
          </>
        );
      default:
        return (
          <>
            <View style={styles.content}>
              <Text style={styles.title}>{judul}</Text>
              <Text>Number</Text>
            </View>
            <Text>Rates</Text>
          </>
        );
    }
  };

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? 'rgb(224, 224, 224)' : 'white',
        },
        {
          opacity: pressed ? 0.7 : 1,
        },
        styles.wrapperCustom,
      ]}>
      <View style={styles.container}>
        {/* <Image source={image} style={styles.image} /> */}
        {renderContent()}
      </View>
    </Pressable>
  );
};

export default ItemList;

const styles = StyleSheet.create({
  wrapperCustom: {
    borderRadius: 8,
    padding: 6,
    marginVertical: 8
  },
  container: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',

  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#020202',
  },
  price: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: '#8D92A3',
  },
  items: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: '#8D92A3',
  },
  date: {
    fontFamily: 'Poppins-Regular',
    fontSize: 10,
    color: '#8D92A3',
  },
  status: status => ({
    fontSize: 10,
    fontFamily: 'Poppins-Regular',
    color: status === 'Ditolak' ? '#D9435E' : '#1ABC9C',
  }),
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 3,
    backgroundColor: '#8D92A3',
    marginHorizontal: 4,
  },
});
