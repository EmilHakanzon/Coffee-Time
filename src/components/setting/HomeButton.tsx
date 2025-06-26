import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";

const HomeButton = () => {
  const router = useRouter();
  return (
    <TouchableOpacity
      style={{
        alignSelf: "center",
        backgroundColor: "#8B4513",
        borderRadius: 50,
        paddingVertical: 12,
        paddingHorizontal: 32,
        flexDirection: "row",
        alignItems: "center",
        marginTop: "auto",
        marginBottom: 30,
        elevation: 2,
      }}
      onPress={() => router.push("/HomePage")}
    >
      <Ionicons name="home-outline" size={22} color="#fff" />
    </TouchableOpacity>
  );
};

export default HomeButton;
