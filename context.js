import React, { useState, useEffect, createContext } from "react";
import * as SecureStore from "expo-secure-store";
import { Appearance } from "react-native";

export const CodesContext = createContext();

const CodesContextProvider = (props) => {
  const [codes, setCodes] = useState([]);
  const [link, setLink] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [ready, setReady] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [lang, setLang] = useState(1);
  const [theme, setTheme] = useState(true);

  useEffect(() => {
    startUp();
  }, []);

  const startUp = async () => {
    try {
      // const readTheme = await SecureStore.getItemAsync("qrkeeperTheme");
      // if (!readTheme) {
      //   setTheme(false);
      // } else if (readTheme === "light") {
      //   setTheme(true);
      // } else if (readTheme === "dark") {
      //   setTheme(false);
      // }

      const colorScheme = Appearance.getColorScheme();
      console.log(colorScheme);
      if (colorScheme === "dark") {
        setTheme(false);
      } else {
        setTheme(true);
      }

      const readLang = await SecureStore.getItemAsync("qrkeeperLang");
      if (!readLang) {
        setLang(1);
        SecureStore.setItemAsync("qrkeeperLang", "1");
      } else if (readLang) {
        setLang(Number(readLang));
        SecureStore.setItemAsync("qrkeeperLang", readLang);
      }

      const readCodes = await SecureStore.getItemAsync("qrkeeper");
      let parsedCodes = JSON.parse(readCodes);
      if (Array.isArray(parsedCodes)) {
        setCodes(parsedCodes);
        setReady(true);
      }
    } catch (e) {
      console.warn(e);
      setReady(true);
    } finally {
      setReady(true);
    }
  };

  return (
    <CodesContext.Provider
      value={{
        codes,
        setCodes,
        link,
        setLink,
        modalOpen,
        setModalOpen,
        message,
        setMessage,
        ready,
        setReady,
        hasPermission,
        setHasPermission,
        lang,
        setLang,
        theme,
        setTheme,
      }}
    >
      {props.children}
    </CodesContext.Provider>
  );
};

export default CodesContextProvider;
