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
  const [showEditModal, setShowEditModal] = useState(false);
  const [editCoffeeIndex, setEditCoffeeIndex] = useState<number | null>(null);
  const [newCoffee, setNewCoffee] = useState<
    Partial<CoffeeType & { iced?: boolean }>
  >({
    title: "",
    description: "",
    image: "",
    ingredients: [],
    iced: false,
  });
  const [editCoffee, setEditCoffee] = useState<
    Partial<CoffeeType & { iced?: boolean }>
  >({});

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
  const filteredCustomCoffees = customCoffees.filter((c) =>
    category === "hot" ? !c.iced : c.iced,
  );
  const coffeeTypes = [
    ...getFilteredCoffeeTypes(hotCoffees, icedCoffees, category),
    ...filteredCustomCoffees,
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

  // Hantera borttagning av egen kaffe-typ
  const handleDeleteCoffee = (id: number) => {
    Alert.alert(
      "Ta bort kaffe-typ",
      "Är du säker på att du vill ta bort denna kaffe-typ?",
      [
        { text: "Avbryt", style: "cancel" },
        {
          text: "Ta bort",
          style: "destructive",
          onPress: () => {
            setCustomCoffees(customCoffees.filter((c) => c.id !== id));
          },
        },
      ],
    );
  };

  // Hantera redigering av egen kaffe-typ
  const handleEditCoffee = () => {
    if (
      editCoffeeIndex === null ||
      !editCoffee.title ||
      !editCoffee.description
    ) {
      Alert.alert("Please enter a name and description for your coffee type.");
      return;
    }
    setCustomCoffees((prev) => {
      const updated = [...prev];
      updated[editCoffeeIndex] = {
        ...updated[editCoffeeIndex],
        title: editCoffee.title!,
        description: editCoffee.description!,
        image: editCoffee.image || "",
        ingredients: Array.isArray(editCoffee.ingredients)
          ? editCoffee.ingredients
          : (editCoffee.ingredients || "")
              .toString()
              .split(",")
              .map((s) => s.trim()),
      };
      return updated;
    });
    setShowEditModal(false);
    setEditCoffeeIndex(null);
    setEditCoffee({});
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
          {/* Visa hårdkodade kaffe-typer */}
          {getFilteredCoffeeTypes(hotCoffees, icedCoffees, category).map(
            (coffee) => (
              <CoffeeItem
                key={coffee.id}
                coffee={coffee}
                onPress={() => {
                  setSelectedCoffee(coffee);
                  setModalImgError(false);
                }}
              />
            ),
          )}
          {/* Visa egna kaffe-typer med redigera/ta bort */}
          {filteredCustomCoffees.map((coffee) => (
            <View key={coffee.id} style={{ marginBottom: 10 }}>
              <CoffeeItem
                coffee={coffee}
                onPress={() => {
                  setSelectedCoffee(coffee);
                  setModalImgError(false);
                }}
              />
            </View>
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
        extraButtons={
          selectedCoffee &&
          customCoffees.some((c) => c.id === selectedCoffee.id) ? (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                gap: 12,
                marginTop: 16,
              }}
            >
              <Button
                title="Edit"
                color="#6B705C"
                onPress={() => {
                  setEditCoffeeIndex(
                    customCoffees.findIndex((c) => c.id === selectedCoffee.id),
                  );
                  setEditCoffee({ ...selectedCoffee });
                  setShowEditModal(true);
                  setSelectedCoffee(null);
                }}
              />
              <Button
                title="Delete"
                color="#B08968"
                onPress={() => {
                  handleDeleteCoffee(selectedCoffee.id);
                  setSelectedCoffee(null);
                }}
              />
            </View>
          ) : null
        }
      />
      <AddCoffeeModal
        visible={showAddModal}
        newCoffee={newCoffee}
        setNewCoffee={setNewCoffee}
        onCancel={() => setShowAddModal(false)}
        onAdd={handleAddCoffee}
      />
      {/* Enkel modal för redigering */}
      <AddCoffeeModal
        visible={showEditModal}
        newCoffee={editCoffee}
        setNewCoffee={setEditCoffee}
        onCancel={() => {
          setShowEditModal(false);
          setEditCoffeeIndex(null);
        }}
        onAdd={handleEditCoffee}
      />
    </View>
  );
}
