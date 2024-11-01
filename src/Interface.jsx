import { useGameStore } from "./store/useGame";

function Interface() {
  const mode = useGameStore((state) => state.mode);
  const start = useGameStore((state) => state.start);
  const score = useGameStore((state) => state.score);
  const validating = useGameStore((state) => state.validating);
  const restart = useGameStore((state) => state.restart);

  const handleStart = () => {
    start();
  };

  const handleCheckResult = () => {
    validating();
  };

  const handleRestart = () => {
    restart();
  };

  return (
    <>
      {mode === "ready" && (
        <div
          onClick={handleStart}
          className="fixed flex justify-center top-0 left-0 size-full"
        >
          <div className="absolute top-10 text-9xl text-white font-bold">
            Start
          </div>
        </div>
      )}
      {mode !== "ready" && (
        <div
          onClick={handleCheckResult}
          className="fixed flex justify-center top-0 left-0 size-full"
        >
          <div className="absolute top-[2%] text-[8vw] text-white font-bold">
            {score}
          </div>
        </div>
      )}
      {mode === "ended" && (
        <div className="fixed flex justify-center items-start top-0 left-0 size-full">
          {/* Ranking */}
          <div className="bg-[#101854] absolute top-[5%] left-[5%] w-[25%] h-[90%] rounded-[1.5vw] overflow-hidden shadow-[-15px_20px_30px_-22px_rgba(0,0,0,1)]">
            <div className="absolute size-full shadow-zinc-500/20 bg-gradient-to-t from-zinc-900 via-zinc-900 via-30% to-transparent"></div>
          </div>
          <div
            onClick={handleRestart}
            className="absolute top-[22%] text-[3vw] text-white font-semibold hover:cursor-pointer size-fit"
          >
            Restart
          </div>

          <div className="absolute flex flex-col gap-[.4vw] top-[5%] right-[5%] w-[25%] h-[90%]">
            <div className="relative bg-red-500 w-full h-[20%] rounded-[1vw] overflow-hidden">
              <div className="absolute top-0 size-full rounded-t-xl shadow-inset">
                <div className="relative">
                  <h2 className="absolute top-[3vh] left-[3%] text-[2.6vw] max-w-[2vw] text-red-50 font-bold leading-[2.8vw]">
                    HIGHEST SCORE
                  </h2>
                  <h2 className="absolute -top-[.2vw] right-[8%] text-[6vw] text-amber-100 font-bold">
                    {score}
                  </h2>
                </div>
              </div>
            </div>
            <div className="bg-[#192368] flex items-center w-full h-[10%] px-[2vw] font-semibold rounded-[1vw] text-white text-[1.2vw]">
              <p>You’re in the Top 5% of players!</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Interface;
