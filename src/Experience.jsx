import { Physics } from "@react-three/rapier";
import Level from "./Level.jsx";
import { OrbitControls } from "@react-three/drei";
import Lights from "./Lights.jsx";
import { Perf } from "r3f-perf";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { useGameStore } from "./store/useGame.js";

export default function Experience() {
  const { gl } = useThree();
  const isClicked = useGameStore((state) => state.isClicked);
  const setIsClicked = useGameStore((state) => state.setIsClicked);

  useEffect(() => {
    const handleClick = (event) => {
      console.log("Canvas clicked!", event);
      setIsClicked(true);
    };

    gl.domElement.addEventListener("click", handleClick);

    return () => {
      gl.domElement.removeEventListener("click", handleClick);
    };
  }, [gl]);

  return (
    <>
      <Perf position="top-left" />
      <color args={["#333"]} attach="background"></color>
      <OrbitControls />

      <Physics debug>
        <Lights />
        <Level />
      </Physics>
    </>
  );
}
