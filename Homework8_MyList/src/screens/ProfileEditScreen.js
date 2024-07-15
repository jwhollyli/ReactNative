import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import * as StorageHelper from '../helpers/StorageHelper';
import { Entypo } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
// import { usePreventRemove } from '@react-navigation/native'; //only for v7.x

export default function ProfileEditScreen(props) {
    const [myName, setMyName] = useState(props.route.params.myName);
    const [myBio, setMyBio] = useState(props.route.params.myBio);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

    const onPressSave = async () => {
        try {
            setHasUnsavedChanges(false);
            await StorageHelper.setMySetting('myName', myName);
            await StorageHelper.setMySetting('myBio', myBio);
            props.navigation.goBack();
        } catch (error) {
            console.error('save data error', error);
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
                    { text: 'Cancel', style: 'cancel', onPress: () => { } },
                    {
                        text: 'Yes',
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
        <View style={styles.container}>
            <View style={styles.settingContainer}>
                <View style={{ flexDirection: 'row', margin: 10 }}>
                    <Text style={{
                        flex: 1,
                        textAlign: 'center',
                        color: '#812222',
                        fontSize: 20,
                        fontWeight: 'bold',
                        alignSelf: 'center',
                        paddingLeft: 30,
                    }}>My Profile</Text>
                </View>
                <View style={styles.seperator}></View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 0.2, margin: 10, justifyContent: 'center' }}>
                        <Text style={styles.labelText}>Name</Text>
                    </View>
                    <View style={{ flex: 0.8, margin: 10, justifyContent: 'center' }}>
                        <TextInput
                            style={styles.textinputText}
                            defaultValue={myName}
                            onChangeText={handleChangeMyName} />
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 0.2, margin: 10, justifyContent: 'center' }}>
                        <Text style={styles.labelText}>Bio</Text>
                    </View>
                    <View style={{ flex: 0.8, margin: 10, justifyContent: 'center' }}>
                        <TextInput
                            style={{
                                color: '#DE7D7D',
                                fontSize: 16,
                                height: 160,
                                backgroundColor: '#FFF',
                                borderRadius: 5,
                            }}
                            multiline
                            defaultValue={myBio}
                            onChangeText={handleChangeMyBio} />
                    </View>
                </View>
            </View>
            <TouchableOpacity style={{ flexDirection: 'row', alignSelf: 'center', alignItems: 'center' }}>
                <Entypo name="save" size={20} color="#DE7D7D" />
                <Text style={styles.editButtonText} onPress={onPressSave}>Save</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    settingContainer: {
        backgroundColor: '#FFF4EB',
        width: '95%',
        borderRadius: 10,
        margin: 10,
        alignItems: 'center',
    },
    seperator: {
        height: 1,
        width: '95%',
        backgroundColor: '#DE7D7D',
    },
    labelText: {
        color: '#812222',
        fontSize: 16,
        textAlign: 'right',
        fontWeight: 'bold',
        margin: 10,
        marginRight: 5,
    },
    textinputText: {
        color: '#DE7D7D',
        fontSize: 16,
        height: 40,
        backgroundColor: '#FFF',
        borderRadius: 5,
    },
    editButtonText: {
        color: '#DE7D7D',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold',
        margin: 5,
    },
});
