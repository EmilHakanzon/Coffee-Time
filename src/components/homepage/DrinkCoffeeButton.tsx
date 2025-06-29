import type { CoffeeLog, CoffeeType } from "@/src/types/coffee";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { Alert, Text, TouchableOpacity } from "react-native";

export default function DrinkCoffeeButton({
  selectedCoffeeType,
  coffeeLog,
  setCoffeeLog,
  setLastCoffeeTime,
  reminderHours,
  onCoffeeLogged,
}: {
  selectedCoffeeType: CoffeeType | null;
  coffeeLog: CoffeeLog[];
  setCoffeeLog: (logs: CoffeeLog[]) => void;
  setLastCoffeeTime: (date: Date) => void;
  reminderHours: number;
  onCoffeeLogged?: () => void;
}) {
  // Körs när användaren loggar en kaffe. Lägger till ny logg, uppdaterar AsyncStorage och visar alert.

  const handleDrinkCoffee = async () => {
    if (!selectedCoffeeType) {
      Alert.alert("Please select a coffee type before logging!");
      return;
    }
    const now = new Date();
    const newLog: CoffeeLog = {
      id: Date.now().toString(),
      coffeeType: selectedCoffeeType,
      timestamp: now,
    };
    // Uppdetera loggen i AyncStorage, hämtar den gamla coffeeLog

    const updatedLog = [newLog, ...coffeeLog];
    setCoffeeLog(updatedLog);
    setLastCoffeeTime(now);
    await AsyncStorage.setItem("coffee_log", JSON.stringify(updatedLog));

    Alert.alert(
      "Coffe Logged! ☕",
      `Enjoyed your ${selectedCoffeeType.title}! Next reminder in ${reminderHours} hour`,
      [
        {
          text: "OK",
          onPress: () => {
            if (onCoffeeLogged) onCoffeeLogged();
          },
        },
      ],
    );
  };

  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#8B4513",
        borderRadius: 12,
        paddingVertical: 20,
        paddingHorizontal: 24,
        marginBottom: 10,
        minHeight: 60,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
      }}
      onPress={handleDrinkCoffee}
    >
      <Ionicons name="cafe" size={24} color="#FFFFFF" />
      <Text style={{ color: "#fff", fontWeight: "bold", marginLeft: 8 }}>
        I Just Had {selectedCoffeeType ? selectedCoffeeType.title : "a coffee"}
      </Text>
    </TouchableOpacity>
  );
}
