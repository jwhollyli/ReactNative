import { Text, View, ImageBackground, ScrollView } from 'react-native';
import { FontAwesome, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import createGlobalStyles from '../styles/GlobalStyles';
import createStyles from '../styles/screens/HomeDetailScreen.style';
import { INITIAL_PLACE_IMG_URL } from "@env"

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
                <Text style={styles.text}>{props.route.params.item.HostWords.replace(/<br>/gi, '')}</Text>
                <View style={styles.placeImgContainer}>
                    <ImageBackground
                        source={{ uri: props.route.params.item.PicURL ? props.route.params.item.PicURL : INITIAL_PLACE_IMG_URL }}
                        style={styles.placeImg} >
                        <View style={styles.placeImgMask} />
                    </ImageBackground>
                </View>
            </ScrollView>
        </View >
    );
}