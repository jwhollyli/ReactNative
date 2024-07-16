import { Text, View, TouchableOpacity, Alert } from 'react-native';
import * as StorageHelper from '../helpers/StorageHelper';
import { useState, useEffect } from 'react';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import createGlobalStyles from '../styles/GlobalStyles';
import createStyles from '../styles/screens/ProfileScreen.style';

export default function ProfileScreen(props) {
    const [myName, setMyName] = useState('');
    const [myBio, setMyBio] = useState('');
    const [myFavoritePlaces, setMyFavoritePlaces] = useState([]);
    const { colors, toggleTheme } = useTheme();
    const styles = createStyles(colors);
    const globalStyles = createGlobalStyles(colors);

    //取得資料
    useEffect(() => {
        const loadStorageSettings = async () => {
            try {
                let getName = await StorageHelper.getMySetting('myName');
                if (getName) {
                    setMyName(getName);
                } else {
                    setMyName('Guest');
                }
            } catch (error) {
                console.error('Failed to load myName:', error);
            }
            try {
                let getBio = await StorageHelper.getMySetting('myBio');
                if (getBio) {
                    setMyBio(getBio);
                } else {
                    setMyBio('My own Bio');
                }
            } catch (error) {
                console.error('Failed to load myBio:', error);
            }

            try {
                let getMyFavoritePlaces = await StorageHelper.getMySetting('myFavoritePlaces');
                if (getMyFavoritePlaces) {
                    setMyFavoritePlaces(JSON.parse(getMyFavoritePlaces));
                }
            } catch (error) {
                console.error('Failed to load myFavoritePlaces:', error);
            }
        }

        const unsubscribe = props.navigation.addListener('focus', () => {
            loadStorageSettings();
        })
        return unsubscribe;
    }, [])

    const clearMyData = async () => {
        try {
            await StorageHelper.clearAllSettings();
            Alert.alert('已經清除所有資料!');
        } catch (error) {
            console.error('Failed to clear all settings: ', error);
        }
    }

    return (
        <View style={globalStyles.container}>
            <View style={styles.settingContainer}>
                <View style={styles.settingTitleContainer}>
                    <Text style={[styles.settingTitleText, { marginLeft: 30 }]}>My Profile</Text>
                    <TouchableOpacity style={globalStyles.editButton}
                        onPress={() => props.navigation.push('ProfileEditScreen', { myName, myBio })}>
                        <Entypo name="edit" size={20} color={colors.secondary} />
                        <Text style={globalStyles.buttonText}>Edit</Text>
                    </TouchableOpacity>
                </View>
                <View style={globalStyles.seperator}></View>
                <View style={styles.infoRowContainer}>
                    <View style={styles.infoLabelContainer}>
                        <Text style={styles.labelText}>Name</Text>
                    </View>
                    <View style={styles.infoTextContainer}>
                        <Text style={styles.text}>{myName}</Text>
                    </View>
                </View>
                <View style={styles.infoRowContainer}>
                    <View style={styles.infoLabelContainer}>
                        <Text style={styles.labelText}>Bio</Text>
                    </View>
                    <View style={styles.infoTextContainer}>
                        <Text style={styles.text}>{myBio}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.settingContainer}>
                <View style={styles.settingTitleContainer}>
                    <Text style={styles.settingTitleText}>My Favoriates</Text>
                </View>
                <View style={globalStyles.seperator}></View>
                {myFavoritePlaces.length === 0 && <Text style={styles.text}>No Items</Text>}
                {myFavoritePlaces.map((item, index) => {
                    return (
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <MaterialIcons name="place" size={24} color={colors.primary} />
                            <Text key={item.Key} style={[styles.text, { textAlign: 'center' }]}>{item.Name}({item.Location})</Text>
                        </View>
                    )
                })}
            </View>
            <TouchableOpacity style={globalStyles.button} onPress={toggleTheme}>
                <Text style={globalStyles.buttonText}>Change Theme</Text>
            </TouchableOpacity>
            {/* TODO: 加上環境變數判斷是否顯示清除資料按鈕 */}
            <TouchableOpacity style={globalStyles.button} onPress={clearMyData}>
                <Text style={globalStyles.buttonText}>Clear My Data</Text>
            </TouchableOpacity>
        </View>

    );
}