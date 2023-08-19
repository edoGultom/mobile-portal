import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { IcReport } from '../../assets';
import { Gap, Header } from '../../components';

export default function FormAduan({ navigation }) {
    const [isUsul, setIsUsul] = useState(false);
    const [statusUsul, setStatusUsul] = useState(false);
    const dispatch = useDispatch();


    return (
        <View style={styles.page}>
            <Header
                title="Form Aduan"
                subtitle="Silahkan ajukan pengaduan anda. Isi form dibawah ini"
            />
            <View style={styles.container}>
                <View style={{ flex: 3 }}>
                    <IcReport />
                </View>
                <Gap height={12} />
                <View style={{ flex: 1 }}>

                    <Text>Form</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
    },
    containerInfo: {
        width: '100%',
    },
    labelInfo: {
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#FFF1C1',
        color: '#E7B405',
        borderRadius: 5,
        alignItems: 'center',
        alignSelf: 'center'
    },
    container: {
        backgroundColor: '#FBFBFB',
        paddingTop: 24,
        paddingVertical: 20,
        marginTop: 24,
        flex: 3,
    },
    title: {
        fontSize: 20,
        fontFamily: 'Poppins-Regular',
        color: '#020202'
    },
    subTitle: {
        fontSize: 14,
        fontFamily: 'Poppins-Light',
        color: '#8D92A3'
    },
    buttonContainer: {
        width: '100%',
        paddingHorizontal: 80
    }
});
