import React, { useState, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { CodesContext } from "../context";
import * as SecureStore from "expo-secure-store";
import Button from "../components/Button";
import styles from "../styles";
import { colors } from "../colors";
import { texts } from "../texts";
import { languages } from "../languages";

function Settings({ navigation }) {
  const { lang, setLang } = useContext(CodesContext);
  const [select, setSelect] = useState(false);

  const selectionHandler = (id) => {
    SecureStore.setItemAsync("qrkeeperLang", String(id));
    setLang(id);
    setSelect(false);
  };

  return (
    <View style={[styles.screenContainer, { justifyContent: "flex-end" }]}>
      <View style={{ width: "100%" }}>
        {select ? (
          <View style={localStyles.card}>
            {languages.map((language, i) => {
              return (
                <Button
                  key={language.id}
                  type="primary"
                  bold
                  topOffset={i === languages.length - 1 ? 20 : 0}
                  title={language.langName}
                  onPress={() => selectionHandler(language.id)}
                />
              );
            })}
          </View>
        ) : (
          <View style={localStyles.card}>
            <Button
              type="secondary"
              title={`${texts[lang].language}: ${languages[lang].langName}`}
              onPress={() => setSelect(true)}
            />
            <Text
              style={{
                textAlign: "center",
                fontFamily: "black",
                fontSize: 18,
                marginTop: 20,
                color: colors.secondary,
              }}
            >
              {texts[lang].selectLanguage}
            </Text>
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
