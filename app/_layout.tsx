import { SplashScreen, Stack } from "expo-router";
import {useFonts} from "expo-font";
import { useEffect } from "react";
export default function RootLayout() {
  const [FontsLoaded , error] = useFonts({
    "QuickSand-Bold": require("../assets/fonts/Quicksand-Bold.ttf"),
    "QuickSand-Regular": require("../assets/fonts/Quicksand-Regular.ttf"),
    "QuickSand-Light": require("../assets/fonts/Quicksand-Light.ttf"),
    "QuickSand-Medium": require("../assets/fonts/Quicksand-Medium.ttf"),
    "QuickSand-SemiBold": require("../assets/fonts/Quicksand-SemiBold.ttf"),
  }) ;

  useEffect(() => {
    if(error)throw error;
    if(FontsLoaded) SplashScreen.hideAsync();
  }, [FontsLoaded,error])
    return <Stack screenOptions={{headerShown:false}}/>;
}
