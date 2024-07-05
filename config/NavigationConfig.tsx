import Ionicons from 'react-native-vector-icons/MaterialIcons'

export const configureNavigation = ({ route }) => (
   {
      tabBarIcon: ({ focused, color, size }) => {
         let iconName = '';
         if (route.name == 'Home') {
            iconName = 'home'
         } else if (route.name == 'Device') {
            iconName = 'cell-tower'
         } else if (route.name == 'Monitoring') {
            iconName = 'map'
         }
         return <Ionicons name={iconName} size={size} color={color} />
      },
      tabBarActiveTintColor: '#FC4100',
      tabBarLabelStyle: { fontSize: 12 },
      tabBarStyle: {
         height: 60,
         elevation: 0,
         borderTopWidth: 0,
         paddingBottom: 8,
         paddingTop: 8,
      },
      tabBarInactiveTintColor: '#B4B4B8',
   }
)