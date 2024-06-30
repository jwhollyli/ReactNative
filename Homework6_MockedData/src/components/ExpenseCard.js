import { TouchableOpacity, Text, View, Image } from 'react-native';
import PropTypes from 'prop-types';

// Fix: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.
const ExpenseCard = (props = {
    category: 'none',
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
                        <Image source={props.categoryImg} style={props.styleSheet.icon} />
                    </View>
                </View>
                <View style={props.styleSheet.middleContainer}>
                    <Text numberOfLines={1} ellipsizeMode='tail' style={props.styleSheet.title}>{props.categoryName}</Text>
                    <Text numberOfLines={1} ellipsizeMode='tail' style={props.styleSheet.content}>{props.title}</Text>
                </View>
                <View style={props.styleSheet.amountContainger}>
                    <Text style={props.styleSheet.amount}>
                        {props.amount ? props.amount.toLocaleString('en-US',
                            { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }) : ''}
                    </Text>
                </View>
            </View>
        </View>
    </TouchableOpacity >
);

export default ExpenseCard;

ExpenseCard.propTypes = {
    date: PropTypes.string.isRequired,
    styleSheet: PropTypes.object.isRequired,
    categoryImg: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    categoryName: PropTypes.string.isRequired,
    title: PropTypes.string,
    content: PropTypes.string,
    amount: PropTypes.number.isRequired,
    onPress: PropTypes.func.isRequired,
}