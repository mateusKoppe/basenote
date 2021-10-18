import TextBlock from "./TextBlock";
import TitleBlock from "./TitleBlock";
import ImageBlock from "./ImageBlock/index";
import TodoBlock from "./TodoBlock/index";

export const blockTypes = {
  text: { label: "Text", render: TextBlock },
  title: { label: "Title", render: TitleBlock },
  image: { label: "Image", render: ImageBlock, isUpload: true },
  todoList: { label: "TodoList", render: TodoBlock },
};
