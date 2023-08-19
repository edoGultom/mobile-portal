import { StyleSheet, View } from 'react-native';
import { Gap, TextInput } from '../../atoms';


const PengaduanForm = () => {
    return (
        <View style={styles.page}>
            <TextInput
                label="Password"
                placeholder="Type your password"
            // value={form.keterangan}
            // onChangeText={value => setForm('password', value)}
            />
            <Gap height={24} />
        </View>
    );
};

export default PengaduanForm;

const styles = StyleSheet.create({
    page: {
        flex: 1,
        margin: 16,
        backgroundColor: 'red'
    },
});
