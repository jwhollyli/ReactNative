import { Text, View, Image, ScrollView } from 'react-native';
import { FontAwesome, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import createGlobalStyles from '../styles/GlobalStyles';
import createStyles from '../styles/screens/HomeDetailScreen.style';

export default function HomeDetailScreen(props) {
    const { colors } = useTheme();
    const globalStyles = createGlobalStyles(colors);
    const styles = createStyles(colors);

    return (
        <View style={globalStyles.container}>
            <ScrollView style={styles.scrollContainer}>
                <Text style={styles.placeName}>{props.route.params.item.Name}</Text>
                <Text style={styles.text}>{props.route.params.item.Address}</Text>
                <Text style={styles.text}>{props.route.params.item.Tel}</Text>
                <View style={styles.cardsInfoContainer}>
                    <View style={styles.cardInfoContainer}>
                        <FontAwesome name="credit-card" size={25} color={colors.primary} />
                        <Text style={styles.cardsInfoText}>信用卡</Text>
                        <AntDesign name="checkcircleo" size={24} color={colors.secondary} />
                    </View>
                    <View style={styles.cardInfoContainer}>
                        <MaterialIcons name="card-travel" size={30} color={colors.primary} />
                        <Text style={styles.cardsInfoText}>國旅卡</Text>
                        <AntDesign name="closecircleo" size={24} color={colors.secondary} />
                    </View>
                </View>
                <Image source={{ uri: props.route.params.item.PicURL ? props.route.params.item.PicURL : 'https://images.pexels.com/photos/413960/pexels-photo-413960.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }} style={styles.placeImage} />
                <Text style={styles.text}>{props.route.params.item.HostWords.replace(/<br>/gi, '')}</Text>
            </ScrollView>
        </View >
    );
}