import React from "react";
import { View, Text, Image } from "react-native";
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
          <Image source={require("../assets/qr_wallet_logo.png")} />
          <View style={{ paddingHorizontal: 20 }}>
            <Text style={styles.infoText}>
              <Text style={{ fontWeight: "bold" }}>QRWallet</Text> — удобное
              хранение сраных кодов, которые нужно показывать при входе в
              кафешки и другие заведения.
            </Text>
            <Text style={styles.infoText}>Версия 0.1</Text>
            <Text style={styles.infoText}>
              Разработка и дизайн: @grebennikovalex @streletskiy.b
            </Text>
          </View>
        </LinearGradient>
      </View>
      <View style={styles.bottomMenu}>
        <Button type="chevron" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
}

export default Info;
