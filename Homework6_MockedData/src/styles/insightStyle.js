import { StyleSheet } from 'react-native';

// create stylesheet for the InsightScreen and InsightDetailScreen
export const insightStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    datePickerContainer: {
        height: 90,
        width: '95%',
        backgroundColor: '#FDF8EC',
        borderRadius: 20,
        margin: 10,
    },
    yearMonthofDatePickerText: {
        fontSize: 18,
        color: '#DDB892',
        margin: 10,
        textAlign: 'center'
    },
    dateofDatePickerText: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        borderRadius: 10,
        margin: 5,
    },
    insightContainer: {
        height: 300,
        width: '95%',
        backgroundColor: '#FDF8EC',
        borderRadius: 20,
        margin: 10,
        marginTop: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        color: '#3B3017',
        fontWeight: 'bold'
    },
    categoryAmountContainer: {
        height: 80, width: '90%',
        borderRadius: 20, margin: 10, backgroundColor: '#FDF8EC',
        justifyContent: 'center', alignSelf: 'center',
    },
    categoryContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
    categoryNameText: { fontSize: 20, fontWeight: 'bold', color: '#DDB892', margin: 5 },
    totalAmountText: { fontSize: 24, textAlign: 'center', fontWeight: 'bold', color: '#3B3017' },
    expenseDataContainer: { flexDirection: 'row', alignItems: 'center', width: '90%', alignSelf: 'center' },
    seperator: {
        borderBottomWidth: 1, borderBottomColor: '#F9EFDC',
        marginVertical: 10, width: '90%', alignSelf: 'center'
    },
    labelContainer: {
        flex: 0.7,
        margin: 10,
    },
    titleText: {
        fontSize: 16,
        color: '#3B3017',
        fontWeight: 'bold',
        textAlign: 'left',
        textAlignVertical: 'center'
    },
    contentText: {
        fontSize: 14,
        color: '#DDB892',
        textAlign: 'left',
        textAlignVertical: 'center'
    },
    amountContainer: {
        flex: 0.3,
        alignContent: 'flex-end',
    },
    amountText: {
        fontSize: 16,
        color: '#3B3017',
        fontWeight: 'bold',
        textAlign: 'right',
        textAlignVertical: 'center'
    },
    icon: {
        height: 36,
        width: 36,
    },
});