import styles from "@/src/styles/startscreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const hasSeen = await AsyncStorage.getItem("hasSeenWelcome");
      if (hasSeen) {
        router.replace("/HomePage");
      } else {
        setLoading(false);
      }
    })();
  }, []);

  const handleStart = async () => {
    await AsyncStorage.setItem("hasSeenWelcome", "true");
    router.replace("/HomePage");
  };

  if (loading) return null;

  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
      <ImageBackground
        source={require("../assets/coffeImg.png")}
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
              onPress={handleStart}
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
