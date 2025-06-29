import CountrySelector from "@/src/components/setting/CountrySelector";
import HomeButton from "@/src/components/setting/HomeButton";
import ProfileInput from "@/src/components/setting/ProfileInput";
import PushNotificationToggle from "@/src/components/setting/PushNotificationToggle";
import ReminderSlider from "@/src/components/setting/ReminderSlider";
import { useCoffeeTypes } from "@/src/hooks/useCoffeeTypes";
import { useProfileStore } from "@/src/store/profilestore";
import styles from "@/src/styles/settingPage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Slider from "@react-native-community/slider";
import { Picker } from "@react-native-picker/picker";
import * as Notifications from "expo-notifications";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingPage() {
  const {
    name,
    setName,
    country,
    setCountry,
    favorite,
    setFavorite,
    reminderHours,
    setReminderHours,
    notificationsEnabled,
    setNotificationsEnabled,
    glassSize,
    setGlassSize,
  } = useProfileStore();

  const { hotCoffees, icedCoffees, loading } = useCoffeeTypes();
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [saved, setSaved] = useState(false);

  const allCoffees = [...hotCoffees, ...icedCoffees];
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const savedName = await AsyncStorage.getItem("profile_name");
      const savedCountry = await AsyncStorage.getItem("profile_country");
      const savedFavorite = await AsyncStorage.getItem("profile_favorite");
      const saveReminder = await AsyncStorage.getItem("reminder_hours");
      const savedNotis = await AsyncStorage.getItem("notifications_enabled");

      if (savedName) setName(savedName);
      if (savedCountry) setCountry(savedCountry);
      if (savedFavorite) setFavorite(savedFavorite);
      if (saveReminder) setReminderHours(Number(saveReminder));
      if (savedNotis) setNotificationsEnabled(savedNotis === "true");
    })();
  }, []);

  const saveProfile = async () => {
    await AsyncStorage.setItem("profile_name", name);
    await AsyncStorage.setItem("profile_country", country);
    await AsyncStorage.setItem("profile_favorite", favorite);
    await AsyncStorage.setItem("reminder_hours", reminderHours.toString());
    await AsyncStorage.setItem(
      "notifications_enabled",
      notificationsEnabled.toString(),
    );
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const toggleNotifications = async (value: boolean) => {
    setNotificationsEnabled(value);
    await AsyncStorage.setItem("notifications_enabled", value.toString());

    if (value) {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== "granted") {
        const { status: newStatus } =
          await Notifications.requestPermissionsAsync();
        if (newStatus !== "granted") {
          Alert.alert(
            "Permission required",
            "Please enable notifications in settings.",
          );
          setNotificationsEnabled(false);
        }
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F5F5DC" }}>
      {/* Header */}
      <View
        style={{
          paddingTop: 30,
          paddingBottom: 20,
          backgroundColor: "#F5F5DC",
          alignItems: "center",
          borderBottomWidth: 1,
          borderBottomColor: "#E0E0E0",
          marginBottom: 10,
        }}
      >
        <Text
          style={{
            fontSize: 26,
            fontWeight: "bold",
            color: "#8B4513",
            letterSpacing: 1,
          }}
        >
          Settings
        </Text>
        <Text style={{ color: "#8B4513", fontSize: 14, marginTop: 4 }}>
          Manage your profile and notifications
        </Text>
      </View>

      {/* Floating Card */}
      <View
        style={{
          backgroundColor: "#fff",
          marginHorizontal: 20,
          borderRadius: 18,
          padding: 22,
          shadowColor: "#000",
          shadowOpacity: 0.08,
          shadowRadius: 10,
          elevation: 4,
          marginTop: 10,
          marginBottom: 20,
        }}
      >
        <ProfileInput value={name} onChangeText={setName} />

        <Text style={styles.label}>Country</Text>
        <CountrySelector
          country={country}
          setCountry={setCountry}
          showPicker={showCountryPicker}
          setShowPicker={setShowCountryPicker}
        />

        <Text style={styles.label}>Favorite coffee</Text>
        {loading ? (
          <Text style={{ color: "#8B4513" }}>Loading coffee...</Text>
        ) : (
          <Picker
            selectedValue={favorite}
            onValueChange={setFavorite}
            style={styles.input}
          >
            <Picker.Item label="Select coffee type..." value="" />
            {allCoffees.map((coffee) => (
              <Picker.Item
                key={coffee.id}
                label={coffee.title}
                value={coffee.title}
              />
            ))}
          </Picker>
        )}

        <ReminderSlider
          reminderHours={reminderHours}
          setReminderHours={setReminderHours}
        />

        {/* Glass Size Slider */}
        <Text style={styles.label}>Water Glass Size: {glassSize} ml</Text>
        <Slider
          style={{ width: "100%", height: 40 }}
          minimumValue={100}
          maximumValue={500}
          step={10}
          value={glassSize}
          onValueChange={setGlassSize}
          minimumTrackTintColor="#0077cc"
          maximumTrackTintColor="#ccc"
          thumbTintColor="#0077cc"
        />

        {/* Push Notifications Toggle */}
        <PushNotificationToggle
          notificationsEnabled={notificationsEnabled}
          setNotificationsEnabled={setNotificationsEnabled}
        />

        <TouchableOpacity
          style={[styles.saveButton, { marginTop: 10 }]}
          onPress={saveProfile}
        >
          <Text style={styles.saveButtonText}>Save profile</Text>
        </TouchableOpacity>
        {saved && <Text style={styles.savedText}>Profile saved!</Text>}
      </View>

      {/* Home Button */}
      <HomeButton />
    </SafeAreaView>
  );
}
