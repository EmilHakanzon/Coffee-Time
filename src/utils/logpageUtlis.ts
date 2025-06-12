import { CoffeeLog } from "@/src/types/coffee";

export function groupLogsByDay(logs: CoffeeLog[]) {
  return logs.reduce(
    (acc, log) => {
      const dateKey = new Date(log.timestamp).toLocaleDateString();
      if (!acc[dateKey]) acc[dateKey] = [];
      acc[dateKey].push(log);
      return acc;
    },
    {} as Record<string, CoffeeLog[]>,
  );
}

export function filterLogsByPeriod(
  logs: CoffeeLog[],
  period: "day" | "week" | "month" | "year",
) {
  const now = new Date();
  return logs.filter((log) => {
    const date = new Date(log.timestamp);
    if (period === "day") {
      return (
        date.getFullYear() === now.getFullYear() &&
        date.getMonth() === now.getMonth() &&
        date.getDate() === now.getDate()
      );
    }
    if (period === "week") {
      const dayOfWeek = now.getDay() === 0 ? 6 : now.getDay() - 1;
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
}
