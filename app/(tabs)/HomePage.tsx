import CoffeeTypeSelector from "@/src/components/CoffeeTypeSelector";
import { COFFEE_TYPES } from "@/src/constants/CoffeeType";
import { CoffeeType, type CoffeeLog } from "@/src/types/coffee";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import styles from "../../src/styles/HomeScreen.styles";

export default function HomeScreen() {
  const [selectedCoffeeType, setSelectedCoffeeType] = useState<CoffeeType>(
    COFFEE_TYPES[0],
  );
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

  const formtTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const formDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const isReminderTime = () => {
    if (!nextReminderTime) return false;
    return new Date() >= nextReminderTime;
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
            isReminderTime() ? styles.reminderActive : styles.reminderInactive,
          ]}
        >
          <Ionicons
            name={isReminderTime() ? "alarm" : "time-outline"}
            size={32}
            color={isReminderTime() ? "#FF6B6B" : "#8B4513"}
          />
          <Text style={styles.statusTitle}>
            {isReminderTime() ? "Time for Coffee!" : "Next Coffee"}
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
            I Just Had {selectedCoffeeType.title}
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
