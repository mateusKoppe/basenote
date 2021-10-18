import usePages from "../hooks/usePages";
import { useParams, useHistory } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import * as Icon from 'react-bootstrap-icons';

import AddPages from "../components/pages/AddPages";
import { Row, Col, Button, ListGroup } from "react-bootstrap";
import "../scss/Pages.scss";
import baseNote from "../images/BaseNote.svg";
import { useState } from "react";


const Pages = (props) => {
  const { pageId } = useParams();
  const { pages, addPage, deletePage } = usePages(pageId);
  const [pagesEmpty, setPagesEmpty] = useState(false);

  const history = useHistory();

  if (!pageId && !pagesEmpty) {
    setPagesEmpty(true);
  }

  const onDeletePage = async (_pageId) => {
    await deletePage(_pageId);
  };

  const PagesSidebar = () => (
    <div className="sidebar">
      <div className="logo">
        <object
          alt="Logo Basenote"
          width="150"
          type="image/svg+xml"
          data={baseNote}
        ></object>
      </div>
        <Nav variant="tabs" defaultActiveKey="/home" className="flex-column">
          <ListGroup variant="flush">
            {pages.map((page) => {
              return (
                <ListGroup.Item
                  className="item-nav"
                  action
                  href={`/pages/${page.id}`}
                  key={page.id}
                  active={page.id === pageId}
                >
                  {page.title}
                  <Button className="float-end delete-btn" size="sm" onClick={() => deletePage(page.id)}>
                    <Icon.TrashFill/>
                  </Button>
                </ListGroup.Item>
              )})}
              <AddPages onSave={addPage} />
          </ListGroup>             
        </Nav>
    </div>
  );

  return pagesEmpty ? <Row>
    <Col xs={5} sm={4} md={3} lg={2}>
      <PagesSidebar />
    </Col>
    <Col xs={7} sm={8} md={9} lg={10} />
  </Row> : <PagesSidebar />
};

export default Pages;
