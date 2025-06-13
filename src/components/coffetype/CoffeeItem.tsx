import type { CoffeeType } from "@/src/types/coffee";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity } from "react-native";
import styles from "../../styles/CoffeeTypePage";

// en komponent som visar en rad/ett kort för varje kaffetyp
export default function CoffeeItem({
  coffee,
  onPress,
}: {
  coffee: CoffeeType;
  onPress: () => void;
}) {
  const [hasError, setHasError] = useState(false);

  return (
    <TouchableOpacity style={styles.coffeeItem} onPress={onPress}>
      {coffee.image && !hasError ? (
        <Image
          source={{ uri: coffee.image }}
          style={styles.coffeeImage}
          onError={() => setHasError(true)}
        />
      ) : (
        <Text style={styles.coffeeEmoji}>☕</Text>
      )}
      <Text style={styles.coffeeTitle}>{coffee.title}</Text>
    </TouchableOpacity>
  );
}
