import { InputGroup, FormControl } from "react-bootstrap";
import "./index.scss";

const defaultValues = { checked: false, description: "" };

const TodoBlock = ({ value = defaultValues, onChange = () => {} }) => (
    <InputGroup className="todo-block mt-3">
        <InputGroup.Checkbox
            checked={value.checked}
            onChange={
                (e) => onChange({ ...value, checked: e.target.checked })
            }
        />
        <FormControl
            placeholder="Description"
            disabled={value.checked}
            value={value.description}
            onChange = {
                (e) => onChange({ ...value, description: e.target.value })
            }
            style={{
                textDecoration: value.checked ? "line-through rgba(0, 0, 0)" : "",
                boxShadow: "none",
            }}
        />
    </InputGroup>
);

export default TodoBlock;