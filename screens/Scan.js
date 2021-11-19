import React, { useState, useEffect, useContext } from "react";
import { View, Text, Dimensions, TouchableHighlight } from "react-native";
import { CodesContext } from "../context";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Camera } from "expo-camera";
import styles from "../styles";
import { colors } from "../colors";

const d = Dimensions.get("screen").width * 0.8;

function Scan({ navigation }) {
  const { setLink, setModalOpen, setMessage, hasPermission, setHasPermission } =
    useContext(CodesContext);

  const [scanned, setScanned] = useState(false);

  // const hasPermission = false;

  const dimensions = Dimensions.get("screen");
  const screenWidth = dimensions.width;
  const height = Math.round((screenWidth * 16) / 9);

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
      setMessage(`Код успешно отсканирован 👍  Добавлена ссылка: `);
      navigation.navigate("AddCode");
    } catch {
      setMessage(`Не удалось распознать QR-код на фото 😥  Попробуйте еще раз`);
      navigation.navigate("AddCode");
    }
  };

  if (hasPermission === null) {
    return <Text>{"Запрос разрешения на использование камеры"}</Text>;
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
          // useCamera2Api={true}
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
              {"Поместите QR-код в выделенную область 👆"}
            </Text>
          </View>
          <TouchableHighlight
            underlayColor={colors.background}
            style={[styles.modalMessage, { width: "80%" }]}
            onPress={() => navigation.goBack()}
          >
            <Text style={[styles.textBold, { color: colors.primary }]}>
              Назад
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
}

export default Scan;
