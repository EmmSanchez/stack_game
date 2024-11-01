function createResuideBlock(currentBlock, newBlock, axis, score, color) {
  // LastBlock properties are array, currentBlock is an object
  if (!newBlock) return null;

  return {
    position: [...currentBlock.position],
  };
}

export default createResuideBlock;
