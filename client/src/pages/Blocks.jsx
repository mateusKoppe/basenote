import { useState } from "react";
import useBlocks from "../hooks/useBlocks";
import { useParams } from "react-router-dom";
import { blockTypes } from "../components/blocks";
import AddBlock from "../components/blocks/AddBlock";
import { Button, ButtonGroup, Form, InputGroup, FormControl } from "react-bootstrap";
import usePages from "../hooks/usePages";

const Blocks = () => {
  const { pageId } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const { blocks, addBlock, updateBlock, deleteBlock } = useBlocks(pageId);

  const [editingBlock, setEditingBlock] = useState();

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
