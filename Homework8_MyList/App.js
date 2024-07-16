import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import HomeDetailScreen from './src/screens/HomeDetailScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import ProfileEditScreen from './src/screens/ProfileEditScreen';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { ThemeProvider, useTheme } from './src/contexts/ThemeContext';

// npm install @react-navigation/bottom-tabs
// npm install @react-navigation/stack
// icon: https://icons.expo.fyi/Index
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
function HomeStackScreen() {
  const { colors } = useTheme();
  return (
    <Stack.Navigator
      initialRouteName='HomeScreen'
      screenOptions={{
        headerTintColor: colors.tabActiveTint,
        headerBackTitle: 'Back',
        headerTitleStyle: { fontWeight: 'bold' },
        headerStyle: {
          backgroundColor: colors.tabBackground,
        },
      }}>
      <Stack.Screen
        name='HomeScreen'
        component={HomeScreen}
        options={{ title: 'Places' }} />
      <Stack.Screen
        name='HomeDetailScreen'
        component={HomeDetailScreen}
        options={{ title: 'Details' }} />
    </Stack.Navigator>
  );
}

function ProfileStackScreen() {
  const { colors } = useTheme();
  return (
    <Stack.Navigator
      initialRouteName='ProfileScreen'
      screenOptions={{
        headerTintColor: colors.tabActiveTint,
        headerBackTitle: 'Back',
        headerTitleStyle: { fontWeight: 'bold' },
        headerStyle: {
          backgroundColor: colors.tabBackground,
        },
      }}>
      <Stack.Screen
        name='ProfileScreen'
        component={ProfileScreen}
        options={{ title: 'Settings' }} />
      <Stack.Screen
        name='ProfileEditScreen'
        component={ProfileEditScreen}
        options={{ title: 'Edit' }} />
    </Stack.Navigator>
  );
}

const MainTabs = () => {
  const { colors } = useTheme();
  return (
    <Tab.Navigator
      initialRouteName='Places'
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          if (route.name === 'Places') {
            iconName = focused ? 'text-document-inverted' : 'text-document';
            return <Entypo name={iconName} size={26} color={color} />
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
            return <Ionicons name={iconName} size={26} color={color} />
          }
          return <Text style={{ color: { color } }}>{iconName}</Text>;
        },
        //Tab顯示Icon/文字的顏色(Active/Inactive)
        tabBarInactiveTintColor: colors.tabInactiveTint,
        tabBarActiveTintColor: colors.tabActiveTint,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.tabBackground,
        }
      })}>

      <Tab.Screen name='Places' component={HomeStackScreen} options={{ tabBarLabel: 'Places' }} />
      <Tab.Screen name='Settings' component={ProfileStackScreen} options={{ tabBarLabel: 'Settings' }} />
    </Tab.Navigator>
  );
}

export default function App() {

  return (
    <ThemeProvider>
      <NavigationContainer>
        <MainTabs />
      </NavigationContainer>
    </ThemeProvider>
  );
}
