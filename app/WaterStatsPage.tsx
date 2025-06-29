import { useProfileStore } from "@/src/store/profilestore";
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
    <ScrollView style={{ flex: 1, backgroundColor: "#F5F5DC" }}>
      <View style={{ alignItems: "center", marginTop: 32 }}>
        <Text style={{ fontSize: 26, fontWeight: "bold", color: "#0077cc" }}>
          Water Stats 💧
        </Text>
        <Text style={{ marginTop: 12, fontSize: 18 }}>
          Current streak: <Text style={{ fontWeight: "bold" }}>{streak}</Text>{" "}
          days
        </Text>
        <Text style={{ fontSize: 16, color: "#888" }}>
          Longest streak: {maxStreak} days
        </Text>
      </View>
      <View style={{ margin: 24 }}>
        <Text style={{ fontWeight: "bold", fontSize: 18, marginBottom: 8 }}>
          Water intake per day
        </Text>
        {days.length === 0 && <Text>No water logged yet!</Text>}
        {days.map((d) => (
          <View
            key={d}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 4,
            }}
          >
            <Text>{d}</Text>
            <Text>
              {(map[d] * glassSize) / 1000} L ({map[d]} glasses)
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
