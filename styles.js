import { StyleSheet, Dimensions } from "react-native";
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

  bottomMenu: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },

  QRContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
  },

  QRCard: {
    flex: 1,
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
    width: Dimensions.get("screen").width - 40,
    borderRadius: 20,
    elevation: 10,
    backgroundColor: colors.background,
  },

  burgerMenuContainer: {
    flex: 1,
    paddingHorizontal: 20,
    flexDirection: "row",
    width: "100%",
  },

  infoGradient: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    height: "100%",
    paddingTop: 34,
    paddingHorizontal: 20,
    borderRadius: 20,
  },

  infoText: {
    color: colors.background,
    fontSize: 16,
    marginTop: 10,
  },
});

export default styles;
