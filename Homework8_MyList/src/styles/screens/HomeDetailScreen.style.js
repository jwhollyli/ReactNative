import { StyleSheet } from "react-native";

export const createStyles = (colors) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF4EB',
        alignItems: 'center',
    },
    placeName: {
        color: '#812222',
        fontWeight: 'bold',
        fontSize: 20,
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
        color: '#DE7D7D',
        fontSize: 16,
        textAlign: 'left',
        margin: 5,
    },
    cardsInfoText: {
        color: '#812222',
        fontSize: 16,
        textAlign: 'left',
        fontWeight: 'bold',
        margin: 5,
    }
});