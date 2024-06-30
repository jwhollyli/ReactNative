import { StyleSheet } from 'react-native';

// create stylesheet for the RecordScreen and RecordDetailScreen
export const recordStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    noRecordText: {
        textAlignVertical: 'center',
        textAlign: 'center',
        fontSize: 20,
        color: '#D0C9C1',
        padding: 20
    },
    amountContainer: {
        height: 80,
        width: '90%',
        borderRadius: 20,
        margin: 10,
        backgroundColor: '#FDF8EC',
        justifyContent: 'center',
        alignSelf: 'center'
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
    textContainer: {
        flex: 0.7,
        flexDirection: 'row',
        alignContent: 'center'
    },
    text: {
        fontSize: 16,
        color: '#3B3017'
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
    icon: {
        height: 36,
        width: 36,
    },
    categoryNameText: {
        fontSize: 16,
        color: '#3B3017',
        alignSelf: 'center',
        marginLeft: 5
    },
    nameContainer: {
        flexDirection: 'row',
        margin: 20
    },
    contentContainer: {
        flexDirection: 'row',
        margin: 20
    }
});