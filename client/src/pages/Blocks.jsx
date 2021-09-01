import useBlocks from "../hooks/useBlocks";
import { useParams } from "react-router-dom";

import { blockTypes } from "../components/blocks";
import AddBlock from "../components/blocks/AddBlock";
import { Button } from "react-bootstrap";

const Blocks = () => {
  const { pageId } = useParams();

  const { blocks, addBlock, updateBlock, deleteBlock } = useBlocks(pageId);

  return (
    <div>
      <h2>Page</h2>
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
            <Button size="sm" variant="danger" onClick={() => deleteBlock(block.id)}>
              Delete
            </Button>
          </div>
        );
      })}
      <AddBlock onSave={addBlock} />
    </div>
  );
};

export default Blocks;
