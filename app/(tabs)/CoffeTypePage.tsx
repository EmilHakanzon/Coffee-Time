import CoffeeItem from "@/src/components/coffetype/CoffeeItem";
import CoffeeTypeModal from "@/src/components/coffetype/CoffeeTypeModal";
import { useCoffeeTypes } from "@/src/hooks/useCoffeeTypes";
import styles from "@/src/styles/CoffeeTypePage";
import type { CoffeeType } from "@/src/types/coffee";
import { getFilteredCoffeeTypes } from "@/src/utils/filterCoffeeTypes";
import React, { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function CoffeeTypePage() {
  const { hotCoffees, icedCoffees, loading } = useCoffeeTypes();
  const [category, setCategory] = useState<"hot" | "iced">("hot");
  const [selectedCoffee, setSelectedCoffee] = useState<CoffeeType | null>(null);
  const [modalImgError, setModalImgError] = useState(false);

  // Filtrerar kaffe-listan beroende på kategori och exkluderade id:n
  const coffeeTypes = getFilteredCoffeeTypes(hotCoffees, icedCoffees, category);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Coffee Types</Text>
      <Text style={styles.introText}>
        Discover different types of coffee! Filter between hot and iced coffee,
        and click on a type to learn more about its ingredients and history. ☕️
      </Text>
      <View style={styles.filterRow}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            category === "hot" && styles.filterButtonActive,
          ]}
          onPress={() => setCategory("hot")}
        >
          <Text
            style={[
              styles.filterButtonText,
              category === "hot" && styles.filterButtonTextActive,
            ]}
          >
            Hot
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            category === "iced" && styles.filterButtonActive,
          ]}
          onPress={() => setCategory("iced")}
        >
          <Text
            style={[
              styles.filterButtonText,
              category === "iced" && styles.filterButtonTextActive,
            ]}
          >
            Iced
          </Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#8B4513"
          style={{ marginTop: 40 }}
        />
      ) : (
        <ScrollView>
          {coffeeTypes.map((coffee) => (
            <CoffeeItem
              key={coffee.id}
              coffee={coffee}
              onPress={() => {
                setSelectedCoffee(coffee);
                setModalImgError(false);
              }}
            />
          ))}
        </ScrollView>
      )}
      {!loading && coffeeTypes.length === 0 && (
        <Text style={styles.errorText}>
          Could not load coffee types. Please try again later.
        </Text>
      )}
      <CoffeeTypeModal
        visible={!!selectedCoffee}
        coffee={selectedCoffee}
        imgError={modalImgError}
        setImgError={setModalImgError}
        onClose={() => setSelectedCoffee(null)}
      />
    </View>
  );
}
