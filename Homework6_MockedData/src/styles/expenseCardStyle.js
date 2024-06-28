import { StyleSheet } from 'react-native';

export const expenseCardStyle = (screenWidth) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        borderRadius: 10,
        margin: 5,
        padding: 5,
        backgroundColor: '#FDF8EC',
        width: screenWidth - 10,
        height: 80,
        justifyContent: 'center',
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
    iconContainer: {
        flex: 0.2,
    },
    middleContainer: {
        flex: 0.6,
        margin: 10,
    },
    title: {
        fontSize: 16,
        color: '#3B3017',
        fontWeight: 'bold',
        textAlign: 'left',
        textAlignVertical: 'center'
    },
    content: {
        fontSize: 14,
        color: '#DDB892',
        textAlign: 'left',
        textAlignVertical: 'center'
    },
    amountContainger: {
        flex: 0.2,
        alignContent: 'flex-end',
    },
    amount: {
        fontSize: 16,
        color: '#3B3017',
        fontWeight: 'bold',
        textAlign: 'right',
        textAlignVertical: 'center'
    }
});