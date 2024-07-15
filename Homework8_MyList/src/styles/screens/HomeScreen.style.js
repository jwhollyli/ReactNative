import { StyleSheet } from 'react-native';

export const createStyles = ({ colors, screenWidth }) => StyleSheet.create({
    placeCardContainer: {
        height: 100,
        width: screenWidth - 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        margin: 5,
        backgroundColor: colors.container,
    },
    placeImg: {
        width: 100,
        height: 70,
        borderRadius: 10,
        margin: 10
    },
    placeInfoContainer: {
        flex: 0.8
    },
    placeNameText: {
        color: colors.primary,
        fontWeight: 'bold',
        fontSize: 15
    },
    placeStarContainer: {
        flex: 0.2,
        marginLeft: 10
    },
    noItemsContainer: {
        height: 100,
        width: screenWidth - 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        margin: 5,
        backgroundColor: colors.backgroundColor,
    },
    noItemsText: {
        color: colors.third,
        fontSize: 18,
        margin: 26,
        fontWeight: 'bold'
    },
    starSelector: {
        color: colors.secondary,
        fontWeight: 'bold',
        alignSelf: 'flex-end'
    },
});
