import { CoffeeLog } from "@/src/types/coffee";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import { useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";

export default function LogPage() {
  const [coffeeLog, setCoffeeLog] = useState<CoffeeLog[]>([]);
  const [period, setPeriod] = useState<"day" | "week" | "month" | "year">(
    "day",
  );

  useFocusEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem("coffee_log");
      if (saved) setCoffeeLog(JSON.parse(saved));
    })();
  });

  // filtera loggen efter period
  const now = new Date();
  const filteredLog = coffeeLog.filter((log) => {
    const date = new Date(log.timestamp);
    if (period === "day") {
      return (
        date.getFullYear() === now.getFullYear() &&
        date.getMonth() === now.getMonth() &&
        date.getDate() === now.getDate()
      );
    }
    if (period === "week") {
      // Hitta veckans första dag (måndag)
      const dayOfWeek = now.getDay() === 0 ? 6 : now.getDay() - 1; // Gör söndag till 6, måndag till 0
      const startOfWeek = new Date(now);
      startOfWeek.setHours(0, 0, 0, 0);
      startOfWeek.setDate(now.getDate() - dayOfWeek);

      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      endOfWeek.setHours(23, 59, 59, 999);

      return date >= startOfWeek && date <= endOfWeek;
    }
    if (period === "month") {
      return (
        date.getFullYear() === now.getFullYear() &&
        date.getMonth() === now.getMonth()
      );
    }
    if (period === "year") {
      return date.getFullYear() === now.getFullYear();
    }
    return true;
  });
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Coffee Log ☕</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: 16,
        }}
      >
        {["day", "week", "month", "year"].map((p) => (
          <Text
            key={p}
            onPress={() => setPeriod(p as any)}
            style={{
              marginHorizontal: 8,
              padding: 6,
              borderBottomWidth: period === p ? 2 : 0,
              borderColor: "#8B4513",
              color: period === p ? "#8B4513" : "#888",
              fontWeight: period === p ? "bold" : "normal",
            }}
          >
            {p.charAt(0).toUpperCase() + p.slice(1)}
          </Text>
        ))}
      </View>
      <Text
        style={{
          textAlign: "center",
          marginBottom: 8,
          color: "#8B4513",
          fontWeight: "bold",
        }}
      >
        {filteredLog.length} cup(s) this {period}
      </Text>
      <FlatList
        data={filteredLog}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.logItem}>
            {item.coffeeType.image ? (
              <Image
                source={{ uri: item.coffeeType.image }}
                style={styles.logImage}
                resizeMode="cover"
              />
            ) : (
              <Text style={{ fontSize: 28, marginRight: 10 }}>☕</Text>
            )}
            <View style={styles.logItem}>
              <Text style={styles.logType}>{item.coffeeType.title}</Text>
              <Text style={styles.logTime}>
                {""} {new Date(item.timestamp).toLocaleString()}
              </Text>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 40, color: "#888" }}>
            No coffee logged yet!
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#8B4513",
    marginBottom: 16,
    textAlign: "center",
  },
  logItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  logImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: "#f3f3f3",
  },
  logType: { fontWeight: "bold", fontSize: 16, color: "#8B4513" },
  logTime: { color: "#666", fontSize: 13, marginTop: 2 },
});
