import React, { useState, useEffect, createContext } from "react";
import * as SecureStore from "expo-secure-store";

export const CodesContext = createContext();

const CodesContextProvider = (props) => {
  const [codes, setCodes] = useState([]);

  useEffect(() => {
    getCodes();
  }, []);

  const getCodes = async () => {
    try {
      const readCodes = await SecureStore.getItemAsync("qrwallet");
      let parsed = JSON.parse(readCodes);
      if (Array.isArray(parsed)) {
        setCodes(parsed);
      }
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <CodesContext.Provider
      value={{
        codes,
        setCodes,
      }}
    >
      {props.children}
    </CodesContext.Provider>
  );
};

export default CodesContextProvider;
