import useBlocks from "../hooks/useBlocks";

import { blockTypes } from "../components/blocks";

const Blocks = () => {
  const { blocks } = useBlocks();

  return (
    <div>
      BLocks
      {blocks.map((block) => {
        const Block = blockTypes[block.type].render;
        return (
          <div key={block.id}>
            <Block data={block.data} />
          </div>
        );
      })}
    </div>
  );
};

export default Blocks;
