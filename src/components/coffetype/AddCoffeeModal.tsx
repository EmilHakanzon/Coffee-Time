import type { CoffeeType } from "@/src/types/coffee";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import {
  Alert,
  Button,
  Image,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface AddCoffeeModalProps {
  visible: boolean;
  newCoffee: Partial<CoffeeType & { iced?: boolean }>;
  setNewCoffee: React.Dispatch<
    React.SetStateAction<Partial<CoffeeType & { iced?: boolean }>>
  >;
  onCancel: () => void;
  onAdd: () => void;
}

const AddCoffeeModal: React.FC<AddCoffeeModalProps> = ({
  visible,
  newCoffee,
  setNewCoffee,
  onCancel,
  onAdd,
}) => {
  return (
    <Modal visible={visible} animationType="slide" transparent>
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
          <Text style={{ fontWeight: "bold", fontSize: 18, marginBottom: 10 }}>
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
            <Button title="Cancel" color="#888" onPress={onCancel} />
            <Button title="Add" onPress={onAdd} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddCoffeeModal;
