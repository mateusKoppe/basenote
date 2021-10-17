import Api from "./api";

const sendFile = async (file, pageId) => {
  const formData = new FormData();
  formData.append(
    "file",
    file,
    file.name,
  );

  const response = await Api.post(`/pages/${pageId}/upload`, formData);

  return response;
};

export default sendFile;