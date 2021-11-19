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

  useEffect(() => {
    getCodes();
  }, []);

  const getCodes = async () => {
    try {
      const readCodes = await SecureStore.getItemAsync("qrwallet");
      let parsed = JSON.parse(readCodes);
      if (Array.isArray(parsed)) {
        setCodes(parsed);
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
      }}
    >
      {props.children}
    </CodesContext.Provider>
  );
};

export default CodesContextProvider;
