import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { CoffeeType } from "../types/coffee";

interface CoffeeTypeSelectorProps {
  selectedType: CoffeeType | null;
  onSelect: (type: CoffeeType) => void;
}

export default function CoffeeTypeSelector({
  selectedType,
  onSelect,
}: CoffeeTypeSelectorProps) {
  const [hotCoffees, setHotCoffees] = useState<CoffeeType[]>([]);
  const [icedCoffees, setIcedCoffees] = useState<CoffeeType[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<"hot" | "ice">("hot");
  const [imgErrors, setImgErrors] = useState<{ [id: number]: boolean }>({});

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch("https://api.sampleapis.com/coffee/hot").then((res) => res.json()),
      fetch("https://api.sampleapis.com/coffee/iced").then((res) => res.json()),
    ]).then(([hotData, icedData]) => {
      // Filter out unwanted IDs for hot
      const filteredHot = hotData.filter(
        (item: CoffeeType) =>
          ![17, 18, 19, 20, 28, 26, 25].includes(Number(item.id)),
      );
      // Filter out unwanted IDs for iced (if needed, or just use all)
      const filteredIced = icedData.filter(
        (item: CoffeeType) =>
          ![17, 18, 19, 20, 28, 26, 25].includes(Number(item.id)),
      );
      setHotCoffees(filteredHot);
      setIcedCoffees(filteredIced);
      setLoading(false);
    });
  }, []);

  const coffeeTypes = category === "hot" ? hotCoffees : icedCoffees;

  return (
    <View>
      <Picker
        selectedValue={category}
        onValueChange={(value) => setCategory(value)}
        style={{ marginBottom: 12 }}
      >
        <Picker.Item label="Hot Coffee" value="hot" />
        <Picker.Item label="Iced Coffee" value="ice" />
      </Picker>
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
              selectedType?.id === coffeeType.id && styles.selectedType,
            ]}
            onPress={() => onSelect(coffeeType)}
          >
            {imgErrors[Number(coffeeType.id)] || !coffeeType.image ? (
              <Text style={{ fontSize: 48, marginBottom: 8 }}>☕</Text>
            ) : (
              <Image
                source={{ uri: coffeeType.image }}
                style={styles.typeImage}
                resizeMode="cover"
                onError={() =>
                  setImgErrors((prev) => ({ ...prev, [coffeeType.id]: true }))
                }
              />
            )}
            <Text
              style={[
                styles.typeName,
                selectedType?.id === coffeeType.id && styles.selectedTypeName,
              ]}
              numberOfLines={2}
            >
              {coffeeType.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
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
  typeImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: "#eee",
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
