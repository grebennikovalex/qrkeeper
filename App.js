import "react-native-gesture-handler";
import React, { useState, useEffect, useContext, useCallback } from "react";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CodesContextProvider, { CodesContext } from "./context";
import Main from "./screens/Main";
import AddCode from "./screens/AddCode";
import Edit from "./screens/Edit";
import Info from "./screens/Info";
import Scan from "./screens/Scan";
import { colors } from "./colors";

const Stack = createStackNavigator();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <CodesContextProvider>
      <Init onLayoutRootView={onLayoutRootView} />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Main"
          backBehavior="order"
          screenOptions={{ headerMode: "none" }}
        >
          <Stack.Screen
            name="Main"
            component={Main}
            initialParams={{ moveCodes: false }}
          />
          <Stack.Screen name="AddCode" component={AddCode} />
          <Stack.Screen name="Edit" component={Edit} />
          <Stack.Screen name="Info" component={Info} />
          <Stack.Screen name="Scan" component={Scan} />
        </Stack.Navigator>
        {/* <StatusBar style="auto" /> */}
      </NavigationContainer>
    </CodesContextProvider>
  );
}

function Init({ onLayoutRootView }) {
  const { ready } = useContext(CodesContext);
  useEffect(() => {
    if (ready) onLayoutRootView();
  }, [ready]);
  return <View style={{ backgroundColor: colors.primary }}></View>;
}
