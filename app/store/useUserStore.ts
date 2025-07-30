// store/userStore.ts

import { RoleType } from "@/lib/supabaseFunction";
import { create } from "zustand";

export type User = {
  id: string;
  email: string;
  name: string;
  role: RoleType;
  img: string;
};

type UserStore = {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
