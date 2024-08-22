// @ts-ignore
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useMemo, useState } from 'react'
import { FlatList, Alert, Pressable, RefreshControl, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons'

export default function HistoryScreen({ navigation }) {
   const [keyword, setKeyword] = useState('')
   const [sampleData, setSampleData] = useState([])
   // data difilter berdasarkan keyword dan sorting waktu terbaru
   const filteredData = useMemo(() => {
      return sampleData.filter(raw => raw.cn.toLowerCase().includes(keyword.toLowerCase()))
         .sort((a, b) => new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1)
   }, [sampleData, keyword])

   // action update data
   async function handleDelete(filtered) {
      await AsyncStorage.setItem('history', JSON.stringify(filtered))
      fetchDataHistory()
   }
   // delete data history
   async function deleteHistory(cn: string, shift: string, date: string) {
      let filtered = sampleData.filter(exist => exist.cn != cn || exist.shift != shift || exist.date != date)
      // showing confirm
      Alert.alert('Konfirmasi Hapus', 'Anda yakin ingin menghapus data history ?', [
         { text: 'Batal', style: 'cancel' },
         {
            text: 'Ya', onPress: () => {
               const action = new Promise((resolve, reject) => {
                  handleDelete(filtered)
                  resolve(action)
               })
            }
         },
      ])
   }

   // jump to analyze result
   async function reAnalyzeSignal(selectedShift: string, selectedUnit: string, date: string) {
      navigation.navigate('Result', {
         selectedShift,
         selectedUnit,
         date
      })
   }

   // get data history from local storage
   async function fetchDataHistory() {
      const value = await AsyncStorage.getItem('history')
      const parsedHistory = JSON.parse(value)
      setSampleData(parsedHistory)
   }
   // fetch data from local storage on first load
   useEffect(() => {
      fetchDataHistory()
   }, [navigation.isFocused()])

   return (
      <View className="pt-[12px] bg-white flex-1 pb-[0]">
         <View className="px-[16px]">
            <View className="flex-row justify-between items-center border border-[0.7px] border-[#eee] bg-white rounded-[8px] p-[8] pl-[4] pr-[8] mb-[12px]">
               <TextInput
                  placeholder="Cari berdasarkan Code Unit"
                  inputMode="search"
                  value={keyword}
                  onChangeText={setKeyword}
                  className="px-[8] flex-1 text-[16px]"
                  selectionColor={'#ddd'}
               />
               <Ionicons name="database-search" size={28} color="#999" />
            </View>
         </View>
         <FlatList
            data={filteredData}
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={false} onRefresh={fetchDataHistory} />}
            renderItem={(data) => (
               <CardData data={data} deleteAction={deleteHistory} checkDetail={reAnalyzeSignal} />
            )}
         />
      </View>
   )
}

const CardData = ({ data, deleteAction, checkDetail }) => {
   const { cn, total, date, shift, summary, createdAt } = data.item
   return (
      <View
         className="border border-[0.7px] rounded-[8px] p-[16px] px-[16px] pt-[12px] border-[#eee] shadow-md bg-white shadow mt-[8px] mb-[12px] relative shadow-md mx-[16px]"
         style={styles.shadowProp}
      >
         <Text className="absolute top-0 right-0 p-[4] px-[8px] rounded-tr-[8px] rounded-bl-[8px] text-white bg-defaultGreena text-[12px]">{summary}</Text>
         <Text className="text-[20px] text-defaultBlack font-semibold">{cn}</Text>
         <View className="flex-row mt-[12px] mb-[4px]">
            <CardInfo
               icon="calendar"
               value={date}
            />
            <CardInfo
               icon={`${shift == 1 ? 'weather-sunny' : 'moon-waning-crescent'}`}
               value={`Shift ${shift}`}
            />
            <CardInfo
               icon="database-marker-outline"
               value={`${total.toLocaleString('id-ID')} data`}
            />
         </View>
         <Text className="mb-[12px] text-[#777]">{createdAt}</Text>
         <View className="flex-row gap-[12px] items-center mb-[4px]">
            <TouchableOpacity
               className="bg-defaultBlue p-[12px] rounded-[6px] flex-1"
               activeOpacity={0.8}
               onPress={() => checkDetail(shift, cn, date)}
            >
               <Text className="text-white text-center text-[16px]">Detail</Text>
            </TouchableOpacity>
            <MiniButton icon="delete" pressAction={() => deleteAction(cn, shift, date)} />
         </View>
      </View>
   )
}

const MiniButton = ({ icon, pressAction }: TEMiniButton) => {
   return (
      <Pressable
         className="bg-[#f8f8f8] mt-[13px] ml-[12px] border border-[#eee] border-[0] p-[12px] rounded-[6px]"
         onPress={pressAction}
      >
         <Text className="text-slate-500 w-[24px]">
            <Ionicons name={icon} size={24} />
         </Text>
      </Pressable>
   )
}

const CardInfo = ({ icon, value }: TECardInfo) => {
   return (
      <View className="gap-[8px] flex-row items-center flex-1">
         <Text className='text-[#777] '>
            <Ionicons name={icon} size={20} />
         </Text>
         <Text className="text-[#777]">{value}</Text>
      </View>
   )
}

const styles = StyleSheet.create({
   shadowProp: {
      shadowColor: '#999',
   }
})

type TECardInfo = {
   icon: string;
   value: string;
}

type TEMiniButton = {
   icon: string;
   pressAction: () => void;
}