import React, { useState, useEffect, useContext } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Keyboard,
  Dimensions,
} from "react-native";
import { CodesContext } from "../context";
import { StatusBar } from "expo-status-bar";
import * as SecureStore from "expo-secure-store";
import Button from "../components/Button";
import styles from "../styles";
import { colors } from "../colors";
import QRCode from "react-native-qrcode-svg";
import PasteIcon from "../assets/PasteIcon";
import * as Clipboard from "expo-clipboard";

function Edit({ navigation, route }) {
  const { code } = route.params;
  const { codes, setCodes } = useContext(CodesContext);

  const [name, setName] = useState(code.name);
  const [link, setLink] = useState(code.link);
  const [btn, setBtn] = useState(false);
  const [hideBtns, setHideBtns] = useState(false);

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

  const save = () => {
    if (name && link) {
      let updatedCodes = codes.map((item) => {
        if (code.id === item.id) {
          return { ...item, name: name, link: link };
        }
        return item;
      });
      setCodes(updatedCodes);
      navigation.navigate("Main", { moveCodes: false });
    } else {
      alert("Validation error...");
    }
  };

  const removeCode = () => {
    setCodes(codes.filter((item) => item.id !== code.id));
    navigation.navigate("Main", { moveCodes: true });
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
          value={code.link}
          size={Dimensions.get("screen").width - 120}
          color={colors.qrmain}
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
          onChangeText={(text) => {
            setName(text);
            setBtn(true);
          }}
          value={name}
        />
        <View style={stylesLocal.linkInput}>
          <TextInput
            style={[
              styles.textInput,
              { backgroundColor: "transparent", elevation: 0 },
            ]}
            placeholder="Ссылка внутри кода"
            placeholderTextColor={colors.inactive}
            onChangeText={(text) => {
              setLink(text);
              setBtn(true);
            }}
            value={link}
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
              type={btn ? "green" : "inactive"}
              title={"Сохранить"}
              topOffset={20}
              onPress={save}
            />
            <View style={stylesLocal.bottomBtns}>
              <View style={{ flex: 1, marginRight: 10 }}>
                <Button
                  bold={true}
                  topOffset={20}
                  type="red"
                  title="Удалить"
                  onPress={() => removeCode()}
                />
              </View>
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Button
                  bold={true}
                  topOffset={20}
                  type="secondary"
                  title="Назад"
                  onPress={() =>
                    navigation.navigate("Main", { moveCodes: false })
                  }
                />
              </View>
            </View>
          </>
        )}
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const stylesLocal = StyleSheet.create({
  qrHolder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 64,
  },

  bottomBtns: {
    flexDirection: "row",
    width: "100%",
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
});

export default Edit;
