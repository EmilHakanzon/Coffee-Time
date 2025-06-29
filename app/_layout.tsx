import { showCoffeeReminderToast } from "@/src/utils/toast";
import * as Notifications from "expo-notifications";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import Toast from "react-native-toast-message";

export default function RootLayout() {
  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(() => {
      showCoffeeReminderToast();
    });
    return () => subscription.remove();
  }, []);

  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
      <Toast />
    </>
  );
}
