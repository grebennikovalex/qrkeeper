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
    fontFamily: "regular",
    fontSize: 24,
    color: colors.secondary,
  },

  textInput: {
    width: "100%",
    height: 60,
    elevation: 10,
    borderRadius: 20,
    backgroundColor: colors.foreground,
    fontSize: 24,
    paddingHorizontal: 24,
    color: colors.secondary,
  },

  textBold: {
    fontSize: 24,
    fontFamily: "black",
    color: colors.secondary,
    textAlign: "center",
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
    justifyContent: "flex-start",
    width: Dimensions.get("screen").width - 40,
    borderRadius: 20,
    elevation: 10,
    backgroundColor: colors.foreground,
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
    justifyContent: "space-between",
    width: "100%",
    height: "100%",
    paddingVertical: 35,
    paddingHorizontal: 20,
    borderRadius: 20,
  },

  infoText: {
    color: colors.background,
    fontSize: 16,
  },

  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  modalMessage: {
    width: "100%",
    elevation: 10,
    borderRadius: 20,
    backgroundColor: colors.foreground,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
  },

  infoBtn: {
    width: "100%",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderColor: colors.background,
    borderWidth: 1,
    borderRadius: 14,
    marginTop: 4,
  },

  arrowBody: {
    flex: 1,
    borderRightWidth: 2,
    borderTopWidth: 2,
    borderTopRightRadius: 20,
    width: "40%",
    left: "59%",
    top: -14,
    height: "100%",
    borderColor: colors.secondary,
  },

  arrow: {
    width: 30,
    height: 30,
    position: "absolute",
    borderRightWidth: 2,
    borderBottomWidth: 2,
    bottom: 4,
    right: -16,
    borderColor: colors.secondary,
    transform: [{ rotate: "45deg" }],
  },
});

export default styles;
