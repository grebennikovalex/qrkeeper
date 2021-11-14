import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CodesContextProvider from "./context";
import Main from "./screens/Main";
import AddCode from "./screens/AddCode";
import Edit from "./screens/Edit";
import Info from "./screens/Info";

const Stack = createStackNavigator();

export default function App() {
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
}
