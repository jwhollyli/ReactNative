import { StyleSheet } from 'react-native';
export const noteButtonStyle = StyleSheet.create({
    animatedView: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 10,
        margin: 10
    },
    button: {
        borderRadius: 20,
        margin: 5
    },
    icon: {
        width: 40,
        height: 40,
        alignSelf: 'flex-start'
    },
    title: {
        fontSize: 20,
        color: '#383133',
        fontWeight: 'bold',
        textAlign: 'left',
    },
    time: {
        fontSize: 12,
        color: '#383133',
        textAlign: 'right'
    },
    hr: {
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        marginVertical: 10
    },
    content: {
        color: '#383133',
        textAlign: 'left'
    }
});