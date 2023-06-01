import React from "react";
import { Col, Row, Container } from "react-bootstrap";

const Footer = () => {
  return (
    <Container className="con footerContainer">
      <Row>
        <Col sm="12">
          <h1 className="light">Shops Manager</h1>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
