import TextBlock from "./TextBlock";
import TodoBlock from "./TodoBlock/index";

export const blockTypes = {
  text: { label: "Text", render: TextBlock },
  todoList: { label: "TodoList", render: TodoBlock },
};
