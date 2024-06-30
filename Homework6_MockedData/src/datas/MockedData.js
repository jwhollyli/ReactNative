//每筆記帳紀錄資料
const MOCKED_DATA = [
    {
        //Fix: Warning: Each child in a list should have a unique "key" prop.
        //Check the render method of `RecordScreen`. See https://reactjs.org/link/warning-keys for more information.
        id: 0, // Used in JSX as a key
        date: '2024-05-01',
        categoryImg: require('../../assets/img/Car.png'),
        category: 'trafic',
        categoryName: '交通',
        title: '加油',
        content: '機車刷卡加油',
        amount: 100,
    },
    {
        id: 1,
        date: '2024-05-01',
        categoryImg: require('../../assets/img/Food.png'),
        category: 'meal',
        categoryName: '餐費',
        title: '午餐',
        content: 'ubereat',
        amount: 220,
    },
    {
        id: 2,
        date: '2024-05-01',
        categoryImg: require('../../assets/img/Food.png'),
        category: 'meal',
        categoryName: '餐費',
        title: '下午茶',
        content: 'ubereat',
        amount: 677,
    },
    {
        id: 3,
        date: '2024-05-01',
        categoryImg: require('../../assets/img/Food.png'),
        category: 'meal',
        categoryName: '餐費',
        title: '晚餐',
        content: '牛肉麵',
        amount: 250,
    },
    {
        id: 4,
        date: '2024-05-01',
        categoryImg: require('../../assets/img/Food.png'),
        category: 'meal',
        categoryName: '餐費',
        title: '消夜',
        content: '肥滋滋',
        amount: 888,
    },
    {
        id: 5,
        date: '2024-05-02',
        categoryImg: require('../../assets/img/Car.png'),
        category: 'trafic',
        categoryName: '交通',
        title: '停車費',
        content: '路邊停車費',
        amount: 200,
    },
    {
        id: 6,
        date: '2024-05-02',
        categoryImg: require('../../assets/img/Food.png'),
        category: 'meal',
        categoryName: '餐費',
        title: '家庭聚餐',
        content: '',
        amount: 810,
    },
    {
        id: 7,
        date: '2024-05-02',
        categoryImg: require('../../assets/img/Food.png'),
        category: 'meal',
        categoryName: '餐費',
        title: '約會',
        content: '',
        amount: 2350,
    },
    {
        id: 8,
        date: '2024-05-04',
        categoryImg: require('../../assets/img/School.png'),
        category: 'learning',
        categoryName: '學習',
        title: '小孩學費',
        content: '噴$$$噴噴噴',
        amount: 22000,
    },
    {
        id: 9,
        date: '2024-05-04',
        categoryImg: require('../../assets/img/School.png'),
        category: 'learning',
        categoryName: '學習',
        title: '小孩才藝班',
        content: 'Lasy積木課',
        amount: 5500,
    },
    {
        id: 10,
        date: '2024-05-04',
        categoryImg: require('../../assets/img/Necessity.png'),
        iconName: 'cart',
        category: 'necessity',
        categoryName: '日用品',
        title: 'costco採購',
        content: '教訓老公三件組',
        amount: 500,
    },
    {
        id: 11,
        date: '2024-05-04',
        categoryImg: require('../../assets/img/Food.png'),
        category: 'meal',
        categoryName: '餐費',
        title: '午餐',
        content: '',
        amount: 880,
    },
    {
        id: 12,
        date: '2024-05-05',
        categoryImg: require('../../assets/img/Food.png'),
        category: 'meal',
        categoryName: '餐費',
        title: '家庭聚餐',
        content: '餐廳用餐',
        amount: 926,
    },
    {
        id: 13,
        date: '2024-05-05',
        categoryImg: require('../../assets/img/Car.png'),
        category: 'trafic',
        categoryName: '交通',
        title: '停車費',
        content: '親子館',
        amount: 40,
    },
    {
        id: 14,
        date: '2024-05-06',
        categoryImg: require('../../assets/img/Food.png'),
        category: 'meal',
        categoryName: '餐費',
        title: '家庭聚餐',
        content: '',
        amount: 780,
    },
];

//依照日期篩選的分類加總金額資料
//date: yyyy-MM-dd
export const getCategoryData = (date) => {
    const filteredExpenses = MOCKED_DATA.filter((item) => item.date === date);
    const categoryList = filteredExpenses.reduce((accumulator, currentItem) => {
        if (!accumulator[currentItem.category]) {
            accumulator[currentItem.category] = {
                category: currentItem.category,
                categoryName: currentItem.categoryName,
                categoryImg: currentItem.categoryImg,
                amount: 0,
            };
        }
        accumulator[currentItem.category].amount += currentItem.amount;
        return accumulator;
    }, {});
    const categoryData = Object.values(categoryList);
    return categoryData;
};

//依照日期與分類篩選的紀錄資料
//date: yyyy-MM-dd
//categyry: 分類代碼, ex: meal, traffic, necessity, learning
export const getExpenseData = ({ date, category }) => {
    return MOCKED_DATA.filter((item) => {
        if (date !== '' && category !== '') {
            return item.date === date && item.category === category;
        } else if (date !== '') {
            return item.date === date;
        } else if (category !== '') {
            return item.category === category;
        } else {//當date與category都沒有時, 回傳全部資料
            return true;
        }
    });
};

