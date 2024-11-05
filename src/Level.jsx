import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { useGameStore } from "./store/useGame.js";
import { InstancedRigidBodies, RigidBody } from "@react-three/rapier";
import adjustBox from "./utils/adjustBox.js";
import createResidueBlock from "./utils/createResidueBlock.js";

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

function MovingBlock(props) {
  const block = useRef();

  const blocks = useGameStore((state) => state.blocks);
  const setBlocks = useGameStore((state) => state.setBlocks);
  const residual = useGameStore((state) => state.residual);
  const setResidual = useGameStore((state) => state.setResidual);

  const score = useGameStore((state) => state.score);
  const speed = useGameStore((state) => state.speed);
  const color = useGameStore((state) => state.color);
  const mode = useGameStore((state) => state.mode);
  const continuePlaying = useGameStore((state) => state.continuePlaying);
  const end = useGameStore((state) => state.end);

  /**
   * Movement
   */
  const { clock } = useThree();

  useFrame((state, delta) => {
    if (mode === "playing") {
      // To fix when is ended in 0 and restart
      block.current.position.y = (score + 1) * 0.5;

      const elapsedTime = state.clock.elapsedTime;

      if (score % 2 === 0) {
        block.current.position.x = Math.sin(elapsedTime * speed) * 6;
      } else {
        block.current.position.z = Math.sin(elapsedTime * speed) * 6;
      }
    }
  });

  useEffect(() => {
    if (mode === "validating") {
      const lastBlock = blocks[blocks.length - 1];
      const currentBlock = block.current;

      if (score % 2 === 0) {
        const { newBlock, meta } = adjustBox(
          currentBlock,
          lastBlock,
          "x",
          score,
          color
        );

        if (!newBlock) {
          const finalBlock = {
            position: currentBlock.position,
            scale: currentBlock.scale,
            color: currentBlock.material.color,
          };

          setResidual([...residual, finalBlock]);
          return end();
        }

        const newResidualBlock = createResidueBlock(
          currentBlock,
          newBlock,
          meta.difference,
          "x",
          score,
          color
        );
        setResidual([...residual, newResidualBlock]);

        setBlocks([...blocks, newBlock]);
      } else {
        const { newBlock, meta } = adjustBox(
          currentBlock,
          lastBlock,
          "z",
          score,
          color
        );

        if (!newBlock) {
          const finalBlock = {
            position: currentBlock.position,
            scale: currentBlock.scale,
            color: currentBlock.material.color,
          };

          setResidual([...residual, finalBlock]);
          return end();
        }

        const newResidualBlock = createResidueBlock(
          currentBlock,
          newBlock,
          meta.difference,
          "z",
          score,
          color
        );
        setResidual([...residual, newResidualBlock]);

        setBlocks([...blocks, newBlock]);
      }

      continuePlaying();
    }

    // Restart clock to 0 to change block position to default
    clock.elapsedTime = 4.8;
  }, [mode]);

  return (
    <>
      <mesh ref={block} geometry={boxGeometry} castShadow {...props}>
        <meshStandardMaterial
          color={`hsl(${(score - 1) * 14 + color}, 60%, 50%)`}
        />
      </mesh>
    </>
  );
}

function ResidualBlock(props) {
  return (
    <RigidBody>
      <mesh castShadow geometry={boxGeometry} {...props}>
        <meshStandardMaterial color={props.color} />
      </mesh>
    </RigidBody>
  );
}

export default function Level() {
  const blocks = useGameStore((state) => state.blocks);
  const score = useGameStore((state) => state.score);
  const mode = useGameStore((state) => state.mode);
  const residual = useGameStore((state) => state.residual);
  const setColor = useGameStore((state) => state.setColor);

  /**
   * Resize scale
   */
  const scale = blocks[blocks.length - 1].scale;
  const position = blocks[blocks.length - 1].position;

  /**
   * Camera
   */
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(7, 8, 7);
  }, [camera]);

  const smoothedCameraYRef = useRef(8);
  useFrame(() => {
    const targetCameraY = 8 + score * 0.5;

    // Manual lerp, start to end with 0.1 intervals
    smoothedCameraYRef.current = THREE.MathUtils.lerp(
      smoothedCameraYRef.current,
      targetCameraY,
      0.1
    );

    camera.position.y = smoothedCameraYRef.current;
  });

  /**
   * Change color of blocks
   */
  useEffect(() => {
    if (mode === "ended") {
      const newRandomColor = Math.random() * 100;
      setColor(newRandomColor);
    }
  }, [mode]);

  return (
    <>
      <BlocksTower />

      {(mode === "playing" || mode === "validating") && (
        <MovingBlock
          position={[position[0], (score + 1) * 0.5, position[2]]}
          scale={scale}
        />
      )}

      {residual &&
        residual.map((item, index) => {
          return <ResidualBlock key={index} {...item} />;
        })}
    </>
  );
}
