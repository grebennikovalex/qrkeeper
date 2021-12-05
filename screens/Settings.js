import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import { CodesContext } from "../context";
import * as SecureStore from "expo-secure-store";
import Button from "../components/Button";
import styles from "../styles";
import { colors } from "../colors";
import { texts } from "../texts";
import { languages } from "../languages";

function Settings({ navigation }) {
  const { lang, setLang, theme, setTheme } = useContext(CodesContext);
  const [select, setSelect] = useState(false);

  const selectionHandler = (id) => {
    SecureStore.setItemAsync("qrkeeperLang", String(id));
    setLang(id);
    setSelect(false);
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
                  : colors.darkBackground,
              },
            ]}
          >
            {languages.map((language, i) => {
              return (
                <Button
                  key={language.id}
                  type="primary"
                  bold
                  topOffset={i === 0 ? 0 : 20}
                  title={language.langName}
                  onPress={() => selectionHandler(language.id)}
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
                  : colors.darkBackground,
              },
            ]}
          >
            <View
              style={[
                localStyles.switchContainer,
                {
                  backgroundColor: theme
                    ? colors.foreground
                    : colors.darkForeground,
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
                {theme ? texts[lang].lightMode : texts[lang].darkMode}
              </Text>
              <Switch
                style={{ marginRight: 10 }}
                thumbColor={theme ? colors.foreground : colors.darkPrimary}
                trackColor={theme ? colors.primary : colors.darkForeground}
                value={theme}
                onValueChange={() => setTheme((bool) => !bool)}
              />
            </View>
            <Button
              theme={theme}
              type="secondary"
              topOffset={20}
              title={`${texts[lang].language}: ${languages[lang].langName}`}
              onPress={() => setSelect(true)}
            />
            <Text
              style={{
                textAlign: "center",
                fontFamily: "black",
                fontSize: 18,
                marginTop: 20,
                color: theme ? colors.secondary : colors.darckQrmain,
              }}
            >
              {texts[lang].selectLanguage}
            </Text>
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
    borderRadius: 20,
    borderWidth: 1,
  },

  switchText: {
    fontSize: 24,
    paddingHorizontal: 20,
  },
});
