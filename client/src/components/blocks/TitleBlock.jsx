import { Form, InputGroup } from "react-bootstrap";

const SIZES = [1, 2, 3];
const DEFAULT_SIZE = 1;

const defaultValues = { text: "", size: DEFAULT_SIZE };

const TitleBlockForm = ({ value, onChange }) => (
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

const TitleBlockDisplay = ({ value, onEdit = () => {} }) => {
  const sizeTitleComponents = {
    1: ({ children, ...props }) => <h1 {...props}>{children}</h1>,
    2: ({ children, ...props }) => <h2 {...props}>{children}</h2>,
    3: ({ children, ...props }) => <h3 {...props}>{children}</h3>,
  };
  const SizeTitle = sizeTitleComponents[value.size];
  return <SizeTitle onClick={onEdit}>{value.text}</SizeTitle>;
};

const TitleBlock = ({
  value = defaultValues,
  isEditing = false,
  onChange = () => {},
  onEdit = () => {},
}) =>
  isEditing ? (
    <TitleBlockForm {...{ value, onChange }} />
  ) : (
    <TitleBlockDisplay {...{ value, onEdit }} />
  );

export default TitleBlock;
