import { Container } from "react-bootstrap";

import Router from "./Router";

import "./scss/App.scss";

function App() {
  return (
    <div className="App">
      <Container>
        <Router />
      </Container>
    </div>
  );
}

export default App;
