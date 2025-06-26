import * as Notifications from "expo-notifications";
import React, { useEffect, useState } from "react";
import {
  Linking,
  Platform,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";

const PushNotificationToggle: React.FC = () => {
  const [enabled, setEnabled] = useState<boolean>(false);

  useEffect(() => {
    checkPermission();
  }, []);

  const checkPermission = async () => {
    const settings = await Notifications.getPermissionsAsync();
    setEnabled(settings.granted);
  };

  const handleToggle = async (value: boolean) => {
    if (value) {
      // Try to request permission
      const { status } = await Notifications.requestPermissionsAsync();
      if (status === "granted") {
        setEnabled(true);
      } else {
        setEnabled(false);
        openSettings();
      }
    } else {
      // Can't turn off from app, inform user
      setEnabled(false);
      openSettings();
    }
  };

  const openSettings = () => {
    if (Platform.OS === "ios") {
      Linking.openURL("app-settings:");
    } else {
      Linking.openSettings();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        Notifications are {enabled ? "enabled" : "disabled"}
      </Text>
      <Switch value={enabled} onValueChange={handleToggle} />
      <Text style={styles.info}>
        To change notification settings, you may need to allow or disable them
        in your device settings.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: "center", margin: 8 },
  label: { fontSize: 16, marginBottom: 6 },
  info: {
    fontSize: 12,
    color: "#888",
    marginTop: 1,
    textAlign: "center",
  },
});

export default PushNotificationToggle;
