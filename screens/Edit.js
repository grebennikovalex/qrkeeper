import React, { useState, useEffect, useContext } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { CodesContext } from "../context";
import * as SecureStore from "expo-secure-store";
import Button from "../components/Button";
import styles from "../styles";
import { colors } from "../colors";
import QRCode from "react-native-qrcode-svg";

function Edit({ navigation, route }) {
  const { code } = route.params;
  const { codes, setCodes } = useContext(CodesContext);

  const [name, setName] = useState(code.name);
  const [link, setLink] = useState(code.link);

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
      let updatedCodes = codes.map((item) => {
        if (code.id === item.id) {
          return { ...item, name: name, link: link };
        }
        return item;
      });
      setCodes(updatedCodes);
    } else {
      alert("Validation error...");
    }
  };

  const removeCode = () => {
    setCodes(codes.filter((item) => item.id !== code.id));

    navigation.navigate("Main");
  };

  return (
    <View style={styles.screenContainer}>
      <View style={stylesLocal.qrHolder}>
        <QRCode value={code.link} size={200} color={colors.qrmain} />
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
          value={name}
        />
        <TextInput
          style={[styles.textInput, { marginTop: 20 }]}
          placeholder="Ссылка внутри кода"
          placeholderTextColor={colors.inactive}
          onChangeText={(text) => setLink(text)}
          value={link}
        />
        <Button
          type="primary"
          title="Сохранить"
          topOffset={20}
          onPress={save}
        />
        <View style={stylesLocal.bottomBtns}>
          <View style={{ flex: 1, marginRight: 10 }}>
            <Button
              topOffset={20}
              type="red"
              title="Удалить"
              onPress={() => removeCode()}
            />
          </View>
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Button
              topOffset={20}
              type="secondary"
              title="Назад"
              onPress={() => navigation.navigate("Main")}
            />
          </View>
        </View>
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

  bottomBtns: {
    flexDirection: "row",
    width: "100%",
  },
});

export default Edit;
