import { Image, StatusBar, StyleSheet, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { TDSignalHistory } from "../components/analyze_result/SummaryContent";
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons'
const sexcellent = require('../assets/sexcellent.png')
const sgood = require('../assets/sgood.png')
const sfair = require('../assets/sfair.png')
const sbad = require('../assets/sbad.png')
import * as Location from 'expo-location'
import { useEffect } from "react";

export default function MonitoringComponent({ route, navigation }) {
   const { listData }: TDListCoordinate = route.params
   async function gettingPermission() {
      try {
         let { status } = await Location.requestForegroundPermissionsAsync()
         if (status !== 'granted') {
            return false
         }
      } catch (err) {
         console.error('Something wrong on getting location permission')
      }
   }
   useEffect(() => {
      gettingPermission()
   }, [])
   return (
      <View style={StyleSheet.absoluteFill}>
         <StatusBar backgroundColor="white" hidden={false} showHideTransition="slide" barStyle="dark-content" />
         <MapView
            style={StyleSheet.absoluteFillObject}
            mapPadding={{ top: 24, right: 0, left: 0, bottom: 0 }}
            initialRegion={{
               latitude: -3.74340,
               longitude: 103.81314,
               latitudeDelta: 0.05,
               longitudeDelta: 0.05,
            }}
            provider="google"
            showsUserLocation={true}
            showsMyLocationButton={true}
         >
            {
               listData.map(location => (
                  <Marker
                     coordinate={{ latitude: location.lat, longitude: location.lng }}
                     pinColor={'#ddd'}
                     tracksViewChanges={false}
                     key={location.dateTime}
                     title={`${location.dateTime}`}
                     description={`${location.rssi} dBm`}
                  >
                     <Image source={generateColor(location.rssi)} className="w-[6px] h-[6px]" resizeMode="contain" />
                  </Marker>

               ))
            }
         </MapView>
         <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}
            className="bg-white p-[4px] absolute top-[36] left-[8] rounded-[8px] border border-[#ddd] border-[0.5px]"
         >
            <Ionicons name="chevron-left" size={32} color="#777" />
         </TouchableOpacity>
      </View>
   )
}

function generateColor(rssi: number) {
   if (rssi < -1 && rssi >= -69) {
      return sexcellent
   } else if (rssi < -69 && rssi >= -85) {
      return sgood
   } else if (rssi < -85 && rssi >= -99) {
      return sfair
   } else {
      return sbad
   }
}

type TDListCoordinate = {
   listData: TDSignalHistory[]
}