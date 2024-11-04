import { useGameStore } from "./store/useGame";
import data from "./fakeData.json";
import { useState } from "react";

function Interface() {
  const mode = useGameStore((state) => state.mode);
  const start = useGameStore((state) => state.start);
  const score = useGameStore((state) => state.score);
  const validating = useGameStore((state) => state.validating);
  const restart = useGameStore((state) => state.restart);

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

  return (
    <>
      {mode === "ready" && (
        <div
          onClick={handleStart}
          className="fixed flex justify-center top-0 left-0 size-full hover:cursor-pointer"
        >
          <div className="absolute top-10 text-9xl text-white font-bold">
            Start
          </div>
        </div>
      )}
      {mode !== "ready" && (
        <div
          onClick={handleCheckResult}
          className="fixed flex justify-center top-0 left-0 size-full hover:cursor-pointer"
        >
          <div className="absolute top-[2%] text-[8vw] text-white font-bold">
            {score}
          </div>
        </div>
      )}
      {mode === "ended" && (
        <div className="fixed flex justify-center items-start top-0 left-0 size-full">
          {/* Ranking */}
          <div className="bg-[#040D12] absolute top-[5%] left-[5%] w-[25%] h-[90%] rounded-[1.5vw] overflow-hidden shadow-[-15px_20px_30px_-22px_rgba(0,0,0,1)]">
            <div className="absolute z-10 size-full shadow-zinc-500/20 bg-gradient-to-b from-transparent via-zinc-950/60 via-90% to-zinc-950 rounded-b-[1.5vw] pointer-events-none"></div>

            <div className="relative flex text-white w-full h-[15%]">
              <div className="w-full flex justify-center items-center bg-gradient-to-r from-[#5C8374] to-[#93B1A6] rounded-t-[1.5vw]">
                <h2 className="text-[2vw] font-bold">Leaderboard</h2>
              </div>
            </div>

            {/* Table */}
            <div className="relative w-full h-full">
              <div className="table table-auto text-white w-full">
                <div className="table-header-group">
                  <div className="table-row bg-[#040D12]">
                    <div className="table-cell py-[.4vw] px-[.8vw] text-zinc-500 text-[1vw] font-semibold border-solid border-b-[.1vw] border-white/20">
                      Rank
                    </div>
                    <div className="table-cell py-[.4vw] px-[.8vw] text-zinc-500 text-[1vw] font-semibold border-solid border-b-[.1vw] border-white/20">
                      Name
                    </div>
                    <div className="table-cell py-[.4vw] px-[.8vw] text-zinc-500 text-[1vw] font-semibold border-solid border-b-[.1vw] border-white/20">
                      Score
                    </div>
                  </div>
                </div>

                <div className="table-row-group rounded-b-[1.5vw]">
                  {users &&
                    users.map((user, index) => {
                      return (
                        <div key={index} className="table-row">
                          <div className="table-cell py-[.4vw] px-[.8vw] text-zinc-300 text-[1vw] font-medium border-solid border-b-[.1vw] border-white/20">
                            {user.rank}
                          </div>
                          <div className="table-cell py-[.4vw] px-[.8vw] text-zinc-300 text-[1vw] font-medium border-solid border-b-[.1vw] border-white/20">
                            {user.username}
                          </div>
                          <div className="table-cell py-[.4vw] px-[.8vw] text-[#00FFB0] text-[1vw] font-medium border-solid border-b-[.1vw] border-white/20">
                            {user.score}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>

            {/* Current User */}
            <div className="absolute flex z-20 bottom-[2%] justify-center w-full h-[10%]">
              <div className="w-[95%] flex justify-around items-center text-white text-[1vw] font-semibold rounded-[1vw] bg-[#040D12]/20 backdrop-blur-[1vw] border-solid border-[.1vw] border-[#5C8374]">
                <p>40</p>
                <p>cosmic_ray</p>
                <p className="text-[#00FFB0]">5200</p>
              </div>
            </div>
          </div>

          <div
            onClick={handleRestart}
            className="absolute top-[22%] text-[3vw] text-white font-semibold hover:cursor-pointer size-fit"
          >
            Restart
          </div>

          {/* <div className="absolute flex flex-col gap-[.4vw] top-[5%] right-[5%] w-[25%] h-[90%]">
            <div className="relative bg-[#040D12] w-full h-[20%] rounded-[1vw] overflow-hidden">
              <div className="absolute top-0 size-full rounded-t-xl shadow-inset">
                <div className="relative">
                  <h2 className="absolute top-[3vh] left-[3%] text-[2.6vw] max-w-[2vw] text-white font-bold leading-[2.8vw]">
                    HIGHEST SCORE
                  </h2>
                  <h2 className="absolute -top-[.2vw] right-[8%] text-[6vw] text-white font-bold">
                    {score}
                  </h2>
                </div>
              </div>
            </div>
            <div className="bg-[#040D12] flex items-center w-full h-[10%] px-[2vw] font-semibold rounded-[1vw] text-white text-[1.2vw]">
              <p>You’re in the Top 5% of players!</p>
            </div>
          </div> */}
        </div>
      )}
    </>
  );
}

export default Interface;
