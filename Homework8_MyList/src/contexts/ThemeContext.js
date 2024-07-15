/***
 * 提供套用主題的功能
 ***/

import React, { createContext, useState, useContext } from 'react';
import { Appearance } from 'react-native';
import { lightTheme, darkTheme } from '../styles/Themes';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(Appearance.getColorScheme());
    const colors = theme === 'light' ? lightTheme : darkTheme;

    // TODO: 設定主題
    const toggleTheme = () => {
        // setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };
    return (
        <ThemeContext.Provider value={{ colors, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
