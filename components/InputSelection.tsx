import { TouchableOpacity, Text } from "react-native";
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons'

export default function InputSelection({ pressAction, placeholder, value }) {
   return (
      <TouchableOpacity
         onPress={pressAction}
         activeOpacity={0.6}
         className="p-[14px] border border-[#efefef] bg-[#f8f8f8] rounded-[6px] flex-row justify-between items-center"
      >
         <Text className="text-defaultBlack text-[16px]">{value || placeholder} </Text>
         <Ionicons
            name="chevron-down"
            size={20}
            color={"#999"}
         />
      </TouchableOpacity>
   )
}