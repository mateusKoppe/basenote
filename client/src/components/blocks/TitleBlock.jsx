import { Form, InputGroup } from "react-bootstrap";

const SIZES = [1, 2, 3];
const DEFAULT_SIZE = 1;

const defaultValues = { text: "", size: DEFAULT_SIZE };

const TitleComponent = ({ value = defaultValues, onChange = () => {} }) => (
  <Form>
    <InputGroup>
      <Form.Select
        value={value.size}
        width={"100"}
        onChange={(e) => onChange({ ...value, size: e.target.value })}
      >
        {SIZES.map((size) => (
          <option key={size} value={size}>
            Title {size}
          </option>
        ))}
      </Form.Select>
      <Form.Control
        value={value.text}
        onChange={(e) => onChange({ ...value, text: e.target.value })}
      />
    </InputGroup>
  </Form>
);

export default TitleComponent;
