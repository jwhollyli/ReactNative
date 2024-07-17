import { StyleSheet } from 'react-native';

export default createStyles = (colors, screenWidth) => StyleSheet.create({
    placeCardContainer: {
        height: 80,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        marginBottom: 10,
        width: screenWidth - 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 10,
        backgroundColor: colors.container,
    },
    imgContainer: {
        width: 90,
        height: 90,
        borderRadius: 45,
        overflow: 'hidden',
    },
    placeImg: {
        width: 150,
        height: 105,
    },
    placeImgMask: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    placeInfoContainer: {
        marginLeft: 10,
        width: screenWidth - 110,   // 90 + 10 + 10
    },
    placeNameText: {
        color: colors.primary,
        fontWeight: 'bold',
        fontSize: 15
    },
    noItemsContainer: {
        height: 100,
        width: screenWidth - 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        margin: 5,
        backgroundColor: colors.background,
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
    pickerSelectorContainer: {
        flexDirection: 'row',
    },
    placeListContainer: {
        flex: 9
    },
});
