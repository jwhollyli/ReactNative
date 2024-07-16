import { StyleSheet } from "react-native";

export default createStyles = (colors) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.container,
        alignItems: 'center',
    },
    scrollContainer: {
        margin: 10
    },
    placeName: {
        color: colors.primary,
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'left',
        margin: 5,
    },
    placeImage: {
        width: 360,
        height: 270,
        borderRadius: 10,
        alignSelf: 'center'
    },
    text: {
        color: colors.secondary,
        fontSize: 15,
        textAlign: 'left',
        margin: 5,
    },
    cardsInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 5
    },
    cardInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15
    },
    cardsInfoText: {
        color: colors.primary,
        fontSize: 15,
        textAlign: 'left',
        fontWeight: 'bold',
        margin: 5,
    }
});