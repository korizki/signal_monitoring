// @ts-ignore
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { configureNavigation } from './config/NavigationConfig';
const Tab = createBottomTabNavigator()
import HomeComponent from './pages/Home';
import DeviceComponent from './pages/Analyze';
import MonitoringComponent from './pages/Monitoring';
import HistoryScreen from './pages/History';
import { Text, View } from 'react-native';

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        // @ts-ignore
        screenOptions={configureNavigation}
      >
        <Tab.Screen
          name="Home"
          component={HomeComponent}

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
          component={DeviceComponent}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Monitoring"
          component={MonitoringComponent}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}


export default App