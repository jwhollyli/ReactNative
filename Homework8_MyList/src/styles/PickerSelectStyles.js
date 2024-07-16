import { StyleSheet } from 'react-native';

export default createPickerSelectStyles = (colors) => StyleSheet.create({
    inputIOS: {
        fontSize: 15,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 0,
        borderRadius: 4,
        color: colors.secondary,
        tintColor: colors.secondary,
        placeholderColor: colors.secondary,
        backgroundColor: colors.container,
        paddingRight: 30,
        borderRadius: 10,
        margin: 5,
        width: 150,
    },
    inputAndroid: {
        fontSize: 15,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 0,
        borderRadius: 4,
        color: colors.secondary,
        tintColor: colors.secondary,
        placeholderColor: colors.secondary,
        backgroundColor: colors.container,
        paddingRight: 30,
        borderRadius: 10,
        margin: 5,
        width: 150,
    },
    placeholder: {
        color: colors.secondary,
        fontSize: 15,
    },
});