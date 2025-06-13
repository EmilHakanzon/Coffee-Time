import CountrySelector from "@/src/components/setting/CountrySelector";
import ProfileInput from "@/src/components/setting/ProfileInput";
import ReminderSlider from "@/src/components/setting/ReminderSlider";
import { useCoffeeTypes } from "@/src/hooks/useCoffeeTypes";
import styles from "@/src/styles/settingPage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function SettingPage() {
  const [name, setName] = useState("");
  const [country, setCountry] = useState("SE");
  const [favorite, setFavorite] = useState("");
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const { hotCoffees, icedCoffees, loading } = useCoffeeTypes();
  const [reminderHours, setReminderHours] = useState(4);
  const [saved, setSaved] = useState(false);

  const allCoffees = [...hotCoffees, ...icedCoffees];

  // load profil in start
  useEffect(() => {
    (async () => {
      const savedName = await AsyncStorage.getItem("profile_name");
      const savedCountry = await AsyncStorage.getItem("profile_country");
      const savedFavorite = await AsyncStorage.getItem("profile_favorite");
      const saveReminder = await AsyncStorage.getItem("reminder_hours");
      if (savedName) setName(savedName);
      if (savedCountry) setCountry(savedCountry);
      if (savedFavorite) setFavorite(savedFavorite);
      if (saveReminder) setReminderHours(Number(saveReminder));
    })();
  }, []);

  // save profil
  const saveProfile = async () => {
    await AsyncStorage.setItem("profile_name", name);
    await AsyncStorage.setItem("profile_country", country);
    await AsyncStorage.setItem("profile_favorite", favorite);
    await AsyncStorage.setItem("reminder_hours", reminderHours.toString());
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile Settings</Text>
      <View style={styles.card}>
        <ProfileInput value={name} onChangeText={setName} />
        <Text style={styles.label}>Country</Text>
          <CountrySelector
            country={country}
            setCountry={setCountry}
            showPicker={showCountryPicker}
            setShowPicker={setShowCountryPicker}
          />
        <Text style={styles.label}>Favorite Coffee</Text>
        {loading ? (
          <Text style={{ color: "#8B4513" }}>Loading Coffees...</Text>
        ) : (
          <Picker
            selectedValue={favorite}
            onValueChange={setFavorite}
            style={styles.input}
          >
            <Picker.Item label="Select CoffeeTyp..." value="" />
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
        <TouchableOpacity style={styles.saveButton} onPress={saveProfile}>
          <Text style={styles.saveButtonText}>Save profile</Text>
        </TouchableOpacity>
        {saved && <Text style={styles.savedText}>Profile saved!</Text>}
      </View>
    </View>
  );
}
