import styles from "@/src/styles/settingPage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Slider from "@react-native-community/slider";
import React from "react";
import { Text } from "react-native";

export default function ReminderSlider({
  reminderHours,
  setReminderHours,
}: {
  reminderHours: number;
  setReminderHours: (v: number) => void;
}) {
  // Sätter värdet och sparar till AsyncStorage
  const handleSliderChange = async (value: number) => {
    setReminderHours(value);
    await AsyncStorage.setItem("reminder_hours", value.toString());
  };

  return (
    <>
      <Text style={styles.label}>Coffee Reminder (hours): {reminderHours}</Text>
      <Slider
        style={{ width: "100%", height: 40 }}
        minimumValue={1}
        maximumValue={12}
        step={1}
        value={reminderHours}
        onValueChange={handleSliderChange}
        minimumTrackTintColor="#8B4513"
        maximumTrackTintColor="#ccc"
        thumbTintColor="#8B4513"
      />
    </>
  );
}
