import { useRouter } from "expo-router";
import React from "react";
import { Button, Text, View, StyleSheet } from "react-native";

export default function IndexScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text>Welcome to your coffee app</Text>
      <Text>Time For Coffee?</Text>
      <Button title="Go to HomePage" onPress={() => router.push("/HomePage")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
