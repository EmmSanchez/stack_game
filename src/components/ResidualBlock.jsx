import { RigidBody } from "@react-three/rapier";
import * as THREE from "three";

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

export function ResidualBlock(props) {
  return (
    <RigidBody>
      <mesh castShadow geometry={boxGeometry} {...props}>
        <meshStandardMaterial color={props.color} />
      </mesh>
    </RigidBody>
  );
}
