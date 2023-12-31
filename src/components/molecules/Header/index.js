import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { IcBack } from '../../../assets';

const Header = ({ title, subtitle, onBack }) => {
  // const {title, subtitle, onBack} = props;
  return (
    <View style={styles.container}>
      {onBack && (
        <Pressable
          android_ripple={{
            color: '#CFD2CF',
            borderless: false,
            foreground: true,
          }}
          style={styles.back}
          onPress={onBack}>
          <IcBack />
        </Pressable>
      )}

      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subTitle}>{subtitle}</Text>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontFamily: 'Poppins-Medium',
    color: '#020202',
  },
  subTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Light',
    color: '#8D92A3',
  },

  back: {
    padding: 16,
    marginRight: 16,
    marginLeft: -10,
  },
});
