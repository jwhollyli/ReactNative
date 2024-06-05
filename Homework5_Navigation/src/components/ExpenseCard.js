import { TouchableOpacity, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons';

// Fix: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.
const ExpenseCard = (props = {
    category: 'none',
    iconName: 'category',
    title: '',
    content: '',
    amount: 0,
}) => (
    <TouchableOpacity
        onPress={props.onPress}
    >
        <View style={props.styleSheet.buttonContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={props.styleSheet.iconContainer}>
                    <View style={props.styleSheet.iconBackground}>
                        <Ionicons name={props.iconName} size={36} color='#DDB892' />
                    </View>
                </View>
                <View style={props.styleSheet.middleContainer}>
                    <Text numberOfLines={1} ellipsizeMode='tail' style={props.styleSheet.title}>{props.categoryName}</Text>
                    <Text numberOfLines={1} ellipsizeMode='tail' style={props.styleSheet.content}>{props.title}</Text>
                </View>
                <View style={props.styleSheet.amountContainger}>
                    <Text style={props.styleSheet.amount}>
                        {props.amount.toLocaleString('en-US',
                            { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })}
                    </Text>
                </View>
            </View>
        </View>
    </TouchableOpacity >
);

export default ExpenseCard;

// ExpenseCard.defaultProps = {
//     category: 'none',
//     iconName: 'category',
//     title: '',
//     content: '',
//     amount: 0,
// }

ExpenseCard.propTypes = {
    date: PropTypes.string.isRequired,
    styleSheet: PropTypes.object.isRequired,
    iconName: PropTypes.string,
    category: PropTypes.string.isRequired,
    categoryName: PropTypes.string.isRequired,
    title: PropTypes.string,
    content: PropTypes.string,
    amount: PropTypes.number.isRequired,
    onPress: PropTypes.func.isRequired,
}