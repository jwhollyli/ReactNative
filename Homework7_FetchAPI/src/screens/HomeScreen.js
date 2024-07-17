import { Text, View, FlatList, TouchableOpacity, Dimensions, ActivityIndicator, ImageBackground } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import createGlobalStyles from '../styles/GlobalStyles';
import createPickerSelectStyles from '../styles/PickerSelectStyles';
import createStyles from '../styles/screens/HomeScreen.style';
import { API_BASE_URL, TRAVEL_FOOD_URL, INITIAL_PLACE_IMG_URL } from "@env"
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

    const { colors } = useTheme();
    const globalStyles = createGlobalStyles(colors);
    const styles = createStyles(colors, Dimensions.get('window').width);
    const pickerSelectStyles = createPickerSelectStyles(colors);

    // const sleep = (ms) => {
    //     return new Promise((resolve) => setTimeout(resolve, ms));
    // };

    // 取得農村地方美食小吃特色料理 公開資料
    useEffect(() => {
        // 取得地方美食清單, 並依照資料彙整City+Town Unique資料
        const fetchData = async () => {
            const REQUEST_URL = new URL(TRAVEL_FOOD_URL, API_BASE_URL).toString();
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
                console.error('Failed to fetch data:', error);
            }
        };
        fetchData();
    }, []);

    // 更新Town下拉選單選項
    useEffect(() => {
        if (!isLoading && selectedCity) {
            let selectedTowns = cityTownDataSource.filter(item => item.startsWith(selectedCity)).map(item => item.split('-')[1]);
            setTownDataSource(selectedTowns);
            setSelectedTown('All');
        }
    }, [selectedCity, isLoading]);

    //更新地方美食清單資料
    useEffect(() => {
        if (!isLoading && selectedTown) {
            if (selectedTown === 'All') {
                setPlacesDataSource(dataSource.filter(item => item.City === selectedCity));
            } else {
                setPlacesDataSource(dataSource.filter(item => item.City === selectedCity && item.Town === selectedTown));
            }
        }
    }, [selectedCity, selectedTown, isLoading]);

    //顯示地方美食清單資料
    const renderPlaceCard = (item) => {
        return (
            <TouchableOpacity onPress={() => showDetailInfo(item)}>
                <View style={styles.placeCardContainer}>
                    <View style={styles.imgContainer}>
                        <ImageBackground
                            source={{ uri: item.PicURL ? item.PicURL : INITIAL_PLACE_IMG_URL }}
                            style={styles.placeImg} >
                            <View style={styles.placeImgMask} />
                        </ImageBackground>
                    </View>
                    <View style={styles.placeInfoContainer}>
                        <Text
                            ellipsizeMode='tail'
                            numberOfLines={1}
                            style={styles.placeNameText}>
                            {item.Name}
                        </Text>
                        <Text
                            style={globalStyles.text}>
                            {item.Address}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity >
        );
    }

    //顯示地方美食詳細資訊
    const showDetailInfo = (item) => {
        props.navigation.push('HomeDetailScreen', { item });
    }

    if (isLoading) {
        return (
            <View style={globalStyles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.third} />
                <Text style={globalStyles.text}>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={globalStyles.container}>
            <View style={styles.pickerSelectorContainer}>
                <RNPickerSelect style={pickerSelectStyles}
                    placeholder={{ label: '選擇縣市', value: null }}
                    value={selectedCity}
                    onValueChange={(value) => {
                        setSelectedCity(value);
                    }}
                    items={cityDataSource.map((value, index) => ({ label: value, value: value, key: index }))} />
                <RNPickerSelect style={pickerSelectStyles}
                    placeholder={{ label: '全部', value: 'All' }}
                    value={selectedTown}
                    onValueChange={(value) => {
                        setSelectedTown(value);
                    }}
                    items={townDataSource.map((value, index) => ({ label: value, value: value, key: index }))} />
            </View>
            <View style={styles.placeListContainer}>
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


