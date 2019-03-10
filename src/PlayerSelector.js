import React, { Component } from "react";
import { Modal, Button, Container, Row, Col } from "react-bootstrap";
import "./PlayerSelector.css";

class PlayerSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true
    };
  }

  handleClose = () => {
    this.setState({ show: false });
  };

  render() {
    return (
      <Modal centered size="lg" show={this.state.show}>
        <Modal.Body id="modal">
          <Container>
            <Row>
              <Col style={{ display: "flex", justifyContent: "center" }}>
                <Button className="boxes" onClick={this.handleClose}>
                  🤖 <br />
                  AI
                </Button>
              </Col>
              <Col style={{ display: "flex", justifyContent: "center" }}>
                <Button className="boxes" onClick={this.handleClose}>
                  🧑 <br />
                  You
                </Button>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    );
  }
}

export default PlayerSelector;
