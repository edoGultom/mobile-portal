import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { useCallback, useRef, useState } from 'react';
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { Button, Fab, Gap, Header, TextInput } from '../../components';
import { COLORS } from '../../constants';
import { useFormHook } from '../../utils';

const Chat = ({ navigation }) => {
  const [allData, setAllData] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useFormHook({
    keterangan: '',
  });

  const dispatch = useDispatch();

  const sheetRef = useRef(null);
  const snapPoint = ['40%'];

  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
    setIsOpen(true);
  }, []);

  const handleSnapOutPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
    setIsOpen(false);
  }, []);

  return (
    <>
      <Header
        title="Lapor Pengaduan "
        subtitle="Silahkan kirim pengaduan Anda"
      />
      {/* <TouchableOpacity onPress={() => handleSnapOutPress(-1)} style={styles.container(isOpen)}> */}
      {/* </TouchableOpacity> */}
      <View style={styles.containers(isOpen)}>
        {
          Array(20)
            .fill().map((employee, index) => (
              <Text>Sdsd</Text>
            ))
        }
        <Fab
          style={styles.floatinBtn}
          onPress={() => handleSnapPress(0)}
        />
      </View>
      {
        isOpen ? (
          <BottomSheet
            ref={sheetRef}
            snapPoints={snapPoint}
            enablePanDownToClose={true}
            onClose={() => setIsOpen(!isOpen)}
            style={styles.page}
          >
            <BottomSheetView
              style={{
                flex: 1,
                padding: 16,
              }}>
              <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <KeyboardAvoidingView styles={{ flex: 1 }} behavior='padding' enabled>
                  <View style={{ flex: 2, backgroundColor: 'red' }}>
                    <TextInput
                      label="Pengaduan"
                      placeholder="Masukkan pengaduan Anda"
                      value={form.keterangan}
                      onChangeText={value => setForm('password', value)}
                      multiline={true}
                      numberOfLines={4}
                    />
                  </View>
                  <View style={{
                    flex: 2,
                    // justifyContent: 'space-between',
                    flexDirection: 'column',
                    backgroundColor: 'yellow',
                  }}>
                    <Button text="Sign In" />
                    <Gap height={5} />
                    <Button text="Tutup" />
                  </View>
                </KeyboardAvoidingView>
              </ScrollView>
            </BottomSheetView>
          </BottomSheet>
        ) : ''
      }
    </>

  );
};
export default Chat;

const styles = StyleSheet.create({

  containers: isOpen => ({

    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: (isOpen) ? COLORS.gray2 : COLORS.lightWhite,
    opacity: (isOpen) ? 0.2 : 1,
    // backgroundColor: 'red',
    padding: 16,
  }),
  floatinBtn: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    margin: 20
  },
  flatList: isOpen => ({
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'red',
    backgroundColor: (isOpen) ? COLORS.gray2 : COLORS.lightWhite,
    opacity: (isOpen) ? 0.2 : 1
  }),
});
