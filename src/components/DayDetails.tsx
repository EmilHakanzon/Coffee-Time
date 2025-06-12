import React from "react";
import { ScrollView, Text, View, Image, TouchableOpacity } from "react-native";
import styles from "@/src/styles/LogPage";
import { CoffeeLog } from "@/src/types/coffee";

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
      <TouchableOpacity onPress={onBack}>
        <Text style={{ color: "#8B4513", marginTop: 10 }}>Go Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
