import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons'

export default function ModalSignalCategory({ show, close }: TEModalSignalCategory) {
   return (
      <Modal
         transparent={true}
         animationType="slide"
         visible={show}
         onRequestClose={close}
      >
         <View className="absolute bottom-0 w-full h-[max-content] bg-white border-t border-t-[#eee] border-t-[0.5px] p-[16px] px-[20]">
            <View className="flex-row gap-[8px] items-center">
               <TouchableOpacity onPress={close} activeOpacity={0.8}>
                  <Ionicons name="chevron-left" size={28} color={"#555"} />
               </TouchableOpacity>
               <View className="flex">
                  <Text className="text-[22px] font-[500]">
                     Kategori Sinyal
                  </Text>
                  <Text className="my-[4px] text-[#777]">Berikut kategori sinyal berdasarkan nilai RSSI</Text>
               </View>
            </View>
            <View className="flex-col flex my-[24px] border border-[#F4CE14] border-[0.5px] bg-[#fffdf5] rounded-[12px] divide-y">
               <CardSignal
                  name="Excellent"
                  remark="Sangat Baik"
                  range=" > -69"
                  colortext="text-[#379777]"
                  bgtext="bg-[#379777]"
               />
               <CardSignal
                  name="Good"
                  remark="Baik"
                  range=" -70 s/d -85"
                  colortext="text-[#FFDE4D]"
                  bgtext="bg-[#FFDE4D]"
               />
               <CardSignal
                  name="Fair"
                  remark="Cukup"
                  range=" -86 s/d -99"
                  colortext="text-[#FF7F3E]"
                  bgtext="bg-[#FF7F3E]"
               />
               <CardSignal
                  name="Bad"
                  remark="Jelek"
                  range=" < -100"
                  colortext="text-[#F5004F]"
                  bgtext="bg-[#F5004F]"
               />
            </View>
         </View>
      </Modal>
   )
}

const CardSignal = ({ name, remark, range, colortext, bgtext }: TECardSignal) => {
   return (
      <View className="flex-row items-center p-[16px] px-[20px]" style={styles.shadowProp}>
         <View className={`w-[20] flex items-center justify-center rounded-[40px] h-[20] ${bgtext} mr-[12px]`}><Ionicons name="wifi" color={"white"} /></View>
         <View className="flex-1">
            <Text className={`${colortext} text-[24px] font-[500]`}>{name}</Text>
            <Text className="text-[13px]">Sinyal {remark}</Text>
         </View>
         <View>
            <Text className="text-right text-[13px]">Range nilai (dbm)</Text>
            <Text className={`text-[24px] text-right ${colortext} font-[500]`}>{range}</Text>
         </View>
      </View>
   )
}

const styles = StyleSheet.create({
   shadowProp: {
      shadowColor: 'crimson',
      // shadowOffset: { height: -2, width: -2 },
      shadowRadius: 0.1,
      shadowOpacity: 0.1,
   }
})
type TEModalSignalCategory = {
   show: boolean;
   close: () => void;
}
type TECardSignal = {
   name: string;
   remark: string;
   range: string;
   colortext: string;
   bgtext: string;
}