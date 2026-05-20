import { SplashScreen, Stack } from "expo-router";
import {useFonts} from "expo-font";
import { useEffect } from "react";
import * as Sentry from '@sentry/react-native';
import useAuthStore from "@/store/auth.store";

Sentry.init({
  dsn: 'https://0c6a2f882b9743873246edadcff771c3@o4511417486606336.ingest.de.sentry.io/4511417827983440',

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Enable Logs
  enableLogs: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration(), Sentry.feedbackIntegration()],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

export default Sentry.wrap(function RootLayout() {

  const {isLoading,fetchAuthenticatedUser} =  useAuthStore();
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

  useEffect(() => {
    void fetchAuthenticatedUser();
  }, [fetchAuthenticatedUser])


  if(!FontsLoaded || isLoading) return null ;

    return <Stack screenOptions={{headerShown:false}}/>;
  
    
});
