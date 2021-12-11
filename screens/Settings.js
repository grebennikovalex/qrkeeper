import React, { useState, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { CodesContext } from "../context";
import { StatusBar } from "expo-status-bar";
import * as SecureStore from "expo-secure-store";
import Button from "../components/Button";
import Switch from "../components/Switch";
import styles from "../styles";
import { colors } from "../colors";
import { texts } from "../texts";
import { languages } from "../languages";

function Settings({ navigation }) {
  const { lang, setLang, theme, setTheme } = useContext(CodesContext);
  const [select, setSelect] = useState(false);

  const selectionLang = (id) => {
    SecureStore.setItemAsync("qrkeeperLang", String(id));
    setLang(id);
    setSelect(false);
  };

  const selectionTheme = (bool) => {
    SecureStore.setItemAsync("qrkeeperTheme", bool ? "light" : "dark");
  };

  return (
    <View
      style={[
        styles.screenContainer,
        {
          justifyContent: "flex-end",
          backgroundColor: theme ? colors.background : colors.darkBackground,
        },
      ]}
    >
      <View style={{ width: "100%" }}>
        {select ? (
          <View
            style={[
              localStyles.card,
              {
                backgroundColor: theme
                  ? colors.foreground
                  : colors.darkForeground,
              },
            ]}
          >
            {languages.map((language, i) => {
              return (
                <Button
                  key={language.id}
                  type="language"
                  bold
                  topOffset={i === 0 ? 0 : 20}
                  title={language.langName}
                  onPress={() => selectionLang(language.id)}
                />
              );
            })}
          </View>
        ) : (
          <View
            style={[
              localStyles.card,
              {
                backgroundColor: theme
                  ? colors.foreground
                  : colors.darkForeground,
              },
            ]}
          >
            <View
              style={[
                localStyles.switchContainer,
                {
                  borderColor: theme ? colors.primary : colors.darkPrimary,
                },
              ]}
            >
              <Text
                style={[
                  localStyles.switchText,
                  { color: theme ? colors.primary : colors.darkPrimary },
                ]}
              >
                {texts[lang].darkMode}
              </Text>
              <Switch
                value={theme}
                onChangeValue={(p) => {
                  setTheme(p);
                  selectionTheme(p);
                }}
              />
            </View>
            <Button
              theme={theme}
              type="settings"
              topOffset={20}
              title={`${texts[lang].language}: ${languages[lang].langName}`}
              onPress={() => setSelect(true)}
            />
          </View>
        )}
      </View>
      <View style={styles.bottomMenu}>
        <Button
          theme={theme}
          type="chevron"
          onPress={() => navigation.goBack()}
        />
      </View>
      <StatusBar style={theme ? "dark" : "light"} />
    </View>
  );
}

export default Settings;

const localStyles = StyleSheet.create({
  card: {
    padding: 40,
    marginHorizontal: 20,
    marginHorizontal: 20,
    borderRadius: 20,
    elevation: 10,
  },

  switchContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    height: 60,
    borderRadius: 10,
    borderWidth: 1,
  },

  switchText: {
    fontSize: 18,
    paddingHorizontal: 20,
  },
});
