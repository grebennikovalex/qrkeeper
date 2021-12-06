import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { colors } from "../colors";

function Switch({ value, onChangeValue }) {
  const [changeState, setChangeState] = useState(value);
  return (
    <TouchableOpacity
      style={[
        styles.switchContainer,
        { borderColor: !value ? colors.darkPrimary : colors.primary },
      ]}
      onPress={() => {
        setChangeState((bool) => !bool);
        onChangeValue(changeState);
      }}
    >
      <View
        style={[
          styles.switchCircle,
          {
            borderColor: !value ? colors.darkPrimary : colors.primary,
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
  switchContainerActive: {
    justifyContent: "flex-end",
  },
  switchCircle: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 10,
  },
  switchCircleActive: {
    borderWidth: 0,
  },
});

export default Switch;
