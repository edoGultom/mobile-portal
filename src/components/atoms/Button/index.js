import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

const Button = ({
  text,
  color = '#78B7BB',
  textColor = '#FBFBFB',
  borderRadius = 8,
  onPress,
}) => {
  return (
    <Pressable
      android_ripple={{
        color: '#FBFBFB',
        borderless: false,
      }}
      style={styles.container(color, borderRadius)}
      onPress={onPress}>
      <Text style={styles.text(textColor)}>{text}</Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: (color, borderRadius) => ({
    backgroundColor: color,
    borderRadius: borderRadius,
    padding: 12,
  }),
  text: color => ({
    fontSize: 14,
    color: color,
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
  }),
});
