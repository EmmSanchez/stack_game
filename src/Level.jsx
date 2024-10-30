import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { useGameStore } from "./store/useGame.js";
import { InstancedRigidBodies } from "@react-three/rapier";

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

function BlocksTower(props) {
  // const meshRef = useRef();
  // const towerBlocks = 20;
  // const color = useGameStore((state) => state.color);
  // const setBlocks = useGameStore((state) => state.setBlocks);
  const blocks = useGameStore((state) => state.blocks);

  // /**
  //  *  Create initial tower
  //  */
  // const instances = useMemo(() => {
  //   return Array.from({ length: towerBlocks }, (_, index) => {
  //     const reverseIndex = towerBlocks - 1 - index; // Invertir el índice

  //     return {
  //       key: "instance_N" + reverseIndex,
  //       position: [0, index * 1 - (towerBlocks - 1), 0],
  //       color: new THREE.Color(`hsl(${reverseIndex * 8 + color}, 60%, 50%)`),
  //     };
  //   });
  // }, [towerBlocks]);

  // useEffect(() => {
  //   setBlocks(instances);
  // }, []);

  // useEffect(() => {
  //   if (meshRef.current) {
  //     instances.forEach((instance, i) => {
  //       meshRef.current.setColorAt(i, instance.color);
  //     });
  //     meshRef.current.instanceColor.needsUpdate = true;
  //   }
  // }, [blocks]);

  console.log(blocks);

  return (
    <>
      {/* {blocks &&
        blocks.map((block, i) => {
          return (
            <mesh key={i} geometry={boxGeometry} {...props} color={block.color}>
              <meshStandardMaterial />
            </mesh>
          );
        })} */}

      {blocks.map((block, i) => (
        <mesh
          key={i}
          geometry={boxGeometry}
          castShadow
          {...props}
          position={block.position} // Esto debe ser un array [x, y, z]
        >
          <meshStandardMaterial color={block.color} />
        </mesh>
      ))}
    </>
  );
}

function MovingBlock(props) {
  const block = useRef();
  const blocks = useGameStore((state) => state.blocks);
  const setBlocks = useGameStore((state) => state.setBlocks);

  const score = useGameStore((state) => state.score);
  const speed = useGameStore((state) => state.speed);
  const color = useGameStore((state) => state.color);
  const mode = useGameStore((state) => state.mode);
  const continuePlaying = useGameStore((state) => state.continuePlaying);

  useFrame((state) => {
    if (mode === "playing") {
      const time = state.clock.elapsedTime;
      block.current.position.x = Math.sin(time * speed) * 6;
    } else if (mode === "validating") {
      // block.current.position.y -= 0.3;
      const coordinates = [
        block.current.position.x,
        block.current.position.y,
        block.current.position.z,
      ];

      const newBlock = {
        key: "instance_" + (score + 1),
        position: coordinates,
        color: new THREE.Color(`hsl(${(score - 1) * 8 + color}, 60%, 50%)`),
      };

      console.log(newBlock);

      setBlocks([...blocks, newBlock]);
      continuePlaying();
    }
  });

  return (
    <mesh ref={block} geometry={boxGeometry} {...props}>
      <meshStandardMaterial
        color={`hsl(${(score - 1) * 8 + color}, 60%, 50%)`}
      />
    </mesh>
  );
}

export default function Level() {
  const [actualScale, setActualScale] = useState([4, 0.5, 4]);

  const score = useGameStore((state) => state.score);
  const setScore = useGameStore((state) => state.setScore);
  const mode = useGameStore((state) => state.mode);

  return (
    <>
      <BlocksTower scale={actualScale} />
      {(mode === "playing" || mode === "validating") && (
        <MovingBlock position={[0, (score + 1) * 0.5, 0]} scale={actualScale} />
      )}
    </>
  );
}
