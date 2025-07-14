import styles from "@/src/styles/settingPage";
import Slider from "@react-native-community/slider";
import React, { useRef, useState } from "react";
import { Text } from "react-native";

export default function ReminderSlider({
  reminderHours,
  setReminderHours,
}: {
  reminderHours: number;
  setReminderHours: (v: number) => void;
}) {
  // Lokalt state för att visa värdet direkt när man drar
  const [localValue, setLocalValue] = useState(reminderHours);
  const isSliding = useRef(false);

  return (
    <>
      <Text style={styles.label}>
        Coffee Reminder (hours):{" "}
        {isSliding.current ? localValue : reminderHours}
      </Text>
      <Slider
        style={{ width: "100%", height: 40 }}
        minimumValue={1}
        maximumValue={12}
        step={1}
        value={reminderHours}
        onValueChange={(value) => {
          isSliding.current = true;
          setLocalValue(Math.round(value));
        }}
        onSlidingComplete={(value) => {
          isSliding.current = false;
          setReminderHours(Math.round(value));
        }}
        minimumTrackTintColor="#8B4513"
        maximumTrackTintColor="#ccc"
        thumbTintColor="#8B4513"
      />
    </>
  );
}
