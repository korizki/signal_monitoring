import { Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { ViewStyled } from "../config/StyledComponent"
const illusa = require('../assets/home_a.png')
const illusb = require('../assets/home_b.png')
const illusc = require("../assets/infostatus.png")
import { StatusBar } from "expo-status-bar"
import ModalSignalCategory from "../components/ModalSignalCategory"
import { useState } from "react"

export default function HomeComponent({ navigation }) {
   const [showIndicator, setShowIndicator] = useState(false)
   return (
      <ViewStyled className="bg-white flex-1">
         <StatusBar style="auto" />
         <View className="p-[20] pt-[50] pb-[8]">
            <Text className="text-[crimson] text-[22px]">Hai, <Text className="font-[500]">ICT Technicrian</Text></Text>
            <Text className="mt-[4] text-[#666]">Silahkan pilih menu yang tersedia untuk membantumu.</Text>
         </View>
         <View className="p-[20]" >
            <ContentCard
               imageSource={illusa}
               title={"Analisa Kualitas Jaringan"}
               desc="Periksa dan pastikan kualitas jaringan memadai."
               action={() => navigation.navigate('Analyze')}
            />
            <ContentCard
               imageSource={illusb}
               title="History Pengecekkan"
               desc="Lihat kembali hasil analisa yang telah dilakukan."
               action={() => navigation.navigate('History')}
            />
            <ContentCard
               imageSource={illusc}
               title="Standar Parameter"
               desc="Pahami nilai standar dalam menentukan kualitas jaringan."
               action={() => setShowIndicator(true)}
            />
         </View>
         <ModalSignalCategory show={showIndicator} close={() => setShowIndicator(false)} />
      </ViewStyled>
   )
}

const ContentCard = ({ imageSource, title, desc, action }: TEContentCard) => {
   return (
      <TouchableOpacity onPress={action} activeOpacity={0.8} className={cardstyle} style={styles.shadowProp}>
         <Text className="text-[20px] font-[500]">{title}</Text>
         <Image source={imageSource} resizeMode="contain" className="w-[150] h-[150] absolute right-[-16]" />
         <Text className="w-[60%] leading-[20px] mt-[8px] text-[#666]">{desc}</Text>
      </TouchableOpacity>
   )
}

const styles = StyleSheet.create({
   shadowProp: {
      borderWidth: 0.5,
      borderColor: '#ffd073',
   }
})

const cardstyle = "p-[16] py-[12] h-[auto] bg-white rounded-[6px] mb-[20px] overflow-hidden h-[130] bg-[#fffaf0]"

type TEContentCard = {
   imageSource: ImageSourcePropType,
   title: string;
   desc: string;
   action: () => void;
}