import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import * as SecureStore from "expo-secure-store";
import Button from "../components/Button";
import styles from "../styles";

function Main({ navigation }) {
  const [codes, setCodes] = useState("");
  useEffect(() => {
    getCodes();
  }, []);
  const getCodes = async () => {
    try {
      const codes = await SecureStore.getItemAsync("qrwallet");
      setCodes(codes);
      console.log("What is in the storage: ", codes);
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <View style={styles.screenContainer}>
      <View style={{ flex: 1, justifyContent: "center" }}>
        {!codes && (
          <View style={{ marginHorizontal: 40 }}>
            <Text style={styles.text400}>
              Ой, похоже, что вы еще не добавили ни одного QR-кода 🤔
            </Text>
            <Text> </Text>
            <Text style={styles.text400}>Нажмите на плюсик, чтобы начать</Text>
          </View>
        )}
      </View>
      {/* {codes && <Text>Код есть!</Text>} */}
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          padding: 20,
        }}
      >
        <Button type="burger" />
        <Button type="plus" onPress={() => navigation.navigate("AddCode")} />
      </View>
    </View>
  );
}

export default Main;
