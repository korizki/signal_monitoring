import { useMemo, useState } from "react";
import { StyleSheet, Image, ImageProps, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
const GoodIllus = require('../../assets/Good.png')
const ExcellentIllus = require('../../assets/Excellent.png')
const BadIllus = require('../../assets/Bad.png')
const FairIllus = require('../../assets/Fair.png')

export default function SummaryContent({ data }: Readonly<TESummary>) {
   const [activeCard, setActiveCard] = useState<string>('Excellent')

   const signalCategory = [
      { category: 'Excellent', label: 'Sangat Baik', start: -1, end: -69, color: "!text-[#379777]", pic: ExcellentIllus },
      { category: 'Good', label: 'Baik', start: -70, end: -85, color: "!text-[#FFDE4D]", pic: GoodIllus },
      { category: 'Fair', label: 'Cukup', start: -86, end: -99, color: "!text-[#FF7F3E]", pic: FairIllus },
      { category: 'Bad', label: 'Jelek', start: -100, end: -200, color: "!text-[#F5004F]", pic: BadIllus },
   ]

   const groupedData = useMemo(() => {
      return signalCategory.map(category => {
         let filteredByCategory = data.filter(rawData => {
            return rawData.rssi >= category.end && rawData.rssi < category.start
         })
         return {
            ...category,
            totalDataByCategory: filteredByCategory.length,
            percentageOfTotal: filteredByCategory.length / data.length * 100
         }
      })
   }, [data])

   return (
      <View className="px-[20] py-[10] gap-y-[24px] translate-y-[-20px] min-h-[50%]">
         {
            groupedData.filter(quality => quality.totalDataByCategory).map(categorizedData => (
               <TouchableOpacity
                  activeOpacity={1}
                  key={categorizedData.category}
                  onPress={() => setActiveCard(categorizedData.category)}
               >
                  <CardSignalCategory
                     data={categorizedData}
                     activeCard={activeCard == categorizedData.category}
                  />
               </TouchableOpacity>
            ))
         }
      </View>
   )
}

const CardSignalCategory = ({ data, activeCard }: TESignalCategory) => {
   const { category, label, percentageOfTotal, totalDataByCategory, color, pic } = data
   const textHighlight = `text-[20px] font-[500] ${activeCard ? color : 'text-[#777]'}`
   const imagewidth = activeCard ? "w-[130px] h-[130px]" : "w-[100px] h-[100px]"
   return (
      <View className="border border-[#f0f0f0] rounded-[12px] overflow-hidden flex-row bg-white justify-between items-end">
         <View className="p-[16px] py-[12px]">
            <Text className={textHighlight}>{category}</Text>
            <Text className="text-[#999]">Kualitas {label}</Text>
            <Text className={`${textHighlight} font-[600] ${activeCard ? 'text-[40px]' : 'text-[24px]'}  mt-[8px]`}>{percentageOfTotal.toFixed(2)} %</Text>
            { /* tampilkan total record jika card dipilih */
               activeCard ?
                  <TouchableOpacity activeOpacity={0.8}>
                     <Text className={stylerecord}>{totalDataByCategory.toLocaleString('id-ID')} record</Text>
                  </TouchableOpacity>
                  : false
            }
         </View>
         <Image source={pic} resizeMode="contain" className={imagewidth} style={!activeCard ? styles.grayScale : false} />
      </View>
   )
}

const styles = StyleSheet.create({
   grayScale: {
      tintColor: 'gray',
      opacity: 0.3
   }
})

const stylerecord = "bg-[#f5f5f5] text-[12px] text-[#555] w-[100px] rounded-[20px] mt-[4px] text-center p-[6px] px-[4px] border border-[#f0f0f0] border-[0.5px]"

type TESignalCategory = {
   data: {
      category: string;
      label: string;
      percentageOfTotal: number;
      totalDataByCategory: number;
      color: string;
      pic: ImageProps;
   },
   activeCard: boolean;
}

export type TDSignalHistory = {
   rssi: number;
   lat: number;
   lng: number;
   dateTime: string;
}
type TESummary = {
   data: TDSignalHistory[];
}