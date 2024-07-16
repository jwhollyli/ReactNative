import { StyleSheet } from "react-native";

export default createStyles = (colors) => StyleSheet.create({
    settingContainer: {
        backgroundColor: colors.container,
        width: '95%',
        borderRadius: 10,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 0,
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'center',
    },
    labelText: {
        color: colors.primary,
        fontSize: 15,
        textAlign: 'right',
        fontWeight: 'bold',
        margin: 10,
        marginRight: 5,
    },
    textinputText: {
        color: colors.secondary,
        fontSize: 15,
        height: 40,
        backgroundColor: colors.background,
        borderRadius: 5,
    },
    multiTextInputText: {
        color: colors.secondary,
        fontSize: 15,
        height: 160,
        backgroundColor: colors.background,
        borderRadius: 5,
    },
    settingTitleContainer: {
        flexDirection: 'row',
        margin: 10,
    },
    settingTitleText: {
        flex: 1,
        textAlign: 'center',
        color: colors.primary,
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'center',
        paddingLeft: 30,
    },
    infoRowContainer: {
        flexDirection: 'row'
    },
    infoLabelContainer: {
        flex: 0.2,
        margin: 10,
    },
    infoTextContainer: {
        flex: 0.8,
        margin: 10,
        justifyContent: 'center'
    },
});