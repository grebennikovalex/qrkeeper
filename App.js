import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Main from "./screens/Main";
import AddCode from "./screens/AddCode";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Main"
        backBehavior="order"
        screenOptions={{ headerMode: "none" }}
      >
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="AddCode" component={AddCode} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
