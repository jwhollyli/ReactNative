import { Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import * as StorageHelper from '../helpers/StorageHelper';
import { Entypo } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import createGlobalStyles from '../styles/GlobalStyles';
import createStyles from '../styles/screens/ProfileEditScreen.style';
// import { usePreventRemove } from '@react-navigation/native'; //only for v7.x
export default function ProfileEditScreen(props) {
    const [myName, setMyName] = useState(props.route.params.myName);
    const [myBio, setMyBio] = useState(props.route.params.myBio);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
    const { colors } = useTheme();
    const globalStyles = createGlobalStyles(colors);
    const styles = createStyles(colors);

    // 儲存按鈕處理
    const onPressSave = async () => {
        try {
            setHasUnsavedChanges(false);
            await StorageHelper.setMySetting('myName', myName);
            await StorageHelper.setMySetting('myBio', myBio);
            props.navigation.goBack();
        } catch (error) {
            console.error('Failed to save my settings: ', myName, myBio, error);
        }
    }

    // 離開頁面comfirm Alert處理
    useEffect(() => {
        const unsubscribe = props.navigation.addListener('beforeRemove', (e) => {
            if (!hasUnsavedChanges) {
                return;
            }
            e.preventDefault();
            Alert.alert(
                '放棄變更?',
                '您的修改未儲存，確定要放棄變更?',
                [
                    { text: '取消', style: 'cancel', onPress: () => { } },
                    {
                        text: '好',
                        style: 'destructive',
                        onPress: () => props.navigation.dispatch(e.data.action),
                    },
                ]
            );
        });

        return unsubscribe;
    }, [props.navigation, hasUnsavedChanges]);

    const handleChangeMyName = (value) => {
        setMyName(value);
        setHasUnsavedChanges(true);
    }

    const handleChangeMyBio = (value) => {
        setMyBio(value);
        setHasUnsavedChanges(true);
    }

    return (
        <View style={globalStyles.container}>
            <View style={styles.settingContainer}>
                <View style={styles.settingTitleContainer}>
                    <Text style={styles.settingTitleText}>My Profile</Text>
                </View>
                <View style={globalStyles.seperator}></View>
                <View style={styles.infoRowContainer}>
                    <View style={styles.infoLabelContainer}>
                        <Text style={styles.labelText}>Name</Text>
                    </View>
                    <View style={styles.infoTextContainer}>
                        <TextInput
                            style={styles.textinputText}
                            defaultValue={myName}
                            onChangeText={handleChangeMyName} />
                    </View>
                </View>
                <View style={styles.infoRowContainer}>
                    <View style={styles.infoLabelContainer}>
                        <Text style={styles.labelText}>Bio</Text>
                    </View>
                    <View style={styles.infoTextContainer}>
                        <TextInput
                            style={styles.multiTextInputText}
                            multiline
                            defaultValue={myBio}
                            onChangeText={handleChangeMyBio} />
                    </View>
                </View>
            </View>
            <TouchableOpacity style={globalStyles.button}
                onPress={onPressSave}>
                <Entypo name="save" size={20} color={colors.buttonText} />
                <Text style={globalStyles.buttonText}>Save</Text>
            </TouchableOpacity>
        </View>
    );
}