import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { IcPlusOn } from '../../../assets';

export default props => (
    <TouchableOpacity onPress={props.onPress} style={props.style}>
        <View
            style={{
                backgroundColor: '#fff',
                width: 50,
                height: 50,
                borderRadius: 30,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <IcPlusOn />
        </View>
    </TouchableOpacity>
);