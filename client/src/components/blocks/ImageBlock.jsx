import { Form } from "react-bootstrap";

const defaultValues = { file: undefined };

const ImageBlock = ({value = defaultValues, onChange = () => {} }) => {
  return (
    <Form.Group>
      <Form.Label>Upload an Image</Form.Label>
      <Form.Control
        type="file"
        onChange={(e) => {
          console.log(e);
          onChange({ ...value, file: e.target.files[0] })}}
      ></Form.Control>

    </Form.Group>
  );
};

export default ImageBlock;
