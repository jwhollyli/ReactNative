# 作業六: 
修正/調整作業五的模擬簡易記帳APP內容

- 調整圖片原為Ionicons改成本地的自繪圖片, 並放在mocked data檔案內, 在換頁時傳遞(相對路徑)
- [mocked data檔案](src/datas/MockedData.js)模擬可能提供之API模式，提供兩種不同取得資料方式:
-- getCategoryData: 依照日期篩選的分類加總金額資料
-- getExpenseData: 依照日期與分類篩選的紀錄資料
- 顯示清單改使用FlatList(效能Issue)
- 改使用useEffect更新頁面使用資料

<img src="https://github.com/jwhollyli/ReactNative/blob/12581c773a413cb63ccc1bb5f68466a136778465/Homework6_MockedData/demoImages/image1.jpg" alt="image1" width="300"/>
<img src="https://github.com/jwhollyli/ReactNative/blob/12581c773a413cb63ccc1bb5f68466a136778465/Homework6_MockedData/demoImages/image2.jpg" alt="image2" width="300"/>
<img src="https://github.com/jwhollyli/ReactNative/blob/12581c773a413cb63ccc1bb5f68466a136778465/Homework6_MockedData/demoImages/image3.jpg" alt="image3" width="300"/>
<img src="https://github.com/jwhollyli/ReactNative/blob/12581c773a413cb63ccc1bb5f68466a136778465/Homework6_MockedData/demoImages/image4.jpg" alt="image4" width="300"/>
