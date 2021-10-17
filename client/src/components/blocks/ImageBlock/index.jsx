import { Form } from "react-bootstrap";
import { useParams } from "react-router";
import { useState } from "react";
import sendFile from "../../../lib/file-upload";
import Api from "../../../lib/api";
import "./style.scss";

const defaultValues = { file: undefined };

const getImageUrl = async (pageId, filename, setImgUrl) => {
  try {
    const response = await Api.get(`/${pageId}/${filename}`);
    setImgUrl(response.config.baseURL + response.config.url);

  } catch {
    return null;
  }   
};

const ImageBlockDisplay = ({ value, onEdit }) => {  
  const [imgUrl, setImgUrl] = useState();

  const { pageId } = useParams();

  getImageUrl(pageId, value.filename, setImgUrl);

  return (
    <img
      class="img"
      src={imgUrl}
      alt=""
      onClick={onEdit}
    />
  );
};

const ImageBlockForm = ({ value, onChange }) => {
  const { pageId } = useParams();

  return (
    <Form.Group>
      <Form.Label>Upload an Image</Form.Label>
      <Form.Control
        type="file"
        onChange={(e) => {
          sendFile(e.target.files[0], pageId);
          onChange({
            ...value,
            file: e.target.files[0],
            filename: e.target.files[0].name,
          })}}
      ></Form.Control>

    </Form.Group>
  )
};

const ImageBlock = ({
  value = defaultValues,
  isEditing = false,
  onChange = () => {},
  onEdit = () => {},
}) =>
  isEditing ? (
    <ImageBlockForm {...{ value, onChange }} />
  ) : (
    <ImageBlockDisplay {...{ value, onEdit }} />
  );

export default ImageBlock;
