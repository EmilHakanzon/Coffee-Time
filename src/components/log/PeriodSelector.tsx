import React from "react";
import { Text, View } from "react-native";

export default function PeriodSelector({
  period,
  setPeriod,
  setSelectedDay,
}: {
  period: string;
  setPeriod: (p: "day" | "week" | "month" | "year") => void;
  setSelectedDay: (d: string | null) => void;
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 16,
      }}
    >
      {(["day", "week", "month", "year"] as Array<"day" | "week" | "month" | "year">).map((p) => (
        <Text
          key={p}
          onPress={() => {
            setPeriod(p);
            setSelectedDay(null);
          }}
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
  );
}
