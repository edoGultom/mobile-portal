import { StyleSheet, Text, View, TextInput as TextInputRN } from 'react-native';
import React from 'react';

// sprated operator 3 (...resProps ) menyiapkan sisa props yg tidak didefenisikan secara explisit dan akan disimpan dalam props ini
// contoh tidak menyediakan props value dan props onChangeText jadi value & onChangeText nanti akan otomatis terisi
const TextInput = ({ label, placeholder, extraColor = '#020202', ...restProps }) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInputRN
        style={styles.input(extraColor)}
        placeholder={placeholder}
        {...restProps}
      />
    </View>
  );
};

export default TextInput;
const styles = StyleSheet.create({
  label: { fontSize: 16, fontFamily: 'Poppins-Regular', color: '#020202' },
  input: (extraColor) => ({ color: extraColor, borderWidth: 1, borderColor: '#020202', borderRadius: 8, padding: 10 }),
});

