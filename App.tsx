// @ts-ignore
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { configureNavigation } from './config/NavigationConfig';
const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()
import HomeComponent from './pages/Home';
import HistoryScreen from './pages/History';
import { createStackNavigator } from '@react-navigation/stack';
import AnalyzeResult from './pages/AnalyzeResult';
import FormAnalyze from './pages/FormAnalyze';
import MonitoringComponent from './pages/Monitoring';
import ModalSignalCategory from './components/ModalSignalCategory';

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='WithBottomTab'>
        <Stack.Screen name="WithBottomTab" component={WithBottomTab} options={{ headerShown: false }} />
        <Stack.Screen
          name="Result"
          component={AnalyzeResult}
          options={{ title: 'Hasil Pencarian' }}
        />
        <Stack.Screen
          name="MapResult"
          component={MonitoringComponent}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Category"
          component={ModalSignalCategory}
          options={{ presentation: 'modal', headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

function WithBottomTab() {
  return (
    <Tab.Navigator
      // @ts-ignore
      screenOptions={configureNavigation}
    >
      <Tab.Screen
        name="Home"
        component={HomeComponent}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          headerTitle: 'History Pencarian',
        }}
      />
      <Tab.Screen
        name="Analyze"
        component={FormAnalyze}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

export default App