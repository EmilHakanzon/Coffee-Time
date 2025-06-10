import CoffeeTypeSelector from "@/src/components/CoffeeTypeSelector";
import { CoffeeType, type CoffeeLog } from "@/src/types/coffee";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import styles from "../../src/styles/HomeScreen.styles";
import {
  formDate,
  formtTime,
  getGreeting,
  isReminderTime,
} from "../../src/utils/homeUtils";

export default function HomeScreen() {
  const [selectedCoffeeType, setSelectedCoffeeType] =
    useState<CoffeeType | null>(null);
  const [lastCoffeeTime, setLastCoffeeTime] = useState<Date | null>(null);
  const [nextReminderTime, setNextReminderTime] = useState<Date | null>(null);
  const [coffeeLog, setCoffeeLog] = useState<CoffeeLog[]>([]);

  // reminder calculate
  //TODO: Dynamik ?
  useEffect(() => {
    if (lastCoffeeTime) {
      const nextTime = new Date(lastCoffeeTime.getTime() + 4 * 60 * 60 * 1000);
      setNextReminderTime(nextTime);
    }
  }, [lastCoffeeTime]);

  const handleDrinkCoffee = () => {
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

    setCoffeeLog((prev) => [newLog, ...prev]);
    setLastCoffeeTime(now);

    Alert.alert(
      "Coffe Logged! ☕",
      `Enjoyed your ${selectedCoffeeType.title}! Next reminder in 4 Hours`,
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.greetingContainer}>
        <Text style={styles.greetingText}>{getGreeting()} 👋</Text>
      </View>
      {/* Reminder Status */}
      <View style={styles.content}>
        <View
          style={[
            styles.statusCard,
            isReminderTime(nextReminderTime)
              ? styles.reminderActive
              : styles.reminderInactive,
          ]}
        >
          <Ionicons
            name={isReminderTime(nextReminderTime) ? "alarm" : "time-outline"}
            size={32}
            color={isReminderTime(nextReminderTime) ? "#FF6B6B" : "#8B4513"}
          />
          <Text style={styles.statusTitle}>
            {isReminderTime(nextReminderTime)
              ? "Time for Coffee!"
              : "Next Coffee"}
          </Text>
          <Text style={styles.statuTime}>
            {nextReminderTime ? formtTime(nextReminderTime) : "--:--"}
          </Text>
        </View>
        {/* Last Coffe */}
        {lastCoffeeTime && (
          <View style={styles.LastCoffeCard}>
            <Text style={styles.lastCoffeeLabel}>Last Coffee</Text>
            <Text style={styles.lastCoffeeType}>
              {coffeeLog[0]?.coffeeType.title}
            </Text>
            <Text style={styles.lastCoffeeTime}>
              {formDate(lastCoffeeTime)} at {formtTime(lastCoffeeTime)}
            </Text>
          </View>
        )}

        {/* Coffee Select */}
        <View style={styles.selectorContainer}>
          <Text style={styles.selectorLabel}>Choose Your Coffee ☕</Text>
          <CoffeeTypeSelector
            selectedType={selectedCoffeeType}
            onSelect={setSelectedCoffeeType}
          />
        </View>

        {/* Drink BUtton */}
        <TouchableOpacity
          style={styles.drinkButton}
          onPress={handleDrinkCoffee}
        >
          <Ionicons name="cafe" size={24} color="#FFFFFF" />
          <Text style={styles.drinkButtonText}>
            I Just Had{" "}
            {selectedCoffeeType ? selectedCoffeeType.title : "a coffee"}
          </Text>
        </TouchableOpacity>

        {/* Recent Coffe Summary */}
        {coffeeLog.length > 0 && (
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Today's Coffee</Text>
            <Text style={styles.summaryCount}>
              {
                coffeeLog.filter(
                  (log) =>
                    new Date(log.timestamp).toDateString() ===
                    new Date().toDateString(),
                ).length
              }{" "}
              Cups
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
