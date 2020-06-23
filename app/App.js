import React from "react";
import { AppLoading } from "expo";

import {
  Raleway_300Light,
  Raleway_400Regular,
  Raleway_500Medium,
  Raleway_600SemiBold,
  Raleway_700Bold,
  useFonts,
} from "@expo-google-fonts/raleway";

import Routes from "./src/routes";

export default function App() {
  const [fontsLoaded] = useFonts({
    Raleway_300Light,
    Raleway_400Regular,
    Raleway_500Medium,
    Raleway_600SemiBold,
    Raleway_700Bold
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return <Routes />;
}
