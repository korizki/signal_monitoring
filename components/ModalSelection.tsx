import { SetStateAction, useEffect } from "react";
import { FlatList, Modal, Text, TouchableOpacity, View } from "react-native";
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons'

const ModalSelection = ({ visible, close, select, list, selected }: Readonly<TEModalSelect>) => {
   useEffect(() => {
      setTimeout(() => close(), 300)
   }, [selected])
   return (
      <Modal
         animationType="slide"
         transparent={true}
         visible={visible}
         onRequestClose={close}
      >
         <View className="flex-col justify-between flex-1">
            <TouchableOpacity onPress={close} className="flex-1"></TouchableOpacity>
            <View className="bg-white h-[30%] border border-[1px] border-[#eee] rounded-[12px] p-[18px]">
               <Text className="text-[#777] text-[16px] mb-[16px]">Silahkan pilih salah satu :</Text>
               <FlatList
                  data={list}
                  renderItem={({ item }) => (
                     <TouchableOpacity
                        onPress={() => select(item.value)}
                        activeOpacity={0.8}
                        className="text-center py-[12px] flex-row justify-center items-center"
                     >
                        <Text className={`text-[20px] ${selected == item.value ? 'text-defaultBlack font-semibold' : 'text-[#777]'}`}>
                           {item.label}
                        </Text>
                        <View className="pl-[8px]">
                           {selected == item.value ? (
                              <Ionicons name="check-circle" size={20} color={"#0D9276"} />
                           ) : false}
                        </View>
                     </TouchableOpacity>
                  )}
                  showsVerticalScrollIndicator={false}
               />
            </View>
         </View>
      </Modal>
   )
}

export default ModalSelection

type TEModalSelect = {
   visible: boolean;
   close: () => void;
   select: SetStateAction<any>;
   selected: string | number;
   list: {
      label: string;
      value: string | number
   }[]
}