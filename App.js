import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import * as SecureStore from "expo-secure-store";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CodesContextProvider, { CodesContext } from "./context";
import Main from "./screens/Main";
import AddCode from "./screens/AddCode";
import Edit from "./screens/Edit";
import Info from "./screens/Info";

const Stack = createStackNavigator();

export default function App() {
  const [checked, setChecked] = useState(false);

  if (checked) {
    return (
      <CodesContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Main"
            backBehavior="order"
            screenOptions={{ headerMode: "none" }}
          >
            <Stack.Screen name="Main" component={Main} />
            <Stack.Screen name="AddCode" component={AddCode} />
            <Stack.Screen name="Edit" component={Edit} />
            <Stack.Screen name="Info" component={Info} />
          </Stack.Navigator>
          <StatusBar style="auto" />
        </NavigationContainer>
      </CodesContextProvider>
    );
  } else {
    return (
      <AppLoading
        startAsync={async () => {
          try {
            const readCodes = await SecureStore.getItemAsync("qrwallet");
            let parsed = JSON.parse(readCodes);
            if (Array.isArray(parsed)) {
              setChecked(true);
            }
          } catch (e) {
            console.warn(e);
          }
        }}
        onFinish={() => setChecked(true)}
        onError={console.warn}
      />
    );
  }
}
