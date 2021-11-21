import React from "react";
import { View, Text, Image, Dimensions, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as Linking from "expo-linking";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../styles";
import { colors } from "../colors";
import Button from "../components/Button";

function Info({ navigation }) {
  return (
    <View style={styles.screenContainer}>
      <View
        style={[
          styles.QRCard,
          { marginTop: 44, backgroundColor: colors.primary },
        ]}
      >
        <LinearGradient
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
          colors={[colors.primary, "rgba(239, 93, 93, 0.5)"]}
          style={styles.infoGradient}
        >
          <Image
            source={require("../assets/qr_wallet_logo.png")}
            style={{
              height: 200,
              width: Dimensions.get("screen").width / 2,
            }}
            resizeMode="center"
          />
          <View style={{ paddingHorizontal: 20 }}>
            <Text style={styles.infoText}>
              <Text style={{ fontFamily: "black", color: colors.background }}>
                QR Keeper
              </Text>{" "}
              — удобное хранение кодов, которые нужно показывать при входе в
              кафе и в другие заведения.
            </Text>
            <Text style={styles.infoText}>Версия 0.1.0</Text>
            <Text style={styles.infoText}>Разработка и дизайн:</Text>
            <TouchableOpacity
              style={styles.infoBtn}
              onPress={() =>
                Linking.openURL("https://www.instagram.com/grebennikovalex/")
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
              style={styles.infoBtn}
            >
              <Text style={[styles.infoText, { marginTop: 0 }]}>
                @streletskiy.b
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
      <View style={styles.bottomMenu}>
        <Button type="chevron" onPress={() => navigation.goBack()} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

export default Info;
