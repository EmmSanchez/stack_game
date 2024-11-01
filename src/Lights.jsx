import { useHelper } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function Lights() {
  const directionalLight = useRef();
  // useHelper(directionalLight, THREE.DirectionalLightHelper, 1);

  useFrame((state) => {
    directionalLight.current.position.y = state.camera.position.y - 6;
    directionalLight.current.target.y = state.camera.position.y - 6;
  });

  return (
    <>
      <directionalLight
        ref={directionalLight}
        castShadow
        position={[8, 4, -8]}
        intensity={4.5}
        shadow-mapSize={[1024 * 2, 1024 * 2]}
        shadow-camera-near={1}
        shadow-camera-far={20}
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
