import { create } from "zustand";

export const useGameStore = create((set) => {
  return {
    score: 0,
    setScore: (value) => {
      set({ score: value });
    },
    isClicked: false,
    setIsClicked: (value) => {
      set({ isClicked: value });
    },
  };
});
