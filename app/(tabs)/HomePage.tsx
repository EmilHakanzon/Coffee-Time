import CoffeeTypeSelector from "@/src/components/homepage/CoffeeTypeSelector";
import DrinkCoffeeButton from "@/src/components/homepage/DrinkCoffeeButton";
import { useCoffeeHome } from "@/src/hooks/useCoffeeHome";
import { useProfileStore } from "@/src/store/profilestore";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import styles from "../../src/styles/HomeScreen.styles";
import {
  formDate,
  formtTime,
  getGreeting,
  isReminderTime,
} from "../../src/utils/homeUtils";

export default function HomeScreen() {
  const {
    name,
    reminderHours,
    setReminderHours,
    coffeeLog,
    setCoffeeLog,
    waterLog,
    setWaterLog,
    glassSize,
  } = useProfileStore();
  const {
    selectedCoffeeType,
    setSelectedCoffeeType,
    lastCoffeeTime,
    setLastCoffeeTime,
    nextReminderTime,
  } = useCoffeeHome();
  const [showWaterReminder, setShowWaterReminder] = useState(false);

  // Funktion som anropas när kaffe loggas
  const handleCoffeeLogged = () => {
    setShowWaterReminder(true);
    setTimeout(() => setShowWaterReminder(false), 10000); // Visa i 10 sekunder
  };

  // Vattenmål per dag (ml)
  const dailyGoal = 3000;
  // Filtrera dagens vattenloggar
  const today = new Date().toDateString();
  const todaysWaterLogs = waterLog.filter(
    (ts) => new Date(ts).toDateString() === today,
  );
  const waterDrank = todaysWaterLogs.length * glassSize;
  const waterLeft = Math.max(0, dailyGoal - waterDrank);
  const waterPercent = Math.min(1, waterDrank / dailyGoal);

  // Logga ett glas vatten
  const handleLogWater = () => {
    setWaterLog([Date.now(), ...waterLog]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.greetingContainer}>
        <Text style={styles.greetingText}>{getGreeting()} 👋</Text>
        {name ? <Text style={styles.greetingName}>{name}</Text> : null}
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
          {showWaterReminder && (
            <Text
              style={{
                color: "#0077cc",
                marginTop: 8,
                fontWeight: "bold",
                fontSize: 15,
              }}
            >
              Remember to drink a glass of water! 💧
            </Text>
          )}
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
          onCoffeeLogged={handleCoffeeLogged}
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

        {/* Water Tracker */}
        <View style={{ marginTop: 24, alignItems: "center" }}>
          <Text style={{ fontWeight: "bold", fontSize: 18, color: "#0077cc" }}>
            Water Intake
          </Text>
          <Text style={{ marginVertical: 4 }}>
            {waterDrank / 1000} / {dailyGoal / 1000} L
          </Text>
          <View
            style={{
              width: "80%",
              height: 12,
              backgroundColor: "#e0e0e0",
              borderRadius: 6,
              marginBottom: 8,
            }}
          >
            <View
              style={{
                width: `${waterPercent * 100}%`,
                height: 12,
                backgroundColor: "#0077cc",
                borderRadius: 6,
              }}
            />
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: "#0077cc",
              padding: 12,
              borderRadius: 8,
              marginTop: 4,
            }}
            onPress={handleLogWater}
          >
            <Text
              style={{ color: "#fff", fontWeight: "bold" }}
            >{`Log Water (+${glassSize} ml)`}</Text>
          </TouchableOpacity>
          <Text
            style={{
              marginTop: 4,
              color: waterLeft === 0 ? "#4caf50" : "#8B4513",
            }}
          >
            {waterLeft === 0
              ? "Goal reached!"
              : `${waterLeft / 1000} L left today`}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
