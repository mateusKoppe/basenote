const TextComponent = ({ value, onChange = () => {} }) => (
  <input
    value={value.text}
    onChange={(e) => {console.log(e.target.value); onChange({ ...value, text: e.target.value })}}
  />
);

export default TextComponent;
