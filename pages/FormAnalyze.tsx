import { Image, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native"
// @ts-ignore
import illustop from "../assets/analyze-top.png"
// @ts-ignore
import illusinfo from "../assets/infostatus.png"
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useEffect, useState } from "react"
import * as _ from 'lodash'
import ModalSelection from "../components/ModalSelection"
import InputSelection from "../components/InputSelection"
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import ModalSignalCategory from "../components/ModalSignalCategory"
import ModalLoading from "../components/LoadingModal"

export default function FormAnalyze({ navigation }: any) {
   const [showShift, setShowShift] = useState<boolean>(false)
   const [showLoading, setShowLoading] = useState(false)
   const [selectedShift, setSelectedShift] = useState<number>(0)
   const [showIndicator, setShowIndicator] = useState(false)
   const [date, setDate] = useState<any>(new Date())
   const [listUnit, setListUnit] = useState<any[]>([])
   const [showListUnit, setShowListUnit] = useState(false)
   const [selectedUnit, setSelectedUnit] = useState('')

   function showModalDate() {
      DateTimePickerAndroid.open({
         value: date,
         onChange: (event, date) => setDate(date),
         mode: 'date',
         is24Hour: true,
      })
   }

   async function fetchingListUnit() {
      setShowLoading(true)
      try {
         const action = await fetch(`https://api42.ppa-ba.net/hpr/v1/production/device/location-check-units`)
         const response = await action.json()
         if (response.code == 200) {
            let listUnit = _.map(response.data.filter(unit => unit.type == 'HD'), 'cn')
            setListUnit(listUnit.map(singleUnit => ({ label: singleUnit, value: singleUnit })))
         }
      } catch (err) {
         console.error(err)
      }
      setShowLoading(false)
   }

   function navigateToResult() {
      navigation.navigate('Result', {
         selectedShift,
         selectedUnit,
         date: date.toLocaleDateString('fr-CA')
      })
   }

   useEffect(() => {
      fetchingListUnit()
   }, [])

   return (
      <ScrollView className="bg-white flex-1">
         <StatusBar backgroundColor={'#dfdfdf'} />
         <ModalLoading show={showLoading} />
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
               <View className="my-[8px] flex mt-[16px] mb-[24px]">
                  <View>
                     <InputSelection
                        pressAction={showModalDate}
                        placeholder={"Pilih Tanggal"}
                        value={date.toLocaleDateString('fr-CA')}
                     />
                  </View>
                  <View>
                     <InputSelection
                        pressAction={() => setShowShift(!showShift)}
                        placeholder="Pilih Shift"
                        value={selectedShift ? `Shift ${selectedShift}` : null}
                     />
                     <InputSelection
                        pressAction={() => setShowListUnit(!showListUnit)}
                        placeholder="Pilih Unit"
                        value={selectedUnit ? `${selectedUnit}` : null}
                     />
                     <TouchableOpacity
                        className="p-[8px] rounded-[6px] mt-[20px] bg-defaultRed items-center flex-row justify-center"
                        activeOpacity={0.8}
                        onPress={navigateToResult}
                     >
                        <Ionicons name="map-search" size={28} color={"white"} />
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
            onPress={() => setShowIndicator(true)}
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
         <ModalSelection
            visible={showListUnit}
            close={() => setShowListUnit(false)}
            select={setSelectedUnit}
            selected={selectedUnit}
            list={listUnit}
         />
         <ModalSignalCategory show={showIndicator} close={() => setShowIndicator(false)} />
      </ScrollView>
   )
}