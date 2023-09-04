import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import Modal from "react-native-modal";

export default function ModalShow({ children, ...restProps }) {

    return (
        <Modal
            swipeDirection="down"
            animationIn="bounceInUp"
            animationOut="bounceOutDown"
            animationInTiming={900}
            animationOutTiming={500}
            backdropTransitionInTiming={1000}
            backdropTransitionOutTiming={500}
            style={styles.modal}
            {...restProps}
        >

            <View style={styles.modalContent}>
                <View style={styles.barIcon} />
                {children}
            </View>
        </Modal>
    );
}
const styles = StyleSheet.create({
    modal: {
        justifyContent: "flex-end",
        margin: 0,
        flex: 1
    },

    barIcon: {
        width: 60,
        alignSelf: "center",
        height: 5,
        backgroundColor: "#bbb",
        borderRadius: 3,
    },

    modalContent: {
        backgroundColor: "#fff",
        paddingTop: 12,
        paddingHorizontal: 12,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        paddingBottom: 20,
    },
})