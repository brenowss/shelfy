import React from "react";
import { StatusBar } from "react-native";
import { AppLoading } from "expo";

import { useFonts } from '@use-expo/font';
import { UserProvider } from "./src/services/UserContext";

import Routes from "./src/routes";

export default function App() {
  let [fontsLoaded] = useFonts({
    'GothamThin': require('./assets/fonts/GothamThin.otf'),
    'GothamLight': require('./assets/fonts/GothamLight.ttf'),
    'GothamMedium': require('./assets/fonts/GothamMedium.ttf'),
    'GothamBold': require('./assets/fonts/GothamBold.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
  return (
    <UserProvider>
      <StatusBar backgroundColor={"#fff"} barStyle={'dark-content'} translucent={true} />
      <Routes />
    </UserProvider>
  );
  }
}
