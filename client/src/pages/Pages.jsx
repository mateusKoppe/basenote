import usePages from "../hooks/usePages";
import { useParams } from "react-router-dom";

import AddPages from "../components/pages/AddPages";
import { Button, ListGroup } from "react-bootstrap";

const Pages = () => {
  const { pageId } = useParams();
  const { pages, addPage, deletePage } = usePages(pageId);

  return (
    <div>
      <h2>Pages</h2>
        {pages.map((page) => {
        return (
          <div key={page.id}>
          <ListGroup variant="flush">
              <ListGroup.Item action href={`/pages/${page.id}`} key={page.id}>
                {page.title}
              </ListGroup.Item>
          </ListGroup>             
            <Button size="sm" variant="danger" onClick={() => deletePage(page.id)}>
              Delete
            </Button>
          </div>
        )})}
      <AddPages onSave={addPage} />
    </div>
  );
};

export default Pages;
