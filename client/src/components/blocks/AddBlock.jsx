import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { blockTypes } from ".";
import * as Icon from 'react-bootstrap-icons';

const blockKeys = Object.keys(blockTypes);
const defaultBlock = blockKeys[0];

const AddBlock = ({ onSave = () => {} }) => {
  const [isCreating, setIsCreating] = useState(false);

  const [selectedType, setSelectedType] = useState(defaultBlock);
  const [blockState, setBlockState] = useState();

  const CreatingBlock = blockTypes[selectedType].render;

  const handleSelectChange = (e) => {
    setBlockState();
    setSelectedType(e.target.value);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    await onSave({ type: selectedType, data: blockState });
    setIsCreating(false);
    setBlockState();
    setSelectedType(defaultBlock);
  };

  return isCreating ? (
    <Form onSubmit={handleSave}>
      <Form.Select value={selectedType} onChange={handleSelectChange}>
        {blockKeys.map((key) => (
          <option key={key} value={key}>
            {blockTypes[key].label}
          </option>
        ))}
      </Form.Select>
      <CreatingBlock value={blockState} onChange={setBlockState} isEditing={true} />
      <Button type="submit"><Icon.CheckLg size={15}/>Save</Button>
    </Form>
  ) : (
    <Button onClick={() => setIsCreating(true)}>Add</Button>
  );
};

export default AddBlock;
