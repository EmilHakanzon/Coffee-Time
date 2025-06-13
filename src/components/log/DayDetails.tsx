import styles from "@/src/styles/LogPage";
import { CoffeeLog } from "@/src/types/coffee";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function DayDetails({
  dateKey,
  logs,
  onBack,
}: {
  dateKey: string;
  logs: CoffeeLog[];
  onBack: () => void;
}) {
  return (
    <ScrollView style={styles.dayDetails}>
      <TouchableOpacity onPress={onBack}>
        <Text style={{ color: "#8B4513",  }}>
          <Ionicons name="arrow-back" size={10} color="#8B4513" /> {""}Go Back
        </Text>
      </TouchableOpacity>
      <Text style={styles.dayTitle}>Details for {dateKey}</Text>
      {logs.map((log) => (
        <View key={log.id} style={styles.logItem}>
          {log.coffeeType.image ? (
            <Image
              source={{ uri: log.coffeeType.image }}
              style={styles.logImage}
              resizeMode="cover"
            />
          ) : (
            <Text style={{ fontSize: 28, marginRight: 10 }}>☕</Text>
          )}
          <View>
            <Text style={styles.logType}>{log.coffeeType.title}</Text>
            <Text style={styles.logTime}>
              {new Date(log.timestamp).toLocaleTimeString()}
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
