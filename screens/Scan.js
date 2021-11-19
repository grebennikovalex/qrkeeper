import React, { useState, useEffect, useContext } from "react";
import { View, Text, Dimensions } from "react-native";
import { CodesContext } from "../context";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Camera } from "expo-camera";
import Button from "../components/Button";
import styles from "../styles";

const d = Dimensions.get("screen").width * 0.66;

function Scan({ navigation }) {
  const { setLink, setModalOpen, setMessage } = useContext(CodesContext);
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);

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

  if (hasPermission === false) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ textAlign: "center", marginBottom: 20 }}>
          {"Разрешите приложению доступ к камере в настройках смартфона"}
        </Text>
        <Button
          bold={true}
          topOffset={20}
          type="secondary"
          title="Назад"
          onPress={() => {
            navigation.goBack();
          }}
        />
      </View>
    );
  }

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
          style={{ width: "100%", height: height }}
        />

        <Text
          style={{
            color: "white",
            fontSize: 18,
            position: "absolute",
            top: 100,
          }}
        >
          {`Наведите камеру на QR-код`}
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
