import React, { useState, useEffect, useContext } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Keyboard,
  Dimensions,
  TouchableHighlight,
} from "react-native";
import { CodesContext } from "../context";
import { StatusBar } from "expo-status-bar";
import * as SecureStore from "expo-secure-store";
import Modal from "react-native-modal";
import Button from "../components/Button";
import styles from "../styles";
import { colors } from "../colors";
import QRCode from "react-native-qrcode-svg";

function Edit({ navigation, route }) {
  const { code } = route.params;
  const { codes, setCodes, modalOpen, setModalOpen, message, setMessage } =
    useContext(CodesContext);

  const [name, setName] = useState(code.name);
  const [link, setLink] = useState(code.link);
  const [btn, setBtn] = useState(false);
  const [hideBtns, setHideBtns] = useState(false);
  const [edit, setEdit] = useState(false);

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
    } else if (!name) {
      setMessage("Вы не придумали название для этого QR кода. 🙄");
      setModalOpen(true);
    } else if (!link) {
      setMessage("Информация в QR коде не должна быть пустой. 🙄");
      setModalOpen(true);
    }
  };

  const removeCode = () => {
    setCodes(codes.filter((item) => item.id !== code.id));
    navigation.navigate("Main", { moveCodes: true });
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
        <Text
          style={[
            styles.text400,
            { fontSize: 16, textAlign: "center", marginBottom: 20 },
          ]}
        >
          Редактирование кода
        </Text>
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
        {!edit ? (
          <TouchableOpacity
            onPress={() => {
              setHideBtns(true);
              setEdit(true);
            }}
          >
            <Text
              style={[
                stylesLocal.linkText,
                {
                  paddingHorizontal: 20,
                  marginTop: 20,
                  marginBottom: 0,
                  color: colors.green,
                },
              ]}
            >
              {link}
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={{ padding: 20, paddingBottom: 0 }}>
            <TextInput
              autoFocus={true}
              multiline
              style={{
                backgroundColor: "transparent",
                elevation: 0,
                fontSize: 14,
                color: colors.secondary,
              }}
              placeholder="Ссылка внутри кода"
              placeholderTextColor={colors.inactive}
              onChangeText={(text) => {
                setLink(text);
                setBtn(true);
              }}
              value={link}
            />
          </View>
        )}
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
      <Modal
        isVisible={modalOpen}
        backdropColor={"#ccc"}
        backdropOpacity={0.7}
        useNativeDriver={true}
      >
        <View style={styles.modalMessage}>
          <Text
            style={[styles.textBold, { color: colors.red, textAlign: "left" }]}
          >
            {message}
          </Text>
        </View>
        <TouchableHighlight
          underlayColor={colors.background}
          style={styles.modalMessage}
          onPress={() => setModalOpen(false)}
        >
          <Text style={[styles.textBold, { color: colors.red }]}>Ну ладно</Text>
        </TouchableHighlight>
      </Modal>
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
