import { StyleSheet } from "react-native";

export default createGlobalStyles = (colors) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        alignItems: 'center',
    },
    text: {
        color: colors.secondary,
        fontSize: 15,
    },
    seperator: {
        height: 1,
        width: '95%',
        backgroundColor: colors.secondary,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 0,
        marginLeft: 10,
        marginRight: 10,
        height: 40,
        width: '95%',
        backgroundColor: colors.buttonBackground,
    },
    editButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.buttonBackground,
    },
    buttonText: {
        color: colors.buttonText,
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold',
        margin: 5,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});