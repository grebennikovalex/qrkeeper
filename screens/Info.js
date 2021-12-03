import React, { useState, useRef, useContext, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { CodesContext } from "../context";
import * as Linking from "expo-linking";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../styles";
import { colors } from "../colors";
import { texts } from "../texts";
import Button from "../components/Button";

function Info({ navigation }) {
  const { lang } = useContext(CodesContext);
  const infoRef = useRef();
  const [pageNum, setPageNum] = useState(1);

  useEffect(() => {
    console.log(texts);
  }, []);

  const onScrollEnd = (e) => {
    let contentOffset = e.nativeEvent.contentOffset;
    let viewSize = e.nativeEvent.layoutMeasurement;
    let num =
      Math.floor((contentOffset.x + viewSize.width / 2) / viewSize.width) + 1;
    setPageNum(num);
  };

  const Balls = () => {
    let balls = [];

    for (let i = 1; i <= texts[lang].infoTexts.length + 1; i++) {
      let ball = pageNum === i ? 8 : 4;
      balls.push(ball);
    }
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          alignSelf: "center",
          position: "absolute",
          bottom: 20,
        }}
      >
        {balls.map((ball, i) => {
          return (
            <View
              key={i}
              style={{
                backgroundColor: colors.background,
                borderWidth: 0,
                borderColor: colors.background,
                width: ball,
                height: ball,
                borderRadius: ball / 2,
                marginHorizontal: 3,
              }}
            ></View>
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.screenContainer}>
      <LinearGradient
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        colors={[colors.primary, "rgba(239, 93, 93, 0.5)"]}
        style={[
          styles.QRCard,
          {
            marginTop: 44,
            backgroundColor: colors.primary,
            borderRadius: 20,
            padding: 20,
          },
        ]}
      >
        <FlatList
          ref={infoRef}
          data={texts[lang].infoTexts}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          pagingEnabled={true}
          keyExtractor={(item) => item.id}
          onScroll={(e) => onScrollEnd(e)}
          ListFooterComponent={
            <View
              style={{
                flex: 1,
                width: Dimensions.get("screen").width - 80,
                alignItems: "center",
                justifyContent: "space-between",
                paddingVertical: 20,
              }}
            >
              <Image
                source={require("../assets/qr_keeper_logo.png")}
                style={{
                  height: 200,
                  width: Dimensions.get("screen").width / 2,
                }}
                resizeMode="center"
              />
              <View
                style={{
                  alignSelf: "flex-start",
                  paddingHorizontal: 20,
                  alignItems: "flex-start",
                }}
              >
                <Text
                  style={styles.infoText}
                >{`${texts[lang].ver} 0.1.0`}</Text>
                <Text
                  style={[styles.infoText, { textDecorationLine: "underline" }]}
                  onPress={() => {
                    Linking.openURL(texts[lang].link);
                  }}
                >
                  {texts[lang].link}
                </Text>
                <Text style={[styles.infoText, { marginVertical: 10 }]}>
                  {texts[lang].dev}
                </Text>
                <TouchableOpacity
                  style={[styles.infoBtn, { marginVertical: 10 }]}
                  onPress={() =>
                    Linking.openURL(
                      "https://www.instagram.com/grebennikovalex/"
                    )
                  }
                >
                  <Text style={[styles.infoText, { marginTop: 0 }]}>
                    @grebennikovalex
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL("https://www.instagram.com/streletskiy.b/")
                  }
                  style={[styles.infoBtn, { marginVertical: 20 }]}
                >
                  <Text style={[styles.infoText, { marginTop: 0 }]}>
                    @streletskiy.b
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          }
          renderItem={({ item, index }) => (
            <View
              style={{
                flex: 1,
                padding: 10,
                width: Dimensions.get("screen").width - 80,
              }}
            >
              <Text style={styles.infoText}>{item.text}</Text>
            </View>
          )}
        />
        <Balls />
      </LinearGradient>

      <View style={styles.bottomMenu}>
        <Button type="chevron" onPress={() => navigation.goBack()} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

export default Info;
