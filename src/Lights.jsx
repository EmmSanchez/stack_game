import { useHelper } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function Lights() {
  const directionalLight = useRef();
  // useHelper(directionalLight, THREE.DirectionalLightHelper, 1);
  return (
    <>
      <directionalLight
        ref={directionalLight}
        castShadow
        position={[8, 4, 1]}
        intensity={4.5}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={10}
        shadow-camera-top={10}
        shadow-camera-right={10}
        shadow-camera-bottom={-10}
        shadow-camera-left={-10}
      />
      <ambientLight />
    </>
  );
}

export default Lights;
