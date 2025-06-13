import React from "react";
import { TouchableOpacity, Text } from "react-native";
import styles from "@/src/styles/LogPage";
import { CoffeeLog } from "@/src/types/coffee";

export default function DayCard({
  dateKey,
  logs,
  onPress,
}: {
  dateKey: string;
  logs: CoffeeLog[];
  onPress: () => void;
}) {
  const uniqueTypes = [...new Set(logs.map((l) => l.coffeeType.title))];
  return (
    <TouchableOpacity style={styles.dayCard} onPress={onPress}>
      <Text style={styles.dayTitle}>{dateKey}</Text>
      <Text style={styles.daySummary}>
        {logs.length} Cup(s) & {uniqueTypes.length} Coffee type(s)
      </Text>
    </TouchableOpacity>
  );
}
