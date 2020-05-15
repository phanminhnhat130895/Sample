import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: "#0085fa",
        height: 35,
        width: 150,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 7,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 15 },
        shadowOpacity: 0.8,
        elevation: 8
    },
    labelButton: {
        color: "white",
        fontSize: 20
    },
})

export default styles;