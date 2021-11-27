import React, { useState, useEffect, createContext } from "react";
import * as SecureStore from "expo-secure-store";

export const CodesContext = createContext();

const CodesContextProvider = (props) => {
  const [codes, setCodes] = useState([]);
  const [link, setLink] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [ready, setReady] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [lang, setLang] = useState(0);

  useEffect(() => {
    startUp();
  }, []);

  const startUp = async () => {
    try {
      const readCodes = await SecureStore.getItemAsync("qrkeeper");
      const readLang = await SecureStore.getItemAsync("qrkeeperLang");
      let parsedCodes = JSON.parse(readCodes);
      let parsedLang = JSON.parse(readLang);
      if (Array.isArray(parsedCodes)) {
        setCodes(parsedCodes);
        setReady(true);
      }
      if (!parsedLang) {
        setLang(0);
        SecureStore.setItemAsync("qrkeeperLang", String(0));
      } else if (parsedLang) {
        setLang(parsedLang);
        SecureStore.setItemAsync("qrkeeperLang", String(parsedLang));
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
      }}
    >
      {props.children}
    </CodesContext.Provider>
  );
};

export default CodesContextProvider;
