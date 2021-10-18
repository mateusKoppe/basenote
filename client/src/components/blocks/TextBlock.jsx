import { Form } from "react-bootstrap";

const defaultValues = { text: "" };

const TextBlockDisplay = ({ value, onEdit }) => (
  <div onClick={onEdit}>{value.text}</div>
);

const TextBlockForm = ({ value, onChange }) => (
  <Form.Control
    as="textarea"
    value={value.text}
    onChange={(e) => onChange({ ...value, text: e.target.value })}
  />
);

const TextBlock = ({
  value = defaultValues,
  isEditing = false,
  onChange = () => {},
  onEdit = () => {}
}) =>
  isEditing ? (
    <TextBlockForm {...{ value, onChange }} />
  ) : (
    <TextBlockDisplay {...{ value, onEdit }} />
  );

export default TextBlock;
