import { Text, View, TouchableOpacity, Alert } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import createGlobalStyles from '../styles/GlobalStyles';
import createStyles from '../styles/screens/ProfileScreen.style';
import { ENV } from "@env"

export default function ProfileScreen(props) {
    const { colors, toggleTheme } = useTheme();
    const styles = createStyles(colors);
    const globalStyles = createGlobalStyles(colors);

    return (
        <View style={globalStyles.container}>
            <TouchableOpacity style={globalStyles.button} onPress={toggleTheme}>
                <Text style={globalStyles.buttonText}>Change Theme</Text>
            </TouchableOpacity>
        </View>

    );
}