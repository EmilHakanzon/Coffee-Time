import type { CoffeeType } from "@/src/types/coffee";
import {
  getEnglishDescription,
  getEnglishIngredients,
} from "@/src/utils/translteTOEnglish";
import React from "react";
import { Image, Modal, Pressable, Text, View } from "react-native";
import styles from "../../styles/CoffeeTypePage";

// Komponent som visar en modal med detaljerad info om en kaffetyp
export default function CoffeeTypeModal({
  visible,
  coffee,
  imgError,
  setImgError,
  onClose,
}: {
  visible: boolean;
  coffee: CoffeeType | null;
  imgError: boolean;
  setImgError: (v: boolean) => void;
  onClose: () => void;
}) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {coffee?.image && !imgError ? (
            <Image
              source={{ uri: coffee.image }}
              style={styles.modalImage}
              onError={() => setImgError(true)}
            />
          ) : (
            <Text style={styles.modalEmoji}>☕</Text>
          )}
          <Text style={styles.modalTitle}>{coffee?.title}</Text>
          <Text style={styles.modalDescription}>
            {coffee?.title
              ? getEnglishDescription(coffee.title, coffee.description)
              : "No description available."}
          </Text>
          <Text style={styles.modalIngredients}>
            <Text style={{ fontWeight: "bold" }}>Ingredients: </Text>
            {coffee?.title
              ? getEnglishIngredients(
                  coffee.title,
                  Array.isArray(coffee.ingredients)
                    ? coffee.ingredients.join(", ")
                    : coffee.ingredients,
                )
              : "No ingredients found..."}
          </Text>
          <Pressable style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
