import useBlocks from "../hooks/useBlocks";
import { useState } from "react";
import { useParams } from "react-router-dom";

import { blockTypes } from "../components/blocks";
import AddBlock from "../components/blocks/AddBlock";
import { Button, Form, InputGroup, FormControl } from "react-bootstrap";
import usePages from "../hooks/usePages";

const Blocks = () => {
  const { pageId } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const { blocks, addBlock, updateBlock, deleteBlock } = useBlocks(pageId);
  const { getPage, updatePage } = usePages();

  const page = getPage(pageId);
  const [pageTitle, setPageTitle] = useState();
  
  const handleChange = (event) => {
    setPageTitle(event.target.value);
  };

  const handleSave = () => {
    updatePage(page.id, {title: pageTitle})
    setIsEditing(false)
  }

  return (
    <div>
      {isEditing
      ? <Form>
          <InputGroup className="mb-3">
            <InputGroup.Text>Titulo</InputGroup.Text>
            <FormControl
              onChange={handleChange}
              aria-label="Title"
              />
          </InputGroup>
          <Button onClick={() => handleSave() }>Save</Button>
        </Form>
      : <h2 onDoubleClick={() => setIsEditing(true)}>{page?.title}</h2>}

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
