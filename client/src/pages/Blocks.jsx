import useBlocks from "../hooks/useBlocks";
import { useParams } from "react-router-dom";

import { blockTypes } from "../components/blocks";

const Blocks = () => {
  const { pageId } = useParams();

  const { blocks, updateBlock } = useBlocks(pageId);

  return (
    <div>
      BLocks
      {blocks.map((block) => {
        const Block = blockTypes[block.type].render;
        return (
          <div key={block.id}>
            <Block
              value={block.data}
              onChange={(data) => {
                updateBlock(block.id, data);
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Blocks;
