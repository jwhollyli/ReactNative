import AsyncStorage from '@react-native-async-storage/async-storage';
// npx expo install @react-native-async-storage/async-storage

/**
 * 
 * {string} myName
 * {string} myBio
 * {string} myTheme
 * {[{'Key': string, 'ID': string, 'Name': string, 'Location': string}] myFavoritePlaces
 * 
 */
export const getMySetting = (key) => AsyncStorage.getItem(key);
export const setMySetting = (key, value) => AsyncStorage.setItem(key, value);
export const clearAllSettings = () => AsyncStorage.clear();