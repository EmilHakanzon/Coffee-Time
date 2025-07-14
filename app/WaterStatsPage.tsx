import { useProfileStore } from "@/src/store/profilestore";
import { ScrollView, Text, View } from "react-native";

// ProgressBar-komponent (enkel)
function ProgressBar({ progress }: { progress: number }) {
  return (
    <View
      style={{
        height: 14,
        backgroundColor: "#e0e0e0",
        borderRadius: 7,
        overflow: "hidden",
        marginTop: 8,
        marginBottom: 4,
      }}
    >
      <View
        style={{
          width: `${Math.min(progress * 100, 100)}%`,
          height: "100%",
          backgroundColor: "#0077cc",
        }}
      />
    </View>
  );
}

export default function WaterStatsPage() {
  const { waterLog, glassSize } = useProfileStore();
  const dailyGoal = 3000;

  // Filtrera ut dagens loggar
  const todayStr = new Date().toDateString();
  const todaysLogs = waterLog.filter(
    (ts) => new Date(ts).toDateString() === todayStr,
  );
  const glassesToday = todaysLogs.length;
  const totalToday = glassesToday * glassSize;
  const progress = totalToday / dailyGoal;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#F5F5DC" }}>
      <View style={{ alignItems: "center", marginTop: 32 }}>
        <Text style={{ fontSize: 26, fontWeight: "bold", color: "#0077cc" }}>
          Water Stats 💧
        </Text>
      </View>
      <View
        style={{
          margin: 24,
          backgroundColor: "#fff",
          borderRadius: 18,
          padding: 24,
          shadowColor: "#000",
          shadowOpacity: 0.08,
          shadowRadius: 10,
          elevation: 4,
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 8 }}>
          Today's Water Intake
        </Text>
        <Text
          style={{
            fontSize: 48,
            color: "#0077cc",
            fontWeight: "bold",
            marginTop: 8,
          }}
        >
          {glassesToday}
        </Text>
        <Text style={{ fontSize: 16, color: "#888", marginBottom: 8 }}>
          glasses ({totalToday} ml)
        </Text>
        <ProgressBar progress={progress} />
        <Text style={{ fontSize: 14, color: "#888" }}>
          {Math.min(totalToday, dailyGoal)} / {dailyGoal} ml
        </Text>
      </View>
      {glassesToday === 0 && (
        <View style={{ alignItems: "center", marginTop: 16 }}>
          <Text style={{ color: "#888" }}>No water logged yet today!</Text>
        </View>
      )}
    </ScrollView>
  );
}
