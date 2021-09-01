import TextBlock from "./TextBlock";
import TitleBlock from "./TitleBlock";

export const blockTypes = {
  text: { label: "Text", render: TextBlock },
  title: { label: "Title", render: TitleBlock }
};
