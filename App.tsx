// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// const Stack = createNativeStackNavigator()
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { configureNavigation } from './config/NavigationConfig';
const Tab = createBottomTabNavigator()
import { withExpoSnack } from 'nativewind';
import HomeComponent from './pages/Home';
import DeviceComponent from './pages/Devices';
import MonitoringComponent from './pages/Monitoring';

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={configureNavigation}
      >
        <Tab.Screen
          name="Home"
          component={HomeComponent}
        />
        <Tab.Screen
          name="Device"
          component={DeviceComponent}
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

export default withExpoSnack(App)