import React from "react";
import { Text, TouchableOpacity } from "react-native";
import CountryPicker, { CountryCode } from "react-native-country-picker-modal";
import styles from "@/src/styles/settingPage";

export default function CountrySelector({
  country,
  setCountry,
  showPicker,
  setShowPicker,
}: {
  country: string;
  setCountry: (c: string) => void;
  showPicker: boolean;
  setShowPicker: (b: boolean) => void;
}) {
  return (
    <>
      <TouchableOpacity
        style={styles.countryPickerButton}
        onPress={() => setShowPicker(true)}
      >
        <CountryPicker
          countryCode={country as CountryCode}
          withFlag
          withCountryNameButton
          withFilter
          onSelect={(c) => setCountry(c.cca2)}
          visible={showPicker}
          onClose={() => setShowPicker(false)}
        />
      </TouchableOpacity>
    </>
  );
}
