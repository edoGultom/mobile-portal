import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Modal from "react-native-modal";

export default function ModalShow({ show, setModal, children }) {
    // console.log(children);
    // console.log(props.show)
    const toggleModal = () => {
        setModal(!show);
    };
    return (
        <Modal
            onBackdropPress={() => setModal(false)}
            onBackButtonPress={() => setModal(false)}
            isVisible={show}
            swipeDirection="down"
            onSwipeComplete={toggleModal}
            animationIn="bounceInUp"
            animationOut="bounceOutDown"
            animationInTiming={900}
            animationOutTiming={500}
            backdropTransitionInTiming={1000}
            backdropTransitionOutTiming={500}
            style={styles.modal}
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