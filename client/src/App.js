import './scss/App.scss';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {
  return (
    <div className="App">
      <Container>
        <Row>
          <Col>
            <div className="mt-4">
              <Alert
                variant="primary"
                >
                Hello World!!
              </Alert>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
