import React from "react";
import { Text } from "react-native";
import Slider from "@react-native-community/slider";
import styles from "@/src/styles/settingPage";

export default function ReminderSlider({
  reminderHours,
  setReminderHours,
}: {
  reminderHours: number;
  setReminderHours: (v: number) => void;
}) {
  return (
    <>
      <Text style={styles.label}>Coffee Reminder (hours): {reminderHours}</Text>
      <Slider
        style={{ width: "100%", height: 40 }}
        minimumValue={1}
        maximumValue={12}
        step={1}
        value={reminderHours}
        onValueChange={setReminderHours}
        minimumTrackTintColor="#8B4513"
        maximumTrackTintColor="#ccc"
        thumbTintColor="#8B4513"
      />
    </>
  );
}
