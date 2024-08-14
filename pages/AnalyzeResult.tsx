import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import HeaderInformation from "../components/analyze_result/HeaderInformation";
import ModalLoading from "../components/LoadingModal";
import SummaryContent, { TDSignalHistory } from "../components/analyze_result/SummaryContent";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons'

export default function AnalyzeResult({ route, navigation }: any) {
   const { selectedShift, date } = route.params
   let startTime = selectedShift == 1 ? '06:00' : '18:00'
   let endTime = selectedShift == 1 ? '18:00' : '06:00'
   let nextDate = new Date(new Date(date).getTime() + (1000 * 60 * 60 * 24)).toLocaleDateString('fr-CA')
   const codeName = 'C77010'
   const [listData, setListData] = useState([])
   const [loading, setLoading] = useState(false)

   async function getSignalHistoryData() {
      setLoading(true)
      try {
         const action = await fetch(`https://api42.ppa-ba.net/hpr/v1/production/device/rssi-unit-locations?startDate=${date} ${startTime}&endDate=${selectedShift == 2 ? nextDate : date} ${endTime}&min=-200&max=0&status=all&codeNumber[]=${codeName}`)
         const response = await action.json()
         if (response.data.length) {
            setListData(response.code == 200 ? response.data[0].data : [])
         } else {
            setListData([])
         }
      } catch (err) {
         console.error(err)
      }
      setLoading(false)
   }
   function navigateToMap(listData: TDSignalHistory[]) {
      navigation.push('MapResult', {
         listData
      })
   }

   useEffect(() => {
      getSignalHistoryData()
   }, [selectedShift, date])
   return (
      <>
         <ScrollView className="bg-[#fafdff] flex-1 py-[20] pt-0">
            <ModalLoading show={loading} />
            <HeaderInformation
               codeName={codeName}
               date={date}
               selectedShift={selectedShift}
               total={listData.length ?? 0}
            />
            <SummaryContent data={listData} />
         </ScrollView>
         <View className="p-[20px] bg-[#fafdff]">
            <TouchableOpacity
               className="p-[8px] rounded-[6px] bg-defaultRed items-center flex-row justify-center"
               activeOpacity={0.8}
               onPress={() => navigateToMap(listData)}
            >
               <Ionicons name="google-maps" size={28} color={"white"} />
               <Text className="text-white text-[16px] ml-[12px]">
                  Lihat pada Map
               </Text>
            </TouchableOpacity>
         </View>
      </>
   )
}
