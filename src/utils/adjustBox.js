import * as THREE from "three";

export default function adjustBox(currentBlock, lastBlock, axis, score, color) {
  const axisIndex = axis === "x" ? 0 : 2; // [x, y, z]

  // LastBlock properties are array, currentBlock is an object
  const difference =
    lastBlock.position[axisIndex] - currentBlock.position[axis];
  const halfCombinedWith =
    (lastBlock.scale[axisIndex] + currentBlock.scale[axis]) / 2;

  if (Math.abs(difference) > halfCombinedWith) {
    return null;
  }

  const newPosition = [...currentBlock.position];
  newPosition[axisIndex] += difference / 2;

  const newScale = [...currentBlock.scale];
  newScale[axisIndex] -= Math.abs(difference);

  console.log(newPosition);
  console.log(newScale);

  return {
    key: "instance_" + (score + 1),
    position: newPosition,
    scale: newScale,
    color: new THREE.Color(`hsl(${(score - 1) * 8 + color}, 60%, 50%)`),
  };
}
