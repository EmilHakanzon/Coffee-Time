import DayCard from "@/src/components/log/DayCard";
import DayDetails from "@/src/components/log/DayDetails";
import PeriodSelector from "@/src/components/log/PeriodSelector";
import { useProfileStore } from "@/src/store/profilestore";
import styles from "@/src/styles/LogPage";
import { filterLogsByPeriod, groupLogsByDay } from "@/src/utils/logpageUtlis";
import React, { useState } from "react";
import { FlatList, Text, View } from "react-native";

export default function LogPage() {
  const { coffeeLog, setCoffeeLog } = useProfileStore();
  const [period, setPeriod] = useState<"day" | "week" | "month" | "year">(
    "day",
  );
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  // Filtrera loggen efter period
  const filteredLog = filterLogsByPeriod(coffeeLog, period);
  // Gruppad logg per dag
  // sortera dagarna i fallande ordning
  const grouped = groupLogsByDay(filteredLog);
  const days = Object.keys(grouped).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime(),
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Coffee Log ☕</Text>
      <PeriodSelector
        period={period}
        setPeriod={setPeriod}
        setSelectedDay={setSelectedDay}
      />
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
      {selectedDay ? (
        <DayDetails
          dateKey={selectedDay}
          logs={grouped[selectedDay]}
          onBack={() => setSelectedDay(null)}
        />
      ) : (
        <FlatList
          data={days}
          keyExtractor={(item) => item}
          renderItem={({ item: dateKey }) => (
            <DayCard
              dateKey={dateKey}
              logs={grouped[dateKey]}
              onPress={() => setSelectedDay(dateKey)}
            />
          )}
          ListEmptyComponent={
            <Text
              style={{
                textAlign: "center",
                marginTop: 40,
                color: "#888",
              }}
            >
              No coffee logged yet!
            </Text>
          }
        />
      )}
    </View>
  );
}
