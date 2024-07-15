import { Text, View, Image, ScrollView } from 'react-native';
import { FontAwesome, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { createStyles } from '../styles/screens/HomeDetailScreen.style';
import { useTheme } from '../contexts/ThemeContext';

export default function HomeDetailScreen(props) {
    const { colors } = useTheme();
    const styles = createStyles(colors);

    return (
        <View style={styles.container}>
            <ScrollView style={{ margin: 10 }}>
                <Text style={styles.placeName}>{props.route.params.item.Name}</Text>
                <Text style={styles.text}>{props.route.params.item.Address}</Text>
                <Text style={styles.text}>{props.route.params.item.Tel}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 5 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome name="credit-card" size={26} color={colors.primary} />
                        <Text style={styles.cardsInfoText}>信用卡</Text>
                        <AntDesign name="checkcircleo" size={24} color={colors.secondary} />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
                        <MaterialIcons name="card-travel" size={34} color={colors.primary} />
                        <Text style={styles.cardsInfoText}>國旅卡</Text>
                        <AntDesign name="closecircleo" size={24} color={colors.secondary} />
                    </View>
                </View>
                <Image source={{ uri: props.route.params.item.PicURL ? props.route.params.item.PicURL : 'https://images.pexels.com/photos/413960/pexels-photo-413960.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }} style={styles.placeImage} />
                <Text style={styles.text}>{props.route.params.item.HostWords.replace(/<br>/g, '')}</Text>
            </ScrollView>
        </View >
    );
}