import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import RecordScreen from './src/screens/RecordScreen';
import RecordDetailScreen from './src/screens/RecordDetailScreen';
import InsightScreen from './src/screens/InsightScreen';
import InsightDetailScreen from './src/screens/InsightDetailScreen';
import ScreenSizeContextProvider from './src/contexts/ScreenSizeContext';

//https://icons.expo.fyi/Index
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function RecordStack() {

  return (
    <Stack.Navigator
      initialRouteName='Records'
      screenOptions={{
        headerStyle: { backgroundColor: '#FAEDCD' },
        headerTintColor: '#DDB892',
      }}
    >
      <Stack.Screen
        name="Records"
        component={RecordScreen}
      />
      <Stack.Screen
        name="RecordDetail"
        component={RecordDetailScreen}
      />
    </Stack.Navigator>
  );
}

function InsightStack() {
  return (
    <Stack.Navigator
      initialRouteName='Insights'
      screenOptions={{
        headerStyle: { backgroundColor: '#FAEDCD' },
        headerTintColor: '#DDB892'
      }}
    >
      <Stack.Screen
        name="Insights"
        component={InsightScreen}
      />
      <Stack.Screen
        name="InsightDetail"
        component={InsightDetailScreen}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <ScreenSizeContextProvider>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName='Records'
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color }) => {
              let iconName;
              if (route.name == 'Record') {
                iconName = focused ? 'text-document-inverted' : 'text-document';
                return <Entypo name={iconName} size={26} color={color} />
              } else if (route.name == 'Insight') {
                iconName = focused ? 'chart-box' : 'chart-box-outline';
                return <MaterialCommunityIcons name={iconName} size={24} color={color} />
              }
            },
            //Tab顯示Icon/文字的顏色(Active/Inactive)
            tabBarInactiveTintColor: '#E5DBC7',
            tabBarActiveTintColor: '#DDB892',
            headerShown: false,
            tabBarStyle: {
              backgroundColor: '#FAEDCD',
            }
          })}
        >
          <Tab.Screen name='Record'
            component={RecordStack}
            options={{ tabBarLabel: 'Records' }}
          />
          <Tab.Screen name='Insight'
            component={InsightStack}
            options={{ tabBarLabel: 'Insights' }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </ScreenSizeContextProvider>
  );
}

