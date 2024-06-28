// 提供螢幕當下寬度/高度資訊
// 提供參數:
// 1. screenWidth: 螢幕寬度
// 2. screenHeight: 螢幕高度

import { createContext, useState, useEffect } from 'react';
import { Dimensions } from 'react-native';

//建立Context
export const ScreenSizeContext = createContext();
//建立Provider
const ScreenSizeContextProvider = ({ children }) => {
    // 螢幕寬度
    const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
    // 螢幕高度
    const [screenHeight, setScreenHeight] = useState(Dimensions.get('window').height);

    //掛Hook監聽螢幕大小變化
    useEffect(() => {
        const updateScreenSize = () => {
            setScreenWidth(Dimensions.get('window').width);
            setScreenHeight(Dimensions.get('window').height);
        };

        const subscription = Dimensions.addEventListener('change', updateScreenSize);
        //卸載時清除監聽
        return () => {
            //Error: _reactNative.Dimensions.removeEventListener is not a function (it is undefined)
            // Dimensions.removeEventListener('change', updateScreenSize);
            subscription?.remove();
        };
    }, []);

    return (
        <ScreenSizeContext.Provider value={{ screenWidth, screenHeight }}>
            {children}
        </ScreenSizeContext.Provider>
    );
};

export default ScreenSizeContextProvider;