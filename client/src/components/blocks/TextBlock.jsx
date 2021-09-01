const defaultValues = { text: "" };

const TextComponent = ({ value = defaultValues, onChange = () => {} }) => (
  <input
    value={value.text}
    onChange={(e) => {
      console.log(e.target.value);
      onChange({ ...value, text: e.target.value });
    }}
  />
);

export default TextComponent;
