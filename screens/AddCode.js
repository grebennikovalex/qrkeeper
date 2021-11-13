import React, { useState, useEffect } from "react";
import { View, TextInput } from "react-native";
import * as SecureStore from "expo-secure-store";
import Button from "../components/Button";
import styles from "../styles";
import { colors } from "../colors";

function AddCode({ navigation }) {
  return (
    <View style={styles.screenContainer}>
      <View style={{ padding: 20, width: "100%" }}>
        <TextInput
          style={styles.textInput}
          placeholder="Название"
          placeholderTextColor={colors.placeholder}
        />
        <TextInput
          style={[styles.textInput, { marginTop: 20 }]}
          placeholder="Ссылка внутри кода"
          placeholderTextColor={colors.placeholder}
        />
        <Button type="primary" title="Сохранить" topOffset={20} />
        <Button
          topOffset={20}
          type="secondary"
          title="Назад"
          onPress={() => navigation.goBack()}
        />
      </View>
    </View>
  );
}

export default AddCode;
