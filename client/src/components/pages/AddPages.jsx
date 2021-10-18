import { useState } from "react";
import { Button, Form, InputGroup, FormControl, ListGroup } from "react-bootstrap";
import * as Icon from 'react-bootstrap-icons';


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
      <Button onClick={handleSave}><Icon.CheckLg size={15}/> Save</Button>
    </Form>
  ) : (
    <ListGroup.Item action onClick={() => setIsCreating(true)}><Icon.Plus size={25}/>New Page</ListGroup.Item>
  );
};

export default AddPages;
