import styles from "@/src/styles/settingPage";
import React from "react";
import { Text, TextInput } from "react-native";

export default function ProfileInput({
  value,
  onChangeText,
}: {
  value: string;
  onChangeText: (v: string) => void;
}) {
  return (
    <>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder="Name..."
        placeholderTextColor="#bbb"
      />
    </>
  );
}
