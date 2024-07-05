import { StyleSheet, Text, View } from "react-native";
import MapView from "react-native-maps";
import { TextStyled } from "../config/StyledComponent";

export default function MonitoringComponent() {
   return (
      <View style={StyleSheet.absoluteFill}>
         <MapView
            style={StyleSheet.absoluteFill}
            initialRegion={{
               latitude: -3.74340,
               longitude: 103.81314,
               latitudeDelta: 0.5,
               longitudeDelta: 0.5
            }}
            minZoomLevel={14}
            showsUserLocation={true}
         />
         <TextStyled className="absolute top-[0]">Halo</TextStyled>
      </View>
   )
}