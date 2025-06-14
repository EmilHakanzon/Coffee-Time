import styles from "@/src/styles/startscreen";
import { useRouter } from "expo-router";
import React from "react";
import {
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function IndexScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
      <ImageBackground
        source={require("../../assets/coffeImg.png")}
        style={styles.background}
        resizeMode="cover"
      >
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.overlay}>
            <Text style={styles.title}>Welcome to CoffeeTime ☕</Text>
            <Text style={styles.subtitle}>
              Track your daily brews and stay energized
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push("/HomePage")}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Go to HomePage</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}
