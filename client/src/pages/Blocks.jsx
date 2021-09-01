import useBlocks from "../hooks/useBlocks";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";

import { blockTypes } from "../components/blocks";
import AddBlock from "../components/blocks/AddBlock";

const Blocks = () => {
  const { pageId } = useParams();

  const { blocks, addBlock, updateBlock } = useBlocks(pageId);

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
      <AddBlock onSave={addBlock} />
    </div>
  );
};

export default Blocks;
