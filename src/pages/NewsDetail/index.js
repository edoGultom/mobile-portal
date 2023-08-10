import React, { useEffect, useState } from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { IcBackWhite } from '../../assets';
import { Button, Counter, Number, Rating } from '../../components';
import { getData } from '../../utils';
import RenderHtml from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';

const NewsDetail = ({ navigation, route }) => {
  const { judul, picturePath, isi, tanggal_posting } = route.params;
  const [userProfile, setUserProfile] = useState({});
  const source = {
    html: isi,
  };

  const { width } = useWindowDimensions();

  useEffect(() => {
    getData('userProfile').then(res => {
      setUserProfile(res);
    });
  }, []);
  const onOrder = () => {
    navigation.navigate('OrderSummary', data);
  };
  return (
    <View style={styles.page}>
      <ImageBackground source={{ uri: picturePath }} style={styles.cover}>
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.goBack()}>
          <IcBackWhite />
        </TouchableOpacity>
      </ImageBackground>
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.mainContent}>
            <View style={styles.productContainer}>
              <View>
                <Text style={styles.title}>{judul}</Text>
                <Text>{tanggal_posting}</Text>
              </View>
            </View>
            <RenderHtml
              contentWidth={width}
              source={source}
              style={styles.desc}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default NewsDetail;

const styles = StyleSheet.create({
  page: { flex: 1 },
  cover: { height: 330, paddingTop: 26, paddingLeft: 22 },
  back: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: '#FBFBFB',
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    marginTop: -40,
    paddingTop: 26,
    paddingHorizontal: 16,
    flex: 1,
  },
  mainContent: { flex: 1 },
  productContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: { fontSize: 18, fontFamily: 'Poppins-Regular', color: '#020202' },
  desc: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#8D92A3',
  },
  label: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#020202',
    marginBottom: 4,
  },
  footer: { flexDirection: 'row', paddingVertical: 16, alignItems: 'center' },
  priceContainer: { flex: 1 },
  button: { width: 163 },
  labelTotal: { fontSize: 13, fontFamily: 'Poppins-Regular', color: '#8D92A3' },
  priceTotal: { fontSize: 18, fontFamily: 'Poppins-Regular', color: '#020202' },
});
