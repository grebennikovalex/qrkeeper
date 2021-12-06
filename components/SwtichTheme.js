import React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { colors } from "../colors";

function SwitchTheme({
    value = false,
    onPress,
    theme = true,
}) {
    if (value === true) return (
        <TouchableOpacity
            style={[styles.switchContainer, {borderColor: theme ? colors.darkPrimary : colors.primary},]}
            onPress={onPress}
        >
            <View style={[styles.switchCircle, {borderColor: theme ? colors.darkPrimary : colors.primary},]}></View>    
        </TouchableOpacity>
    );
    else if (value === false) return (
        <TouchableOpacity
            style={[styles.switchContainer, styles.switchContainerActive, {borderColor: theme ? colors.darkPrimary : colors.primary},]}
            onPress={onPress}
        >
            <View style={[styles.switchCircle, styles.switchCircleActive, {borderColor: theme ? colors.darkPrimary : colors.primary, backgroundColor: theme ? colors.darkPrimary : "transparent"},]}></View>    
        </TouchableOpacity>
    )
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
    }
});

export default SwitchTheme;