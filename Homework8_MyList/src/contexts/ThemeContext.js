/***
 * 提供套用主題的功能
 * 從 AsyncStorage 讀取主題設定, 若無則使用系統預設主題
 ***/

import { createContext, useState, useContext, useEffect } from 'react';
import { Appearance } from 'react-native';
import { lightTheme, darkTheme } from '../styles/Themes';
import * as StorageHelper from '../helpers/StorageHelper';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('');
    const colors = theme === 'light' ? lightTheme : darkTheme;

    // 取得主題設定
    useEffect(() => {
        const loadTheme = async () => {
            try {
                let savedTheme = await StorageHelper.getMySetting('myTheme');
                if (savedTheme) {
                    setTheme(savedTheme);
                } else {
                    setTheme(Appearance.getColorScheme());
                }
            } catch (error) {
                console.error('Failed to load theme:', error);
            }
        };

        loadTheme();
    }, []);

    // 更新儲存主題設定
    const toggleTheme = async () => {
        try {
            let newTheme = theme === 'light' ? 'dark' : 'light';
            await StorageHelper.setMySetting('myTheme', newTheme);
            setTheme(newTheme);
        } catch (error) {
            console.error('Failed to save theme:', error);
        }
    };

    return (
        <ThemeContext.Provider value={{ colors, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
