import { StyleSheet } from "react-native";
import { colors } from "./colors";

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  text400: {
    fontWeight: "400",
    fontSize: 24,
    color: colors.secondary,
  },

  textInput: {
    width: "100%",
    height: 60,
    elevation: 10,
    borderRadius: 20,
    backgroundColor: colors.background,
    fontSize: 24,
    paddingHorizontal: 24,
    fontWeight: "bold",
    color: colors.secondary,
  },
});

export default styles;
