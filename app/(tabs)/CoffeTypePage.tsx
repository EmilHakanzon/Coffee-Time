import AddCoffeeModal from "@/src/components/coffetype/AddCoffeeModal";
import CoffeeItem from "@/src/components/coffetype/CoffeeItem";
import CoffeeTypeModal from "@/src/components/coffetype/CoffeeTypeModal";
import { useCoffeeTypes } from "@/src/hooks/useCoffeeTypes";
import styles from "@/src/styles/CoffeeTypePage";
import type { CoffeeType } from "@/src/types/coffee";
import { getFilteredCoffeeTypes } from "@/src/utils/filterCoffeeTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
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

  // Egna kaffe-typer (laddas från AsyncStorage)
  const [customCoffees, setCustomCoffees] = useState<CoffeeType[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCoffee, setNewCoffee] = useState<
    Partial<CoffeeType & { iced?: boolean }>
  >({
    title: "",
    description: "",
    image: "",
    ingredients: [],
    iced: false,
  });

  React.useEffect(() => {
    // Ladda egna kaffe-typer från AsyncStorage
    AsyncStorage.getItem("custom_coffees").then((data) => {
      if (data) setCustomCoffees(JSON.parse(data));
    });
  }, []);

  React.useEffect(() => {
    // Spara egna kaffe-typer när de ändras
    AsyncStorage.setItem("custom_coffees", JSON.stringify(customCoffees));
  }, [customCoffees]);

  // Kombinera hårdkodade och egna kaffe-typer
  const coffeeTypes = [
    ...getFilteredCoffeeTypes(hotCoffees, icedCoffees, category),
    ...customCoffees.filter((c) => (category === "hot" ? !c.iced : c.iced)),
  ];

  // Hantera nytt kaffe
  const handleAddCoffee = () => {
    if (!newCoffee.title || !newCoffee.description) {
      Alert.alert("Please enter a name and description for your coffee type.");
      return;
    }
    setCustomCoffees([
      ...customCoffees,
      {
        id: Date.now(),
        title: newCoffee.title!,
        description: newCoffee.description!,
        image: newCoffee.image || "",
        ingredients: Array.isArray(newCoffee.ingredients)
          ? newCoffee.ingredients
          : (newCoffee.ingredients || "")
              .toString()
              .split(",")
              .map((s) => s.trim()),
        size: newCoffee.size || "",
        iced: category === "iced",
      } as CoffeeType & { iced?: boolean },
    ]);
    setShowAddModal(false);
    setNewCoffee({
      title: "",
      description: "",
      image: "",
      ingredients: [],
      iced: false,
    });
  };

  React.useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access gallery is required!");
      }
    })();
  }, []);

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
      <Button
        title="Add Coffee Type"
        onPress={() => setShowAddModal(true)}
        color="#B08968"
      />
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
      <AddCoffeeModal
        visible={showAddModal}
        newCoffee={newCoffee}
        setNewCoffee={setNewCoffee}
        onCancel={() => setShowAddModal(false)}
        onAdd={handleAddCoffee}
      />
    </View>
  );
}
