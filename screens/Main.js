import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  useRef,
} from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
  Dimensions,
} from "react-native";
import { CodesContext } from "../context";
import { StatusBar } from "expo-status-bar";
import * as SecureStore from "expo-secure-store";
import { useFocusEffect } from "@react-navigation/native";
import Modal from "react-native-modal";
import QRCode from "react-native-qrcode-svg";
import Button from "../components/Button";
import styles from "../styles";
import { colors } from "../colors";
import BurgerMenu from "../components/BurgerMenu";

function Main({ navigation, route }) {
  const { codes, ready } = useContext(CodesContext);
  const { moveCodes } = route.params;

  const [pageNum, setPageNum] = useState(1);
  const [burgerOpen, setBurgerOpen] = useState(true);
  const [start, setStart] = useState(false);

  const codesListRef = useRef(null);

  useFocusEffect(
    useCallback(() => {
      if (codesListRef.current && moveCodes) {
        codesListRef.current.scrollToEnd();
      }
    }, [moveCodes])
  );

  useEffect(() => {
    if (codes.length === 1) {
      checkFreshness();
    }
  }, [codes]);

  const checkFreshness = async () => {
    try {
      const fresh = await SecureStore.getItemAsync("qrkeeperStart");
      let parsed = JSON.parse(fresh);
      if (!parsed) {
        setStart(true);
        SecureStore.setItemAsync("qrkeeperStart", "true");
      }
    } catch (e) {
      console.warn(e);
    }
  };

  const onScrollEnd = (e) => {
    let contentOffset = e.nativeEvent.contentOffset;
    let viewSize = e.nativeEvent.layoutMeasurement;
    let num =
      Math.floor((contentOffset.x + viewSize.width / 2) / viewSize.width) + 1;
    setPageNum(num);
  };

  return (
    <View style={styles.screenContainer}>
      {ready && <StatusBar style="auto" />}
      <View style={{ flex: 1, justifyContent: "center", width: "100%" }}>
        {ready && !codes.length ? (
          <View style={{ marginHorizontal: 40 }}>
            <Text style={styles.text400}>
              Ой, похоже, что вы еще не добавили ни одного QR-кода 🤔
            </Text>
            <Text> </Text>
            <Text style={styles.text400}>Нажмите на плюсик, чтобы начать</Text>
          </View>
        ) : null}
        {ready && codes.length ? (
          <View style={styles.QRContainer}>
            <FlatList
              ref={codesListRef}
              data={codes}
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              pagingEnabled={true}
              keyExtractor={(item) => item.id}
              onScroll={(e) => onScrollEnd(e)}
              renderItem={({ item, index }) => (
                <View style={styles.QRCard}>
                  <View
                    style={{
                      flex: 3,
                      justifyContent: "flex-start",
                      paddingTop: 40,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("Edit", { code: item })
                      }
                    >
                      <QRCode
                        value={item.link}
                        size={Dimensions.get("screen").width - 120}
                        color={colors.qrmain}
                      />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      marginHorizontal: 30,
                      justifyContent: "center",
                    }}
                  >
                    <Text style={styles.textBold}>{item.name}</Text>
                  </View>
                </View>
              )}
            />
          </View>
        ) : null}
      </View>
      <View style={styles.bottomMenu}>
        <Button
          type={burgerOpen ? "burger" : "chevron"}
          onPress={() => setBurgerOpen((bool) => !bool)}
        />
        {burgerOpen ? (
          <View>
            {codes.length ? (
              <Text>
                {pageNum} из {codes.length}
              </Text>
            ) : null}
          </View>
        ) : (
          <BurgerMenu navigation={navigation} />
        )}
        <Button type="plus" onPress={() => navigation.navigate("AddCode")} />
      </View>
      <Modal
        isVisible={start}
        backdropColor={"#4F4F4F"}
        backdropOpacity={0.75}
        useNativeDriver={true}
        style={{
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 36,
        }}
      >
        <View
          style={{
            width: Dimensions.get("screen").width - 80,
            height: Dimensions.get("screen").width - 80,
            borderWidth: 4,
            borderStyle: "dashed",
            borderRadius: 20,
            borderColor: colors.background,
          }}
        ></View>
        <View style={{ padding: 20 }}>
          <Text
            style={[
              styles.textBold,
              { color: colors.background, textAlign: "left" },
            ]}
          >
            {`Ура, вы добавили вашу первую карточку! 🎉

Если захотите что-то изменить — нажмите на QR-код 👆`}
          </Text>
        </View>

        <TouchableHighlight
          underlayColor={colors.background}
          style={styles.modalMessage}
          onPress={() => setStart(false)}
        >
          <Text style={[styles.textBold, { color: colors.green }]}>Ок</Text>
        </TouchableHighlight>
      </Modal>
    </View>
  );
}

export default Main;
