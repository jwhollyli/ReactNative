import { Text, View, FlatList } from 'react-native';
import ExpenseCard from '../components/ExpenseCard';
import { expenseCardStyle } from '../styles/expenseCardStyle';
import { ScreenSizeContext } from '../contexts/ScreenSizeContext';
import { useContext, useEffect, useState } from 'react';
import * as MOCKED_DATA from '../datas/MockedData';
import { recordStyle } from '../styles/recordStyle';

export default function RecordScreen(props) {
    // 取得螢幕大小資訊 並傳入ExpenseCard使用的StyleSheet
    const { screenWidth, screenHeight } = useContext(ScreenSizeContext);
    const expenseCardStyles = expenseCardStyle(screenWidth);
    const [dataSource, setDataSource] = useState([]);

    //取得支出資料清單
    useEffect(() => {
        var expenses = MOCKED_DATA.getExpenseData({ date: '', category: '' });
        setDataSource(expenses);
    }, []);

    return (
        <View style={recordStyle.container}>
            {/* 判斷當清單有項目時, ScrollView包裹顯示每一張卡牌 */}
            {/* 當清單內無項目時, View顯示No Records字樣 */}

            {/* 改使用FlatList */}
            {/* {dataSource.length > 0 ?
                <ScrollView>
                    {dataSource.map((item) => (
                        <ExpenseCard
                            key={item.id} // Add a unique key prop
                            styleSheet={expenseCardStyles}  // pass the styleSheet as a prop
                            date={item.date}
                            categoryImg={item.categoryImg}
                            category={item.category}
                            categoryName={item.categoryName}
                            title={item.title}
                            content={item.content}
                            amount={item.amount}
                            // 帶入參數到RecordDetailScreen, 顯示詳細資料
                            onPress={() => props.navigation.push('RecordDetail', { item })}
                        />
                    ))}
                </ScrollView>
                :
                <View>
                    <Text style={recordStyle.noRecordText}>No Records</Text>
                </View>
            } */}
            <FlatList
                data={dataSource}
                keyExtractor={item => item.id}
                renderItem={({ item }) =>
                (<ExpenseCard
                    key={item.id}
                    styleSheet={expenseCardStyles}  // pass the styleSheet as a prop
                    date={item.date}
                    categoryImg={item.categoryImg}
                    category={item.category}
                    categoryName={item.categoryName}
                    title={item.title}
                    content={item.content}
                    amount={item.amount}
                    // 帶入參數到RecordDetailScreen, 顯示詳細資料
                    onPress={() => props.navigation.push('RecordDetail', { item: item })}
                />)}
                keyExtracto={item => item.id}
                ListEmptyComponent={() => <Text style={recordStyle.noRecordText}>No Records</Text>}
            />
        </View>
    );
}

