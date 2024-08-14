import Ionicons from 'react-native-vector-icons/MaterialIcons'

export const configureNavigation = ({ route }) => {
   return {
      tabBarIcon: ({ focused, color, size }) => {
         let iconName = '';
         if (route.name == 'Home') {
            iconName = 'home'
         } else if (route.name == 'Analyze') {
            iconName = 'pie-chart'
         } else if (route.name == 'History') {
            iconName = 'list'
         }
         return <Ionicons name={iconName} size={size} color={color} />
      },
      tabBarActiveTintColor: '#D80032',
      tabBarLabelStyle: { fontSize: 12, fontWeight: 600 },
      tabBarStyle: {
         height: 60,
         elevation: 0,
         borderTopWidth: 0.5,
         borderTopColor: '#eee',
         paddingBottom: 8,
         paddingTop: 6,
      },
      tabBarInactiveTintColor: '#B4B4B8',
      tabBarHideOnKeyboard: true
   }
}