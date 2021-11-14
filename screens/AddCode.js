import React, { useState, useEffect, useContext } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
  Keyboard,
} from "react-native";
import { CodesContext } from "../context";
import * as SecureStore from "expo-secure-store";
import Button from "../components/Button";
import styles from "../styles";
import { colors } from "../colors";
import QRCode from "react-native-qrcode-svg";
import * as Clipboard from "expo-clipboard";
import PasteIcon from "../assets/PasteIcon";

function AddCode({ navigation }) {
  const { codes, setCodes } = useContext(CodesContext);

  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [code, setCode] = useState("");
  const [hideBtns, setHideBtns] = useState(false);

  const RickRoll = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

  useEffect(() => {
    try {
      let write = JSON.stringify(codes);
      SecureStore.setItemAsync("qrwallet", write);
    } catch (e) {
      console.warn(e);
    }
  }, [codes]);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setHideBtns(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setHideBtns(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const generate = () => {
    if (name && link) {
      setCode(link);
    } else {
      Alert.alert("QRWallet", "Заполните все поля", [{ text: "OK" }]);
    }
  };

  const save = () => {
    let obj = {
      name: name,
      link: link,
      id: new Date().getTime(),
    };
    setCodes((oldCodes) => [...oldCodes, obj]);
    navigation.navigate("Main");
  };

  const fetchCopiedText = async () => {
    try {
      const text = await Clipboard.getStringAsync();
      setLink(text);
    } catch (e) {
      console.log(e.message);
      Alert.alert("QRWallet", "Скопируйте ссылку на сертификат", [
        { text: "OK" },
      ]);
    }
  };

  return (
    <View style={styles.screenContainer}>
      <View style={stylesLocal.qrHolder}>
        <QRCode
          value={code ? code : RickRoll}
          size={200}
          color={code ? colors.qrmain : colors.inactive}
        />
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
        />
        <Text style={stylesLocal.infoText}>Введите или вставьте ссылку:</Text>
        <View style={stylesLocal.linkInput}>
          <TextInput
            style={[
              styles.textInput,
              { backgroundColor: "transparent", elevation: 0 },
            ]}
            placeholder="Ссылка внутри кода"
            placeholderTextColor={colors.inactive}
            onChangeText={(text) => setLink(text)}
          />
          <TouchableOpacity
            style={stylesLocal.pasteBtn}
            onPress={() => fetchCopiedText()}
          >
            <PasteIcon width={22} height={22} color={colors.primary} />
          </TouchableOpacity>
        </View>
        {!hideBtns && (
          <>
            <Button
              bold={true}
              type={!code ? "primary" : "green"}
              title={!code ? "Сгенерировать код" : "Сохранить"}
              topOffset={20}
              onPress={() => {
                if (code) {
                  save();
                } else {
                  generate();
                }
              }}
            />
            <Button
              bold={true}
              topOffset={20}
              type="secondary"
              title="Назад"
              onPress={() => navigation.navigate("Main")}
            />
          </>
        )}
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
  linkInput: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: colors.background,
    elevation: 10,
    borderRadius: 20,
  },
  pasteBtn: {
    position: "absolute",
    right: 10,
    backgroundColor: colors.background,
    padding: 10,
    borderRadius: 10,
  },

  infoText: {
    textAlign: "center",
    color: colors.secondary,
    marginTop: 10,
  },
});

export default AddCode;
