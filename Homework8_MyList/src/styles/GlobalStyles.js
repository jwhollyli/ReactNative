import { StyleSheet } from "react-native";

export default createGlobalStyles = (colors) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        alignItems: 'center',
        justifyContent: 'center',
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
});