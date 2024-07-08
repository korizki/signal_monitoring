import { TextStyled, ViewStyled } from "../config/StyledComponent"
import { StatusBar } from "expo-status-bar"

export default function HomeComponent() {
   return (
      <ViewStyled className="bg-gray-100 flex-1">
         <StatusBar style="dark" />
         <TextStyled className="text-[crimo]">Hello in Home</TextStyled>
      </ViewStyled>
   )
}