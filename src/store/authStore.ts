import { User } from "@/types/type";
import { create } from "zustand";

interface AuthState {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,

  setUser: (user) => set({ user, loading: false }), 
}));
