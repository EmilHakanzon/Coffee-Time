import { Ionicons } from "@expo/vector-icons";
import { Tabs, useRouter } from "expo-router";
import { Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#8B4513",
        tabBarInactiveTintColor: "#999",
        headerStyle: {
          backgroundColor: "#F5F5DC",
        },
        headerTintColor: "#8B4513",
        tabBarStyle: {
          backgroundColor: "#F5F5DC",
          borderTopColor: "#E0E0E0",
          height: 65 + insets.bottom,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          paddingBottom: 10 + insets.bottom,
          paddingTop: 10,
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: -2 },
        },
      }}
    >
      <Tabs.Screen
        name="HomePage"
        options={{
          title: "Home",
          headerTitle: "",
          headerRight: () => (
            <Pressable
              onPress={() => router.push("/SettingPage")}
              style={{ marginRight: 20 }}
            >
              <Ionicons name="settings-outline" size={24} color="#8B4513" />
            </Pressable>
          ),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="LogPage"
        options={{
          title: "Logs",
          headerTitle: "",
          headerRight: () => (
            <Pressable
              onPress={() => router.push("/SettingPage")}
              style={{ marginRight: 20 }}
            >
              <Ionicons name="settings-outline" size={24} color="#8B4513" />
            </Pressable>
          ),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="newspaper-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="CoffeTypePage"
        options={{
          title: "Coffee Types",
          headerTitle: "",
          headerRight: () => (
            <Pressable
              onPress={() => router.push("/SettingPage")}
              style={{ marginRight: 20 }}
            >
              <Ionicons name="settings-outline" size={24} color="#8B4513" />
            </Pressable>
          ),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cafe-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="WaterStatsPage"
        options={{
          title: "Water",
          headerTitle: "",
          headerRight: () => (
            <Pressable
              onPress={() => router.push("/SettingPage")}
              style={{ marginRight: 20 }}
            >
              <Ionicons name="settings-outline" size={24} color="#8B4513" />
            </Pressable>
          ),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="water-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
