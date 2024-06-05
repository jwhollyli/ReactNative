import { StyleSheet } from 'react-native';

// create stylesheet for the RecordDetailScreen
export const recordDetailStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    amountContainer: {
        height: 80, width: '90%',
        borderRadius: 20, margin: 10, backgroundColor: '#FDF8EC',
        justifyContent: 'center', alignSelf: 'center'
    },
    amountText: {
        fontSize: 24,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#3B3017'
    },
    otherInformationContainer: {
        width: '90%',
        borderRadius: 20,
        margin: 10,
        backgroundColor: '#FDF8EC',
        justifyContent: 'flex-start',
        alignSelf: 'center'
    },
    categoryContainer: {
        flexDirection: 'row',
        margin: 20,
        marginBottom: 0
    },
    labelContainter: {
        flex: 0.3,
        justifyContent: 'center'
    },
    labelText: {
        fontSize: 16,
        color: '#3B3017',
        fontWeight: 'bold'
    },
    contentContainer: {
        flex: 0.7,
        flexDirection: 'row',
        alignContent: 'center'
    },
    iconBackground: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#F9EFDC',
    },
    categoryNameText: {
        fontSize: 16,
        color: '#3B3017',
        alignSelf: 'center',
        marginLeft: 5
    },
    hr: {
        borderBottomWidth: 1,
        borderBottomColor: '#DDB892',
        marginVertical: 10,
        width: '90%',
        alignSelf: 'center'
    },
});

export default styles;