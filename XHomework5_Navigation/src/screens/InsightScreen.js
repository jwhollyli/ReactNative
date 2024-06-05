import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { PieChart } from "react-native-gifted-charts";
import { getCategoryData } from '../datas/demoData';
//npm install react-native-gifted-charts react-native-linear-gradient react-native-svg

export default function InsightScreen(props) {
    // 以下參數均為寫死的範例資料
    //上方區塊-日期選擇
    const [selectedDateTab, setSelectedDateTab] = useState('01');
    const selectedYearMonth = '2024-05';   // 年月選擇
    const renderTabDates = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14'];   // 日期選項

    //下方區塊-圖表
    // const [selectedPie, setSelectedPie] = useState('');
    const colorValues = ['#E9EDC9', '#CCDFBB', '#D9F0DD', '#AAB7A8', '#CCD5AE'];
    // 依照日期篩選PeiChart顯示的資料
    const selectedDatas = getCategoryData(`${selectedYearMonth}-${selectedDateTab}`);
    // Pie中央顯示的總金額
    const totalAmount = selectedDatas.reduce((total, item) => total + item.amount, 0);
    // 調整選完成的chartDatas, 調整內容的text為name + 比例%, 並加上指定的顏色
    const chartDatas = selectedDatas.map((item, index) => {
        return {
            category: item.category,
            categoryName: item.categoryName,
            iconName: item.iconName,
            text: `${item.categoryName} ${((item.amount / totalAmount) * 100).toFixed(2)}%`,   //Pie文字
            value: item.amount,
            color: colorValues[index],  //Pie顏色
            shiftTextX: -10,    //調整顯示文字位置X
            shiftTextY: +10,    //調整顯示文字位置Y
        }
    });
    return (
        <View style={{ flex: 1, backgroundColor: '#fff', alignItems: 'center' }}>
            {/* 上方區塊-日期選擇 */}
            <View
                style={{
                    height: 90, width: '95%', backgroundColor: '#FDF8EC',
                    borderRadius: 20, margin: 10,
                }}
            >
                <Text style={{ fontSize: 18, color: '#DDB892', margin: 10, textAlign: 'center' }}>2024-05</Text>
                {/* 以Tab呈現選單, 選單可以滑動 */}
                <ScrollView style={{ flex: 0.5 }} horizontal showsHorizontalScrollIndicator={false}>
                    {renderTabDates.map((i) => (
                        <TouchableOpacity
                            key={i}
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: selectedDateTab === i ? '#DDB892' : '#FDF8EC',
                                width: 50,
                                borderRadius: 10,
                                margin: 5,
                            }}
                            onPress={() => setSelectedDateTab(i)}>
                            <Text style={{ fontSize: 16, color: selectedDateTab === i ? '#fff' : '#3B3017' }}>
                                {i}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
            {/* 下方區塊-圖表 */}
            <View
                style={{
                    height: 300, width: '95%', backgroundColor: '#FDF8EC',
                    borderRadius: 20, margin: 10, marginTop: 0, justifyContent: 'center', alignItems: 'center',
                }}
            >
                {/* https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/blob/e98549604b1d80af9b6fe8e8e2984d0ce472f8f1/docs/PieChart/PieChartProps.md */}
                {/* 當月無支出時, 顯示No records */}
                {totalAmount === 0 ?
                    <Text style={{ fontSize: 18, color: '#3B3017', fontWeight: 'bold' }}>No records</Text>
                    :
                    <PieChart data={chartDatas} donut
                        centerLabelComponent={() => (
                            <Text style={{ fontSize: 18, color: '#3B3017', fontWeight: 'bold' }}>{totalAmount.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })}</Text>
                        )}
                        showText
                        textColor='#3B3017'
                        textSize={16}
                        innerCircleColor={'#FDF8EC'}
                        innerRadius={60}
                        radius={110}
                        focusOnPress
                        inwardExtraLengthForFocused={10}
                        showTextBackground
                        textBackgroundRadius={10}
                        onPress={(item) => {
                            props.navigation.push('InsightDetail', { date: `${selectedYearMonth}-${selectedDateTab}`, item: item })
                        }}
                    />}
            </View>
        </View>
    );
}
