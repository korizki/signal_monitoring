import { StyleSheet, Modal, Text, View } from "react-native";
import { CircleFade } from "react-native-animated-spinkit";

export default function ModalLoading({ show }: Readonly<TEModalLoading>) {
   return (
      <Modal transparent={true} visible={show}>
         <View className="absolute flex-1 z-[1000] w-full h-full justify-center items-center" style={style.modalBg}>
            <View className="bg-white rounded-[8px] p-[16px] justify-center items-center gap-y-[12px]">
               <CircleFade size={40} color="#ddd" />
               <Text className="text-right">Mohon Tunggu</Text>
            </View>
         </View>
      </Modal>
   )
}

const style = StyleSheet.create({
   modalBg: {
      backgroundColor: 'rgba(30,30,30,0.2)'
   }
})

type TEModalLoading = {
   show: boolean;
}