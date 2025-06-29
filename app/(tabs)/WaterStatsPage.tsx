import { useProfileStore } from "@/src/store/profilestore";
import format from "date-fns/format";
import React from "react";
import { ScrollView, Text, View } from "react-native";

function getStreak(waterLog: number[], glassSize: number, dailyGoal: number) {
  // Skapa en map: {dateString: antal glas}
  const map: Record<string, number> = {};
  waterLog.forEach((ts) => {
    const d = new Date(ts).toDateString();
    map[d] = (map[d] || 0) + 1;
  });
  // Sortera datum
  const days = Object.keys(map).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime(),
  );
  // Räkna streak
  let streak = 0;
  let maxStreak = 0;
  let prevDate: Date | null = null;
  days.forEach((d) => {
    const metGoal = map[d] * glassSize >= dailyGoal;
    if (metGoal) {
      if (
        !prevDate ||
        new Date(d).getTime() - prevDate.getTime() === 24 * 60 * 60 * 1000
      ) {
        streak++;
      } else {
        streak = 1;
      }
      maxStreak = Math.max(maxStreak, streak);
      prevDate = new Date(d);
    } else {
      streak = 0;
      prevDate = null;
    }
  });
  return { streak, maxStreak };
}

export default function WaterStatsPage() {
  const { waterLog, glassSize } = useProfileStore();
  const dailyGoal = 3000;
  // Summera per dag
  const map: Record<string, number> = {};
  waterLog.forEach((ts) => {
    const d = new Date(ts).toDateString();
    map[d] = (map[d] || 0) + 1;
  });
  const days = Object.keys(map).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime(),
  );
  const { streak, maxStreak } = getStreak(waterLog, glassSize, dailyGoal);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#F8F8F8" }}>
      <View style={{ alignItems: "center", marginTop: 32, marginBottom: 16 }}>
        <Text
          style={{
            fontSize: 28,
            fontWeight: "bold",
            color: "#0077cc",
            marginBottom: 20,
          }}
        >
          💧 Water Stats
        </Text>
        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 16,
            padding: 20,
            width: "85%",
            alignItems: "center",
            shadowColor: "#000",
            shadowOpacity: 0.07,
            shadowRadius: 8,
            elevation: 2,
            marginBottom: 18,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#0077cc" }}>
            Current streak
          </Text>
          <Text
            style={{
              fontSize: 32,
              fontWeight: "bold",
              color: streak > 0 ? "#4caf50" : "#8B4513",
              marginVertical: 4,
            }}
          >
            {streak} days
          </Text>
          <Text style={{ fontSize: 16, color: "#888" }}>
            Longest streak:{" "}
            <Text style={{ fontWeight: "bold" }}>{maxStreak}</Text> days
          </Text>
        </View>
      </View>
      <View style={{ marginHorizontal: 24, marginBottom: 32 }}>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 20,
            marginBottom: 12,
            color: "#0077cc",
          }}
        >
          Water intake per day
        </Text>
        {days.length === 0 && (
          <Text style={{ color: "#8B4513" }}>No water logged yet!</Text>
        )}
        {days.map((d) => {
          // Format date as 'dd MMM yyyy'
          const dateObj = new Date(d);
          const formattedDate = format(dateObj, "dd MMM yyyy");
          const liters = ((map[d] * glassSize) / 1000).toFixed(1); // One decimal
          const metGoal = parseFloat(liters) >= dailyGoal / 1000;
          return (
            <View
              key={d}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: metGoal ? "#e3fcec" : "#fff",
                borderRadius: 10,
                paddingVertical: 10,
                paddingHorizontal: 16,
                marginBottom: 10,
                borderWidth: 1,
                borderColor: metGoal ? "#4caf50" : "#eee",
                shadowColor: "#000",
                shadowOpacity: 0.08,
                shadowRadius: 4,
                elevation: 2,
              }}
            >
              <Text style={{ color: "#8B4513", fontWeight: "bold" }}>
                💧 {formattedDate}
              </Text>
              <Text
                style={{
                  color: metGoal ? "#4caf50" : "#0077cc",
                  fontWeight: "bold",
                }}
              >
                {liters} L{" "}
                <Text style={{ color: "#888", fontWeight: "normal" }}>
                  ({map[d]} glasses)
                </Text>
                {metGoal ? "  ✔️" : ""}
              </Text>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}
