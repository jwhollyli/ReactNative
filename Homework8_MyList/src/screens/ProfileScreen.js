import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import * as StorageHelper from '../helpers/StorageHelper';
import { useState, useEffect } from 'react';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import createGlobalStyles from '../styles/GlobalStyles';
import { createStyles } from '../styles/screens/ProfileScreen.style';

export default function ProfileScreen(props) {
    const [myName, setMyName] = useState('');
    const [myBio, setMyBio] = useState('');
    const [myFavoritePlaces, setMyFavoritePlaces] = useState([]);
    const { colors } = useTheme();
    const styles = createStyles(colors);
    const globalStyles = createGlobalStyles(colors);

    //取得資料
    useEffect(() => {
        console.log('Add focus listener');
        const unsubscribe = props.navigation.addListener('focus', () => {
            loadStorageSettings();
        })
        return unsubscribe;
    }, [])

    const loadStorageSettings = async () => {
        console.log('Load storage settings');
        let getName = await StorageHelper.getMySetting('myName');
        if (getName) {
            setMyName(getName);
        } else {
            setMyName('Guest');
        }
        let getBio = await StorageHelper.getMySetting('myBio');
        if (getBio) {
            setMyBio(getBio);
        } else {
            setMyBio('My own Bio');
        }
        let getMyFavoritePlaces = await StorageHelper.getMySetting('myFavoritePlaces');
        if (getMyFavoritePlaces) {
            setMyFavoritePlaces(JSON.parse(getMyFavoritePlaces));
        }
    }

    const clearMyData = async () => {
        try {
            await StorageHelper.clearAllSettings();
        } catch (error) {
            console.error('clear data error', error);
        }
    }

    return (
        <View style={[globalStyles.container, styles.container]}>
            <View style={styles.settingContainer}>
                <View style={{ flexDirection: 'row', margin: 10 }}>
                    <Text style={{
                        flex: 1,
                        textAlign: 'center',
                        color: '#812222',
                        fontSize: 20,
                        fontWeight: 'bold',
                        alignSelf: 'center',
                        marginLeft: 30,
                    }}>My Profile</Text>
                    <TouchableOpacity style={{ flexDirection: 'row', alignSelf: 'center', alignItems: 'center' }}
                        onPress={() => props.navigation.push('ProfileEditScreen', { myName, myBio })}>
                        <Entypo name="edit" size={20} color="#DE7D7D" />
                        <Text style={styles.buttonText}>Edit</Text>
                    </TouchableOpacity>
                </View>
                <View style={globalStyles.seperator}></View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 0.2, margin: 10, justifyContent: 'center' }}>
                        <Text style={styles.labelText}>Name</Text>
                    </View>
                    <View style={{ flex: 0.8, margin: 10, justifyContent: 'center' }}>
                        <Text style={styles.text}>{myName}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 0.2, margin: 10, justifyContent: 'center' }}>
                        <Text style={styles.labelText}>Bio</Text>
                    </View>
                    <View style={{ flex: 0.8, margin: 10, justifyContent: 'center' }}>
                        <Text style={styles.text}>{myBio}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.settingContainer}>
                <View style={{ flexDirection: 'row', margin: 10 }}>
                    <Text style={{
                        flex: 1,
                        textAlign: 'center',
                        color: '#812222',
                        fontSize: 20,
                        fontWeight: 'bold',
                        alignSelf: 'center',
                    }}>My Favoriates</Text>
                </View>
                <View style={globalStyles.seperator}></View>
                <View style={{}}>
                    {myFavoritePlaces.length === 0 && <Text style={styles.text}>No Items</Text>}
                    {myFavoritePlaces.map((item, index) => {
                        return (
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <MaterialIcons name="place" size={24} color="#DE7D7D" />
                                <Text key={item.ID} style={[styles.text, { textAlign: 'center' }]}>{item.Name}({item.Location})</Text>
                            </View>
                        )
                    })}
                </View>
            </View>
            {/* TODO: 加上環境變數判斷是否顯示清除資料按鈕 */}
            <TouchableOpacity onPress={() => clearMyData()}>
                <Text style={styles.buttonText}>Clear My Data</Text>
            </TouchableOpacity>
        </View>

    );
}

const styles = StyleSheet.create({



    labelText: {
        color: '#812222',
        fontSize: 16,
        textAlign: 'right',
        fontWeight: 'bold',
        margin: 10,
        marginRight: 5,
    },
    text: {
        color: '#DE7D7D',
        fontSize: 16,
        textAlign: 'left',
        margin: 10,
        marginLeft: 0,
    },
    buttonText: {
        color: '#DE7D7D',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold',
        margin: 5,
    },
});
