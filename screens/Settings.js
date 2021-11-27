import React, { useState, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { CodesContext } from "../context";
import * as SecureStore from "expo-secure-store";
import Button from "../components/Button";
import styles from "../styles";
import { colors } from "../colors";
import { language } from "../language";

function Settings({ navigation }) {
  const { lang, setLang } = useContext(CodesContext);
  const [select, setSelect] = useState(false);

  const selectionHandler = (num) => {
    SecureStore.setItemAsync("qrkeeperLang", String(num));
    setLang(num);
    setSelect(false);
  };

  return (
    <View style={[styles.screenContainer, { justifyContent: "flex-end" }]}>
      <View style={{ width: "100%" }}>
        {select ? (
          <View style={localStyles.card}>
            <Button
              type="primary"
              bold
              title={`${language[1]}`}
              onPress={() => selectionHandler(1)}
            />
            <Button
              type="primary"
              topOffset={20}
              bold
              title={`${language[0]}`}
              onPress={() => selectionHandler(0)}
            />
          </View>
        ) : (
          <View style={localStyles.card}>
            <Button
              type="secondary"
              title={`Язык: ${language[lang]}`}
              onPress={() => setSelect(true)}
            />
          </View>
        )}
      </View>
      <View style={styles.bottomMenu}>
        <Button type="chevron" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
}

export default Settings;

const localStyles = StyleSheet.create({
  card: {
    padding: 40,
    marginHorizontal: 20,
    marginHorizontal: 20,
    backgroundColor: colors.background,
    borderRadius: 20,
    elevation: 10,
  },
});
