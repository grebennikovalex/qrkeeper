import React, { useState, useEffect, useContext } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { CodesContext } from "../context";
import * as SecureStore from "expo-secure-store";
import Button from "../components/Button";
import styles from "../styles";
import { colors } from "../colors";
import QRCode from "react-native-qrcode-svg";

function AddCode({ navigation }) {
  const { codes, setCodes } = useContext(CodesContext);

  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [code, setCode] = useState("");

  const RickRoll = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

  useEffect(() => {
    try {
      let write = JSON.stringify(codes);
      SecureStore.setItemAsync("qrwallet", write);
    } catch (e) {
      console.warn(e);
    }
  }, [codes]);

  const save = () => {
    if (name && link) {
      setCode(link);
      let obj = {
        name: name,
        link: link,
        id: new Date().getTime(),
      };
      setCodes((oldCodes) => [...oldCodes, obj]);
    } else {
      alert("Заполните все поля...");
    }
  };

  return (
    <View style={styles.screenContainer}>
      <View style={stylesLocal.qrHolder}>
        <QRCode
          value={code ? code : RickRoll}
          size={200}
          color={code ? colors.qrmain : colors.inactive}
        />
      </View>
      <View
        style={{
          justifyContent: "flex-end",
          padding: 20,
          width: "100%",
        }}
      >
        <TextInput
          style={styles.textInput}
          placeholder="Название"
          placeholderTextColor={colors.inactive}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={[styles.textInput, { marginTop: 20 }]}
          placeholder="Ссылка внутри кода"
          placeholderTextColor={colors.inactive}
          onChangeText={(text) => setLink(text)}
        />
        <Button
          type="primary"
          title="Сохранить"
          topOffset={20}
          onPress={save}
        />
        <Button
          topOffset={20}
          type="secondary"
          title="Назад"
          onPress={() => navigation.navigate("Main")}
        />
      </View>
    </View>
  );
}

const stylesLocal = StyleSheet.create({
  qrHolder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AddCode;
