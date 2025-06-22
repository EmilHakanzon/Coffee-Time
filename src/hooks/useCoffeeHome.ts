import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";
import type { CoffeeType, CoffeeLog } from "@/src/types/coffee";
import { registerForPushNotificationsAsync, scheduleCoffeeNotification } from "@/src/utils/notifications";


export function useCoffeeHome() {
  const [selectedCoffeeType, setSelectedCoffeeType] =
    useState<CoffeeType | null>(null);
  const [lastCoffeeTime, setLastCoffeeTime] = useState<Date | null>(null);
  const [nextReminderTime, setNextReminderTime] = useState<Date | null>(null);
  const [coffeeLog, setCoffeeLog] = useState<CoffeeLog[]>([]);
  const [reminderHours, setReminderHours] = useState(4);
  const [userName, setUserName] = useState("");

  // denna hook körs varje gång homepage blir aktiv och då
  //hämtar den om på nytt.
  useFocusEffect(
    useCallback(() => {
      (async () => {
        const savedReminder = await AsyncStorage.getItem("reminder_hours");
        const saveName = await AsyncStorage.getItem("profile_name");
        const saveLog = await AsyncStorage.getItem("coffee_log");
        if (saveName) setUserName(saveName);
        if (savedReminder) setReminderHours(Number(savedReminder));
        if (saveLog) {
          const parsedLog = JSON.parse(saveLog);
          setCoffeeLog(parsedLog);
          // senaste kaffe tiden om man har loggats

          if (parsedLog.length > 0) {
            setLastCoffeeTime(new Date(parsedLog[0].timestamp));
          } else {
            setLastCoffeeTime(null);
          }
        } else {
          setCoffeeLog([]);
          setLastCoffeeTime(null);
        }
      })();
    }, []),
  );

  //  Uppdaterar nästa påminnelse-tid varje gång senaste kaffe-tiden eller påminnelse-timmar ändras.
  useEffect(() => {
    if (lastCoffeeTime) {
      const nextTime = new Date(
        lastCoffeeTime.getTime() + reminderHours * 60 * 60 * 1000,
      );
      setNextReminderTime(nextTime);
      scheduleCoffeeNotification(nextTime);
    }
  }, [lastCoffeeTime, reminderHours]);

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      if (token) {
        console.log("Expo Push Token:", token);
      }
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("reminder_hours", reminderHours.toString());
  }, [reminderHours]);

  useEffect(() => {
    AsyncStorage.setItem("coffee_log", JSON.stringify(coffeeLog));
  }, [coffeeLog]);
  
  

  return {
    selectedCoffeeType,
    setSelectedCoffeeType,
    lastCoffeeTime,
    setLastCoffeeTime,
    nextReminderTime,
    coffeeLog,
    setCoffeeLog,
    reminderHours,
    setReminderHours,
    userName,
  };
}
