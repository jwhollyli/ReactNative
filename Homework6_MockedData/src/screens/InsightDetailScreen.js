import { Text, View, Button, Image, FlatList } from 'react-native';
import * as MOCKED_DATA from '../datas/MockedData';
import React, { useEffect, useState } from 'react';
import { insightStyle } from '../styles/insightStyle';

export default function InsightDetailScreen(props) {
    const date = props.route.params.date;
    const category = props.route.params.item.category;
    const [dataSource, setDataSource] = useState([]);

    const renderExpense = ({ item, index }) => {
        return (
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
                {index !== dataSource.length - 1 && <View style={insightStyle.seperator}></View>}
            </View>
        );
    }

    // 設定標題為日期
    useEffect(() => {
        props.navigation.setOptions({
            title: date
        });
    }, [date]);
    //取得支出資料清單
    useEffect(() => {
        var expenseDatas = MOCKED_DATA.getExpenseData({ date, category });
        setDataSource(expenseDatas);
    }, []);
    return (
        <View style={insightStyle.container}>
            {/* 分類資料及總金額 */}
            < View style={insightStyle.categoryAmountContainer}>
                <View style={insightStyle.categoryContainer}>
                    {/* 分類Icon */}
                    <Image source={props.route.params.item.categoryImg} style={insightStyle.icon} />
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
            {/* 改使用FlatList */}
            {/* <ScrollView
                style={{ flexGrow: 0 }}
                contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-start' }}
            >
                {dataSource.map((item, index) =>
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
                        {index !== dataSource.length - 1 && <View style={insightStyle.seperator}></View>}
                    </View>
                )
                }
                <Button
                    title='go back'
                    color='#DDB892'
                    onPress={() => props.navigation.pop()}></Button>
            </ScrollView> */}
            <View>
                <FlatList
                    data={dataSource}
                    keyExtractor={item => item.id}
                    renderItem={({ item, index }) => renderExpense({ item, index })} />
            </View>
            <Button
                title='go back'
                color='#DDB892'
                onPress={() => props.navigation.pop()}></Button>
        </View >
    );
}