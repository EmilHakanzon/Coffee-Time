import { CoffeeLog } from "@/src/types/coffee";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import { useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";

export default function LogPage() {
  const [coffeeLog, setCoffeeLog] = useState<CoffeeLog[]>([]);

  useFocusEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem("coffee_log");
      if (saved) setCoffeeLog(JSON.parse(saved));
    })();
  });
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Coffee Log ☕</Text>
      <FlatList
        data={coffeeLog}
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
