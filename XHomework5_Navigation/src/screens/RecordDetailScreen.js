import { Button, StyleSheet, Text, View, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { recordDetailStyle } from '../styles/recordDetailStyle';

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
        <ScrollView style={recordDetailStyle.container}>
            {/* Amount */}
            < View style={recordDetailStyle.amountContainer}>
                <Text style={recordDetailStyle.amountText}>
                    {props.route.params.item.amount.toLocaleString('en-US',
                        { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })}
                </Text>
            </View >
            {/* Others */}
            < View style={recordDetailStyle.otherInformationContainer} >
                {/* Category */}
                <View style={recordDetailStyle.categoryContainer}>
                    <View style={recordDetailStyle.labelContainter}>
                        <Text style={recordDetailStyle.labelText}>Category</Text>
                    </View>
                    <View style={recordDetailStyle.contentContainer}>
                        <View style={recordDetailStyle.iconBackground}>
                            <Ionicons name={props.route.params.item.iconName} size={36} color='#DDB892' />
                        </View>
                        <Text style={recordDetailStyle.categoryNameText}>
                            {props.route.params.item.categoryName}
                        </Text>
                    </View>
                </View>
                <View style={recordDetailStyle.hr}></View>
                {/* Name */}
                <View style={{ flexDirection: 'row', margin: 20 }}>
                    <View style={{ flex: 0.3, justifyContent: 'center' }}>
                        <Text style={{ fontSize: 16, color: '#3B3017', fontWeight: 'bold', }}>Name</Text>
                    </View>
                    <View style={{ flex: 0.7, justifyContent: 'center' }}>
                        <Text style={{ fontSize: 16, color: '#3B3017' }}>
                            {props.route.params.item.title}
                        </Text>
                    </View>
                </View>
                <View style={{
                    borderBottomWidth: 1, borderBottomColor: '#DDB892',
                    marginVertical: 10, width: '90%', alignSelf: 'center'
                }}></View>
                {/* Content */}
                <View style={{ flexDirection: 'row', margin: 20, marginBottom: 25 }}>
                    <View style={{ flex: 0.3, justifyContent: 'center' }}>
                        <Text style={{ fontSize: 16, color: '#3B3017', fontWeight: 'bold', }}>Content</Text>
                    </View>
                    <View style={{ flex: 0.7, justifyContent: 'center' }}>
                        <Text style={{ fontSize: 16, color: '#3B3017' }}>
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
