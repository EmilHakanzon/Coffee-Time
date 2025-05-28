import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { CoffeeType } from "../types/coffee";

interface CoffeeTypeSelectorProps {
  coffeeTypes: CoffeeType[];
  selectedType: CoffeeType;
  onSelect: (type: CoffeeType) => void;
}

export default function CoffeeTypeSelector({
  coffeeTypes,
  selectedType,
  onSelect,
}: CoffeeTypeSelectorProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {coffeeTypes.map((coffeeType) => (
        <TouchableOpacity
          key={coffeeType.id}
          style={[
            styles.typeButton,
            selectedType.id === coffeeType.id && styles.selectedType,
          ]}
          onPress={() => onSelect(coffeeType)}
        >
          <Text style={styles.typeEmoji}>{coffeeType.emoji}</Text>
          <Text
            style={[
              styles.typeName,
              selectedType.id === coffeeType.id && styles.selectedTypeName,
            ]}
          >
            {coffeeType.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  typeButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    alignItems: "center",
    minWidth: 80,
    borderWidth: 2,
    borderColor: "#E0E0E0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedType: {
    borderColor: "#8B4513",
    backgroundColor: "#FFF8DC",
  },
  typeEmoji: {
    fontSize: 24,
    marginBottom: 8,
  },
  typeName: {
    fontSize: 12,
    fontWeight: "500",
    color: "#666",
    textAlign: "center",
  },
  selectedTypeName: {
    color: "#8B4513",
    fontWeight: "600",
  },
});
