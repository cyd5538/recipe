import { create } from "zustand";

interface FilterState {
  category: string;
  time: string;
  difficulty: string;
  price: string;
  setCategory: (category: string) => void;
  setTime: (time: string) => void;
  setDifficulty: (difficulty: string) => void;
  setPrice: (price: string) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  category: "all", 
  time: "",
  difficulty: "",
  price: "",
  setCategory: (category) => set({ category }),
  setTime: (time) => set({ time }),
  setDifficulty: (difficulty) => set({ difficulty }),
  setPrice: (price) => set({ price }),
}));
