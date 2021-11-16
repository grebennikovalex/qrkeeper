import React, { useState, useEffect, useContext } from "react";
import { View, Text, Dimensions } from "react-native";
import { CodesContext } from "../context";
import { Camera } from "expo-camera";
import styles from "../styles";

const d = Dimensions.get("screen").width * 0.66;

function Scan({ navigation }) {
  const { setLink, setModalOpen, setMessage } = useContext(CodesContext);
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);

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

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  if (hasPermission === null) {
    return <Text>{"Запрос разрешения на использование камеры"}</Text>;
  }

  return (
    <View style={styles.screenContainer}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Camera
          type={Camera.Constants.Type.back}
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{
            height: Dimensions.get("screen").width,
            width: Dimensions.get("screen").width,
          }}
        />
        <Text
          style={{
            color: "white",
            fontSize: 18,
            position: "absolute",
            top: 100,
          }}
        >
          Наведите камеру на QR-код
        </Text>
        <View
          style={{
            width: d,
            height: d,
            justifyContent: "space-between",
            position: "absolute",
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
                borderColor: "white",
                borderLeftWidth: 1,
                borderTopWidth: 1,
              }}
            ></View>
            <View
              style={{
                height: d / 3,
                width: d / 3,
                borderColor: "white",
                borderRightWidth: 1,
                borderTopWidth: 1,
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
                borderColor: "white",
                borderLeftWidth: 1,
                borderBottomWidth: 1,
              }}
            ></View>
            <View
              style={{
                height: d / 3,
                width: d / 3,
                borderColor: "white",
                borderRightWidth: 1,
                borderBottomWidth: 1,
              }}
            ></View>
          </View>
        </View>
      </View>
    </View>
  );
}

export default Scan;
