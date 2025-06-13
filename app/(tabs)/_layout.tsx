import { Ionicons } from "@expo/vector-icons";
import { router, Tabs } from "expo-router";
import { TouchableOpacity } from "react-native";

export default function TabLayout() {
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
          height: 90,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          paddingBottom: 10,
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: -2 },
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Start",
          headerTitle: "",
          tabBarStyle: { display: "none" },
          headerTransparent: true, // <-- transparent header for index file.
          headerStyle: { backgroundColor: "transparent" },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="alarm-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="HomePage"
        options={{
          title: "Home",
          headerTitle: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={35} color="#222" />
            </TouchableOpacity>
          ),
        }}
      />

      <Tabs.Screen
        name="LogPage"
        options={{
          title: "Logs",
          headerTitle: "Logs",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="newspaper-outline" size={size} color={color} />
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.replace("/HomePage")}>
              <Ionicons name="arrow-back" size={35} color="#222" />
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="CoffeTypePage"
        options={{
          title: "Coffee Types",
          headerTitle: "Coffee Types",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cafe-outline" size={size} color={color} />
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.replace("/HomePage")}>
              <Ionicons name="arrow-back" size={35} color="#222" />
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="SettingPage"
        options={{
          title: "Setting",
          headerTitle: "Setting",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.replace("/HomePage")}>
              <Ionicons name="arrow-back" size={35} color="#222" />
            </TouchableOpacity>
          ),
        }}
      />
    </Tabs>
  );
}
