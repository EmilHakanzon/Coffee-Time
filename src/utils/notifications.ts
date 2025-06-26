import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

//  Android-konfiguration
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

//  Be om tillstånd & returnera token
export async function registerForPushNotificationsAsync(): Promise<
  string | null
> {
  if (!Device.isDevice) {
    console.log("Must use physical device for Push Notifications");
    return null;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    console.log("Permission not granted!");
    return null;
  }

  const token = (await Notifications.getExpoPushTokenAsync()).data;
  return token;
}

// Schemalägg notis vid nästa kaffetid
export async function logCoffeeAndScheduleNotification(nextRimderTime: Date) {
  await scheduleCoffeeNotification(nextRimderTime);
}

export async function scheduleCoffeeNotification(date: Date) {
  await Notifications.cancelAllScheduledNotificationsAsync();
  if (date.getTime() > Date.now()) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "☕ Coffee Time!",
        body: "Time for another cup of coffee!",
      },
      trigger: { type: "date", date: date },
    });
  } else {
    console.log("Försökte schemalägga notis i dåtid:", date.toLocaleString());
  }
}

//  Testa en pushnotis som visas om 10 sekunder
export async function testPushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "🔔 Test Push",
      body: "Detta är en testnotis.",
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 10,
    },
  });
}
