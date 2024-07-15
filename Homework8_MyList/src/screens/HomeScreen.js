import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useState, useEffect } from 'react';
import { AntDesign } from '@expo/vector-icons';
import * as StorageHelper from '../helpers/StorageHelper';
import { useTheme } from '../contexts/ThemeContext';
import createGlobalStyles from '../styles/GlobalStyles';
import createPickerSelectStyles from '../styles/PickerSelectStyles';
import { createStyles } from '../styles/screens/HomeScreen.style';
// npm install react-native-picker-select
// npm install @react-native-picker/picker
export default function HomeScreen(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [dataSource, setDataSource] = useState([]);                   //地方美食公開資料原始清單
    const [cityTownDataSource, setCityTownDataSource] = useState([]);   //City+Town Unique資料
    const [cityDataSource, setCityDataSource] = useState([]);           //City下拉選單選項
    const [townDataSource, setTownDataSource] = useState([]);           //Town下拉選單選項
    const [selectedCity, setSelectedCity] = useState('新北市');          //選擇的縣市(預設選擇新北市)
    const [selectedTown, setSelectedTown] = useState('');               //選擇的區域鄉鎮
    const [placesDataSource, setPlacesDataSource] = useState([]);       //顯示的地方美食清單
    const [myFavoritePlaces, setMyFavoritePlaces] = useState([]);       //我的最愛地方美食清單
    const [showMyFavorite, setShowMyFavorite] = useState(false);        //是否顯示我的最愛地方美食清單

    const { colors } = useTheme();
    const globalStyles = createGlobalStyles(colors);
    const styles = createStyles(colors, Dimensions.get('window').width);
    console.log(styles);
    const pickerSelectStyles = createPickerSelectStyles(colors);

    // 取得農村地方美食小吃特色料理 公開資料
    useEffect(() => {
        fetchData();
        loadMyFavoritePlaces();
    }, []);

    // 取得地方美食清單, 並依照資料彙整City+Town Unique資料
    const fetchData = async () => {
        const REQUEST_URL = 'https://data.moa.gov.tw/Service/OpenData/ODwsv/ODwsvTravelFood.aspx';
        try {
            let response = await fetch(REQUEST_URL);
            let result = await response.json();
            setDataSource(result);
            // 取得City+Town Unique資料
            let cityTown = Array.from(new Set(result.map(item => `${item.City}-${item.Town}`)));
            setCityTownDataSource(cityTown);
            // City下拉選單選項(去除重複值)
            let cities = Array.from(new Set(result.map(item => item.City)));
            setCityDataSource(cities);
            setIsLoading(false);
        } catch (error) {
            console.error('fetch data error', error);
        }
    };

    // 取得我的最愛地方美食清單
    const loadMyFavoritePlaces = async () => {
        let getMyFavoritePlaces = await StorageHelper.getMySetting('myFavoritePlaces');
        if (getMyFavoritePlaces) {
            setMyFavoritePlaces(JSON.parse(getMyFavoritePlaces));
        }
    }

    // 更新Town下拉選單選項
    useEffect(() => {
        if (!isLoading && selectedCity) {
            let selectedTowns = cityTownDataSource.filter(item => item.startsWith(selectedCity)).map(item => item.split('-')[1]);
            setTownDataSource(selectedTowns);
            setSelectedTown('All');
            setShowMyFavorite(false);
        }
    }, [selectedCity, isLoading]);

    //更新地方美食清單資料
    useEffect(() => {
        if (!isLoading && selectedTown) {
            if (showMyFavorite === true) {
                setPlacesDataSource(dataSource.filter(item => myFavoritePlaces.some(favorite => item.ID === favorite.ID)));
            }
            else if (selectedTown === 'All') {
                setPlacesDataSource(dataSource.filter(item => item.City === selectedCity));
            } else {
                setPlacesDataSource(dataSource.filter(item => item.City === selectedCity && item.Town === selectedTown));
            }
        }
    }, [selectedCity, selectedTown, isLoading, showMyFavorite, myFavoritePlaces]);

    //儲存我的最愛地方美食清單
    useEffect(() => {
        StorageHelper.setMySetting('myFavoritePlaces', JSON.stringify(myFavoritePlaces));
    }, [myFavoritePlaces]);

    //顯示地方美食清單資料
    const renderPlaceCard = (item) => {
        return (
            <TouchableOpacity onPress={() => showDetailInfo(item)}>
                <View style={styles.placeCardContainer}>
                    <Image
                        source={{ uri: item.PicURL ? item.PicURL : 'https://images.pexels.com/photos/413960/pexels-photo-413960.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }}
                        style={styles.placeImg} />
                    <View style={styles.placeInfoContainer}>
                        <Text
                            ellipsizeMode='tail'
                            numberOfLines={1}
                            style={styles.placeNameText}>
                            {item.Name}
                        </Text>
                        <Text style={globalStyles.text}>
                            {item.Address}
                        </Text>
                    </View>
                    <View style={styles.placeStarContainer}>
                        <TouchableOpacity
                            onPress={() => pressItemStar(item)}>
                            {myFavoritePlaces.some(place => place.ID === item.ID) ?
                                <AntDesign name="star" size={30} color={colors.secondary} /> : <AntDesign name="staro" size={30} color={colors.secondary} />}
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity >
        );
    }

    //顯示地方美食詳細資訊
    const showDetailInfo = (item) => {
        props.navigation.push('HomeDetailScreen', { item });
    }

    //點選項目星星按鈕, 加入/移除我的最愛
    const pressItemStar = (item) => {
        let copyMyFavoritePlaces = [...myFavoritePlaces];
        let itemIndex = copyMyFavoritePlaces.findIndex((place) => place.ID === item.ID);
        if (itemIndex !== -1) {
            copyMyFavoritePlaces.splice(itemIndex, 1);
        } else {
            copyMyFavoritePlaces.push({ ID: item.ID, Name: item.Name, Location: `${item.City}${item.Town}` });
        }
        console.log('copyMyFavoritePlaces', copyMyFavoritePlaces);
        setMyFavoritePlaces(copyMyFavoritePlaces);
    }

    return (
        <View style={globalStyles.container}>
            <View style={{ flexDirection: 'row' }}>
                <RNPickerSelect style={pickerSelectStyles}
                    placeholder={{ label: '選擇縣市', value: null }}
                    value={selectedCity}
                    onValueChange={(value) => {
                        setShowMyFavorite(false);
                        setSelectedCity(value);
                    }}
                    items={cityDataSource.map((value, index) => ({ label: value, value: value, key: index }))} />
                <RNPickerSelect style={pickerSelectStyles}
                    placeholder={{ label: '全部', value: 'All' }}
                    value={selectedTown}
                    onValueChange={(value) => {
                        setShowMyFavorite(false);
                        setSelectedTown(value);
                    }}
                    items={townDataSource.map((value, index) => ({ label: value, value: value, key: index }))} />
                <TouchableOpacity style={{ alignSelf: 'center', flexDirection: 'row' }}
                    onPress={() => setShowMyFavorite(!showMyFavorite)}>
                    {showMyFavorite ? <AntDesign name="star" size={30} color={colors.secondary} /> : <AntDesign name="staro" size={30} color={colors.secondary} />}
                    <Text style={styles.starSelector}>x{myFavoritePlaces.length}</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 9 }}>
                <FlatList
                    data={placesDataSource}
                    keyExtractor={item => item.ID}
                    renderItem={(cases) => renderPlaceCard(cases.item)}
                    ListEmptyComponent={() =>
                        <View style={styles.noItemsContainer}>
                            <Text style={styles.noItemsText}>No Items</Text>
                        </View>}
                />
            </View>
        </View>
    );
}


