import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getExpenseData } from '../datas/demoData';
import React, { useEffect } from 'react';
import { insightStyle } from '../styles/insightStyle';

export default function InsightDetailScreen(props) {
    const date = props.route.params.date;
    const category = props.route.params.item.category;
    // 設定標題為日期
    useEffect(() => {
        props.navigation.setOptions({
            title: date
        });
    }, [date]);

    const expenseDatas = getExpenseData({ date, category });
    return (
        <View style={insightStyle.container}>
            {/* 分類資料及總金額 */}
            < View style={insightStyle.categoryAmountContainer}>
                <View style={insightStyle.categoryContainer}>
                    {/* 分類Icon */}
                    <Ionicons name={props.route.params.item.iconName} size={30} color='#DDB892' />
                    {/* 分類名稱 */}
                    <Text style={insightStyle.categoryNameText}>
                        {props.route.params.item.categoryName}
                    </Text>
                </View>
                {/* 總金額 */}
                <Text style={insightStyle.totalAmountText}>
                    {props.route.params.item.value.toLocaleString('en-US',
                        { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })}
                </Text>
            </View >
            {/* 顯示分類下的支出資料 */}
            <ScrollView
                style={{ flexGrow: 0 }}
                contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-start' }}
            >
                {expenseDatas.map((item, index) =>
                    <View key={item.id}>
                        <View style={insightStyle.expenseDataContainer}>
                            <View style={insightStyle.labelContainer}>
                                <Text style={insightStyle.titleText}>{item.title}</Text>
                                <Text style={insightStyle.contentText}>{item.content}</Text>
                            </View>
                            <View style={insightStyle.amountContainer}>
                                <Text style={insightStyle.amountText}>
                                    {item.amount.toLocaleString('en-US',
                                        { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })}
                                </Text>
                            </View>
                        </View>
                        {/* 最後一筆資料不加分隔線 */}
                        {index !== expenseDatas.length - 1 && <View style={insightStyle.hr}></View>}
                    </View>
                )
                }
                <Button
                    title='go back'
                    color='#DDB892'
                    onPress={() => props.navigation.pop()}></Button>
            </ScrollView>
        </View >
    );
}