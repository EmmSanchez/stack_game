import { useGameStore } from "./store/useGame";

function Interface() {
  const mode = useGameStore((state) => state.mode);
  const start = useGameStore((state) => state.start);
  const score = useGameStore((state) => state.score);
  const validating = useGameStore((state) => state.validating);

  const handleStart = () => {
    start();
  };

  const handleCheckResult = () => {
    validating();
  };

  return (
    <>
      {mode === "ready" && (
        <div
          onClick={handleStart}
          className="fixed flex justify-center top-0 left-0 size-full"
        >
          <div className="absolute top-10 text-9xl text-white ">Iniciar</div>
        </div>
      )}
      {mode !== "ready" && (
        <div
          onClick={handleCheckResult}
          className="fixed flex justify-center top-0 left-0 size-full"
        >
          <div className="absolute top-10 text-9xl text-white ">{score}</div>
        </div>
      )}
    </>
  );
}

export default Interface;
