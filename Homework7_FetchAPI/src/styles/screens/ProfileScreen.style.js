import { StyleSheet } from "react-native";

export default createStyles = (colors) => StyleSheet.create({
    settingContainer: {
        backgroundColor: colors.container,
        width: '95%',
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 0,
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'center',
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
    labelText: {
        color: colors.primary,
        fontSize: 15,
        textAlign: 'right',
        fontWeight: 'bold',
        margin: 10,
        marginRight: 5,
    },
    text: {
        color: colors.secondary,
        fontSize: 15,
        textAlign: 'left',
        margin: 10,
        marginLeft: 0,
    },
});