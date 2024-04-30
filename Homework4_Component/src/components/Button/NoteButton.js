import React, { useState, useRef } from 'react';
import { TouchableOpacity, Text, Image, View, Dimensions, Animated, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { noteButtonStyle } from '../../styles/noteButtonStyle';

//顯示圖片
const getImage = type => {
    switch (type) {
        case 'ball':
            return require('../../../assets/ball-icon.png');
        case 'grass':
            return require('../../../assets/grass-icon.png');
        case 'rain':
            return require('../../../assets/rain-icon.png');
        case 'reading':
            return require('../../../assets/reading-icon.png');
        default:
            return require('../../../assets/teatime-icon.png');
    }
}

const NoteButton = props => {
    const [isExpanded, setIsExpanded] = useState(false);    //是否已經放大顯示框
    const boxWidth = Dimensions.get('window').width * 0.9;   //顯示寬度
    const listHeight = 60;  //初始的顯示高度
    const expandBoxHeight = Dimensions.get('window').height * 0.3;   //放大的顯示高度
    const minExpandBoxHeight = 120;
    const boxHeight = useRef(new Animated.Value(listHeight)).current;

    const handlePressAnimate = () => {
        Animated.timing(boxHeight, {
            toValue: isExpanded ? listHeight : Math.max(expandBoxHeight, minExpandBoxHeight),
            duration: 300,
            useNativeDriver: false,
        }).start();
        setIsExpanded(!isExpanded);
    };

    return (
        <TouchableOpacity
            style={[noteButtonStyle.button, { backgroundColor: props.backgroundColor }]}
            onPress={handlePressAnimate}
        >
            <Animated.View style={[noteButtonStyle.animatedView, { width: boxWidth, height: boxHeight }]}>
                {/* 原尺寸顯示部分/放大顯示全部內容 */}
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {/* 圖片 */}
                    <View style={{ flex: 0.2, alignContent: 'center' }}>
                        <Image style={noteButtonStyle.icon} source={getImage(props.image)}></Image>
                    </View>
                    {/* 標題 */}
                    <View style={{ flex: 0.6 }}>
                        {!isExpanded &&
                            < Text style={[noteButtonStyle.title, { textAlignVertical: 'center' }]}
                                numberOfLines={1}
                                ellipsizeMode='tail'>{props.title}</Text>
                        }
                        {isExpanded &&
                            <Text style={noteButtonStyle.title}>{props.title}</Text>
                        }
                    </View>
                    {/* 時間 */}
                    <View style={{ flex: 0.2 }}>
                        <Text style={noteButtonStyle.time}>{props.time}</Text>
                    </View>
                </View>
                {isExpanded &&
                    <View style={{ width: '100%' }}>
                        {/* 顯示內文 */}
                        <View style={noteButtonStyle.hr}></View>
                        <Text style={noteButtonStyle.content}>{props.content}</Text>
                    </View>}
            </Animated.View>
        </TouchableOpacity >
    );
}

export default NoteButton;

NoteButton.defaultProps = {
    image: 'teatime',
    title: 'Item',
    backgroundColor: '#FFCDB2',
}

NoteButton.propTypes = {
    image: PropTypes.string,
    title: PropTypes.string.isRequired,
    content: PropTypes.string,
    time: PropTypes.string,
    backgroundColor: PropTypes.string,
}
