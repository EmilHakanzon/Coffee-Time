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
  Image,
  Modal,
  ScrollView,
  Text,
  TextInput,
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
      {/* Modal för att lägga till kaffe */}
      <Modal visible={showAddModal} animationType="slide" transparent>
        <View
          style={{
            flex: 1,
            backgroundColor: "#00000088",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              margin: 24,
              borderRadius: 12,
              padding: 20,
            }}
          >
            <Text
              style={{ fontWeight: "bold", fontSize: 18, marginBottom: 10 }}
            >
              Add Coffee Type
            </Text>
            <TextInput
              placeholder="Name"
              placeholderTextColor="#B08968"
              value={newCoffee.title}
              onChangeText={(text) =>
                setNewCoffee((c) => ({ ...c, title: text }))
              }
              style={{
                borderBottomWidth: 1,
                marginBottom: 10,
                padding: 8,
                borderColor: "#B08968",
                borderRadius: 6,
                backgroundColor: "#F8F8F8",
                color: "#8B4513",
              }}
            />
            <TextInput
              placeholder="Description"
              placeholderTextColor="#B08968"
              value={newCoffee.description}
              onChangeText={(text) =>
                setNewCoffee((c) => ({ ...c, description: text }))
              }
              style={{
                borderBottomWidth: 1,
                marginBottom: 10,
                padding: 8,
                borderColor: "#B08968",
                borderRadius: 6,
                backgroundColor: "#F8F8F8",
                color: "#8B4513",
              }}
            />
            <TextInput
              placeholder="Ingredients (comma separated)"
              placeholderTextColor="#B08968"
              value={
                Array.isArray(newCoffee.ingredients)
                  ? newCoffee.ingredients.join(", ")
                  : ""
              }
              onChangeText={(text) =>
                setNewCoffee((c) => ({
                  ...c,
                  ingredients: text.split(",").map((s) => s.trim()),
                }))
              }
              style={{
                borderBottomWidth: 1,
                marginBottom: 10,
                padding: 8,
                borderColor: "#B08968",
                borderRadius: 6,
                backgroundColor: "#F8F8F8",
                color: "#8B4513",
              }}
            />

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <Text style={{ marginRight: 8 }}>Iced?</Text>
              <TouchableOpacity
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: "#8B4513",
                  backgroundColor: newCoffee.iced ? "#8B4513" : "#fff",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => setNewCoffee((c) => ({ ...c, iced: !c.iced }))}
              >
                {newCoffee.iced && (
                  <View
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: 6,
                      backgroundColor: "#fff",
                    }}
                  />
                )}
              </TouchableOpacity>
            </View>
            {/* Bildväljare och förhandsvisning */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <Button
                title={
                  newCoffee.image ? "Change image" : "Pick image from gallery"
                }
                onPress={async () => {
                  try {
                    const { status } =
                      await ImagePicker.requestMediaLibraryPermissionsAsync();
                    if (status !== "granted") {
                      Alert.alert("Permission to access gallery is required!");
                      return;
                    }
                    const result = await ImagePicker.launchImageLibraryAsync({
                      mediaTypes: ImagePicker.MediaTypeOptions.Images,
                      allowsEditing: true,
                      aspect: [1, 1],
                      quality: 0.7,
                    });
                    if (
                      !result.canceled &&
                      result.assets &&
                      result.assets.length > 0
                    ) {
                      setNewCoffee((c) => ({
                        ...c,
                        image: result.assets[0].uri,
                      }));
                    }
                  } catch (e) {
                    Alert.alert("Could not open gallery");
                  }
                }}
                color="#B08968"
              />
              {newCoffee.image ? (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    source={{ uri: newCoffee.image }}
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: 12,
                      marginLeft: 12,
                      backgroundColor: "#eee",
                      borderWidth: 1,
                      borderColor: "#B08968",
                      resizeMode: "cover",
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => setNewCoffee((c) => ({ ...c, image: "" }))}
                    style={{ marginLeft: 8, padding: 4 }}
                  >
                    <Text
                      style={{
                        color: "#B08968",
                        fontWeight: "bold",
                        fontSize: 18,
                      }}
                    >
                      ✕
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : null}
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Button
                title="Cancel"
                color="#888"
                onPress={() => setShowAddModal(false)}
              />
              <Button title="Add" onPress={handleAddCoffee} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
