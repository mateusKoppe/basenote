import { useState } from "react";
import useBlocks from "../hooks/useBlocks";
import { useParams } from "react-router-dom";
import { blockTypes } from "../components/blocks";
import AddBlock from "../components/blocks/AddBlock";
import {
  Button,
  ButtonGroup,
  Form,
  InputGroup,
  FormControl,
  Row,
  Col,
  Container,
} from "react-bootstrap";
import usePages from "../hooks/usePages";
import Pages from "./Pages";
import * as Icon from 'react-bootstrap-icons';

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
    <Row>
      <Col xs={5} sm={4} md={3} lg={2}>
        <Pages />
      </Col>
      <Col xs={7} sm={8} md={9} lg={10}>
        <Container>
          {isEditing
          ? <Form>
              <InputGroup className="mb-3">
                <InputGroup.Text>Title</InputGroup.Text>
                <FormControl
                  onChange={handleChange}
                  aria-label="Title"
                />
              </InputGroup>
              <Button onClick={() => handleSave() }><Icon.CheckLg size={15}/> Save</Button>
            </Form>
          : <h2 onDoubleClick={() => setIsEditing(true)}>{page?.title}</h2>} <hr />

          {blocks.map((block) => {
            const Block = blockTypes[block.type].render;
            return (
              <div key={block.id}>
                <Block
                  value={block.data}
                  isEditing={block.id === editingBlock?.id}
                  onEdit={() => setEditingBlock(block)}
                  onChange={(data) => {
                    updateBlock(block.id, data, block?.isUpload);
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
        </Container>
      </Col>
    </Row>
  );
};

export default Blocks;
