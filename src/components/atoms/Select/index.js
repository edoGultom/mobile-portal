import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Select = ({ label, value, data, placeholder, onSelectChange }) => {
  const [pickerFocused, setPickerFocused] = useState(false)

  return (
    <View >
      <Text style={styles.label}>{label}</Text>
      <View style={styles.input}>
        <Picker
          onFocus={() => setPickerFocused(true)}
          onBlur={() => setPickerFocused(false)}
          selectedValue={value}
          onValueChange={itemValue => onSelectChange(itemValue)}
        >
          {
            placeholder.length > 0 && <Picker.Item value='' label={placeholder} enabled={!pickerFocused} style={styles.placeholder} />
          }
          {
            data.map((val, idx) =>
            (
              <Picker.Item label={val.label} value={val.value} />
            ))
          }
        </Picker>
      </View>
    </View>
  );
};

export default Select;

const styles = StyleSheet.create({
  placeholder: {
    color: "grey",  // PLACE HOLDER COLOR
  },
  label: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#020202',
  },
  input: {
    borderWidth: 1,
    borderColor: '#020202',
    borderRadius: 8,
    paddingHorizontal: 2,
    paddingVertical: 0,
  },
});
