import { useGameStore } from "./store/useGame";
import data from "./fakeData.json";
import { useState } from "react";
import {
  ChartIcon,
  HomeIcon,
  Restart,
  ShareIcon,
  TelegramIcon,
  UserIcon,
  WalletIcon,
  XIcon,
} from "./assets/icons/interfaceIcons";

function Interface() {
  const mode = useGameStore((state) => state.mode);
  const start = useGameStore((state) => state.start);
  const score = useGameStore((state) => state.score);
  const validating = useGameStore((state) => state.validating);
  const restart = useGameStore((state) => state.restart);
  const home = useGameStore((state) => state.home);
  const perfectCount = useGameStore((state) => state.perfectCount);

  const [users, setUsers] = useState(data);

  const handleStart = () => {
    start();
  };

  const handleCheckResult = () => {
    validating();
  };

  const handleRestart = () => {
    restart();
  };

  const handleGoToHome = () => {
    home();
  };

  return (
    <>
      {mode === "ready" && (
        <div
          onClick={handleStart}
          className="fixed flex justify-center text-center top-0 left-0 size-full hover:cursor-pointer"
        >
          <div className="absolute top-[5%] text-[8vw] text-white font-bold">
            <p>Stack Game</p>
            <p className="text-[2vw] font-medium">Touch to Start</p>
          </div>

          <div className="absolute bottom-[4%] flex flex-col justify-center items-center gap-[1.6vw] text-white">
            <div className="flex gap-[1vw]">
              <button
                onClick={(e) => e.stopPropagation()}
                className="flex gap-[.8vw] hover:bg-[#2A3540]/80 px-[1vw] py-[.6vw] rounded-[.6vw]"
              >
                <p>Leaderboard</p>
                <ChartIcon />
              </button>
            </div>
          </div>
        </div>
      )}

      {mode !== "ready" && mode !== "ended" && (
        <div
          onClick={handleCheckResult}
          className="fixed flex justify-center top-0 left-0 size-full text-center hover:cursor-pointer"
        >
          <div className="absolute top-[2%] text-[8vw] text-white font-bold">
            <p>{score}</p>
            {perfectCount > 0 && (
              <p className="text-[2vw] font-normal tracking-widest">
                x{perfectCount}
              </p>
            )}
          </div>
        </div>
      )}

      {mode === "ended" && (
        <div
          onClick={handleRestart}
          className="fixed flex justify-center top-0 left-0 size-full text-center hover:cursor-pointer"
        >
          <div className="absolute top-[2%] text-[8vw] text-white font-bold">
            <p>{score}</p>
            <p className="text-[2vw] font-medium">Click to restart</p>
          </div>

          <div className="absolute bottom-[4%] flex flex-col justify-center items-center gap-[1.6vw] text-white">
            <div className="flex gap-[1vw]">
              <button
                onClick={(e) => e.stopPropagation()}
                className="flex gap-[.8vw] hover:bg-[#2A3540]/80 px-[1vw] py-[.6vw] rounded-[.6vw]"
              >
                <p>Leaderboard</p>
                <ChartIcon />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Interface;
