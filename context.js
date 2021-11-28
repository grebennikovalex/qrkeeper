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
  const [lang, setLang] = useState(1);

  useEffect(() => {
    startUp();
  }, []);

  const startUp = async () => {
    try {
      const readCodes = await SecureStore.getItemAsync("qrkeeper");
      const readLang = await SecureStore.getItemAsync("qrkeeperLang");
      let parsedCodes = JSON.parse(readCodes);
      if (Array.isArray(parsedCodes)) {
        setCodes(parsedCodes);
        setReady(true);
      }
      if (!readLang) {
        setLang(1);
        SecureStore.setItemAsync("qrkeeperLang", "1");
      } else if (readLang) {
        setLang(Number(readLang));
        SecureStore.setItemAsync("qrkeeperLang", readLang);
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
