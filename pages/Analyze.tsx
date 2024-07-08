import { Image, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native"
// @ts-ignore
import illustop from "../assets/analyze-top.png"
// @ts-ignore
import illusinfo from "../assets/infostatus.png"
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useState } from "react"
import ModalSelection from "../components/ModalSelection"
import DateTimePicker from "react-native-ui-datepicker"
import dayjs from 'dayjs';

export default function DeviceComponent() {
   const [showShift, setShowShift] = useState<boolean>(false)
   const [selectedShift, setSelectedShift] = useState<number>(0)
   const [date, setDate] = useState<any>(dayjs())

   return (
      <ScrollView className="bg-white flex-1">
         <StatusBar backgroundColor={'#dfdfdf'} />
         <View className="py-[12px] pb-[52px] bg-[#dfdfdf]">
            <Image
               source={illustop}
               className="w-[100%] border h-[230px]"
               resizeMode="contain"
            />
         </View>
         <View className="items-center px-[16px]">
            <View
               className="border rounded-[8px] shadow-lg px-[24px] pt-[16px] bg-white border-[#efefef] border-[0.5px] w-full translate-y-[-36px]"
               style={{ shadowColor: '#999' }}
            >
               <Text className="text-defaultBlack font-semibold text-[20px]">Analisa Kualitas Sinyal</Text>
               <Text className="text-[#777] my-[2px]">Pilih Tanggal dan Shift</Text>
               <View className="my-[8px] flex mt-[16px]">
                  <View className="">
                     <DateTimePicker
                        mode="single"
                        date={date}
                        selectedItemColor="#D80032"
                        onChange={(params) => setDate(params.date)}
                     />
                  </View>
                  <View className="translate-y-[-24px]">
                     <TouchableOpacity
                        onPress={() => setShowShift(!showShift)}
                        activeOpacity={0.6}
                        className="p-[14px] border border-[#efefef] bg-[#f8f8f8] rounded-[6px] flex-row justify-between items-center"
                     >
                        <Text className="text-defaultBlack text-[16px]">{selectedShift ? `Shift ${selectedShift}` : 'Pilih Shift'} </Text>
                        <Ionicons
                           name="chevron-down"
                           size={20}
                           color={"#999"}
                        />
                     </TouchableOpacity>
                     <TouchableOpacity
                        className="p-[14px] rounded-[6px] mt-[20px] bg-defaultRed items-center flex-row justify-center"
                        activeOpacity={0.8}
                     >
                        <Ionicons name="send" size={20} color={"white"} />
                        <Text className="text-white text-[16px] ml-[12px]">
                           Periksa
                        </Text>
                     </TouchableOpacity>
                  </View>
               </View>
            </View>
         </View>
         <TouchableOpacity
            className="mx-[16px] bg-white mb-[24px] pt-[12px] pl-[16px] overflow-hidden rounded-[8px] h-[150px] relative bg-orange-50 border border-orange-100"
            activeOpacity={1}
            // style={{ shadowColor: '#FB8B24' }}
            onPress={() => false}
         >
            <View className="z-[10]">
               <Text className="text-[20px] text-defaultBlack font-semibold ">Standar Parameter</Text>
               <Text className="w-[180px] text-[#777] my-[16px] leading-[20px]">Ketahui berapa saja ukuran parameter kualitas sinyal.</Text>
               <Text className="text-defaultRed">Klik untuk informasi lanjutan</Text>
            </View>
            <Image source={illusinfo} resizeMode="cover" className="w-[170px] h-[120px] absolute bottom-0 right-0" />
         </TouchableOpacity>
         {/* <Text className="text-rose-600">Text</Text> */}
         <ModalSelection
            visible={showShift}
            close={() => setShowShift(false)}
            select={setSelectedShift}
            selected={selectedShift}
            list={[
               { label: `Shift 1`, value: 1 },
               { label: `Shift 2`, value: 2 },
            ]}
         />
      </ScrollView>
   )
}