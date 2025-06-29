import type { CoffeeLog } from "@/src/types/coffee";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type ProfileState = {
  name: string;
  setName: (name: string) => void;
  country: string;
  setCountry: (country: string) => void;
  favorite: string;
  setFavorite: (favorite: string) => void;
  reminderHours: number;
  setReminderHours: (hours: number) => void;
  notificationsEnabled: boolean;
  setNotificationsEnabled: (enabled: boolean) => void;
  coffeeLog: CoffeeLog[];
  setCoffeeLog: (log: CoffeeLog[]) => void;
  // Water tracking
  waterLog: number[]; // timestamps (ms)
  setWaterLog: (log: number[]) => void;
  glassSize: number; // ml
  setGlassSize: (size: number) => void;
};

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      name: "",
      setName: (name) => set({ name }),
      country: "SE",
      setCountry: (country) => set({ country }),
      favorite: "",
      setFavorite: (favorite) => set({ favorite }),
      reminderHours: 4,
      setReminderHours: (reminderHours) => set({ reminderHours }),
      notificationsEnabled: false,
      setNotificationsEnabled: (notificationsEnabled) =>
        set({ notificationsEnabled }),
      coffeeLog: [],
      setCoffeeLog: (coffeeLog) => set({ coffeeLog }),
      waterLog: [],
      setWaterLog: (waterLog) => set({ waterLog }),
      glassSize: 250,
      setGlassSize: (glassSize) => set({ glassSize }),
    }),
    {
      name: "profile-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
