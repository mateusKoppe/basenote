import { Form } from "react-bootstrap";

const defaultValues = { text: "" };

const TextComponent = ({ value = defaultValues, onChange = () => {} }) => (
  <Form.Control
    as="textarea"
    value={value.text}
    onChange={(e) => onChange({ ...value, text: e.target.value })}
  />
);

export default TextComponent;
