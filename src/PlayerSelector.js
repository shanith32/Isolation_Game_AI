import React, { Component } from "react";
import { Modal, Button, Container, Row, Col } from "react-bootstrap";
import "./PlayerSelector.css";

class PlayerSelector extends Component {
  render() {
    return (
      <Modal centered size="lg" show={this.props.show}>
        <Modal.Body id="modal">
          <Container>
            <Row>
              <Col style={{ display: "flex", justifyContent: "center" }}>
                <Button
                  className="boxes"
                  onClick={() => this.props.onClick(true)}
                >
                  🤖 <br />
                  AI
                </Button>
              </Col>
              <Col style={{ display: "flex", justifyContent: "center" }}>
                <Button
                  className="boxes"
                  onClick={() => this.props.onClick(false)}
                >
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
