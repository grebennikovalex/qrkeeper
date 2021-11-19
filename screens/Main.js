import React, { useState, useCallback, useContext, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { CodesContext } from "../context";
import { useFocusEffect } from "@react-navigation/native";
import QRCode from "react-native-qrcode-svg";
import Button from "../components/Button";
import styles from "../styles";
import { colors } from "../colors";
import BurgerMenu from "../components/BurgerMenu";

function Main({ navigation, route }) {
  const { codes } = useContext(CodesContext);
  const { moveCodes } = route.params;

  const [pageNum, setPageNum] = useState(1);
  const [burgerOpen, setBurgerOpen] = useState(true);

  const codesListRef = useRef(null);

  useFocusEffect(
    useCallback(() => {
      if (codesListRef.current && moveCodes) {
        codesListRef.current.scrollToEnd();
      }
    }, [moveCodes])
  );

  const onScrollEnd = (e) => {
    let contentOffset = e.nativeEvent.contentOffset;
    let viewSize = e.nativeEvent.layoutMeasurement;
    let num =
      Math.floor((contentOffset.x + viewSize.width / 2) / viewSize.width) + 1;
    setPageNum(num);
  };

  return (
    <View style={styles.screenContainer}>
      <View style={{ flex: 1, justifyContent: "center", width: "100%" }}>
        {!codes.length ? (
          <View style={{ marginHorizontal: 40 }}>
            <Text style={styles.text400}>
              Ой, похоже, что вы еще не добавили ни одного QR-кода 🤔
            </Text>
            <Text> </Text>
            <Text style={styles.text400}>Нажмите на плюсик, чтобы начать</Text>
          </View>
        ) : (
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
        )}
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
    </View>
  );
}

export default Main;
