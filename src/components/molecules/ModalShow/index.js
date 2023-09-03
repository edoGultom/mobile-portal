import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import Modal from "react-native-modal";

export default function ModalShow({ show, setModal, children }) {
    const toggleModal = () => {
        setModal(!show);
    };
    return (
        <Modal
            onBackdropPress={() => setModal(false)}
            onBackButtonPress={() => setModal(false)}
            isVisible={show}
            swipeDirection="down"
            onSwipeComplete={() => setModal(!show)}
            animationIn="bounceInUp"
            animationOut="bounceOutDown"
            animationInTiming={900}
            animationOutTiming={500}
            backdropTransitionInTiming={1000}
            backdropTransitionOutTiming={500}
            style={styles.modal}
        >

            <View style={styles.modalContent}>
                {/* <ScrollView> */}
                <View style={styles.barIcon} />
                {children}
                {/* </ScrollView> */}
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