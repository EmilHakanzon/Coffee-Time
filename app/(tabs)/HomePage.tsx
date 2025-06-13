import CoffeeTypeSelector from "@/src/components/homepage/CoffeeTypeSelector";
import DrinkCoffeeButton from "@/src/components/homepage/DrinkCoffeeButton";
import { useCoffeeHome } from "@/src/hooks/useCoffeeHome";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import styles from "../../src/styles/HomeScreen.styles";
import {
  formDate,
  formtTime,
  getGreeting,
  isReminderTime,
} from "../../src/utils/homeUtils";

export default function HomeScreen() {
  const {
    selectedCoffeeType,
    setSelectedCoffeeType,
    lastCoffeeTime,
    setLastCoffeeTime,
    nextReminderTime,
    coffeeLog,
    setCoffeeLog,
    reminderHours,
    setReminderHours,
    userName,
    //setUserName,
  } = useCoffeeHome();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.greetingContainer}>
        <Text style={styles.greetingText}>{getGreeting()} 👋</Text>
        {userName ? <Text style={styles.greetingName}>{userName}</Text> : null}
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
        {/* Last Coffee */}
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

        {/* Drink Button */}
        <DrinkCoffeeButton
          selectedCoffeeType={selectedCoffeeType}
          coffeeLog={coffeeLog}
          setCoffeeLog={setCoffeeLog}
          setLastCoffeeTime={setLastCoffeeTime}
          reminderHours={reminderHours}
        />

        {/* Recent Coffee Summary */}
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
