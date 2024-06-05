import { Text, View, ScrollView } from 'react-native';
import ExpenseCard from '../components/ExpenseCard';
import { expenseCardStyle } from '../styles/expenseCardStyle';
import { ScreenSizeContext } from '../contexts/ScreenSizeContext';
import { useContext, useRef } from 'react';
import { getExpenseData } from '../datas/demoData';
import { recordStyle } from '../styles/recordStyle';


// ExpenseCard清單的陣列資料
const listItems = getExpenseData({ date: '', category: '' });

export default function RecordScreen(props) {
    // 取得螢幕大小資訊 並傳入ExpenseCard使用的StyleSheet
    const { screenWidth, screenHeight } = useContext(ScreenSizeContext);
    const expenseCardStyles = expenseCardStyle(screenWidth);

    return (
        <View style={recordStyle.container}>
            {/* 判斷當清單有項目時, ScrollView包裹顯示每一張卡牌 */}
            {/* 當清單內無項目時, View顯示No Records字樣 */}

            {listItems.length > 0 ?
                <ScrollView>
                    {listItems.map((item) => (
                        <ExpenseCard
                            key={item.id} // Add a unique key prop
                            styleSheet={expenseCardStyles}  // pass the styleSheet as a prop
                            date={item.date}
                            iconName={item.iconName}
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
            }
        </View>
    );
}

