import React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { colors } from "../colors";

function Switch({ value, onChangeValue }) {
  return (
    <TouchableOpacity
      style={[
        styles.switchContainer,
        { borderColor: !value ? colors.darkPrimary : colors.primary },
      ]}
      onPress={() => onChangeValue(!value)}
    >
      <View
        style={[
          styles.switchCircle,
          {
            left: value ? 0 : 23,
            backgroundColor: value ? colors.primary : colors.darkPrimary,
          },
        ]}
      ></View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  switchContainer: {
    width: 50,
    height: 25,
    borderWidth: 1,
    borderRadius: 12.5,
    flexDirection: "row",
    alignItems: "center",
    padding: 2.5,
    marginRight: 20,
  },

  switchCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
});

export default Switch;
