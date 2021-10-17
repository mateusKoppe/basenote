import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { blockTypes } from ".";

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

  const handleSaveUpload = async () => {
    const formData = new FormData();
    formData.append(
      "file",
      blockState.file,
      blockState.file.name,
    );

    await onSave({
      type: selectedType,
      data: {
        filename: blockState.file.name,
      },
      file: formData,
    }, true);
    setIsCreating(false);
    setBlockState();
    setSelectedType(defaultBlock);
  };

  const handleSave = async () => {
    await onSave({ type: selectedType, data: blockState });
    setIsCreating(false);
    setBlockState();
    setSelectedType(defaultBlock);
  };

  return isCreating ? (
    <Form>
      <Form.Select value={selectedType} onChange={handleSelectChange}>
        {blockKeys.map((key) => (
          <option key={key} value={key}>
            {blockTypes[key].label}
          </option>
        ))}
      </Form.Select>
      <CreatingBlock value={blockState} onChange={setBlockState} isEditing={true} />
      <Button
        onClick={blockTypes[selectedType]?.isUpload
          ? handleSaveUpload
          : handleSave}
      >Save</Button>
    </Form>
  ) : (
    <Button onClick={() => setIsCreating(true)}>Add</Button>
  );
};

export default AddBlock;
