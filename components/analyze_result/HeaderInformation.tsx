import { Image, Text, View } from "react-native";
const lamp1 = require('../../assets/l1.png')
const lamp2 = require('../../assets/l2.png')
const grass1 = require('../../assets/r1.png')
const grass2 = require('../../assets/r2.png')

const HeaderInformation = ({ codeName, date, selectedShift, total }) => {
   return (
      <View className="bg-white justify-between items-start p-[20]">
         <View className="">
            <View className="flex-row items-end gap-[8px]">
               <Text className="text-[60px] font-[500] leading-[60px]">{total.toLocaleString('id-ID')}</Text>
               <Text className="pb-[12px]">record</Text>
            </View>
            <Text className="text-[24px] font-[500] mt-[8px]">HD - {codeName}</Text>
            <View className="bg-white p-[2px] mt-[8px] rounded-[20px] border flex-row gap-x-[8px] border-[#eee] items-center w-[180px]">
               <Text className="px-[8px]">{date}</Text>
               <View className={`${selectedShift == 1 ? 'bg-orange-400' : 'bg-slate-700'} p-[10px] flex-1 px-[8px] rounded-[24px]`}>
                  <Text className="text-white text-center">Shift {selectedShift}</Text>
               </View>
            </View>
         </View>
         <Text className="bg-sky-50  text-sky-600 p-[10] border border-sky-100 rounded-[8px] mt-[12] z-[10] w-full text-center">Jam Operasional Shift <Text className="font-[500]">{selectedShift == 1 ? "06:00 - 18:00" : "19:00 - 06:00"}</Text></Text>
         {
            selectedShift == 1 ? <IllusDay /> : <IllusNight />
         }
      </View>
   )
}

const IllusNight = () => {
   return (
      <View className="absolute right-0 top-0 items-start flex-row">
         <Image source={lamp1} className="w-[40px] h-[85px]" />
         <Image source={lamp2} className="w-[75px] h-[130px]" />
      </View>
   )
}

const IllusDay = () => {
   return (
      <View className="absolute flex-row bottom-0 right-0 items-end">
         <Image source={grass1} className="translate-x-[10px] w-[55px] h-[70px]" />
         <Image source={grass2} className="w-[125px] h-[200px]" />
      </View>
   )
}

export default HeaderInformation