import { create } from "zustand";

const INITAL_SPEED = 1;
const INITAL_SCORE = 0;
const RANDOM_COLOR = Math.random() * 100;
const MODES = {
  READY: "ready",
  PLAYING: "playing",
  VALIDATING: "validating",
  ENDED: "ended",
};

export const useGameStore = create((set) => {
  return {
    speed: INITAL_SPEED,
    score: INITAL_SCORE,
    color: RANDOM_COLOR,
    setColor: (value) => {
      set({ color: value });
    },
    blocks: [
      {
        position: [0, 0, 0],
        color: "#000",
      },
    ],
    setBlocks: (value) => {
      set({ blocks: value });
    },
    mode: MODES.READY,
    setScore: (value) => {
      set({ score: value });
    },
    isClicked: false,
    setIsClicked: (value) => {
      set({ isClicked: value });
    },
    start: () => {
      set((state) => {
        if (state.mode === MODES.READY) {
          return { mode: MODES.PLAYING, score: INITAL_SCORE };
        } else {
          return {};
        }
      });
    },
    validating: () => {
      set((state) => {
        if (state.mode === MODES.PLAYING) {
          return { mode: MODES.VALIDATING };
        } else {
          return {};
        }
      });
    },
    continuePlaying: () => {
      set((state) => {
        if (state.mode === MODES.VALIDATING) {
          return { mode: MODES.PLAYING, score: state.score + 1 };
        } else {
          return {};
        }
      });
    },
    restart: () => {
      set((state) => {
        if (state.mode === "playing" || state.mode === "ended") {
          return {};
        }
      });
    },
    end: () => {
      set((state) => {
        if (state.mode === MODES.PLAYING) {
          return { mode: MODES.ENDED };
        } else {
          return {};
        }
      });
    },
  };
});
