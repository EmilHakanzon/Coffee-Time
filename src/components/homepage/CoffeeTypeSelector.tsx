import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useCoffeeTypes } from "../../hooks/useCoffeeTypes";
import styles from "../../styles/CoffeeTypeSelector";
import { CoffeeType } from "../../types/coffee";
interface CoffeeTypeSelectorProps {
  selectedType: CoffeeType | null;
  onSelect: (type: CoffeeType) => void;
}

export default function CoffeeTypeSelector({
  selectedType,
  onSelect,
}: CoffeeTypeSelectorProps) {
  const { hotCoffees, icedCoffees, loading } = useCoffeeTypes();
  const [category, setCategory] = useState<"hot" | "ice">("hot");
  const [imgErrors, setImgErrors] = useState<{ [id: number]: boolean }>({});
  const [customCoffees, setCustomCoffees] = useState<CoffeeType[]>([]);

  React.useEffect(() => {
    // Ladda egna kaffe-typer från AsyncStorage
    (async () => {
      const data = await import(
        "@react-native-async-storage/async-storage"
      ).then((m) => m.default.getItem("custom_coffees"));
      if (data) setCustomCoffees(JSON.parse(data));
    })();
  }, []);

  // Kombinera hårdkodade och egna kaffe-typer
  const coffeeTypes = [
    ...(category === "hot" ? hotCoffees : icedCoffees),
    ...customCoffees.filter((c) => (category === "hot" ? !c.iced : c.iced)),
  ];

  return (
    <View>
      <View style={{ borderRadius: 8, overflow: "hidden", marginBottom: 12 }}>
        <Picker
          selectedValue={category}
          onValueChange={(value) => setCategory(value)}
          style={{
            backgroundColor: "#B08968",
            color: "#fff",
          }}
        >
          <Picker.Item label="Hot Coffee" value="hot" />
          <Picker.Item label="Iced Coffee" value="ice" />
        </Picker>
      </View>
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#8B4513"
          style={{ marginTop: 24 }}
        />
      ) : (
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
      )}
    </View>
  );
}
