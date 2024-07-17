/***
 * 提供套用主題的功能
 * 從 AsyncStorage 讀取主題設定, 若無則使用系統預設主題
 ***/

import { createContext, useState, useContext, useEffect } from 'react';
import { Appearance } from 'react-native';
import { lightTheme, darkTheme } from '../styles/Themes';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(Appearance.getColorScheme());
    const colors = theme === 'light' ? lightTheme : darkTheme;

    // 更新儲存主題設定
    const toggleTheme = async () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ colors, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
