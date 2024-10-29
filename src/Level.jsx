import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { useGameStore } from "./store/useGame.js";
import { InstancedRigidBodies } from "@react-three/rapier";

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

function StartBlock(props) {
  const initialBlocks = 20;
  const meshRef = useRef();
  const randomInitialColor = Math.random() * 100;

  const instances = useMemo(() => {
    return Array.from({ length: initialBlocks }, (_, index) => ({
      key: "instance_" + index,
      position: [0, -index * 1, 0],
      color: new THREE.Color(
        `hsl(${(index * 2 + randomInitialColor) % 360}, 20%, 50%)`
      ),
    }));
  }, [initialBlocks]);

  useEffect(() => {
    if (meshRef.current) {
      instances.forEach((instance, i) => {
        meshRef.current.setColorAt(i, instance.color);
      });
      meshRef.current.instanceColor.needsUpdate = true;
    }
  }, [instances]);

  return (
    <InstancedRigidBodies type="fixed" instances={instances} colliders={false}>
      <instancedMesh
        ref={meshRef}
        geometry={boxGeometry}
        args={[null, null, initialBlocks]}
        {...props}
      >
        <meshStandardMaterial />
      </instancedMesh>
    </InstancedRigidBodies>
  );
}

function NextBlock(props) {
  const block = useRef();
  const isClicked = useGameStore((state) => state.isClicked);

  useFrame((state) => {
    if (isClicked) return;
    const time = state.clock.elapsedTime;
    block.current.position.x = Math.sin(time) * 8;
  });

  return (
    <mesh ref={block} geometry={boxGeometry} {...props}>
      <meshStandardMaterial color={"yellowgreen"} />
    </mesh>
  );
}

export default function Level() {
  const [actualScale, setActualScale] = useState([4, 0.5, 4]);

  const score = useGameStore((state) => state.score);
  const setScore = useGameStore((state) => state.setScore);

  return (
    <>
      <StartBlock scale={actualScale} />
      <NextBlock position={[0, 1 * 0.5, 0]} scale={actualScale} />
    </>
  );
}
