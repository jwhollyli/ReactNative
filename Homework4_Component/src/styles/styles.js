import { StyleSheet } from 'react-native';
export default styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleView: {
        flex: 0.1,
    },
    listView: {
        flex: 0.9,
    },
    title: {
        fontSize: 36,
        color: '#383133',
        margin: 10
    },
    noNotesText: {
        fontSize: 26,
        color: 'gray',
        padding: 20
    }
});
