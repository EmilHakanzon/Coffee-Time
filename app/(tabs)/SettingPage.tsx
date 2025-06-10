import { useCoffeeTypes } from "@/src/hooks/useCoffeeTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Slider from "@react-native-community/slider";
import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import CountryPicker, {
  type CountryCode,
} from "react-native-country-picker-modal";

export default function SettingPage() {
  const [name, setName] = useState("");
  const [country, setCountry] = useState("SE");
  const [favorite, setFavorite] = useState("");
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const { hotCoffees, icedCoffees, loading } = useCoffeeTypes();
  const [reminderHours, setReminderHours] = useState(4); 

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
    Alert.alert("Profile saved!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Name..."
      />

      <Text style={styles.label}>Country</Text>
      <View style={{ marginBottom: 16 }}>
        <CountryPicker
          countryCode={country as CountryCode}
          withFlag
          withCountryNameButton
          withFilter
          onSelect={(c) => setCountry(c.cca2)}
          visible={showCountryPicker}
          onClose={() => setShowCountryPicker(false)}
        />
      </View>

      <Text style={styles.label}>Favorite Coffee</Text>
      {loading ? (
        <Text>Loading Coffees...</Text>
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
      <Text style={styles.label}>Coffee Reminder (hours): {reminderHours}</Text>
      <Slider
        style={{ width: "100%", height: 40 }}
        minimumValue={1}
        maximumValue={12}
        step={1}
        value={reminderHours}
        onValueChange={setReminderHours}
        minimumTrackTintColor="#8B4513"
        maximumTrackTintColor="#ccc"
        thumbTintColor="#8B4513"
      />

      <Button title="Save profile" onPress={saveProfile} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: "#fff" },
  label: { fontWeight: "bold", marginTop: 16, marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#f9f9f9",
  },
});
