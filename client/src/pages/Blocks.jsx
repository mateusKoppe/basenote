import { useState } from "react";
import useBlocks from "../hooks/useBlocks";
import { useParams } from "react-router-dom";

import { blockTypes } from "../components/blocks";
import AddBlock from "../components/blocks/AddBlock";
import { Button, ButtonGroup } from "react-bootstrap";

const Blocks = () => {
  const { pageId } = useParams();

  const { blocks, addBlock, updateBlock, deleteBlock } = useBlocks(pageId);
  const [editingBlock, setEditingBlock] = useState();

  return (
    <div>
      <h2>Page</h2>
      {blocks.map((block) => {
        const Block = blockTypes[block.type].render;
        return (
          <div key={block.id}>
            <Block
              value={block.data}
              isEditing={block.id === editingBlock?.id}
              onEdit={() => setEditingBlock(block)}
              onChange={(data) => {
                updateBlock(block.id, data);
              }}
            />
            { block.id === editingBlock?.id && (
              <ButtonGroup className="mb-2" size="sm">
                <Button variant="outline-danger" onClick={() => deleteBlock(block.id)}>
                  Delete
                </Button>
                <Button variant="outline-secondary" onClick={() => setEditingBlock(null)}>
                  Close
                </Button>
              </ButtonGroup>
            ) }
          </div>
        );
      })}
      <AddBlock onSave={addBlock} />
    </div>
  );
};

export default Blocks;
