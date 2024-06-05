import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getExpenseData } from '../datas/demoData';
import React, { useEffect } from 'react';

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
        <View style={{
            flex: 1,
            backgroundColor: '#fff',
        }}>
            {/* 分類資料及總金額 */}
            < View style={{
                height: 80, width: '90%',
                borderRadius: 20, margin: 10, backgroundColor: '#FDF8EC',
                justifyContent: 'center', alignSelf: 'center',
            }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    {/* 分類Icon */}
                    <Ionicons name={props.route.params.item.iconName} size={30} color='#DDB892' />
                    {/* 分類名稱 */}
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#DDB892', margin: 5 }}>
                        {props.route.params.item.categoryName}
                    </Text>
                </View>
                {/* 總金額 */}
                <Text style={{ fontSize: 24, textAlign: 'center', fontWeight: 'bold', color: '#3B3017' }}>
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
                        <View style={{ flexDirection: 'row', alignItems: 'center', width: '90%', alignSelf: 'center' }}>
                            <View style={{
                                flex: 0.7,
                                margin: 10,
                            }}>
                                <Text style={{
                                    fontSize: 16,
                                    color: '#3B3017',
                                    fontWeight: 'bold',
                                    textAlign: 'left',
                                    textAlignVertical: 'center'
                                }}>{item.title}</Text>
                                <Text style={{
                                    fontSize: 14,
                                    color: '#DDB892',
                                    textAlign: 'left',
                                    textAlignVertical: 'center'
                                }}>{item.content}</Text>
                            </View>
                            <View style={{
                                flex: 0.3,
                                alignContent: 'flex-end',
                            }}>
                                <Text style={{
                                    fontSize: 16,
                                    color: '#3B3017',
                                    fontWeight: 'bold',
                                    textAlign: 'right',
                                    textAlignVertical: 'center'
                                }}>
                                    {item.amount.toLocaleString('en-US',
                                        { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })}
                                </Text>
                            </View>
                        </View>
                        {/* 最後一筆資料不加分隔線 */}
                        {index !== expenseDatas.length - 1 && <View style={{
                            borderBottomWidth: 1, borderBottomColor: '#F9EFDC',
                            marginVertical: 10, width: '90%', alignSelf: 'center'
                        }}></View>}
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
