import React, { useState, useEffect, useContext } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Keyboard,
  Dimensions,
  TouchableHighlight,
} from "react-native";
import { CodesContext } from "../context";
import { StatusBar } from "expo-status-bar";
import * as SecureStore from "expo-secure-store";
import Button from "../components/Button";
import styles from "../styles";
import { colors } from "../colors";
import { texts } from "../texts";
import QRCode from "react-native-qrcode-svg";
import * as DocumentPicker from "expo-document-picker";
import { BarCodeScanner } from "expo-barcode-scanner";
import Modal from "react-native-modal";
import PhotoIcon from "../assets/PhotoIcon";
import DocIcon from "../assets/DocIcon";
import LinkIcon from "../assets/LinkIcon";

function AddCode({ navigation }) {
  const {
    codes,
    setCodes,
    link,
    setLink,
    modalOpen,
    setModalOpen,
    message,
    setMessage,
    lang,
  } = useContext(CodesContext);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [hideBtns, setHideBtns] = useState(false);
  const [noticeOpen, setNoticeOpen] = useState(false);
  const [manualInput, setManualInput] = useState(false);
  const [manualValue, setManualValue] = useState("");

  const RickRoll = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

  useEffect(() => {
    try {
      let write = JSON.stringify(codes);
      SecureStore.setItemAsync("qrkeeper", write);
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

  useEffect(() => {
    if (link) {
      setCode(link);
    }
  }, [link]);

  const save = () => {
    if (name) {
      let obj = {
        name: name,
        link: link,
        id: new Date().getTime(),
      };
      setCodes((oldCodes) => [...oldCodes, obj]);
      setLink("");
      navigation.navigate("Main", { moveCodes: true });
    } else {
      setMessage(texts[lang].noNameMessage);
      setNoticeOpen(true);
    }
  };

  const pick = async () => {
    const result = await DocumentPicker.getDocumentAsync();

    if (result.type !== "cancel") {
      try {
        const read = await BarCodeScanner.scanFromURLAsync(result.uri);
        if (read.length === 1) {
          setLink(read[0].data);
          setModalOpen(true);
          setMessage(texts[lang].successScreenShot);
        } else if (read.length > 1) {
          setModalOpen(true);
          read.map((code, i) => {
            let obj = {
              name: `№${i + 1}`,
              link: code,
              id: new Date().getTime(),
            };
            setCodes((oldCodes) => [...oldCodes, obj]);
          });
          setMessage(texts[lang].severalCodes);
        } else {
          setNoticeOpen(true);
          setMessage(texts[lang].faliureScreenShot);
        }
      } catch {
        setNoticeOpen(true);
        setMessage(texts[lang].faliureScreenShot);
      }
    }
  };

  return (
    <View
      style={[styles.screenContainer, { backgroundColor: colors.foreground }]}
    >
      <View style={stylesLocal.qrHolder}>
        <QRCode
          value={code ? code : RickRoll}
          size={Dimensions.get("screen").width - 120}
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
        {link ? (
          <View>
            <TextInput
              style={styles.textInput}
              placeholder={texts[lang].namePlaceHolder}
              placeholderTextColor={colors.inactive}
              onChangeText={(text) => setName(text)}
              onFocus={() => setHideBtns(true)}
            />
          </View>
        ) : null}

        {link ? (
          <Text
            style={[
              stylesLocal.linkText,
              { paddingHorizontal: 20, marginTop: 20, marginBottom: 0 },
            ]}
          >
            {link}
          </Text>
        ) : (
          <View>
            {!hideBtns && (
              <>
                <Button
                  type="white"
                  title={texts[lang].scan}
                  topOffset={20}
                  onPress={() => {
                    navigation.navigate("Scan");
                  }}
                  icon={
                    <PhotoIcon fill={colors.primary} width={24} height={24} />
                  }
                />
                <Button
                  type="white"
                  title={texts[lang].screenShot}
                  topOffset={20}
                  onPress={() => pick()}
                  icon={
                    <DocIcon fill={colors.primary} width={24} height={24} />
                  }
                />
              </>
            )}

            <Button
              type="white"
              title={texts[lang].manualEnter}
              topOffset={20}
              onPress={() => {
                setManualInput(true);
              }}
              icon={<LinkIcon fill={colors.primary} width={24} height={24} />}
            />
          </View>
        )}
        {!hideBtns && (
          <>
            {link ? (
              <Button
                bold={true}
                type={name ? "green" : "inactive"}
                title={texts[lang].save}
                topOffset={20}
                onPress={() => {
                  save();
                }}
              />
            ) : null}
            <Button
              bold={true}
              topOffset={20}
              type="secondary"
              title={texts[lang].goBack}
              onPress={() => {
                setLink("");
                navigation.navigate("Main", { moveCodes: false });
              }}
            />
          </>
        )}
      </View>
      <Modal
        isVisible={modalOpen}
        backdropColor={"#ccc"}
        backdropOpacity={0.7}
        useNativeDriver={true}
      >
        <View style={styles.modalMessage}>
          <Text
            style={[
              styles.textBold,
              { color: colors.green, textAlign: "left" },
            ]}
          >
            {message}
          </Text>
          <Text style={stylesLocal.linkText}>{link}</Text>
        </View>
        <TouchableHighlight
          underlayColor={colors.background}
          style={styles.modalMessage}
          onPress={() => setModalOpen(false)}
        >
          <Text style={[styles.textBold, { color: colors.green }]}>
            {texts[lang].ok}
          </Text>
        </TouchableHighlight>
      </Modal>
      <Modal
        isVisible={noticeOpen}
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
          onPress={() => setNoticeOpen(false)}
        >
          <Text style={[styles.textBold, { color: colors.red }]}>
            {texts[lang].okay}
          </Text>
        </TouchableHighlight>
      </Modal>
      <Modal
        isVisible={manualInput}
        backdropColor={"#ccc"}
        backdropOpacity={0.7}
        useNativeDriver={true}
      >
        <View style={styles.modalMessage}>
          <Text style={[styles.text400, { color: colors.secondary }]}>
            {texts[lang].enterLink}
          </Text>
          <TextInput
            autoFocus={true}
            multiline
            style={{ color: colors.green }}
            placeholder="https://..."
            placeholderTextColor={colors.inactive}
            onChangeText={(text) => setManualValue(text)}
          />
        </View>
        <View style={{ flexDirection: "row", width: "100%" }}>
          <TouchableHighlight
            underlayColor={colors.background}
            style={[
              styles.modalMessage,
              { flex: 1, width: "auto", marginRight: 10 },
            ]}
            onPress={() => {
              setLink("");
              setManualInput(false);
            }}
          >
            <Text style={[styles.textBold, { color: colors.secondary }]}>
              {texts[lang].goBack}
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={colors.background}
            style={[
              styles.modalMessage,
              { flex: 1, width: "auto", marginLeft: 10 },
            ]}
            onPress={() => {
              setLink(manualValue);
              setManualInput(false);
            }}
          >
            <Text style={[styles.textBold, { color: colors.green }]}>
              {texts[lang].ok}
            </Text>
          </TouchableHighlight>
        </View>
      </Modal>
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
    color: colors.inactive,
    marginTop: 15,
  },

  linkText: {
    color: colors.green,
    fontSize: 14,
    marginVertical: 12,
  },
});

export default AddCode;
