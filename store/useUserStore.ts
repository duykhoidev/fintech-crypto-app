import AsyncStorage from "@react-native-async-storage/async-storage";
import { Session, User } from "@supabase/supabase-js";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
  session: Session | null;
  setSession: (session: Session | null) => void;
  isLoggedIn: Boolean;
  setIsLoggedIn: (isLoggedIn: Boolean) => void;
}

export const useUserStore = create(
  // Keep userSession in the device despite of closing app
  persist<UserStore>(
    (set) => ({
      user: null,
      session: null,
      isLoggedIn: false,
      isOnboarded: false,
      setUser: (user: User | null) => set((state) => ({ user })),
      setSession: (session: Session | null) => set((state) => ({ session })),
      setIsLoggedIn: (isLoggedIn: Boolean) => set((state) => ({ isLoggedIn })),
    }),
    {
      name: "fintechcrypto-user-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
