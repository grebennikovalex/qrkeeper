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
import { texts } from "../texts";
import BurgerMenu from "../components/BurgerMenu";

function Main({ navigation, route }) {
  const { codes, ready, lang, theme } = useContext(CodesContext);
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
    <View
      style={[
        styles.screenContainer,
        { backgroundColor: theme ? colors.background : colors.darkBackground },
      ]}
    >
      {ready && <StatusBar style={theme ? "dark" : "light"} />}
      <View style={{ flex: 1, justifyContent: "center", width: "100%" }}>
        {ready && !codes.length ? (
          <View style={{ flex: 1, marginHorizontal: 40 }}>
            <View style={{ flex: 1 }}></View>
            <View>
              <Text
                style={[
                  styles.text400,
                  { color: theme ? colors.secondary : colors.darkSecondary },
                ]}
              >
                {texts[lang].emptyScreenFirstLine}
              </Text>
              <Text> </Text>
              <Text
                style={[
                  styles.text400,
                  { color: theme ? colors.secondary : colors.darkSecondary },
                ]}
              >
                {texts[lang].emptyScreenSecondLine}
              </Text>
            </View>
            <View
              style={[
                styles.arrowBody,
                {
                  borderColor: theme ? colors.secondary : colors.darkSecondary,
                },
              ]}
            >
              <View
                style={[
                  styles.arrow,
                  {
                    borderColor: theme
                      ? colors.secondary
                      : colors.darkSecondary,
                  },
                ]}
              ></View>
            </View>
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
                <View
                  style={[
                    styles.QRCard,
                    {
                      backgroundColor: theme
                        ? colors.foreground
                        : colors.darkForeground,
                    },
                  ]}
                >
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
                      <View
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                          width: Dimensions.get("screen").width - 80,
                          height: Dimensions.get("screen").width - 80,
                          top: -20,
                          backgroundColor: colors.foreground,
                          borderRadius: 20,
                        }}
                      >
                        <QRCode
                          value={item.link}
                          size={Dimensions.get("screen").width - 120}
                          color={colors.qrmain}
                          backgroundColor={colors.foreground}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      marginHorizontal: 30,
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={[
                        styles.textBold,
                        {
                          color: theme
                            ? colors.secondary
                            : colors.darkSecondary,
                        },
                      ]}
                    >
                      {item.name}
                    </Text>
                  </View>
                </View>
              )}
            />
          </View>
        ) : null}
      </View>
      <View style={styles.bottomMenu}>
        <Button
          theme={theme}
          type={burgerOpen ? "burger" : "chevron"}
          onPress={() => setBurgerOpen((bool) => !bool)}
        />
        {burgerOpen ? (
          <View>
            {codes.length ? (
              <Text
                style={{ color: theme ? colors.qrmain : colors.darkQrmain }}
              >
                {pageNum} {texts[lang].of} {codes.length}
              </Text>
            ) : null}
          </View>
        ) : (
          <BurgerMenu navigation={navigation} theme={theme} />
        )}
        <Button
          theme={theme}
          type="plus"
          onPress={() => navigation.navigate("AddCode")}
        />
      </View>
      <Modal
        isVisible={start}
        backdropColor={"#4F4F4F"}
        backdropOpacity={0.75}
        useNativeDriver={true}
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: 20,
          height: Dimensions.get("screen").height,
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
            {texts[lang].initialMessage}
          </Text>
        </View>

        <TouchableHighlight
          underlayColor={colors.background}
          style={[styles.modalMessage, { marginBottom: 0 }]}
          onPress={() => setStart(false)}
        >
          <Text style={[styles.textBold, { color: colors.green }]}>
            {texts[lang].ok}
          </Text>
        </TouchableHighlight>
      </Modal>
    </View>
  );
}

export default Main;
