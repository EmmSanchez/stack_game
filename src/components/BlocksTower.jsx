import { useGameStore } from "../store/useGame.js";
import { RigidBody } from "@react-three/rapier";
import * as THREE from "three";

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

export function BlocksTower(props) {
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
        <RigidBody key={i} type="fixed">
          <mesh
            geometry={boxGeometry}
            castShadow
            receiveShadow
            position={block.position}
            scale={block.scale}
          >
            <meshStandardMaterial color={block.color} />
          </mesh>
        </RigidBody>
      ))}
    </>
  );
}
