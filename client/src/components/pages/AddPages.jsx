import { useState } from "react";
import { Button, Form, InputGroup, FormControl } from "react-bootstrap";


const AddPages = ({ onSave = () => { } }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [pageTitle, setPageTitle] = useState();

  const handleChange = (event) => {
    setPageTitle(event.target.value);
  };

  const handleSave = async () => {
    await onSave({ title: pageTitle });
    setIsCreating(false);
    setPageTitle();
  };

  return isCreating ? (
    <Form>
       <InputGroup className="mb-3">
        <InputGroup.Text>Title</InputGroup.Text>
        <FormControl
          onChange={handleChange}
          aria-label="Title"
        />
      </InputGroup>
      <Button onClick={handleSave}>Save</Button>
    </Form>
  ) : (
    <Button onClick={() => setIsCreating(true)}>Add</Button>
  );
};

export default AddPages;
