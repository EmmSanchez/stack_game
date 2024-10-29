import { createRoot } from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import "./index.css";
import Experience from "./Experience.jsx";
import Interface from "./Interface.jsx";

createRoot(document.getElementById("root")).render(
  <>
    <Canvas
      shadows
      camera={{ fov: 50, near: 0.1, far: 200, position: [7, 8, 7] }}
    >
      <Experience />
    </Canvas>
    <Interface />
  </>
);
