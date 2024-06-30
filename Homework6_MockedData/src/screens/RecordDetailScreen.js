import { Button, Text, View, ScrollView, Image } from 'react-native';
import React, { useEffect } from 'react';
import { recordStyle } from '../styles/recordStyle';

export default function RecordDetailScreen(props) {
    // 設定標題為日期
    //Warning: Cannot update a component (`StackNavigator`) while rendering a different component (`RecordDetailScreen`). To locate the bad setState() call inside `RecordDetailScreen`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render
    //Note: useLayoutEffect 在DOM更新後執行(同步); useEffect 在渲染畫面後執行(會閃一下)
    useEffect(() => {
        props.navigation.setOptions({
            title: props.route.params.item.date
        });
    }, []);
    return (
        <ScrollView style={recordStyle.container}>
            {/* Amount */}
            < View style={recordStyle.amountContainer}>
                <Text style={recordStyle.amountText}>
                    {props.route.params.item.amount.toLocaleString('en-US',
                        { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })}
                </Text>
            </View >
            {/* Others */}
            < View style={recordStyle.otherInformationContainer} >
                {/* Category */}
                <View style={recordStyle.categoryContainer}>
                    <View style={recordStyle.labelContainter}>
                        <Text style={recordStyle.labelText}>Category</Text>
                    </View>
                    <View style={recordStyle.textContainer}>
                        <View style={recordStyle.iconBackground}>
                            <Image source={props.route.params.item.categoryImg} style={recordStyle.icon} />
                        </View>
                        <Text style={recordStyle.categoryNameText}>
                            {props.route.params.item.categoryName}
                        </Text>
                    </View>
                </View>
                {/* Name */}
                <View style={recordStyle.nameContainer}>
                    <View style={recordStyle.labelContainter}>
                        <Text style={recordStyle.labelText}>Name</Text>
                    </View>
                    <View style={recordStyle.textContainer}>
                        <Text style={recordStyle.text}>
                            {props.route.params.item.title}
                        </Text>
                    </View>
                </View>
                <View style={recordStyle.hr}></View>
                {/* Content */}
                <View style={recordStyle.contentContainer}>
                    <View style={recordStyle.labelContainter}>
                        <Text style={recordStyle.labelText}>Content</Text>
                    </View>
                    <View style={recordStyle.textContainer}>
                        <Text style={recordStyle.text}>
                            {props.route.params.item.content}
                        </Text>
                    </View>
                </View>
            </View >
            <Button
                title='go back'
                color='#DDB892'
                onPress={() => props.navigation.pop()}></Button>
        </ScrollView >
    );
}
