import React, { useState, useEffect, useContext } from "react";
import { View, Text, Dimensions, TouchableHighlight } from "react-native";
import { CodesContext } from "../context";
import { StatusBar } from "expo-status-bar";
import { Camera } from "expo-camera";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../styles";
import { colors } from "../colors";
import { btnTitles, modalMessages } from "../texts";

const d = Dimensions.get("screen").width * 0.8;

function Scan({ navigation }) {
  const { setLink, setModalOpen, setMessage, lang } = useContext(CodesContext);
  const [scanned, setScanned] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    try {
      setScanned(true);
      setLink(data);
      setModalOpen(true);
      setMessage(modalMessages[lang].successScan);
      navigation.navigate("AddCode");
    } catch {
      setModalOpen(true);
      setMessage(modalMessages[lang].faliureScreenShot);
      navigation.navigate("AddCode");
    }
  };

  if (hasPermission === null) {
    return <Text>{modalMessages[lang].permissionProcess}</Text>;
  }

  if (hasPermission === false) {
    return (
      <LinearGradient
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        colors={[colors.primary, "rgba(239, 93, 93, 0.5)"]}
        style={[
          styles.infoGradient,
          { borderRadius: 0, justifyContent: "center" },
        ]}
      >
        <View style={{ width: "100%" }}>
          <View style={styles.modalMessage}>
            <Text
              style={[
                styles.textBold,
                { color: colors.red, textAlign: "left" },
              ]}
            >
              {modalMessages[lang].cameraPermission}
            </Text>
          </View>
          <TouchableHighlight
            underlayColor={colors.background}
            style={styles.modalMessage}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Text style={[styles.textBold, { color: colors.red }]}>
              {btnTitles[lang].ok}
            </Text>
          </TouchableHighlight>
        </View>
      </LinearGradient>
    );
  }

  return (
    <View style={styles.screenContainer}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <Camera
          ratio="16:9"
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ width: "100%", height: "100%", position: "absolute" }}
        />

        <View
          style={{
            position: "absolute",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <View
            style={{
              width: d,
              height: d,
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                height: d / 3,
                width: d,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  height: d / 3,
                  width: d / 3,
                  borderColor: colors.primary,
                  borderLeftWidth: 4,
                  borderTopWidth: 4,
                  borderTopLeftRadius: 30,
                }}
              ></View>
              <View
                style={{
                  height: d / 3,
                  width: d / 3,
                  borderColor: colors.primary,
                  borderRightWidth: 4,
                  borderTopWidth: 4,
                  borderTopRightRadius: 30,
                }}
              ></View>
            </View>
            <View
              style={{
                height: d / 3,
                width: d,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  height: d / 3,
                  width: d / 3,
                  borderColor: colors.primary,
                  borderLeftWidth: 4,
                  borderBottomWidth: 4,
                  borderBottomLeftRadius: 30,
                }}
              ></View>
              <View
                style={{
                  height: d / 3,
                  width: d / 3,
                  borderColor: colors.primary,
                  borderRightWidth: 4,
                  borderBottomWidth: 4,
                  borderBottomRightRadius: 30,
                }}
              ></View>
            </View>
          </View>
          <View
            underlayColor={colors.background}
            style={[styles.modalMessage, { width: "80%", marginTop: 100 }]}
          >
            <Text
              style={[
                styles.text400,
                { color: colors.primary, fontSize: 18, textAlign: "center" },
              ]}
            >
              {modalMessages[lang].scanMessage}
            </Text>
          </View>
          <TouchableHighlight
            underlayColor={colors.background}
            style={[styles.modalMessage, { width: "80%" }]}
            onPress={() => navigation.goBack()}
          >
            <Text style={[styles.textBold, { color: colors.primary }]}>
              {btnTitles[lang].goBack}
            </Text>
          </TouchableHighlight>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

export default Scan;
